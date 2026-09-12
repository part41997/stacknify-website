import Link from "next/link";

import {
  ImageHoverMedia,
  ImageHoverRoot,
  ImageHoverTitle,
} from "@/components/media/image-hover";
import { IndustryImage } from "@/components/industries/industry-image";
import {
  getIndustryHref,
  industriesContent,
  industryTileClass,
} from "@/data/industries";
import { cn } from "@/lib/utils";
import type { Industry } from "@/types";

type IndustryCardProps = {
  industry: Industry;
};

export function IndustryCard({ industry }: IndustryCardProps) {
  const href = getIndustryHref(industry);
  const layout = industry.layout ?? "compact";

  return (
    <ImageHoverRoot className={cn("industry-hover h-full", industryTileClass(layout))}>
      <Link
        href={href}
        data-slot="industry-card"
        className="relative block h-full overflow-hidden rounded-[1.75rem] border border-navy/8 bg-background-soft outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 lg:rounded-[2rem]"
        aria-label={`${industry.name}. ${industriesContent.viewIndustry}.`}
      >
        <ImageHoverMedia className="absolute inset-0" overlay={false}>
          <IndustryImage industry={industry} />
        </ImageHoverMedia>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[52%] bg-gradient-to-t from-white via-white/80 to-transparent"
        />
        <div data-image-hover-overlay className="industry-hover-overlay" />

        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 sm:px-7 sm:pb-7">
          <ImageHoverTitle>
            <h3 className="font-heading text-[1.65rem] leading-tight tracking-[-0.03em] text-navy sm:text-h3">
              {industry.name}
            </h3>
          </ImageHoverTitle>
          <p
            data-image-hover-meta
            className="relative mt-2 max-w-md px-0 pb-0 text-small text-navy/65"
          >
            {industriesContent.viewIndustry}
          </p>
        </div>
      </Link>
    </ImageHoverRoot>
  );
}
