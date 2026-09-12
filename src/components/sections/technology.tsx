import dynamic from "next/dynamic";

import { DrawLine } from "@/components/animations/draw-line";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { technologiesContent } from "@/data/technologies";

const TechEcosystem = dynamic(
  () =>
    import("@/components/technology/tech-ecosystem").then(
      (module) => module.TechEcosystem,
    ),
  {
    loading: () => (
      <div
        className="min-h-[32rem] w-full rounded-[1.75rem] border border-navy/8 bg-white lg:min-h-[28rem]"
        role="status"
        aria-label={technologiesContent.loadingLabel}
      />
    ),
  },
);

export function Technology() {
  return (
    <Section
      id="technology"
      defer
      spacing="comfortable"
      className="overflow-hidden bg-background-primary"
    >
      <Container width="wide" className="relative flex flex-col gap-8 lg:gap-10">
        <div>
          <SectionHeading
            prefix={technologiesContent.headingPrefix}
            accent={technologiesContent.headingAccent}
            description={technologiesContent.description}
            className="lg:max-w-3xl"
          />
          <DrawLine className="mt-5 max-w-sm" />
        </div>

        <FadeIn delay={0.06}>
          <TechEcosystem />
        </FadeIn>
      </Container>
    </Section>
  );
}
