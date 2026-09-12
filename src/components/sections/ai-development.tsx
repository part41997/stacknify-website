import dynamic from "next/dynamic";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { aiDevelopmentContent } from "@/data/ai-development";

const AiDevelopmentFeature = dynamic(
  () =>
    import("@/components/development/ai-development-feature").then(
      (module) => module.AiDevelopmentFeature,
    ),
  {
    loading: () => (
      <div
        className="min-h-[20rem] lg:min-h-[24rem]"
        role="status"
        aria-label={aiDevelopmentContent.eyebrow}
      />
    ),
  },
);

export function AiDevelopment() {
  return (
    <Section
      id="development"
      defer
      spacing="none"
      className="overflow-x-clip bg-background-primary"
    >
      <Container width="wide">
        <AiDevelopmentFeature />
      </Container>
    </Section>
  );
}
