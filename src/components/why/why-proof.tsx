"use client";

import { DrawLine } from "@/components/animations/draw-line";
import { FadeIn } from "@/components/animations/fade-in";
import { WhyConstellation } from "@/components/why/why-constellation";
import { StatValue } from "@/components/sections/stat-value";
import {
  isConfiguredMetric,
  isVisibleMetric,
  whyMetrics,
} from "@/data/why";

const visibleMetrics = whyMetrics.filter(isVisibleMetric);

export function WhyProof() {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <FadeIn variant="scale">
        <WhyConstellation />
      </FadeIn>
      {visibleMetrics.length > 0 ? <WhyProofLedger /> : null}
    </div>
  );
}

function WhyProofLedger() {
  return (
    <FadeIn>
      <div className="flex flex-col gap-6">
        <DrawLine />
        <ul className="flex flex-wrap items-end gap-x-10 gap-y-6 sm:gap-x-14">
          {visibleMetrics.map((metric) => (
            <li key={metric.id} className="flex min-w-[7.5rem] flex-col gap-1.5">
              {isConfiguredMetric(metric) ? (
                <StatValue
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  size="display"
                />
              ) : (
                <span className="font-heading text-headline tracking-tight text-navy/35">
                  {metric.placeholder}
                </span>
              )}
              <p className="max-w-[9rem] text-caption text-muted-foreground">
                {metric.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  );
}
