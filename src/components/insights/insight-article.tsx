import { ArrowLeft, Calendar, Tag } from "lucide-react";

import { InsightCard } from "@/components/insights/insight-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SiteImage } from "@/components/media/site-image";
import { AnchorLink } from "@/components/navigation/anchor-link";
import { imageSizes } from "@/data/images";
import {
  formatInsightDate,
  getInsightCover,
  getRelatedInsights,
  insightsContent,
} from "@/data/insights";
import type { Insight, InsightBlock } from "@/types";

export function InsightArticle({ insight }: { insight: Insight }) {
  const cover = getInsightCover(insight);
  const related = getRelatedInsights(insight);

  return (
    <Section spacing="default" className="bg-background-primary">
      <Container className="flex flex-col gap-10 lg:gap-14">
        <AnchorLink
          href="/#insights"
          className="inline-flex w-fit items-center gap-2 text-sm text-text-muted transition-colors hover:text-navy"
        >
          <ArrowLeft className="size-4" />
          {insightsContent.backLabel}
        </AnchorLink>

        <header className="mx-auto flex max-w-3xl flex-col items-start">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-small text-navy/70">
            <span className="inline-flex items-center gap-1.5">
              <Tag className="size-3.5 text-teal" strokeWidth={1.8} aria-hidden />
              {insight.category}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5 text-teal" strokeWidth={1.8} aria-hidden />
              <time dateTime={insight.publishedAt}>
                {formatInsightDate(insight.publishedAt)}
              </time>
            </span>
          </p>
          <h1 className="mt-4 font-heading text-h1 text-text-primary">
            {insight.title}
          </h1>
          <p className="mt-4 text-body text-text-secondary sm:text-body-lg">
            {insight.description}
          </p>
        </header>

        <div className="relative mx-auto aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-[1.75rem] border border-navy/8 bg-background-soft shadow-[0_28px_64px_-32px_color-mix(in_srgb,var(--brand-navy)_28%,transparent)] ring-1 ring-navy/8 lg:rounded-[2rem]">
          <SiteImage
            image={cover}
            fill
            priority
            sizes={imageSizes.pageHero}
            imageClassName="object-cover"
          />
        </div>

        <article className="mx-auto flex w-full max-w-3xl flex-col gap-6">
          {insight.body.map((block, index) => (
            <InsightBlockView key={`${insight.slug}-${index}`} block={block} />
          ))}
        </article>

        {related.length > 0 ? (
          <div className="border-t border-navy/8 pt-12">
            <h2 className="text-center font-heading text-h3 text-navy">
              {insightsContent.relatedLabel}
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <InsightCard insight={item} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

function InsightBlockView({ block }: { block: InsightBlock }) {
  if (block.type === "h2") {
    return (
      <h2 className="mt-4 font-heading text-h3 text-text-primary">{block.text}</h2>
    );
  }

  if (block.type === "ul") {
    return (
      <ul className="flex flex-col gap-2 border-l-2 border-teal/30 pl-5">
        {block.items.map((item) => (
          <li key={item} className="text-body text-text-secondary">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return <p className="text-body text-text-secondary">{block.text}</p>;
}
