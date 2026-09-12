"use client";

import { motion } from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { defaultEase, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";

type HeroHeadlineProps = {
  lines: readonly string[];
};

export function HeroHeadline({ lines }: HeroHeadlineProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <h1 className="mt-4 text-center font-heading text-text-primary sm:mt-5">
      {lines.map((line, lineIndex) => {
        const words = line.trim().split(/\s+/);
        const last = words.at(-1) ?? "";
        const lead = words.slice(0, -1).join(" ");

        return (
          <span
            key={line}
            className={cn(
              "block overflow-hidden pb-[0.06em]",
              lineIndex === 0
                ? "text-display"
                : "text-headline text-navy/80",
            )}
          >
            <motion.span
              className="block"
              initial={reduceMotion ? false : { y: "108%" }}
              animate={{ y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : duration.enter,
                delay: reduceMotion ? 0 : 0.14 + lineIndex * 0.12,
                ease: defaultEase,
              }}
            >
              {lead ? `${lead} ` : null}
              <span>{last}</span>
            </motion.span>
          </span>
        );
      })}
    </h1>
  );
}
