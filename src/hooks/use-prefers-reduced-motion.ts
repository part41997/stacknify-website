"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { media } from "@/lib/design";

export function usePrefersReducedMotion() {
  return useMediaQuery(media.reducedMotion);
}
