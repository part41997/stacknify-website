import Link from "next/link";
import { ArrowUpRight, Calendar, Tag } from "lucide-react";

import { SiteImage } from "@/components/media/site-image";
import {
  formatInsightDate,
  getInsightCover,
  getInsightHref,
  insightsContent,
} from "@/data/insights";
import { imageSizes } from "@/data/images";
import { cn } from "@/lib/utils";
import type { Insight } from "@/types";

type InsightCardProps = {
  insight: Insight;
  className?: string;
};

export function InsightCard({ insight, className }: InsightCardProps) {
  const href = getInsightHref(insight);
  const cover = getInsightCover(insight);

  return (
    <article
      className={cn(
        "group/insight flex h-full flex-col overflow-hidden rounded-2xl bg-white p-3 shadow-[0_18px_48px_-28px_color-mix(in_srgb,var(--brand-navy)_28%,transparent)] ring-1 ring-navy/8",
        "transition-[transform,box-shadow] duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-[0_24px_56px_-28px_color-mix(in_srgb,var(--brand-navy)_34%,transparent)]",
        "motion-reduce:transform-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <Link
        href={href}
        className="flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2"
        aria-label={`${insight.title}. ${insightsContent.readDetails}.`}
      >
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-background-soft">
          <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover/insight:scale-[1.03] motion-reduce:transform-none">
            <SiteImage
              image={cover}
              fill
              sizes={imageSizes.insight}
              imageClassName="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col px-2 pt-4 pb-2 sm:px-3 sm:pt-5 sm:pb-3">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8125rem] text-navy/70">
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

          <h3 className="mt-3 font-heading text-[1.2rem] leading-snug tracking-[-0.03em] text-navy sm:text-[1.3rem]">
            {insight.title}
          </h3>

          <p className="mt-auto inline-flex items-center gap-1.5 pt-5 text-small text-navy">
            {insightsContent.readDetails}
            <ArrowUpRight
              className="size-4 text-teal transition-transform duration-200 group-hover/insight:translate-x-0.5 group-hover/insight:-translate-y-0.5 motion-reduce:transform-none"
              strokeWidth={1.8}
              aria-hidden
            />
          </p>
        </div>
      </Link>
    </article>
  );
}
