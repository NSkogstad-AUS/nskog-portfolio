const GH_TOKEN = process.env.GITHUB_TOKEN;
const GH_API = "https://api.github.com";

const baseHeaders: Record<string, string> = {
  "User-Agent": "nskog-portfolio",
  Accept: "application/vnd.github+json",
};

type RepoContributor = {
  login: string;
  avatar: string;
  profileUrl: string;
};

type RepoCardData = {
  name: string;
  fullName: string;
  stars: number;
  description: string | null;
  contributors: RepoContributor[];
};

export type RecentCommit = {
  repo: string;
  sha: string;
  message: string;
  url: string;
  additions: number;
  deletions: number;
  timestamp: string;
  author: string;
  language?: string | null;
};

type CommitStub = RecentCommit & { apiUrl: string };

function buildHeaders(acceptOverride?: string): Record<string, string> {
  const headers = { ...baseHeaders };
  if (acceptOverride) headers.Accept = acceptOverride;
  if (GH_TOKEN) headers.Authorization = `Bearer ${GH_TOKEN}`;
  return headers;
}

export async function getRepoCardData(owner: string, repo: string): Promise<RepoCardData> {
  const headers = buildHeaders();

  const repoRes = await fetch(`${GH_API}/repos/${owner}/${repo}`, {
    headers,
    next: { revalidate: 3600 },
  });
  if (!repoRes.ok) {
    throw new Error(`Repo fetch failed (${repoRes.status})`);
  }
  const repoJson = await repoRes.json();

  const contribRes = await fetch(
    `${GH_API}/repos/${owner}/${repo}/contributors?per_page=4`,
    { headers, next: { revalidate: 3600 } }
  );
  const contribJson = contribRes.ok ? await contribRes.json() : [];
  const contributors: RepoContributor[] = Array.isArray(contribJson)
    ? contribJson
        .map((c: any) => ({
          login: typeof c.login === "string" ? c.login : "contributor",
          avatar: c.avatar_url,
          profileUrl:
            typeof c.html_url === "string"
              ? c.html_url
              : `https://github.com/${typeof c.login === "string" ? c.login : owner}`,
        }))
        .filter((c): c is RepoContributor => Boolean(c.avatar))
    : [];

  return {
    name: repoJson.name,
    fullName: repoJson.full_name,
    stars: repoJson.stargazers_count,
    description: repoJson.description,
    contributors,
  };
}

async function fetchStatsFor(commits: CommitStub[], headers: Record<string, string>) {
  const repoLangCache = new Map<string, string | null>();

  async function getPrimaryLanguage(repo: string) {
    if (repoLangCache.has(repo)) return repoLangCache.get(repo) ?? null;
    try {
      const res = await fetch(`${GH_API}/repos/${repo}/languages`, {
        headers,
        next: { revalidate: 1800 },
      });
      if (!res.ok) {
        repoLangCache.set(repo, null);
        return null;
      }
      const json = await res.json();
      if (!json || typeof json !== "object") {
        repoLangCache.set(repo, null);
        return null;
      }
      let topLang: string | null = null;
      let topBytes = -1;
      for (const [lang, bytes] of Object.entries(json as Record<string, number>)) {
        if (typeof bytes === "number" && bytes > topBytes) {
          topBytes = bytes;
          topLang = lang;
        }
      }
      repoLangCache.set(repo, topLang);
      return topLang;
    } catch (error) {
      console.warn("language fetch failed", error);
      repoLangCache.set(repo, null);
      return null;
    }
  }

  return Promise.all(
    commits.map(async (commit) => {
      const { apiUrl, ...rest } = commit;
      try {
        const commitRes = await fetch(apiUrl, { headers, next: { revalidate: 600 } });
        if (!commitRes.ok) return rest;
        const commitJson = await commitRes.json();

        return {
          ...rest,
          additions: commitJson?.stats?.additions ?? rest.additions,
          deletions: commitJson?.stats?.deletions ?? rest.deletions,
          url: typeof commitJson?.html_url === "string" ? commitJson.html_url : rest.url,
          language:
            typeof commitJson?.commit?.tree?.url === "string"
              ? await getPrimaryLanguage(rest.repo)
              : await getPrimaryLanguage(rest.repo),
        };
      } catch (error) {
        console.warn("commit fetch failed", error);
        return { ...rest, language: await getPrimaryLanguage(rest.repo) };
      }
    })
  );
}

async function collectFromEvents(
  username: string,
  limit: number,
  headers: Record<string, string>
): Promise<CommitStub[]> {
  const eventsRes = await fetch(
    `${GH_API}/users/${username}/events/public?per_page=50`,
    { headers, next: { revalidate: 300 } }
  );

  if (!eventsRes.ok) {
    throw new Error(`Events fetch failed (${eventsRes.status})`);
  }

  const eventsJson = await eventsRes.json();
  if (!Array.isArray(eventsJson)) return [];

  const commits: CommitStub[] = [];
  const seenShas = new Set<string>();

  for (const event of eventsJson) {
    if (commits.length >= limit * 2) break; // avoid extra requests
    if (!event || event.type !== "PushEvent") continue;
    const repoName = event.repo?.name ?? "unknown/repo";
    const timestamp = event.created_at ?? new Date().toISOString();
    const actorLogin = event.actor?.login ?? username;
    const eventCommits = event.payload?.commits;
    if (!Array.isArray(eventCommits)) continue;

    for (const commit of eventCommits) {
      if (!commit?.sha || seenShas.has(commit.sha)) continue;
      seenShas.add(commit.sha);

      const apiUrl =
        typeof commit.url === "string"
          ? commit.url
          : `${GH_API}/repos/${repoName}/commits/${commit.sha}`;

      const htmlUrl = `https://github.com/${repoName}/commit/${commit.sha}`;

      commits.push({
        repo: repoName,
        sha: commit.sha,
        message: typeof commit.message === "string" ? commit.message : "Commit",
        url: htmlUrl,
        additions: 0,
        deletions: 0,
        timestamp,
        author: actorLogin,
        apiUrl,
      });

      if (commits.length >= limit * 2) break;
    }
  }

  return commits;
}

async function collectFromSearch(
  username: string,
  limit: number,
  headers: Record<string, string>
): Promise<CommitStub[]> {
  const perPage = Math.min(Math.max(limit * 3, limit), 50);
  const searchRes = await fetch(
    `${GH_API}/search/commits?q=author:${encodeURIComponent(username)}&sort=author-date&order=desc&per_page=${perPage}`,
    { headers, next: { revalidate: 300 } }
  );

  if (!searchRes.ok) {
    throw new Error(`Search commits failed (${searchRes.status})`);
  }

  const searchJson = await searchRes.json();
  if (!Array.isArray(searchJson?.items)) return [];

  const commits: CommitStub[] = [];

  for (const item of searchJson.items) {
    if (!item?.sha) continue;
    const repoName = item.repository?.full_name ?? "unknown/repo";
    const apiUrl =
      typeof item.url === "string"
        ? item.url
        : `${GH_API}/repos/${repoName}/commits/${item.sha}`;

    const htmlUrl =
      typeof item.html_url === "string"
        ? item.html_url
        : `https://github.com/${repoName}/commit/${item.sha}`;

    const timestamp =
      item.commit?.author?.date ||
      item.commit?.committer?.date ||
      new Date().toISOString();

    commits.push({
      repo: repoName,
      sha: item.sha,
      message: item.commit?.message ?? "Commit",
      url: htmlUrl,
      additions: 0,
      deletions: 0,
      timestamp,
      author: item.author?.login ?? username,
      apiUrl,
    });

    if (commits.length >= limit * 2) break;
  }

  return commits;
}

export async function getRecentCommits(username: string, limit = 5): Promise<RecentCommit[]> {
  const eventHeaders = buildHeaders();
  let commits: CommitStub[] = [];

  try {
    commits = await collectFromEvents(username, limit, eventHeaders);
  } catch (error) {
    console.warn("events path failed", error);
  }

  if (commits.length === 0) {
    const searchHeaders = buildHeaders("application/vnd.github.cloak-preview+json");
    try {
      commits = await collectFromSearch(username, limit, searchHeaders);
    } catch (error) {
      console.warn("search path failed", error);
    }
  }

  if (commits.length === 0) return [];

  const trimmed = commits.slice(0, limit);
  return fetchStatsFor(trimmed, eventHeaders);
}
