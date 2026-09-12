import { createHash } from "node:crypto";

type ContactLogOutcome =
  | "accepted"
  | "dry_run"
  | "invalid"
  | "rate_limited"
  | "spam"
  | "forbidden"
  | "unavailable"
  | "error";

export type ContactLogEvent = {
  event: "contact.submit";
  requestId: string;
  outcome: ContactLogOutcome;
  reason?: string;
  service?: string;
  ipFingerprint?: string;
  durationMs: number;
};

export function fingerprint(value: string) {
  return createHash("sha256").update(value).digest("hex").slice(0, 16);
}

export function logContactEvent(entry: ContactLogEvent) {
  console.info(
    JSON.stringify({
      ...entry,
      ts: new Date().toISOString(),
    }),
  );
}
