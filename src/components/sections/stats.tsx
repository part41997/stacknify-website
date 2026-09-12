"use client";

import { Award, FolderCheck, Star, Users, type LucideIcon } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { StatValue } from "@/components/sections/stat-value";
import { proofStats, statsContent } from "@/data/stats";
import { isConfiguredMetric } from "@/data/why";

const icons: Record<string, LucideIcon> = {
  awards: Award,
  clients: Users,
  projects: FolderCheck,
  reviews: Star,
};

export function Stats() {
  return (
    <Section
      id="results"
      spacing="compact"
      className="relative overflow-hidden bg-background-soft"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 site-grid opacity-[0.35]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_srgb,var(--brand-mint)_28%,transparent),transparent_62%)]"
      />

      <Container width="wide" className="relative">
        <Stagger
          as="ul"
          aria-label={statsContent.label}
          className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4 lg:gap-6"
        >
          {proofStats.map((stat) => {
            const Icon = icons[stat.id] ?? Award;

            return (
              <StaggerItem key={stat.id} as="li">
                <div className="flex flex-col items-center text-center">
                  <span className="flex size-16 items-center justify-center rounded-full bg-teal text-white shadow-[0_16px_32px_-18px_color-mix(in_srgb,var(--brand-teal)_55%,transparent)]">
                    <Icon className="size-7" strokeWidth={1.6} aria-hidden />
                  </span>
                  <p className="mt-4 text-small text-navy">{stat.label}</p>
                  {isConfiguredMetric(stat) ? (
                    <StatValue
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      size="display"
                    />
                  ) : null}
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
