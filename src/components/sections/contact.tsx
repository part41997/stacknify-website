import dynamic from "next/dynamic";

import { FadeIn } from "@/components/animations/fade-in";
import { ContactInfo } from "@/components/contact/contact-info";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { cardVariants } from "@/components/ui/card";
import { contactContent } from "@/data/contact";
import { cn } from "@/lib/utils";

const ContactForm = dynamic(
  () =>
    import("@/components/contact/contact-form").then(
      (module) => module.ContactForm,
    ),
  {
    loading: () => (
      <div
        className={cn(
          cardVariants({
            variant: "default",
            padding: "none",
            interactive: false,
          }),
          "min-h-[32rem]",
        )}
        role="status"
        aria-label={contactContent.form.loadingLabel}
      />
    ),
  },
);

type ContactProps = {
  headingAs?: "h1" | "h2";
};

export function Contact({ headingAs = "h2" }: ContactProps) {
  return (
    <Section id="contact" spacing="comfortable" tone="surface">
      <Container className="flex flex-col gap-8 lg:gap-10">
        <SectionHeading
          as={headingAs}
          prefix={contactContent.headingPrefix}
          accent={contactContent.headingAccent}
          description={contactContent.description}
          className="lg:max-w-3xl"
        />

        <div className="flex flex-col-reverse gap-8 lg:grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start lg:gap-10">
          <FadeIn>
            <ContactInfo />
          </FadeIn>
          <FadeIn delay={0.08}>
            <ContactForm />
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
