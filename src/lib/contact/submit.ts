import { contactContent } from "@/data/contact";
import { getContactServerConfig } from "@/lib/contact/config";
import { deliverInquiry, notifyWebhook } from "@/lib/contact/email";
import {
  fingerprint,
  logContactEvent,
  type ContactLogEvent,
} from "@/lib/contact/logger";
import { consumeRateLimit, getClientIp } from "@/lib/contact/rate-limit";
import {
  isAllowedOrigin,
  isJsonContentType,
  readJsonBody,
} from "@/lib/contact/request";
import {
  sanitizeMultiline,
  sanitizeOptionalText,
  sanitizeText,
} from "@/lib/contact/sanitize";
import { verifyTurnstile } from "@/lib/contact/turnstile";
import { contactSchema, type ContactPayload } from "@/lib/validations";

export type ContactSubmitResult = {
  status: number;
  body: { ok: true } | { ok: false; error: string };
  headers?: Record<string, string>;
};

function deliveryErrorMessage(reason: string) {
  if (reason === "email_not_configured") {
    return "Email is not connected on the server. Confirm RESEND_API_KEY, CONTACT_FROM_EMAIL, and CONTACT_TO_EMAIL, then restart the Node.js app.";
  }

  if (reason === "provider_unreachable") {
    return "The mail service could not be reached from the server. Check that outbound HTTPS to api.resend.com is allowed.";
  }

  if (reason.startsWith("provider_")) {
    return "The mail service rejected this send. In Resend, verify the stacknify.com domain and use that domain in CONTACT_FROM_EMAIL.";
  }

  return contactContent.form.unavailableMessage;
}

function jsonResult(
  status: number,
  body: ContactSubmitResult["body"],
  headers?: Record<string, string>,
): ContactSubmitResult {
  return { status, body, headers };
}

function rateLimitResponse(
  result: Exclude<
    Awaited<ReturnType<typeof consumeRateLimit>>,
    { unavailable: true }
  >,
) {
  const retryAfter = Math.max(
    1,
    Math.ceil((result.resetAt - Date.now()) / 1000),
  );

  return jsonResult(
    429,
    { ok: false, error: contactContent.form.rateLimitMessage },
    { "Retry-After": String(retryAfter) },
  );
}

export async function submitContactRequest(
  request: Request,
): Promise<ContactSubmitResult> {
  const started = Date.now();
  const requestId = crypto.randomUUID();
  const config = getContactServerConfig();
  const ip = getClientIp(request) || (config.isProduction ? "unknown" : "");
  const ipFingerprint = ip ? fingerprint(ip) : undefined;

  function log(
    outcome: ContactLogEvent["outcome"],
    reason?: string,
    service?: string,
  ) {
    logContactEvent({
      event: "contact.submit",
      requestId,
      outcome,
      reason,
      service,
      ipFingerprint,
      durationMs: Date.now() - started,
    });
  }

  if (request.method !== "POST") {
    log("forbidden", "method");
    return jsonResult(405, {
      ok: false,
      error: contactContent.errorMessage,
    });
  }

  if (!isAllowedOrigin(request)) {
    log("forbidden", "origin");
    return jsonResult(403, {
      ok: false,
      error: contactContent.errorMessage,
    });
  }

  if (!isJsonContentType(request)) {
    log("invalid", "payload");
    return jsonResult(400, {
      ok: false,
      error: "Please send a valid request.",
    });
  }

  if (ip) {
    const ipLimit = await consumeRateLimit(
      "ip",
      ip,
      config.rateLimitMax,
      config.rateLimitWindowSeconds,
    );

    if ("unavailable" in ipLimit) {
      log("unavailable", "rate_limit");
      return jsonResult(503, {
        ok: false,
        error: contactContent.form.unavailableMessage,
      });
    }

    if (!ipLimit.ok) {
      log("rate_limited", "ip");
      return rateLimitResponse(ipLimit);
    }
  }

  const parsedBody = await readJsonBody(request, config.maxBodyBytes);
  if (!parsedBody.ok) {
    log("invalid", parsedBody.reason);
    return jsonResult(parsedBody.reason === "too_large" ? 413 : 400, {
      ok: false,
      error: "Please send a valid request.",
    });
  }

  const parsed = contactSchema.safeParse(parsedBody.value);
  if (!parsed.success) {
    log("invalid", "schema");
    return jsonResult(400, {
      ok: false,
      error: "Please check the form and try again.",
    });
  }

  const { website, startedAt, turnstileToken, ...raw } = parsed.data;

  if (website?.trim()) {
    log("spam", "honeypot");
    return jsonResult(200, { ok: true });
  }

  const elapsed = Date.now() - startedAt;
  if (elapsed < config.minSubmitMs || elapsed > config.maxSubmitMs) {
    log("spam", elapsed < config.minSubmitMs ? "too_fast" : "too_slow");
    return jsonResult(200, { ok: true });
  }

  const turnstileConfigured = Boolean(
    config.turnstileSiteKey && config.turnstileSecret,
  );

  if (turnstileConfigured) {
    const verified = await verifyTurnstile(turnstileToken ?? "", ip);
    if (!verified) {
      log("forbidden", "turnstile");
      return jsonResult(400, {
        ok: false,
        error: contactContent.form.verificationMessage,
      });
    }
  }

  const inquiry: ContactPayload = {
    name: sanitizeText(raw.name, 80),
    email: sanitizeText(raw.email, 254).toLowerCase(),
    phone: sanitizeText(raw.phone, 32),
    company: sanitizeOptionalText(raw.company, 120),
    service: raw.service,
    budget: raw.budget,
    details: sanitizeMultiline(raw.details, 2000),
  };

  const emailLimit = await consumeRateLimit(
    "email",
    inquiry.email,
    config.emailRateLimitMax,
    config.rateLimitWindowSeconds,
  );

  if ("unavailable" in emailLimit) {
    log("unavailable", "rate_limit", inquiry.service);
    return jsonResult(503, {
      ok: false,
      error: contactContent.form.unavailableMessage,
    });
  }

  if (!emailLimit.ok) {
    log("rate_limited", "email", inquiry.service);
    return rateLimitResponse(emailLimit);
  }

  const delivered = await deliverInquiry(inquiry);
  if (!delivered.ok) {
    log("unavailable", delivered.reason, inquiry.service);
    return jsonResult(503, {
      ok: false,
      error: deliveryErrorMessage(delivered.reason),
    });
  }

  const webhook = await notifyWebhook(inquiry);
  if (!webhook.ok) {
    log("error", "webhook", inquiry.service);
  }

  log(delivered.dryRun ? "dry_run" : "accepted", undefined, inquiry.service);
  return jsonResult(200, { ok: true });
}
