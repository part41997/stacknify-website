import { getContactServerConfig } from "@/lib/contact/config";
import { fingerprint } from "@/lib/contact/logger";

type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetAt: number;
};

type MemoryBucket = {
  count: number;
  resetAt: number;
};

const memoryBuckets = new Map<string, MemoryBucket>();
const MEMORY_BUCKET_CAP = 8_000;

function pruneMemoryBuckets(now: number) {
  if (memoryBuckets.size < MEMORY_BUCKET_CAP) {
    for (const [key, bucket] of memoryBuckets) {
      if (bucket.resetAt <= now) {
        memoryBuckets.delete(key);
      }
    }
    return;
  }

  memoryBuckets.clear();
}

function consumeMemory(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  pruneMemoryBuckets(now);

  const current = memoryBuckets.get(key);
  if (!current || current.resetAt <= now) {
    const resetAt = now + windowMs;
    memoryBuckets.set(key, { count: 1, resetAt });
    return { ok: true, remaining: Math.max(0, limit - 1), resetAt };
  }

  current.count += 1;
  memoryBuckets.set(key, current);
  return {
    ok: current.count <= limit,
    remaining: Math.max(0, limit - current.count),
    resetAt: current.resetAt,
  };
}

async function consumeUpstash(
  url: string,
  token: string,
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult | null> {
  try {
    const response = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, windowSeconds, "NX"],
        ["TTL", key],
      ]),
      signal: AbortSignal.timeout(2500),
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as Array<{ result: number }>;
    const count = payload[0]?.result;
    const ttl = payload[2]?.result;

    if (typeof count !== "number") {
      return null;
    }

    const ttlSeconds = typeof ttl === "number" && ttl > 0 ? ttl : windowSeconds;
    const resetAt = Date.now() + ttlSeconds * 1000;

    return {
      ok: count <= limit,
      remaining: Math.max(0, limit - count),
      resetAt,
    };
  } catch {
    return null;
  }
}

export async function consumeRateLimit(
  scope: string,
  identity: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult | { unavailable: true }> {
  const { upstashUrl, upstashToken, isProduction } = getContactServerConfig();
  const key = `contact:${scope}:${fingerprint(identity)}`;

  if (upstashUrl && upstashToken) {
    const distributed = await consumeUpstash(
      upstashUrl,
      upstashToken,
      key,
      limit,
      windowSeconds,
    );

    if (distributed) {
      return distributed;
    }

    if (isProduction) {
      return { unavailable: true };
    }
  }

  return consumeMemory(key, limit, windowSeconds * 1000);
}

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const candidate =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    forwarded?.split(",")[0] ||
    "";

  return candidate.trim();
}
