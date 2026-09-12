"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { AnchorLink } from "@/components/navigation/anchor-link";
import { HeroHeadline } from "@/components/sections/hero-headline";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { defaultEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function HeroIntro() {
  const { hero } = siteConfig;
  const reduceMotion = usePrefersReducedMotion();

  const fade = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 0.62,
      delay: reduceMotion ? 0 : delay,
      ease: defaultEase,
    },
  });

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
      <motion.div className="flex items-center gap-3" {...fade(0.06)}>
        <span aria-hidden className="h-px w-8 bg-navy/20" />
        <p className="text-overline text-text-muted">{hero.eyebrow}</p>
        <span aria-hidden className="h-px w-8 bg-navy/20" />
      </motion.div>

      <HeroHeadline lines={hero.headline} />

      <motion.p
        className="mt-5 max-w-xl text-body text-text-secondary sm:mt-6 sm:text-body-lg"
        {...fade(0.52)}
      >
        {hero.description}
      </motion.p>

      <motion.div
        className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row"
        {...fade(0.64)}
      >
        <AnchorLink
          href={hero.primaryCta.href}
          className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
        >
          {hero.primaryCta.label}
          <ArrowRight data-icon="inline-end" />
        </AnchorLink>
        <AnchorLink
          href={hero.secondaryCta.href}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "w-full sm:w-auto",
          )}
        >
          {hero.secondaryCta.label}
          <ArrowRight data-icon="inline-end" />
        </AnchorLink>
      </motion.div>
    </div>
  );
}
