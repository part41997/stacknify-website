"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type StatValueProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  size?: "title" | "display";
};

export function StatValue({
  value,
  prefix,
  suffix,
  size = "title",
}: StatValueProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = usePrefersReducedMotion();
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (!isInView || reduceMotion) {
      return;
    }

    const control = animate(motionValue, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => control.stop();
  }, [isInView, motionValue, reduceMotion, value]);

  return (
    <span
      ref={ref}
      className={
        size === "display"
          ? "font-heading text-headline tracking-tight text-navy tabular-nums"
          : "font-heading text-title tracking-tight text-navy tabular-nums"
      }
    >
      {prefix}
      {reduceMotion ? value : <motion.span>{rounded}</motion.span>}
      {suffix}
    </span>
  );
}
