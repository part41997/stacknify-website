import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AiFeature } from "@/components/solutions/ai-feature";

export function Solutions() {
  return (
    <Section
      id="solutions"
      spacing="none"
      className="overflow-x-clip bg-[linear-gradient(180deg,color-mix(in_srgb,var(--brand-mint)_24%,white)_0%,#ffffff_100%)]"
    >
      <Container>
        <AiFeature />
      </Container>
    </Section>
  );
}
