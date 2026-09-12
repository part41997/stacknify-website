"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { media } from "@/lib/design";

/**
 * Desktop can run rich motion. Below `lg`, keep a simpler phone-first profile.
 * SSR treats the viewport as compact so the first paint matches mobile.
 */
export function useMotionProfile() {
  const reduceMotion = usePrefersReducedMotion();
  const isDesktop = useMediaQuery(media.lg);
  const canHover = useMediaQuery(media.hoverFine);

  return {
    reduceMotion,
    isDesktop,
    canHover,
    allowAmbient: isDesktop && !reduceMotion,
    allowParallax: isDesktop && canHover && !reduceMotion,
    allowHover: isDesktop && canHover,
  };
}
