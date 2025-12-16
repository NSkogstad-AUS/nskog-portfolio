import { NextResponse } from "next/server";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const VIEW_KEY = "profile:view-count";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const authHeaders =
  redisToken != null
    ? {
        Authorization: `Bearer ${redisToken}`,
      }
    : {};

function buildUrl(path: string) {
  if (!redisUrl) return null;
  return `${redisUrl.replace(/\/$/, "")}/${path}`;
}

async function fetchRedis<T>(path: string, init?: RequestInit): Promise<T> {
  const url = buildUrl(path);
  if (!url || !redisToken) {
    throw new Error("Redis environment variables are not configured.");
  }

  const headers = new Headers(init?.headers as HeadersInit);
  headers.set("Content-Type", "application/json");
  if (redisToken) {
    headers.set("Authorization", `Bearer ${redisToken}`);
  }

  const res = await fetch(url, {
    ...init,
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Redis request failed (${res.status}): ${text}`);
  }

  return res.json() as Promise<T>;
}

export async function POST() {
  try {
    const data = await fetchRedis<{ result: number }>(`incr/${encodeURIComponent(VIEW_KEY)}`, {
      method: "POST",
    });
    return NextResponse.json({ total: data.result }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await fetchRedis<{ result: string | number | null }>(
      `get/${encodeURIComponent(VIEW_KEY)}`
    );
    const total =
      data.result == null
        ? 0
        : typeof data.result === "string"
          ? Number.parseInt(data.result, 10)
          : data.result;
    return NextResponse.json({ total: Number.isFinite(total) ? total : 0 }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
