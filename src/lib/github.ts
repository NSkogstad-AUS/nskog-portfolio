const GH_TOKEN = process.env.GITHUB_TOKEN;

type RepoCardData = {
  name: string;
  fullName: string;
  stars: number;
  description: string | null;
  contributors: string[];
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

  return {
    name: repoJson.name,
    fullName: repoJson.full_name,
    stars: repoJson.stargazers_count,
    description: repoJson.description,
    contributors: Array.isArray(contribJson)
      ? contribJson.map((c: any) => c.avatar_url).filter(Boolean)
      : [],
  };
}
