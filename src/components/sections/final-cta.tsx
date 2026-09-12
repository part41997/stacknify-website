"use client";

import { ArrowRight } from "lucide-react";

import { FadeIn } from "@/components/animations/fade-in";
import { FinalCtaVisual } from "@/components/cta/final-cta-visual";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AnchorLink } from "@/components/navigation/anchor-link";
import { buttonVariants } from "@/components/ui/button";
import { finalCtaContent } from "@/data/final-cta";
import { cn } from "@/lib/utils";

export function FinalCta() {
  return (
    <Section
      id="cta"
      spacing="none"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,color-mix(in_srgb,var(--brand-mint)_20%,white)_50%,#f8fafc_100%)]"
    >
      <Container width="wide" className="relative z-10 py-section-md">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-12 xl:gap-14">
          <FadeIn className="max-w-xl">
            <h2 className="font-heading text-headline text-navy sm:text-display">
              <span className="block">{finalCtaContent.lines[0]}</span>
              <span className="mt-1 block text-brand-teal">
                {finalCtaContent.lines[1]}
              </span>
            </h2>
            <p className="mt-4 max-w-md text-body text-text-secondary sm:mt-5 sm:text-body-lg">
              {finalCtaContent.description}
            </p>
            <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:items-center">
              <AnchorLink
                href={finalCtaContent.primary.href}
                className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
              >
                {finalCtaContent.primary.label}
                <ArrowRight data-icon="inline-end" />
              </AnchorLink>
              <AnchorLink
                href={finalCtaContent.secondary.href}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full sm:w-auto",
                )}
              >
                {finalCtaContent.secondary.label}
                <ArrowRight data-icon="inline-end" />
              </AnchorLink>
            </div>
          </FadeIn>

          <FadeIn delay={0.08} variant="scale">
            <FinalCtaVisual className="aspect-[4/5] w-full lg:aspect-[5/6]" />
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
