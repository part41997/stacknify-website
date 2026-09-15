"use client";

import type { CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { FadeIn, Stagger, StaggerItem } from "@/components/animations/fade-in";
import { TextReveal } from "@/components/animations/text-reveal";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AnchorLink } from "@/components/navigation/anchor-link";
import { serviceIcons } from "@/components/services/icons";
import { ServiceVisual } from "@/components/services/service-visual";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getIndustryHref, getIndustriesForService } from "@/data/industries";
import {
  getAdjacentServices,
  getServiceHref,
  servicesContent,
} from "@/data/services";
import { cn } from "@/lib/utils";
import type { ServiceCategory } from "@/types";

export function ServiceDetail({ category }: { category: ServiceCategory }) {
  const Icon = serviceIcons[category.icon];
  const industries = getIndustriesForService(category.slug);
  const { previous, next } = getAdjacentServices(category.slug);

  return (
    <Section spacing="default" className="bg-background-primary">
      <Container className="flex flex-col gap-12 lg:gap-16">
        <FadeIn>
          <AnchorLink
            href="/services"
            className="inline-flex w-fit items-center gap-2 text-sm text-text-muted transition-colors hover:text-navy"
          >
            <ArrowLeft className="size-4" />
            {servicesContent.backLabel}
          </AnchorLink>
        </FadeIn>

        <header className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <p className="text-overline text-text-muted uppercase">
              <TextReveal>
                <span className="inline-flex items-center gap-2">
                  <span className="font-mono tracking-[0.16em] text-teal">
                    {category.number}
                  </span>
                  <span className="text-border">·</span>
                  {servicesContent.categoryLabel}
                </span>
              </TextReveal>
            </p>
            <h1 className="mt-4 font-heading text-h1 text-text-primary">
              <TextReveal delay={0.06}>{category.title}</TextReveal>
            </h1>
          </div>
          <FadeIn delay={0.1}>
            <p className="max-w-xl text-body text-text-secondary lg:justify-self-end">
              {category.summary}
            </p>
          </FadeIn>
        </header>

        <FadeIn variant="scale" delay={0.08}>
          <div
            className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-navy/8 bg-background-soft ring-1 ring-navy/8 lg:aspect-[16/8] lg:rounded-[2rem]"
            style={{ "--service-accent": category.accent } as CSSProperties}
          >
            <ServiceVisual slug={category.slug} />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_0%,color-mix(in_srgb,var(--service-accent)_22%,transparent),transparent_46%)]"
            />
            <span className="absolute top-4 left-4 z-10 inline-flex size-11 items-center justify-center rounded-2xl bg-white/90 text-teal shadow-sm ring-1 ring-navy/8 backdrop-blur-sm">
              <Icon className="size-5" strokeWidth={1.7} aria-hidden />
            </span>
          </div>
        </FadeIn>

        <FadeIn>
          <p className="max-w-3xl font-heading text-[1.25rem] leading-snug tracking-[-0.03em] text-text-primary">
            {category.details}
          </p>
        </FadeIn>

        <section>
          <h2 className="text-overline text-text-muted uppercase">
            {servicesContent.storyLabel}
          </h2>
          <div className="mt-4 flex max-w-3xl flex-col gap-4 text-body text-text-secondary">
            {category.story.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </section>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <h2 className="text-overline text-text-muted uppercase">
              {servicesContent.problemLabel}
            </h2>
            <p className="mt-3 text-body text-text-secondary">
              {category.problem}
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="text-overline text-text-muted uppercase">
              {servicesContent.approachLabel}
            </h2>
            <p className="mt-3 text-body text-text-secondary">
              {category.approach}
            </p>
          </FadeIn>
        </div>

        <FadeIn>
          <h2 className="text-overline text-text-muted uppercase">
            {servicesContent.whoLabel}
          </h2>
          <p className="mt-3 max-w-2xl text-body text-text-secondary">
            {category.who}
          </p>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-overline text-text-muted uppercase">
              {servicesContent.capabilitiesLabel}
            </h2>
            <Stagger as="ul" className="mt-4 flex flex-col" delay={0.04}>
              {category.items.map((item) => (
                <StaggerItem
                  key={item}
                  as="li"
                  className="border-b border-border py-3 font-heading text-[1.125rem] tracking-[-0.02em] text-text-primary first:pt-0"
                >
                  {item}
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div>
            <h2 className="text-overline text-text-muted uppercase">
              {servicesContent.technologyLabel}
            </h2>
            <Stagger className="mt-4 flex flex-wrap gap-2" delay={0.06}>
              {category.technologies.map((item) => (
                <StaggerItem key={item}>
                  <Badge variant="outline">{item}</Badge>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        <section>
          <h2 className="text-overline text-text-muted uppercase">
            {servicesContent.outcomesLabel}
          </h2>
          <Stagger
            as="ol"
            className="mt-6 grid gap-4 sm:grid-cols-3"
            delay={0.05}
          >
            {category.outcomes.map((outcome, index) => (
              <StaggerItem key={outcome} as="li">
                <article className="h-full rounded-[1.35rem] border border-navy/8 bg-white p-5 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.35)]">
                  <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-teal">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-navy/75">
                    {outcome}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {industries.length > 0 ? (
          <section>
            <h2 className="text-overline text-text-muted uppercase">
              {servicesContent.industriesLabel}
            </h2>
            <Stagger className="mt-4 flex flex-wrap gap-2" delay={0.04}>
              {industries.map((industry) => (
                <StaggerItem key={industry.slug}>
                  <AnchorLink href={getIndustryHref(industry)}>
                    <Badge variant="outline">{industry.name}</Badge>
                  </AnchorLink>
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        ) : null}

        {previous && next ? (
          <nav aria-label={servicesContent.otherLabel}>
            <h2 className="text-overline text-text-muted uppercase">
              {servicesContent.otherLabel}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <AdjacentLink
                label={servicesContent.previousLabel}
                category={previous}
                direction="previous"
              />
              <AdjacentLink
                label={servicesContent.nextLabel}
                category={next}
                direction="next"
              />
            </div>
          </nav>
        ) : null}

        <section>
          <h2 className="text-overline text-text-muted uppercase">
            {servicesContent.faqLabel}
          </h2>
          <div className="mt-6 flex max-w-3xl flex-col gap-6">
            {category.faqs.map((faq) => (
              <article key={faq.question}>
                <h3 className="font-heading text-[1.125rem] tracking-[-0.02em] text-text-primary">
                  {faq.question}
                </h3>
                <p className="mt-2 text-body text-text-secondary">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>

        <FadeIn>
          <AnchorLink
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "w-fit")}
          >
            {servicesContent.ctaLabel}
            <ArrowRight data-icon="inline-end" />
          </AnchorLink>
        </FadeIn>
      </Container>
    </Section>
  );
}

function AdjacentLink({
  label,
  category,
  direction,
}: {
  label: string;
  category: ServiceCategory;
  direction: "previous" | "next";
}) {
  return (
    <AnchorLink
      href={getServiceHref(category)}
      className={cn(
        "group flex h-full items-end justify-between gap-4 rounded-[1.35rem] border border-navy/8 bg-mist/70 p-5 outline-none transition-colors",
        "hover:border-teal/25 hover:bg-mint/40 focus-visible:ring-2 focus-visible:ring-ring/70",
        direction === "next" && "sm:flex-row-reverse sm:text-right",
      )}
    >
      <span>
        <span className="block text-caption text-navy/45 uppercase">
          {label}
        </span>
        <span className="mt-1 block font-heading text-[1.05rem] tracking-[-0.02em] text-navy">
          {category.shortTitle}
        </span>
      </span>
      {direction === "previous" ? (
        <ArrowLeft className="size-4 shrink-0 text-teal transition-transform group-hover:-translate-x-0.5" />
      ) : (
        <ArrowRight className="size-4 shrink-0 text-teal transition-transform group-hover:translate-x-0.5" />
      )}
    </AnchorLink>
  );
}
