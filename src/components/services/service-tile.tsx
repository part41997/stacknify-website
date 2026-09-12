import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";

import { AnchorLink } from "@/components/navigation/anchor-link";
import {
  ImageHoverArrow,
  ImageHoverMedia,
  ImageHoverRoot,
  ImageHoverTitle,
} from "@/components/media/image-hover";
import { ServiceVisual } from "@/components/services/service-visual";
import { servicesContent } from "@/data/services";
import { cn } from "@/lib/utils";
import type { ServiceCategory } from "@/types";

type ServiceTileProps = {
  category: ServiceCategory;
  className?: string;
};

export function ServiceTile({ category, className }: ServiceTileProps) {
  return (
    <ImageHoverRoot className={cn("service-hover h-full", className)}>
      <AnchorLink
        href={category.href}
        id={`service-${category.slug}`}
        data-slot="service-tile"
        aria-label={`${category.title}. ${category.summary} ${servicesContent.detailsLabel}.`}
        className={cn(
          "relative block h-full overflow-hidden rounded-[1.75rem] border border-navy/8 bg-background-soft",
          "scroll-mt-[calc(var(--header-height)+1.25rem)] ring-1 ring-navy/8",
          "transition-[box-shadow,transform] duration-300 ease-out",
          "hover:-translate-y-1 motion-reduce:transform-none motion-reduce:hover:translate-y-0",
          "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary",
        )}
        style={{ "--service-accent": category.accent } as CSSProperties}
      >
        <ImageHoverMedia overlay accent className="aspect-[1024/682]">
          <ServiceVisual slug={category.slug} />
        </ImageHoverMedia>

        <span data-service-shine aria-hidden />

        <span data-service-frame aria-hidden>
          <span data-corner="tl" />
          <span data-corner="tr" />
          <span data-corner="bl" />
          <span data-corner="br" />
        </span>

        <span
          data-service-index
          className="absolute top-4 left-4 z-20 inline-flex min-h-9 min-w-9 items-center justify-center rounded-full bg-white/90 px-2.5 font-mono text-[0.6875rem] tracking-[0.16em] text-navy shadow-sm ring-1 ring-navy/8 backdrop-blur-sm"
        >
          {category.number}
        </span>

        <div data-service-plate>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <ImageHoverTitle>
                <span className="block font-heading text-[1.05rem] leading-tight tracking-[-0.03em] text-navy sm:text-[1.22rem]">
                  {category.title}
                </span>
              </ImageHoverTitle>
              <p
                data-image-hover-meta
                className="relative mt-1.5 line-clamp-2 max-w-sm px-0 pb-0 text-caption text-navy/65 sm:text-small"
              >
                {category.summary}
              </p>
            </div>
            <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-navy px-3.5 py-2 text-small text-white shadow-sm">
              {servicesContent.detailsLabel}
              <ImageHoverArrow>
                <ArrowRight className="size-3.5" aria-hidden />
              </ImageHoverArrow>
            </span>
          </div>
        </div>
      </AnchorLink>
    </ImageHoverRoot>
  );
}
