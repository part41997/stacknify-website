"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { ProblemStory } from "@/components/approach/problem-story";
import { SectionHeading } from "@/components/layout/section-heading";
import { problemSolutions, problemsContent } from "@/data/problems";

export function ProblemStories() {
  return (
    <div className="flex flex-col gap-8 pt-section-sm pb-section-md lg:gap-6">
      <FadeIn>
        <SectionHeading
          eyebrow={problemsContent.eyebrow}
          prefix={problemsContent.headingPrefix}
          accent={problemsContent.headingAccent}
          description={problemsContent.description}
          className="max-w-3xl"
        />
      </FadeIn>

      <div
        aria-label={problemsContent.stepsLabel}
        className="flex flex-col gap-16 lg:gap-8"
      >
        {problemSolutions.map((pair, index) => (
          <ProblemStory key={pair.slug} pair={pair} index={index} />
        ))}
      </div>
    </div>
  );
}
