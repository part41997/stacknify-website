import { FadeIn } from "@/components/animations/fade-in";
import { InsightSlider } from "@/components/insights/insight-slider";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { insights, insightsContent } from "@/data/insights";

export function Insights() {
  return (
    <Section
      id="insights"
      defer
      spacing="default"
      className="overflow-x-clip bg-background-soft"
    >
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="flex items-center gap-3 text-overline text-teal uppercase">
            <span aria-hidden className="h-px w-8 bg-teal/50" />
            <span
              aria-hidden
              className="size-1.5 rounded-full bg-teal"
            />
            {insightsContent.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-h2 text-text-primary">
            {insightsContent.heading}
          </h2>
        </div>
      </Container>

      <FadeIn delay={0.08} className="mt-10 lg:mt-12">
        <InsightSlider items={insights} />
      </FadeIn>
    </Section>
  );
}
