"use client";

import { AboutVisual } from "@/components/about/about-visual";
import { SectionImage } from "@/components/media/section-image";
import { ImageFrame } from "@/components/media";
import { aboutImageId } from "@/data/about";
import { getSiteImage, imageSizes } from "@/data/images";
import { isImageReady } from "@/lib/images";
import { cn } from "@/lib/utils";

type AboutPortraitProps = {
  className?: string;
};

const frameClass =
  "aspect-[5/4] rounded-3xl border border-border bg-surface shadow-sm lg:aspect-[4/5] lg:min-h-[30rem] lg:rounded-[2rem]";

export function AboutPortrait({ className }: AboutPortraitProps) {
  const image = getSiteImage(aboutImageId);
  const hasCompanyImage = isImageReady(image);

  return (
    <div className={cn("relative", frameClass, className)}>
      {hasCompanyImage ? (
        <SectionImage
          id={aboutImageId}
          fill
          sizes={imageSizes.story}
          className="absolute inset-0 overflow-hidden rounded-[inherit]"
          imageClassName="object-cover object-center"
        />
      ) : (
        <ImageFrame fill reveal={false} className="absolute inset-0">
          <AboutVisual />
        </ImageFrame>
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_88%_88%,color-mix(in_srgb,var(--brand-teal)_8%,transparent),transparent_48%)] mix-blend-soft-light"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-white/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-navy/8"
      />
    </div>
  );
}
