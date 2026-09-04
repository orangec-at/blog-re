import { createHash, timingSafeEqual } from "node:crypto";

import type { AuthContext, UserTier } from "../types";

interface TokenRecord {
  userId: string;
  tier: UserTier;
  dailyQuota: number;
}

// This file used to accept any string that started with "vg_live_" as a paying
// customer, and any string of ten characters as a free one. Combined with the
// endpoint auditor, that made the gateway an unauthenticated outbound HTTP
// client on the public internet.
//
// Tokens now come from MCP_API_TOKENS: a comma-separated list, one secret per
// entry. No environment variable means no valid tokens and a 401 for every
// request, which is the correct default for a gateway with no user store behind
// it. Issue a token by generating one and adding it to the project's env.
const DEFAULT_DAILY_QUOTA = 1000;

function configuredTokens(): Map<string, TokenRecord> {
  const raw = process.env.MCP_API_TOKENS ?? "";
  const quota = Number(process.env.MCP_DAILY_QUOTA) || DEFAULT_DAILY_QUOTA;

  const entries = raw
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);

  return new Map(
    entries.map((token) => [
      token,
      {
        // The token itself never becomes the user id; a digest prefix is enough
        // to tell two callers apart in the quota counter and in logs.
        userId: `usr_${digest(token).slice(0, 12)}`,
        tier: "pro" as UserTier,
        dailyQuota: quota,
      },
    ]),
  );
}

function digest(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

// Compare digests rather than the raw strings: equal length, so timingSafeEqual
// cannot throw, and the comparison leaks neither the token nor its length.
function matches(candidate: string, known: string): boolean {
  return timingSafeEqual(
    Buffer.from(digest(candidate), "hex"),
    Buffer.from(digest(known), "hex"),
  );
}

// ponytail: per-instance daily counter. Serverless spreads requests over many
// instances and cold starts reset them, so this bounds a single runaway client
// rather than enforcing a real quota. Move it to Redis or Postgres the day the
// quota has to be accurate — for example the day it decides what someone is
// billed.
const usageStore: Map<string, { count: number; dateString: string }> = new Map();

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function rejected(token: string, status: number, message: string) {
  return {
    auth: {
      token,
      userId: "anonymous",
      tier: "free" as UserTier,
      dailyQuota: 0,
      usedToday: 0,
      isValid: false,
    },
    error: { status, message },
  };
}

export function validateBearerToken(authHeader: string | null): {
  auth: AuthContext;
  error?: { status: number; message: string };
} {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return rejected("", 401, "Missing or invalid Authorization header.");
  }

  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  const registry = configuredTokens();

  let record: TokenRecord | undefined;
  for (const [known, known_record] of registry) {
    if (matches(token, known)) {
      record = known_record;
      break;
    }
  }

  if (!record) {
    // The same message whether the registry is empty or the token is simply
    // wrong. Which of the two it is tells an attacker something.
    return rejected(token, 401, "Invalid API token.");
  }

  const today = getTodayString();
  const usageKey = `${record.userId}:${today}`;
  const currentUsage = usageStore.get(usageKey);
  const usedToday =
    currentUsage && currentUsage.dateString === today ? currentUsage.count : 0;

  if (usedToday >= record.dailyQuota) {
    return {
      auth: {
        token,
        userId: record.userId,
        tier: record.tier,
        dailyQuota: record.dailyQuota,
        usedToday,
        isValid: true,
      },
      error: {
        status: 429,
        message: `Daily quota exceeded (${usedToday}/${record.dailyQuota} calls).`,
      },
    };
  }

  usageStore.set(usageKey, { count: usedToday + 1, dateString: today });

  return {
    auth: {
      token,
      userId: record.userId,
      tier: record.tier,
      dailyQuota: record.dailyQuota,
      usedToday: usedToday + 1,
      isValid: true,
    },
  };
}
