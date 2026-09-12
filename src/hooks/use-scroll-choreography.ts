"use client";

import { useMotionValue } from "framer-motion";
import { useEffect, useState, type RefObject } from "react";

import { getGsap } from "@/lib/gsap";

type UseScrollChoreographyOptions = {
  enabled?: boolean;
  steps: number;
  /** `round` for journeys, `floor` when each step owns an equal scroll slice. */
  mode?: "round" | "floor";
  start?: string;
  end?: string;
  scrub?: number | boolean;
};

export function useScrollChoreography(
  ref: RefObject<HTMLElement | null>,
  {
    enabled = true,
    steps,
    mode = "round",
    start = "top top",
    end = "bottom bottom",
    scrub = 0.65,
  }: UseScrollChoreographyOptions,
) {
  const progress = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndex = Math.max(0, steps - 1);

  useEffect(() => {
    const triggerEl = ref.current;
    if (!enabled || !triggerEl || steps < 1) {
      return;
    }

    const { ScrollTrigger } = getGsap();

    const apply = (raw: number) => {
      const value = Math.min(1, Math.max(0, raw));
      progress.set(value);

      const next =
        mode === "floor"
          ? Math.min(lastIndex, Math.floor(Math.min(0.9999, value) * steps))
          : Math.min(lastIndex, Math.round(value * lastIndex));

      setActiveIndex((current) => (current === next ? current : next));
    };

    const trigger = ScrollTrigger.create({
      trigger: triggerEl,
      start,
      end,
      scrub,
      onUpdate: (self) => {
        apply(self.progress);
      },
    });

    apply(trigger.progress);

    const frame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      apply(trigger.progress);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      trigger.kill();
    };
  }, [enabled, end, lastIndex, mode, progress, ref, scrub, start, steps]);

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
