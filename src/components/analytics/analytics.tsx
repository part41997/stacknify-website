"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";

import { isContactForm, resolveClickEvent } from "@/lib/analytics/capture";
import { getAnalyticsConfig } from "@/lib/analytics/config";
import {
  isAnalyticsEnabled,
  markAnalyticsReady,
  track,
  trackPageView,
} from "@/lib/analytics/client";
import { analyticsEvents } from "@/lib/analytics/events";

function subscribe() {
  return () => undefined;
}

export function Analytics() {
  const pathname = usePathname();
  const startedRef = useRef(false);
  const enabled = useSyncExternalStore(
    subscribe,
    isAnalyticsEnabled,
    () => false,
  );
  const config = getAnalyticsConfig();

  useEffect(() => {
    startedRef.current = false;
  }, [pathname]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    trackPageView();
  }, [enabled, pathname]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    function onClick(event: MouseEvent) {
      const name = resolveClickEvent(event.target);
      if (name) {
        track(name);
      }
    }

    function onFocusIn(event: FocusEvent) {
      if (!startedRef.current && isContactForm(event.target)) {
        startedRef.current = true;
        track(analyticsEvents.contactFormStart);
      }
    }

    function onSubmit(event: SubmitEvent) {
      if (isContactForm(event.target)) {
        startedRef.current = false;
        track(analyticsEvents.contactFormSubmit);
      }
    }

    document.addEventListener("click", onClick);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("submit", onSubmit);

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("submit", onSubmit);
    };
  }, [enabled]);

  if (!enabled || !config) {
    return null;
  }

  return (
    <Script
      src={config.src}
      strategy="afterInteractive"
      data-domain={config.provider === "plausible" ? config.id : undefined}
      data-website-id={config.provider === "umami" ? config.id : undefined}
      data-auto-track={config.provider === "umami" ? "false" : undefined}
      data-site={config.provider === "fathom" ? config.id : undefined}
      data-auto={config.provider === "fathom" ? "false" : undefined}
      data-spa={config.provider === "fathom" ? "off" : undefined}
      onLoad={markAnalyticsReady}
    />
  );
}
