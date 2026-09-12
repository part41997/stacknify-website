import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { WhyProof } from "@/components/why/why-proof";
import { whyContent } from "@/data/why";

export function Why() {
  return (
    <Section
      id="why"
      defer
      spacing="comfortable"
      className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,color-mix(in_srgb,var(--brand-mint)_16%,white)_48%,#ffffff_100%)]"
    >
      <Container width="wide" className="flex flex-col gap-8 lg:gap-10">
        <SectionHeading
          prefix={whyContent.headingPrefix}
          accent={whyContent.headingAccent}
          description={whyContent.description}
          reveal
          align="center"
          className="mx-auto max-w-3xl"
        />

        <WhyProof />
      </Container>
    </Section>
  );
}
