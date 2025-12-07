const GH_TOKEN = process.env.GITHUB_TOKEN;

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

export async function getRepoCardData(owner: string, repo: string): Promise<RepoCardData> {
  const headers: Record<string, string> = {
    "User-Agent": "nskog-portfolio",
    Accept: "application/vnd.github+json",
  };
  if (GH_TOKEN) headers.Authorization = `Bearer ${GH_TOKEN}`;

  const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers,
    next: { revalidate: 3600 },
  });
  if (!repoRes.ok) {
    throw new Error(`Repo fetch failed (${repoRes.status})`);
  }
  const repoJson = await repoRes.json();

  const contribRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=4`,
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
