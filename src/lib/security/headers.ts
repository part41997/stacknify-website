function cspValue() {
  const isDev = process.env.NODE_ENV !== "production";
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    isDev ? "'unsafe-eval'" : "",
    "https://challenges.cloudflare.com",
    "https://plausible.io",
    "https://*.plausible.io",
    "https://cloud.umami.is",
    "https://cdn.usefathom.com",
  ]
    .filter(Boolean)
    .join(" ");

  const connectSrc = [
    "'self'",
    isDev ? "ws:" : "",
    isDev ? "http://localhost:*" : "",
    isDev ? "http://127.0.0.1:*" : "",
    "https://challenges.cloudflare.com",
    "https://plausible.io",
    "https://*.plausible.io",
    "https://cloud.umami.is",
    "https://api-gateway.umami.dev",
    "https://cdn.usefathom.com",
  ]
    .filter(Boolean)
    .join(" ");

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    `connect-src ${connectSrc}`,
    "frame-src https://challenges.cloudflare.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export function securityHeaders() {
  return [
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=()",
    },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "X-DNS-Prefetch-Control", value: "off" },
    { key: "Content-Security-Policy", value: cspValue() },
    ...(process.env.NODE_ENV === "production"
      ? [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ]
      : []),
  ];
}
