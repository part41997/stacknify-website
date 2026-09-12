import dynamic from "next/dynamic";

import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import {
  getVisibleTestimonials,
  hasPlaceholderTestimonials,
  shouldRenderTestimonials,
  testimonialsContent,
} from "@/data/testimonials";

const TestimonialCarousel = dynamic(() =>
  import("@/components/testimonials/testimonial-carousel").then(
    (module) => module.TestimonialCarousel,
  ),
);

export function Testimonials() {
  if (!shouldRenderTestimonials()) {
    return null;
  }

  const items = getVisibleTestimonials();
  const placeholders = hasPlaceholderTestimonials(items);

  return (
    <Section
      id="testimonials"
      defer
      spacing="comfortable"
      className="overflow-x-clip bg-background-primary"
    >
      <Container>
        <SectionHeading
          prefix={testimonialsContent.headingPrefix}
          accent={testimonialsContent.headingAccent}
          className="lg:max-w-3xl"
        />
      </Container>

      <FadeIn delay={0.08} className="mt-8">
        {placeholders ? (
          <Container>
            <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
              {items.map((item) => (
                <TestimonialCard
                  key={item.id}
                  item={item}
                  active
                  compact
                />
              ))}
            </div>
          </Container>
        ) : (
          <TestimonialCarousel items={items} />
        )}
      </FadeIn>
    </Section>
  );
}
