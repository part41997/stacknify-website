import { ImageFallback } from "@/components/media/image-fallback";
import { SiteImage } from "@/components/media/site-image";
import { imageSizes } from "@/data/images";
import { getIndustryImage } from "@/data/images";
import { isImageReady } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { Industry } from "@/types";

type IndustryImageProps = {
  industry: Industry;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export function IndustryImage({
  industry,
  className,
  imageClassName,
  priority = false,
  sizes,
}: IndustryImageProps) {
  const image = getIndustryImage(industry.slug);
  const layout = industry.layout ?? "compact";
  const layoutSizes =
    sizes ??
    (layout === "featured" || layout === "banner"
      ? imageSizes.industryFeatured
      : layout === "wide"
        ? imageSizes.industryWide
        : imageSizes.industryTile);

  if (!isImageReady(image)) {
    return (
      <ImageFallback
        image={image}
        fill
        className={cn("absolute inset-0", className)}
      />
    );
  }

  return (
    <SiteImage
      image={image}
      fill
      priority={priority}
      sizes={layoutSizes}
      className={cn("absolute inset-0", className)}
      imageClassName={cn("object-cover", imageClassName)}
    />
  );
}
