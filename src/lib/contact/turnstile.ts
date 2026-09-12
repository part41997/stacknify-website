import { getContactServerConfig } from "@/lib/contact/config";

export async function verifyTurnstile(token: string, ip: string) {
  const { turnstileSecret } = getContactServerConfig();

  if (!turnstileSecret) {
    return false;
  }

  const body = new URLSearchParams({
    secret: turnstileSecret,
    response: token,
  });

  if (ip) {
    body.set("remoteip", ip);
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!response.ok) {
      return false;
    }

    const payload = (await response.json()) as { success?: boolean };
    return payload.success === true;
  } catch {
    return false;
  }
}
