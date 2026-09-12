"use client";

import { SiteImage } from "@/components/media/site-image";
import { getSiteImage } from "@/data/images";

export function HeroBackdrop() {
  const image = getSiteImage("hero.system");

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <SiteImage
        image={image}
        fill
        sizes="100vw"
        className="absolute inset-0 opacity-[0.28]"
        imageClassName="object-cover object-center"
      />
      <div className="hero-field-orb hero-field-orb-a" />
      <div className="hero-field-orb hero-field-orb-b" />
      <div className="hero-field-orb hero-field-orb-c" />
      <div className="absolute inset-0 site-grid opacity-[0.5]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgb(255_255_255_/_0.78)_0%,color-mix(in_srgb,white_55%,transparent)_48%,rgb(255_255_255_/_0.92)_100%)]" />
    </div>
  );
}
