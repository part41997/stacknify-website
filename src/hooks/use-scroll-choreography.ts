"use client";

import { useMotionValue, useSpring } from "framer-motion";
import { useLayoutEffect, useState, type RefObject } from "react";

type UseScrollChoreographyOptions = {
  enabled?: boolean;
  steps: number;
  /** `round` for journeys, `floor` when each step owns an equal scroll slice. */
  mode?: "round" | "floor";
  start?: string;
  end?: string;
  scrub?: number | boolean;
};

function indexFromProgress(
  value: number,
  steps: number,
  mode: "round" | "floor",
) {
  const lastIndex = Math.max(0, steps - 1);
  const clamped = Math.min(1, Math.max(0, value));

  if (mode === "floor") {
    return Math.min(lastIndex, Math.floor(Math.min(0.9999, clamped) * steps));
  }

  return Math.min(lastIndex, Math.round(clamped * lastIndex));
}

function progressFromTrack(triggerEl: HTMLElement) {
  const distance = triggerEl.offsetHeight - window.innerHeight;
  if (distance <= 0) {
    return triggerEl.getBoundingClientRect().top <= 0 ? 1 : 0;
  }

  return Math.min(1, Math.max(0, -triggerEl.getBoundingClientRect().top / distance));
}

export function useScrollChoreography(
  ref: RefObject<HTMLElement | null>,
  {
    enabled = true,
    steps,
    mode = "round",
    scrub = 0.65,
  }: UseScrollChoreographyOptions,
) {
  const lastIndex = Math.max(0, steps - 1);
  const [activeIndex, setActiveIndex] = useState(0);
  const rawProgress = useMotionValue(0);
  const progress = useSpring(rawProgress, {
    stiffness: scrub === false ? 400 : 80,
    damping: scrub === false ? 40 : 28,
    mass: 0.35,
    restDelta: 0.001,
  });

  useLayoutEffect(() => {
    if (!enabled || steps < 1) {
      return;
    }

    let observer: ResizeObserver | undefined;
    let frame = 0;

    const apply = () => {
      const triggerEl = ref.current;
      if (!triggerEl) {
        return;
      }

      const value = progressFromTrack(triggerEl);
      rawProgress.set(value);
      const next = indexFromProgress(value, steps, mode);
      setActiveIndex((current) => (current === next ? current : next));
    };

    const observe = () => {
      const triggerEl = ref.current;
      if (!triggerEl) {
        frame = window.requestAnimationFrame(observe);
        return;
      }

      observer?.disconnect();
      observer = new ResizeObserver(apply);
      observer.observe(triggerEl);
      apply();
    };

    apply();
    observe();
    window.addEventListener("scroll", apply, { passive: true });
    document.addEventListener("scroll", apply, { passive: true, capture: true });
    window.addEventListener("resize", apply);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", apply);
      document.removeEventListener("scroll", apply, { capture: true });
      window.removeEventListener("resize", apply);
      observer?.disconnect();
    };
  }, [enabled, mode, rawProgress, ref, steps]);

  const scrollToIndex = (index: number) => {
    const triggerEl = ref.current;
    if (!triggerEl || lastIndex === 0) {
      return;
    }

    const startY = window.scrollY + triggerEl.getBoundingClientRect().top;
    const distance = Math.max(0, triggerEl.offsetHeight - window.innerHeight);
    const ratio = mode === "floor" ? index / steps : index / lastIndex;

    window.scrollTo({
      top: startY + ratio * distance + (mode === "floor" ? 8 : 0),
      behavior: "smooth",
    });
  };

  return { progress, activeIndex, scrollToIndex };
}
