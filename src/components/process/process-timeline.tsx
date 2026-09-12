"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { AnchorLink } from "@/components/navigation/anchor-link";
import { processIcons } from "@/components/process/icons";
import {
  ProcessJourney,
  ProcessRail,
  ProcessStepStill,
} from "@/components/process/process-visual";
import { buttonVariants } from "@/components/ui/button";
import { processContent, processStepLabel, processSteps } from "@/data/process";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useScrollChoreography } from "@/hooks/use-scroll-choreography";
import { defaultEase, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";

const lastIndex = processSteps.length - 1;

export function ProcessTimeline() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <>
      <div className="lg:hidden">
        <VerticalProcess />
      </div>
      <div className="hidden lg:block">
        {reduceMotion ? <VerticalProcess /> : <PinnedProcess />}
      </div>
    </>
  );
}

function PinnedProcess() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { progress, activeIndex, scrollToIndex } = useScrollChoreography(
    trackRef,
    { steps: processSteps.length, mode: "floor" },
  );

  const step = processSteps[activeIndex] ?? processSteps[0];
  const isLast = activeIndex === lastIndex;

  return (
    <div ref={trackRef} className="relative h-[420svh]">
      <div className="sticky top-0 flex min-h-svh flex-col justify-center overflow-hidden pt-[var(--header-height)] pb-6">
        <Container className="relative flex flex-col gap-6 lg:gap-8">
          <ProcessHeading />

          <ProcessJourney activeIndex={activeIndex} />

          <ProcessRail
            activeIndex={activeIndex}
            progress={progress}
            onSelect={scrollToIndex}
          />

          <div className="min-h-[6.25rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: duration.base, ease: defaultEase }}
              >
                <p className="font-mono text-caption text-teal tabular-nums">
                  {processStepLabel(step)}
                </p>
                <h3 className="mt-3 font-heading text-headline text-navy">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xl text-body text-blue-gray sm:text-body-lg">
                  {step.summary}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {isLast ? (
            <div className="min-h-12">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: duration.base, ease: defaultEase }}
                >
                  <StartProjectCta />
                </motion.div>
              </AnimatePresence>
            </div>
          ) : null}
        </Container>
      </div>
    </div>
  );
}

function ProcessHeading() {
  return (
    <SectionHeading
      prefix={processContent.headingPrefix}
      accent={processContent.headingAccent}
      className="lg:max-w-3xl"
    />
  );
}

function VerticalProcess() {
  const listRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.72", "end 0.48"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    mass: 0.35,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(
      lastIndex,
      Math.max(0, Math.round(value * lastIndex)),
    );
    setActiveIndex((current) => (current === next ? current : next));
  });

  return (
    <div className="relative overflow-hidden py-section">
      <Container className="relative flex flex-col gap-8">
        <ProcessHeading />
        <div ref={listRef} className="relative">
          <div
            aria-hidden
            className="absolute top-5 bottom-5 left-[21px] w-px bg-navy/12"
          />
          <motion.div
            aria-hidden
            className="absolute top-5 left-[21px] w-px origin-top bg-gradient-to-b from-teal to-cyan"
            style={{
              height: "calc(100% - 2.5rem)",
              scaleY: reduceMotion ? 1 : progress,
            }}
          />
          <ol
            className="relative flex flex-col"
            aria-label={processContent.stepsLabel}
          >
            {processSteps.map((step, index) => {
              const active = index === activeIndex;
              const complete = index < activeIndex;
              const Icon = processIcons[step.slug] ?? processIcons.discover;

              return (
                <li
                  key={step.slug}
                  className="relative grid grid-cols-[44px_minmax(0,1fr)] gap-4 pt-3 pb-6 first:pt-0 last:pb-0 sm:gap-5 sm:pb-8"
                >
                  <span
                    className={cn(
                      "relative z-10 mt-0.5 flex size-11 items-center justify-center rounded-full border transition-[border-color,background-color,color,box-shadow] duration-300",
                      active &&
                        "border-teal bg-teal text-white shadow-[0_0_0_4px_color-mix(in_oklch,var(--navy)_8%,transparent)]",
                      complete &&
                        !active &&
                        "border-navy/20 bg-navy/[0.05] text-navy",
                      !active &&
                        !complete &&
                        "border-navy/20 bg-surface text-navy/45",
                    )}
                  >
                    <Icon className="size-4" strokeWidth={1.7} aria-hidden />
                  </span>
                  <div className="min-w-0 pt-1.5">
                    <p
                      className={cn(
                        "font-mono text-caption tabular-nums",
                        active ? "text-teal" : "text-navy/35",
                      )}
                    >
                      {step.number}
                    </p>
                    <h3
                      className={cn(
                        "mt-1 font-heading text-title transition-colors duration-300",
                        active ? "text-navy" : "text-navy/70",
                      )}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-md text-body text-blue-gray">
                      {step.summary}
                    </p>
                    <ProcessStepStill slug={step.slug} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
        <StartProjectCta />
      </Container>
    </div>
  );
}

function StartProjectCta() {
  return (
    <AnchorLink
      href={processContent.cta.href}
      className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}
    >
      {processContent.cta.label}
      <ArrowRight data-icon="inline-end" aria-hidden />
    </AnchorLink>
  );
}
