const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export function sanitizeText(value: string, maxLength: number) {
  return value
    .replace(CONTROL_CHARS, "")
    .replace(/\r\n/g, "\n")
    .replace(/[^\S\n]+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function sanitizeOptionalText(
  value: string | undefined,
  maxLength: number,
) {
  const sanitized = sanitizeText(value ?? "", maxLength);
  return sanitized.length > 0 ? sanitized : undefined;
}

export function sanitizeMultiline(value: string, maxLength: number) {
  return value
    .replace(CONTROL_CHARS, "")
    .replace(/\r\n/g, "\n")
    .replace(/[^\S\n]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, maxLength);
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function stripHeaderBreaks(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}
