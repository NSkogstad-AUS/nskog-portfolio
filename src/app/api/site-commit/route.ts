import { NextResponse } from "next/server";
import { getSiteCommit } from "@/lib/github";

export async function GET() {
  try {
    const commit = await getSiteCommit();

    return NextResponse.json(
      { commit },
      {
        status: 200,
        headers: {
          "cache-control": "public, max-age=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("site-commit fetch failed", error);
    return NextResponse.json({ error: "Failed to fetch site commit" }, { status: 500 });
  }
}
