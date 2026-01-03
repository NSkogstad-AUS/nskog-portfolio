import { NextResponse } from "next/server";
import { getRepoCardData } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");

  if (!owner || !repo) {
    return NextResponse.json({ error: "Missing owner or repo" }, { status: 400 });
  }

  try {
    const data = await getRepoCardData(owner, repo);
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "cache-control": "private, max-age=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("repo-card fetch failed", error);
    return NextResponse.json({ error: "Failed to fetch repo data" }, { status: 500 });
  }
}
