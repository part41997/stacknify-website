import { getSiteUrl } from "@/lib/site";
import { getContactServerConfig } from "@/lib/contact/config";

function originFromValue(value: string) {
  try {
    return new URL(value).origin;
  } catch {
    return "";
  }
}

export function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) {
    return true;
  }

  const originUrl = originFromValue(origin);
  if (!originUrl) {
    return false;
  }

  const host = request.headers.get("host");
  if (host) {
    try {
      if (new URL(origin).host === host) {
        return true;
      }
    } catch {
      return false;
    }
  }

  const allowed = new Set(
    [getSiteUrl(), ...getContactServerConfig().allowedOrigins]
      .map(originFromValue)
      .filter(Boolean),
  );

  return allowed.has(originUrl);
}

export function isJsonContentType(request: Request) {
  const value = (request.headers.get("content-type") ?? "")
    .toLowerCase()
    .split(";")[0]
    ?.trim();

  return value === "application/json";
}

export async function readJsonBody(request: Request, maxBytes: number) {
  const declared = Number.parseInt(
    request.headers.get("content-length") ?? "",
    10,
  );

  if (Number.isFinite(declared) && declared > maxBytes) {
    return { ok: false as const, reason: "too_large" as const };
  }

  const reader = request.body?.getReader();
  if (!reader) {
    return { ok: false as const, reason: "invalid" as const };
  }

  const chunks: Uint8Array[] = [];
  let size = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel().catch(() => undefined);
      return { ok: false as const, reason: "too_large" as const };
    }

    chunks.push(value);
  }

  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return { ok: true as const, value: JSON.parse(text) as unknown };
  } catch {
    return { ok: false as const, reason: "invalid" as const };
  }
}
