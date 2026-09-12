"use client";

import { ImageFrame } from "@/components/media/image-frame";
import { SiteImage } from "@/components/media/site-image";
import { cn } from "@/lib/utils";
import type { SiteImageAsset } from "@/types";

type RevealImageProps = {
  image: SiteImageAsset | null | undefined;
  alt?: string;
  className?: string;
  imageClassName?: string;
  aspect?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  mask?: boolean;
};

export function RevealImage({
  image,
  alt,
  className,
  imageClassName,
  aspect,
  fill = false,
  priority = false,
  sizes,
  mask = false,
}: RevealImageProps) {
  return (
    <ImageFrame
      aspect={aspect}
      fill={fill}
      reveal
      mask={mask}
      className={cn(className)}
    >
      <SiteImage
        image={image}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        imageClassName={imageClassName}
      />
    </ImageFrame>
  );
}
