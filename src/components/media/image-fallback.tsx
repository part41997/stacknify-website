import { getImageAspectRatio } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { SiteImageAsset } from "@/types";

type ImageFallbackProps = {
  image?: SiteImageAsset | null;
  className?: string;
  fill?: boolean;
};

export function ImageFallback({
  image,
  className,
  fill = false,
}: ImageFallbackProps) {
  const label = image && !image.decorative ? image.alt : undefined;
  const ratio = image
    ? { aspectRatio: getImageAspectRatio(image) }
    : undefined;

  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(
        "overflow-hidden bg-surface",
        fill ? "absolute inset-0" : "relative w-full",
        className,
      )}
      style={fill ? undefined : ratio}
    >
      <div className="absolute inset-0 site-grid opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_12%,color-mix(in_oklch,var(--navy)_6%,transparent),transparent_58%)]" />
      <svg
        viewBox="0 0 160 100"
        className="absolute inset-0 size-full"
        fill="none"
        aria-hidden
      >
        <path
          d="M18 78 C46 54 68 62 86 48 C104 34 122 28 142 22"
          stroke="var(--navy)"
          strokeOpacity="0.14"
          strokeWidth="1"
        />
        <path
          d="M22 70 C50 58 72 52 94 44"
          stroke="var(--teal)"
          strokeOpacity="0.28"
          strokeWidth="1"
        />
        <circle cx="94" cy="44" r="2.4" fill="var(--teal)" fillOpacity="0.45" />
        <circle cx="142" cy="22" r="1.8" fill="var(--cyan)" fillOpacity="0.4" />
      </svg>
    </div>
  );
}
