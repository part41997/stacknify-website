function read(name: string) {
  const value = process.env[name]?.trim() ?? "";

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1).trim();
  }

  return value;
}

function readInt(name: string, fallback: number) {
  const value = Number.parseInt(read(name), 10);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export function getContactServerConfig() {
  const resendApiKey = read("RESEND_API_KEY");
  const fromEmail = read("CONTACT_FROM_EMAIL");
  const toEmail = read("CONTACT_TO_EMAIL") || "info@stacknify.com";
  const turnstileSecret = read("TURNSTILE_SECRET_KEY");
  const turnstileSiteKey = read("NEXT_PUBLIC_TURNSTILE_SITE_KEY");

  return {
    resendApiKey,
    fromEmail,
    toEmail,
    webhookUrl: read("CONTACT_WEBHOOK_URL"),
    turnstileSecret,
    turnstileSiteKey,
    allowedOrigins: read("CONTACT_ALLOWED_ORIGINS")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
    rateLimitMax: readInt("CONTACT_RATE_LIMIT_MAX", 5),
    rateLimitWindowSeconds: readInt("CONTACT_RATE_LIMIT_WINDOW_SECONDS", 600),
    emailRateLimitMax: readInt("CONTACT_EMAIL_RATE_LIMIT_MAX", 3),
    minSubmitMs: readInt("CONTACT_MIN_SUBMIT_MS", 2500),
    maxSubmitMs: readInt("CONTACT_MAX_SUBMIT_MS", 1000 * 60 * 60 * 12),
    maxBodyBytes: readInt("CONTACT_MAX_BODY_BYTES", 32_768),
    upstashUrl: read("UPSTASH_REDIS_REST_URL").replace(/\/$/, ""),
    upstashToken: read("UPSTASH_REDIS_REST_TOKEN"),
    dryRun: read("CONTACT_EMAIL_DRY_RUN") === "true",
    isProduction: process.env.NODE_ENV === "production",
  };
}

export function isEmailDeliveryConfigured() {
  const { resendApiKey, fromEmail, toEmail } = getContactServerConfig();
  return Boolean(resendApiKey && fromEmail && toEmail);
}

export function shouldDryRunEmail() {
  const config = getContactServerConfig();
  if (config.dryRun) {
    return true;
  }

  return !config.isProduction && !isEmailDeliveryConfigured();
}
