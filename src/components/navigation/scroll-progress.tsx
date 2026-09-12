"use client";

import { motion, useScroll, useSpring } from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function ScrollProgress() {
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 400 : 140,
    damping: reduceMotion ? 40 : 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px origin-left bg-brand-teal/70"
      style={{ scaleX }}
    />
  );
}
