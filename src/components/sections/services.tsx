import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { ServiceShowcase } from "@/components/services/service-showcase";
import { servicesContent } from "@/data/services";

type SectionHeadingLevel = "h1" | "h2";

type ServicesProps = {
  headingAs?: SectionHeadingLevel;
};

export function Services({ headingAs = "h2" }: ServicesProps) {
  return (
    <Section id="services" spacing="comfortable" className="bg-background-primary">
      <Container className="flex flex-col gap-8 lg:gap-10">
        <FadeIn>
          <SectionHeading
            prefix={servicesContent.headingPrefix}
            accent={servicesContent.headingAccent}
            description={servicesContent.description}
            as={headingAs}
            className="lg:max-w-3xl"
          />
        </FadeIn>

        <ServiceShowcase />
      </Container>
    </Section>
  );
}
