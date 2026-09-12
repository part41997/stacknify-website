import { siteConfig } from "@/data/site";
import { brandColors } from "@/lib/colors";
import {
  getContactServerConfig,
  isEmailDeliveryConfigured,
  shouldDryRunEmail,
} from "@/lib/contact/config";
import { escapeHtml, stripHeaderBreaks } from "@/lib/contact/sanitize";
import { isSafeHttpsUrl } from "@/lib/security/urls";
import type { ContactPayload } from "@/lib/validations";

function inquiryText(inquiry: ContactPayload) {
  const company = inquiry.company ? inquiry.company : "Not provided";

  return [
    `New project inquiry from ${siteConfig.name}`,
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
    `Company: ${company}`,
    `Service: ${inquiry.service}`,
    `Budget: ${inquiry.budget}`,
    "",
    "Project details:",
    inquiry.details,
  ].join("\n");
}

function inquiryHtml(inquiry: ContactPayload) {
  const rows: Array<[string, string]> = [
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Phone", inquiry.phone],
    ["Company", inquiry.company ?? "Not provided"],
    ["Service", inquiry.service],
    ["Budget", inquiry.budget],
  ];

  const detailHtml = escapeHtml(inquiry.details).replaceAll("\n", "<br />");

  return `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.5;color:${brandColors.navy}">
      <h1 style="font-size:18px">New project inquiry from ${escapeHtml(siteConfig.name)}</h1>
      <table style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="padding:6px 16px 6px 0;color:${brandColors.blueGray};vertical-align:top">${escapeHtml(label)}</td>
                <td style="padding:6px 0;vertical-align:top">${escapeHtml(value)}</td>
              </tr>
            `,
          )
          .join("")}
      </table>
      <h2 style="font-size:16px;margin-top:24px">Project details</h2>
      <p>${detailHtml}</p>
    </div>
  `;
}

export async function deliverInquiry(inquiry: ContactPayload) {
  if (shouldDryRunEmail()) {
    return { ok: true as const, dryRun: true as const };
  }

  if (!isEmailDeliveryConfigured()) {
    return { ok: false as const, reason: "email_not_configured" };
  }

  const { resendApiKey, fromEmail, toEmail } = getContactServerConfig();
  const subject = stripHeaderBreaks(
    `New inquiry: ${inquiry.service} — ${inquiry.name}`,
  ).slice(0, 140);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: stripHeaderBreaks(inquiry.email),
        subject,
        text: inquiryText(inquiry),
        html: inquiryHtml(inquiry),
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return { ok: false as const, reason: `provider_${response.status}` };
    }

    return { ok: true as const, dryRun: false as const };
  } catch {
    return { ok: false as const, reason: "provider_unreachable" };
  }
}

export async function notifyWebhook(inquiry: ContactPayload) {
  const { webhookUrl } = getContactServerConfig();
  if (!webhookUrl) {
    return { ok: true as const, skipped: true as const };
  }

  if (!isSafeHttpsUrl(webhookUrl)) {
    return { ok: true as const, skipped: true as const };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inquiry),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return { ok: false as const, skipped: false as const };
    }

    return { ok: true as const, skipped: false as const };
  } catch {
    return { ok: false as const, skipped: false as const };
  }
}
