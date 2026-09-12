"use client";

import { ArrowRight } from "lucide-react";

import { FadeIn } from "@/components/animations/fade-in";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { SectionHeading } from "@/components/layout/section-heading";
import { AnchorLink } from "@/components/navigation/anchor-link";
import { AiOperatingVisual } from "@/components/solutions/ai-operating-visual";
import { buttonVariants } from "@/components/ui/button";
import { solutionCapabilities, solutionsContent } from "@/data/solutions";
import { cn } from "@/lib/utils";

export function AiFeature() {
  return (
    <div className="grid items-start gap-8 pt-8 pb-section-sm sm:pt-10 lg:grid-cols-[minmax(0,1.28fr)_minmax(0,0.72fr)] lg:gap-12 lg:pt-10 xl:gap-14">
      <div className="order-2 lg:order-1">
        <AiOperatingVisual />
      </div>

      <div className="order-1 lg:order-2">
        <SectionHeading
          eyebrow={solutionsContent.eyebrow}
          prefix={solutionsContent.headingPrefix}
          accent={solutionsContent.headingAccent}
          accentTone="teal"
          reveal
          description={solutionsContent.description}
          className="max-w-xl"
        />

        <Stagger as="ul" delay={0.08} className="mt-6 flex flex-col border-t border-border">
          {solutionCapabilities.map((item, index) => (
            <StaggerItem key={item.slug} as="li">
              <div className="group/capability flex items-start gap-4 border-b border-border py-4">
                <span className="font-mono text-caption text-text-muted tabular-nums transition-colors duration-200 group-hover/capability:text-brand-teal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="font-heading text-[1.0625rem] tracking-[-0.02em] text-text-primary transition-transform duration-200 motion-safe:group-hover/capability:-translate-y-px">
                    {item.title}
                  </p>
                  <p className="mt-1 text-small text-text-secondary">{item.summary}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn delay={0.16} className="mt-7">
          <AnchorLink
            href={solutionsContent.cta.href}
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
          >
            {solutionsContent.cta.label}
            <ArrowRight data-icon="inline-end" />
          </AnchorLink>
        </FadeIn>
      </div>
    </div>
  );
}
