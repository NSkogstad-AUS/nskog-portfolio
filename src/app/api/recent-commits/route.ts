import { NextResponse } from "next/server";
import { getRecentCommits } from "@/lib/github";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get("user") || process.env.GITHUB_USER || "NSkogstad-AUS";
  const limitParam = Number.parseInt(searchParams.get("limit") || "", 10);
  const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 10) : 5;

  try {
    const commits = await getRecentCommits(user, limit);
    return NextResponse.json(
      { commits },
      {
        status: 200,
        headers: {
          "cache-control": "public, max-age=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("recent-commits fetch failed", error);
    return NextResponse.json({ error: "Failed to fetch recent commits" }, { status: 500 });
  }
}
