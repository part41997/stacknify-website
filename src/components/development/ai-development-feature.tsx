"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { FadeIn } from "@/components/animations/fade-in";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { DevWorkspace } from "@/components/development/dev-workspace";
import { SectionHeading } from "@/components/layout/section-heading";
import { AnchorLink } from "@/components/navigation/anchor-link";
import { buttonVariants } from "@/components/ui/button";
import {
  aiDevelopmentCapabilities,
  aiDevelopmentContent,
  type DevPanelId,
} from "@/data/ai-development";
import { cn } from "@/lib/utils";

export function AiDevelopmentFeature() {
  const [activePanel, setActivePanel] = useState<DevPanelId | null>(null);

  return (
    <div className="grid items-start gap-8 pt-section-sm pb-section-md lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] lg:gap-12 xl:gap-14">
      <FadeIn className="order-2 lg:order-1" variant="scale">
        <DevWorkspace
          activePanel={activePanel}
          className="aspect-[4/5] w-full lg:aspect-[5/6]"
        />
      </FadeIn>

      <div className="order-1 lg:order-2">
        <SectionHeading
          eyebrow={aiDevelopmentContent.eyebrow}
          prefix={aiDevelopmentContent.headingPrefix}
          accent={aiDevelopmentContent.headingAccent}
          description={aiDevelopmentContent.description}
          className="max-w-xl"
        />

        <Stagger
          as="ul"
          delay={0.08}
          aria-label={aiDevelopmentContent.categoriesLabel}
          className="mt-8 flex flex-col border-t border-border"
        >
          {aiDevelopmentCapabilities.map((item, index) => {
            const active = activePanel === item.panel;

            return (
              <StaggerItem key={item.slug} as="li">
                <button
                  type="button"
                  onMouseEnter={() => setActivePanel(item.panel)}
                  onFocus={() => setActivePanel(item.panel)}
                  onMouseLeave={() => setActivePanel(null)}
                  onBlur={() => setActivePanel(null)}
                  className={cn(
                    "group/capability flex w-full items-start gap-4 border-b border-border py-4 text-left outline-none",
                    "focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-caption tabular-nums transition-colors duration-200",
                      active
                        ? "text-brand-teal"
                        : "text-text-muted group-hover/capability:text-brand-teal",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "font-heading text-[1.0625rem] tracking-[-0.02em] text-text-primary transition-transform duration-200 motion-safe:group-hover/capability:-translate-y-px",
                        active && "text-navy",
                      )}
                    >
                      {item.title}
                    </p>
                    <p className="mt-1 text-small text-text-secondary">
                      {item.summary}
                    </p>
                  </div>
                </button>
              </StaggerItem>
            );
          })}
        </Stagger>

        <FadeIn delay={0.16} className="mt-7">
          <AnchorLink
            href={aiDevelopmentContent.cta.href}
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
          >
            {aiDevelopmentContent.cta.label}
            <ArrowRight data-icon="inline-end" />
          </AnchorLink>
        </FadeIn>
      </div>
    </div>
  );
}
