import { ArrowRight } from "lucide-react";

import { AboutPortrait } from "@/components/about/about-portrait";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AnchorLink } from "@/components/navigation/anchor-link";
import { StatValue } from "@/components/sections/stat-value";
import { buttonVariants } from "@/components/ui/button";
import { aboutContent, aboutMetrics } from "@/data/about";
import { isConfiguredMetric, isVisibleMetric } from "@/data/why";
import { cn } from "@/lib/utils";

const visibleMetrics = aboutMetrics.filter(isVisibleMetric);

export function About({ headingAs: Heading = "h2" }: { headingAs?: "h1" | "h2" }) {
  return (
    <Section id="about" defer spacing="comfortable" className="bg-background-primary">
      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-14">
          <AboutPortrait />

          <FadeIn className="max-w-xl lg:max-w-none">
            <p className="flex items-center gap-3 text-overline text-text-muted uppercase">
              <span aria-hidden className="h-px w-8 bg-navy/20" />
              {aboutContent.label}
            </p>

            <Heading
              className={cn(
                "mt-4 font-heading text-h2 text-text-primary",
                Heading === "h1" && "text-h1",
              )}
            >
              {aboutContent.heading}
            </Heading>

            <p className="mt-4 text-body text-text-secondary sm:mt-5 sm:text-body-lg">
              {aboutContent.description}
            </p>

            <dl className="mt-7 flex flex-col gap-5 sm:mt-8 sm:gap-6">
              <div>
                <dt className="text-overline text-text-muted uppercase">
                  {aboutContent.mission.label}
                </dt>
                <dd className="mt-2 text-body text-text-secondary">
                  {aboutContent.mission.body}
                </dd>
              </div>
              <div>
                <dt className="text-overline text-text-muted uppercase">
                  {aboutContent.vision.label}
                </dt>
                <dd className="mt-2 text-body text-text-secondary">
                  {aboutContent.vision.body}
                </dd>
              </div>
            </dl>

            {visibleMetrics.length > 0 ? (
              <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-t border-border pt-6 sm:mt-10">
                {visibleMetrics.map((metric) => (
                  <li key={metric.id} className="flex min-w-[6.5rem] flex-col gap-1">
                    {isConfiguredMetric(metric) ? (
                      <StatValue
                        value={metric.value}
                        prefix={metric.prefix}
                        suffix={metric.suffix}
                      />
                    ) : (
                      <span className="font-heading text-title tracking-tight text-navy/35">
                        {metric.placeholder}
                      </span>
                    )}
                    <p className="text-caption text-text-muted">{metric.label}</p>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className={visibleMetrics.length > 0 ? "mt-7" : "mt-7 sm:mt-8"}>
              <AnchorLink
                href={aboutContent.cta.href}
                className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
              >
                {aboutContent.cta.label}
                <ArrowRight data-icon="inline-end" />
              </AnchorLink>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
