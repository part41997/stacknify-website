import { ChevronDown } from "lucide-react";
import type { CSSProperties } from "react";

import { DrawLine } from "@/components/animations/draw-line";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AnchorLink } from "@/components/navigation/anchor-link";
import { HeroBackdrop } from "@/components/sections/hero-backdrop";
import { HeroIntro } from "@/components/sections/hero-intro";
import { siteConfig } from "@/data/site";

export function Hero() {
  const { hero } = siteConfig;

  return (
    <Section
      id="home"
      spacing="none"
      className="relative isolate flex min-h-[min(52rem,calc(100svh-var(--header-height)))] flex-col overflow-hidden"
    >
      <HeroBackdrop />

      <Container
        width="wide"
        className="relative z-10 flex flex-1 flex-col justify-center py-16 sm:py-20 lg:py-24"
      >
        <HeroIntro />
      </Container>

      <div className="relative z-10 flex justify-center pb-5 lg:pb-7">
        <AnchorLink
          href={hero.scrollHref}
          aria-label={hero.scrollAriaLabel}
          className="hero-enter group inline-flex min-h-11 flex-col items-center justify-center gap-2 text-text-muted transition-colors hover:text-navy"
          style={{ "--enter-delay": "0.8s" } as CSSProperties}
        >
          <span className="sr-only">{hero.scrollLabel}</span>
          <span
            aria-hidden
            className="h-9 w-px bg-navy/20 transition-colors group-hover:bg-navy/45"
          />
          <ChevronDown className="size-3.5" aria-hidden />
        </AnchorLink>
      </div>
      <DrawLine className="relative z-10 mt-auto" />
    </Section>
  );
}
