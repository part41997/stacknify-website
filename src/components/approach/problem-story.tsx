"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useId, useRef } from "react";

import { DrawLine } from "@/components/animations/draw-line";
import { ProblemSceneVisual } from "@/components/approach/problem-scene-visual";
import { problemsContent } from "@/data/problems";
import { useMotionProfile } from "@/hooks/use-motion-profile";
import { usePointerParallax } from "@/hooks/use-pointer-parallax";
import { cn } from "@/lib/utils";
import type { ProblemSolutionPair } from "@/types";

type ProblemStoryProps = {
  pair: ProblemSolutionPair;
  index: number;
};

export function ProblemStory({ pair, index }: ProblemStoryProps) {
  const ref = useRef<HTMLElement>(null);
  const { reduceMotion, isDesktop, allowParallax } = useMotionProfile();
  const parallax = usePointerParallax(allowParallax, 5);
  const local = useMotionValue(1);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.72", "end 0.42"],
  });
  const cinematic = isDesktop && !reduceMotion;
  const progress = cinematic ? scrollYProgress : local;
  const flipped = index % 2 === 1;

  const problemOpacity = useTransform(progress, [0, 0.22, 0.52], [1, 1, 0.38]);
  const solutionOpacity = useTransform(progress, [0.36, 0.62, 1], [0, 1, 1]);
  const solutionY = useTransform(progress, [0.36, 0.62], [16, 0]);
  const techOpacity = useTransform(progress, [0.58, 0.82], [0, 1]);
  const line = useTransform(progress, [0.2, 0.58], [0, 1]);

  return (
    <article
      ref={ref}
      aria-labelledby={`problem-story-${pair.slug}`}
      className={cn(
        "relative",
        cinematic && "lg:min-h-[118vh]",
      )}
    >
      <div
        className={cn(
          "grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-12 lg:gap-y-6 xl:gap-x-14",
          cinematic &&
            "lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:min-h-[calc(100svh-var(--header-height)-3rem)] lg:py-6",
        )}
      >
        <header
          className={cn(
            "relative max-w-xl overflow-x-clip",
            flipped ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-2 lg:row-start-1",
          )}
        >
          <p
            aria-hidden
            className="pointer-events-none absolute -top-4 right-0 hidden font-heading text-[5.5rem] leading-none text-navy/6 select-none lg:block lg:-top-10 lg:text-[7rem]"
          >
            {pair.number}
          </p>
          <p className="font-mono text-caption text-navy/40 tabular-nums">
            {pair.number}
          </p>
          <h3
            id={`problem-story-${pair.slug}`}
            className="mt-2 font-heading text-h3 text-text-primary sm:mt-3 sm:text-h2"
          >
            {pair.title}
          </h3>
          <DrawLine className="mt-3 max-w-40 sm:mt-4" />
        </header>

        <motion.div
          className={cn(
            flipped
              ? "lg:col-start-2 lg:row-span-2 lg:row-start-1"
              : "lg:col-start-1 lg:row-span-2 lg:row-start-1",
          )}
          onPointerMove={parallax.onPointerMove}
          onPointerLeave={parallax.onPointerLeave}
          style={{ x: parallax.x, y: parallax.y }}
        >
          <ProblemSceneVisual
            slug={pair.slug}
            progress={progress}
            className="aspect-[16/10] min-h-0 w-full sm:aspect-[5/4] sm:min-h-[22rem] lg:aspect-[4/5] lg:min-h-[min(36rem,calc(100svh-var(--header-height)-3.5rem))]"
          />
        </motion.div>

        <div
          className={cn(
            "relative max-w-xl overflow-x-clip",
            flipped ? "lg:col-start-1 lg:row-start-2" : "lg:col-start-2 lg:row-start-2",
          )}
        >
          <motion.div style={cinematic ? { opacity: problemOpacity } : undefined}>
            <p className="text-overline text-text-muted uppercase">
              {problemsContent.problemLabel}
            </p>
            <p className="mt-2 font-heading text-[1.2rem] leading-snug tracking-[-0.03em] text-text-primary sm:mt-3 sm:text-[1.35rem] sm:text-h3">
              {pair.problem}
            </p>
          </motion.div>

          <StoryLine progress={line} />

          <motion.div
            style={cinematic ? { opacity: solutionOpacity, y: solutionY } : undefined}
          >
            <p className="text-overline text-brand-teal uppercase">
              {problemsContent.solutionLabel}
            </p>
            <p className="mt-2 font-heading text-[1.2rem] leading-snug tracking-[-0.03em] text-text-primary sm:mt-3 sm:text-[1.35rem] sm:text-h3">
              {pair.solution}
            </p>
            <p className="mt-3 max-w-md text-body text-text-secondary">
              {pair.solutionSummary}
            </p>
          </motion.div>

          <motion.div
            style={cinematic ? { opacity: techOpacity } : undefined}
            className="mt-5 sm:mt-6"
          >
            <p className="text-overline text-text-muted uppercase">
              {problemsContent.technologyLabel}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {pair.technology.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-border bg-background-secondary px-2.5 py-1 text-caption text-text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </article>
  );
}

function StoryLine({ progress }: { progress: MotionValue<number> }) {
  const uid = useId().replace(/:/g, "");

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 96"
      className="my-4 h-16 w-5 sm:my-6 sm:h-24 sm:w-6"
      fill="none"
    >
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="var(--brand-teal)" />
          <stop offset="1" stopColor="var(--brand-cyan)" />
        </linearGradient>
      </defs>
      <line
        x1="12"
        y1="4"
        x2="12"
        y2="78"
        stroke="var(--brand-navy)"
        strokeOpacity="0.1"
        strokeWidth="1"
      />
      <motion.line
        x1="12"
        y1="4"
        x2="12"
        y2="78"
        stroke={`url(#${uid})`}
        strokeWidth="1.7"
        strokeLinecap="round"
        style={{ pathLength: progress }}
      />
      <motion.path
        d="M7 74 L12 86 L17 74"
        stroke={`url(#${uid})`}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength: progress }}
      />
    </svg>
  );
}
