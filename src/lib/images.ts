import type { ImageProps } from "next/image";

import type { SiteImageAsset } from "@/types";
import { isSafeAssetUrl } from "@/lib/security/urls";

export const brandBlurDataUrl =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 16 10"><rect width="16" height="10" fill="#F8FAFC"/><rect width="16" height="10" fill="#0F172A" opacity="0.04"/></svg>`,
  );

export function isImageReady(
  image: SiteImageAsset | null | undefined,
): image is SiteImageAsset {
  return Boolean(image?.ready && image.path.trim() && isSafeAssetUrl(image.path));
}

/** Photographs share one mint/navy grade. Brand marks and diagrams stay untouched. */
export function shouldGradeImage(image: SiteImageAsset) {
  return image.category === "photograph";
}

export function getImageAlt(image: SiteImageAsset) {
  if (image.decorative) {
    return "";
  }

  return image.alt;
}

export const defaultImageQuality = 75;

export function getImageAspectRatio(
  image: SiteImageAsset,
  variant: "desktop" | "mobile" = "desktop",
) {
  return variant === "mobile"
    ? image.mobileAspectRatio
    : image.desktopAspectRatio;
}

export function toImageProps(
  image: SiteImageAsset,
  overrides: Partial<
    Pick<ImageProps, "priority" | "sizes" | "quality" | "fill" | "alt" | "loading">
  > = {},
) {
  const fill = overrides.fill === true;
  const priority = overrides.priority === true;

  return {
    src: image.path,
    alt: overrides.alt ?? getImageAlt(image),
    sizes: overrides.sizes ?? image.sizes ?? (fill ? "100vw" : undefined),
    priority,
    loading: (overrides.loading ??
      (priority ? "eager" : "lazy")) as ImageProps["loading"],
    quality: overrides.quality ?? defaultImageQuality,
    // Files under public/images are already compressed WebP. Routing them
    // through /_next/image (especially AVIF) can stall the tab for minutes.
    unoptimized: true,
    placeholder: "blur" as const,
    blurDataURL: brandBlurDataUrl,
    ...(fill ? {} : { width: image.width, height: image.height }),
  };
}
