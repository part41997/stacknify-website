import dynamic from "next/dynamic";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const ProblemStories = dynamic(
  () =>
    import("@/components/approach/problem-stories").then(
      (module) => module.ProblemStories,
    ),
  {
    loading: () => (
      <div className="min-h-[24rem]" aria-hidden />
    ),
  },
);

export function ProblemSolution() {
  return (
    <Section
      id="approach"
      defer
      spacing="none"
      className="overflow-x-clip bg-background-primary"
    >
      <Container width="wide">
        <ProblemStories />
      </Container>
    </Section>
  );
}
