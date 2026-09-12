import { getAnalyticsConfig } from "@/lib/analytics/config";
import type { AnalyticsEvent, AnalyticsProps } from "@/lib/analytics/events";

type QueuedCall =
  | { kind: "pageview"; path: string }
  | { kind: "event"; name: AnalyticsEvent; path?: string };

type UmamiTracker = {
  track: {
    (): void;
    (eventName: string, data?: Record<string, string>): void;
    (payload: (data: Record<string, unknown>) => Record<string, unknown>): void;
  };
};

type AnalyticsGlobals = Window & {
  plausible?: (
    event: string,
    options?: { u?: string; props?: Record<string, string> },
  ) => void;
  umami?: UmamiTracker;
  fathom?: {
    trackPageview: (options?: { url?: string }) => void;
    trackEvent: (name: string) => void;
  };
};

const queue: QueuedCall[] = [];
let scriptReady = false;

function analyticsWindow() {
  return window as AnalyticsGlobals;
}

export function hasPrivacyOptOut() {
  const config = getAnalyticsConfig();
  if (!config?.respectPrivacy || typeof navigator === "undefined") {
    return false;
  }

  const navigatorWithPrivacy = navigator as Navigator & {
    globalPrivacyControl?: boolean;
  };

  if (navigatorWithPrivacy.globalPrivacyControl === true) {
    return true;
  }

  return navigator.doNotTrack === "1" || navigator.doNotTrack === "yes";
}

export function isAnalyticsEnabled() {
  return getAnalyticsConfig() !== null && !hasPrivacyOptOut();
}

function currentPath() {
  return window.location.pathname;
}

function send(call: QueuedCall) {
  const config = getAnalyticsConfig();
  if (!config) {
    return;
  }

  const w = analyticsWindow();

  if (config.provider === "plausible" && w.plausible) {
    if (call.kind === "pageview") {
      w.plausible("pageview", {
        u: `${window.location.origin}${call.path}`,
      });
      return;
    }

    w.plausible(call.name);
    return;
  }

  if (config.provider === "umami" && w.umami?.track) {
    if (call.kind === "pageview") {
      w.umami.track((payload) => ({ ...payload, url: call.path }));
      return;
    }

    w.umami.track(call.name);
    return;
  }

  if (config.provider === "fathom" && w.fathom) {
    if (call.kind === "pageview") {
      w.fathom.trackPageview({ url: call.path });
      return;
    }

    w.fathom.trackEvent(call.name);
  }
}

function enqueue(call: QueuedCall) {
  if (!isAnalyticsEnabled()) {
    return;
  }

  if (!scriptReady) {
    queue.push(call);
    return;
  }

  send(call);
}

export function markAnalyticsReady() {
  if (!isAnalyticsEnabled()) {
    return;
  }

  scriptReady = true;
  while (queue.length > 0) {
    const next = queue.shift();
    if (next) {
      send(next);
    }
  }
}

export function trackPageView(path = currentPath()) {
  enqueue({ kind: "pageview", path });
}

export function track(event: AnalyticsEvent, props?: AnalyticsProps) {
  enqueue({
    kind: "event",
    name: event,
    path: props?.path,
  });
}
