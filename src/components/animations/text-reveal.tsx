"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { defaultEase, duration, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function TextReveal({
  children,
  className,
  delay = 0,
}: TextRevealProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.span
      className={cn("block overflow-hidden", className)}
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={viewportOnce}
      variants={{ hidden: {}, visible: {} }}
    >
      <motion.span
        className="block"
        variants={{
          hidden: { y: "108%" },
          visible: { y: 0 },
        }}
        transition={{
          duration: reduceMotion ? 0 : duration.reveal,
          delay: reduceMotion ? 0 : delay,
          ease: defaultEase,
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
