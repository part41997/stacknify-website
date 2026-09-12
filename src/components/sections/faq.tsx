import { FadeIn } from "@/components/animations/fade-in";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { faqContent } from "@/data/faq";

export function Faq() {
  return (
    <Section id="faq" defer spacing="comfortable" tone="mist">
      <Container className="flex flex-col gap-8 lg:gap-10">
        <SectionHeading
          prefix={faqContent.headingPrefix}
          accent={faqContent.headingAccent}
          className="lg:max-w-3xl"
        />
        <FadeIn delay={0.08}>
          <FaqAccordion headingAs="h3" />
        </FadeIn>
      </Container>
    </Section>
  );
}
