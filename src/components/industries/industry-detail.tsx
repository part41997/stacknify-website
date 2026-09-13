import { ArrowLeft, ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { IndustryImage } from "@/components/industries/industry-image";
import { AnchorLink } from "@/components/navigation/anchor-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  getIndustryServices,
  industriesContent,
} from "@/data/industries";
import { getServiceHref } from "@/data/services";
import { imageSizes } from "@/data/images";
import { cn } from "@/lib/utils";
import type { Industry } from "@/types";

export function IndustryDetail({ industry }: { industry: Industry }) {
  const relatedServices = getIndustryServices(industry);

  return (
    <Section spacing="default" className="bg-background-primary">
      <Container className="flex flex-col gap-12 lg:gap-16">
        <AnchorLink
          href="/"
          className="inline-flex w-fit items-center gap-2 text-sm text-text-muted transition-colors hover:text-navy"
        >
          <ArrowLeft className="size-4" />
          {industriesContent.backLabel}
        </AnchorLink>

        <header className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <h1 className="font-heading text-h1 text-text-primary">
            {industry.name}
          </h1>
          <p className="max-w-xl text-body text-text-secondary lg:justify-self-end">
            {industry.summary}
          </p>
        </header>

        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-border bg-background-soft lg:aspect-[16/8] lg:rounded-[2rem]">
          <IndustryImage
            industry={industry}
            priority
            sizes={imageSizes.pageHero}
          />
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-overline text-text-muted uppercase">
              {industriesContent.examplesLabel}
            </h2>
            <ul className="mt-4 flex flex-col">
              {industry.examples.map((example) => (
                <li
                  key={example}
                  className="border-b border-border py-3 font-heading text-[1.125rem] tracking-[-0.02em] text-text-primary first:pt-0"
                >
                  {example}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-overline text-text-muted uppercase">
              {industriesContent.servicesLabel}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {relatedServices.map((service) => (
                <li key={service.slug}>
                  <AnchorLink href={getServiceHref(service)}>
                    <Badge variant="outline">{service.title}</Badge>
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <AnchorLink
          href="/contact"
          className={cn(buttonVariants({ size: "lg" }), "w-fit")}
        >
          {industriesContent.ctaLabel}
          <ArrowRight data-icon="inline-end" />
        </AnchorLink>
      </Container>
    </Section>
  );
}
