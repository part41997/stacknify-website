"use client";

import { motion } from "framer-motion";
import { useId } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { defaultEase, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type DrawLineProps = {
  className?: string;
  delay?: number;
};

export function DrawLine({ className, delay = 0 }: DrawLineProps) {
  const reduceMotion = usePrefersReducedMotion();
  const strokeId = useId().replace(/:/g, "");

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 1"
      preserveAspectRatio="none"
      className={cn("pointer-events-none h-px w-full", className)}
    >
      <defs>
        <linearGradient id={strokeId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--navy)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--navy)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0 0.5 H100"
        fill="none"
        stroke={`url(#${strokeId})`}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0.35 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={viewportOnce}
        transition={{
          duration: reduceMotion ? 0 : 1.1,
          delay: reduceMotion ? 0 : delay,
          ease: defaultEase,
        }}
      />
    </svg>
  );
}
