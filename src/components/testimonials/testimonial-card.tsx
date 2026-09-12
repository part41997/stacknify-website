import { Star } from "lucide-react";
import Image from "next/image";

import { imageSizes } from "@/data/images";
import { testimonialsContent } from "@/data/testimonials";
import { isSafeAssetUrl } from "@/lib/security/urls";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

type TestimonialCardProps = {
  item: Testimonial;
  active?: boolean;
  compact?: boolean;
  className?: string;
};

export function TestimonialCard({
  item,
  active = false,
  compact = false,
  className,
}: TestimonialCardProps) {
  const avatar =
    !item.placeholder && item.avatar && isSafeAssetUrl(item.avatar)
      ? item.avatar
      : null;
  const published = !item.placeholder;

  return (
    <figure
      data-placeholder={item.placeholder ? "true" : undefined}
      className={cn(
        "flex h-full flex-col bg-white",
        compact
          ? "gap-5 rounded-2xl border border-navy/8 p-6 shadow-[0_18px_48px_-28px_color-mix(in_srgb,var(--brand-navy)_28%,transparent)] ring-1 ring-navy/8 sm:p-7"
          : "min-h-[18rem] justify-between gap-8 rounded-[1.75rem] border border-navy/8 p-7 sm:min-h-[20rem] sm:p-10 lg:rounded-[2rem] lg:p-12",
        !compact && "transition-opacity duration-500 ease-out",
        !compact && (active ? "opacity-100" : "opacity-50"),
        className,
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <p
            aria-hidden
            className={cn(
              "font-heading leading-none",
              published ? "text-teal/45" : "text-navy/15",
              compact ? "text-4xl" : "text-5xl sm:text-6xl",
            )}
          >
            “
          </p>
          {published ? (
            <span className="flex items-center gap-0.5 pt-1 text-teal" aria-label="Five stars">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className="size-3.5 fill-current"
                  strokeWidth={0}
                />
              ))}
            </span>
          ) : null}
        </div>
        {item.placeholder ? (
          <p className="mt-4 text-overline text-navy/35 uppercase">
            {testimonialsContent.placeholderLabel}
          </p>
        ) : (
          <p className="mt-3 text-overline text-teal uppercase">
            {item.projectType}
          </p>
        )}
        <blockquote className={item.placeholder ? "mt-3" : "mt-3"}>
          <p
            className={cn(
              "tracking-[-0.02em] text-navy",
              item.placeholder
                ? "text-body text-navy/70"
                : compact
                  ? "text-body leading-relaxed text-navy/85"
                  : "font-heading text-[1.35rem] leading-[1.35] sm:text-[1.65rem] lg:text-[1.75rem]",
            )}
          >
            {item.quote}
          </p>
        </blockquote>
      </div>

      <figcaption className="mt-auto flex items-center gap-4 border-t border-navy/8 pt-5">
        {avatar ? (
          <span className="relative size-11 shrink-0 overflow-hidden rounded-full border border-navy/8 sm:size-12">
            <Image
              src={avatar}
              alt=""
              fill
              unoptimized
              sizes={imageSizes.avatar}
              quality={75}
              className="object-cover"
            />
          </span>
        ) : published ? (
          <span
            aria-hidden
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-mint font-heading text-small text-teal sm:size-12"
          >
            {item.name.slice(0, 1)}
          </span>
        ) : null}
        <div className="min-w-0">
          {item.placeholder ? (
            <p className="text-small text-text-muted">{item.projectType}</p>
          ) : (
            <>
              <p className="font-heading text-[1.0625rem] tracking-[-0.02em] text-navy">
                {item.name}
              </p>
              <p className="mt-1 text-small text-text-secondary">
                {item.role}
                <span aria-hidden className="px-1.5 text-navy/25">
                  ·
                </span>
                {item.company}
              </p>
            </>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
