"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { getHash, navigateToHash } from "@/lib/navigation";

function isModifiedClick(event: MouseEvent) {
  return (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

export function HashScroll() {
  const pathname = usePathname();
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) {
      return;
    }

    const timeout = window.setTimeout(() => {
      const target = document.getElementById(hash);
      if (!target) {
        return;
      }

      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }, 80);

    return () => window.clearTimeout(timeout);
  }, [pathname, reduceMotion]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (isModifiedClick(event)) {
        return;
      }

      const target = (event.target as Element | null)?.closest("a");
      if (!(target instanceof HTMLAnchorElement)) {
        return;
      }

      if (target.target === "_blank" || target.hasAttribute("download")) {
        return;
      }

      const href = target.getAttribute("href");
      if (!href || !getHash(href)) {
        return;
      }

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) {
        return;
      }

      if (navigateToHash(`${url.pathname}${url.hash}`, reduceMotion)) {
        event.preventDefault();
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reduceMotion]);

  return null;
}
