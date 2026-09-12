import { isSafeHttpsUrl } from "@/lib/security/urls";

export const analyticsProviders = ["plausible", "umami", "fathom"] as const;

export type AnalyticsProvider = (typeof analyticsProviders)[number];

export type AnalyticsConfig = {
  provider: AnalyticsProvider;
  id: string;
  src: string;
  respectPrivacy: boolean;
};

const defaultScriptSrc: Record<AnalyticsProvider, string> = {
  plausible: "https://plausible.io/js/script.manual.js",
  umami: "https://cloud.umami.is/script.js",
  fathom: "https://cdn.usefathom.com/script.js",
};

function read(name: string) {
  return process.env[name]?.trim() ?? "";
}

function isProvider(value: string): value is AnalyticsProvider {
  return analyticsProviders.includes(value as AnalyticsProvider);
}

export function getAnalyticsConfig(): AnalyticsConfig | null {
  const providerValue = read("NEXT_PUBLIC_ANALYTICS_PROVIDER").toLowerCase();
  const id = read("NEXT_PUBLIC_ANALYTICS_ID");

  if (!isProvider(providerValue) || !id) {
    return null;
  }

  const src =
    read("NEXT_PUBLIC_ANALYTICS_SRC") || defaultScriptSrc[providerValue];
  if (!isSafeHttpsUrl(src)) {
    return null;
  }

  return {
    provider: providerValue,
    id,
    src,
    respectPrivacy: read("NEXT_PUBLIC_ANALYTICS_RESPECT_DNT") !== "false",
  };
}

export function isAnalyticsConfigured() {
  return getAnalyticsConfig() !== null;
}
