"use client";

import Image from "next/image";
import { useState } from "react";

import { ImageFallback } from "@/components/media/image-fallback";
import { isImageReady, shouldGradeImage, toImageProps } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { SiteImageAsset } from "@/types";

type SiteImageProps = {
  image: SiteImageAsset | null | undefined;
  alt?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  fill?: boolean;
  fallback?: boolean;
  loading?: "eager" | "lazy";
};

export function SiteImage({
  image,
  alt,
  className,
  imageClassName,
  priority,
  sizes,
  quality,
  fill = false,
  fallback = true,
  loading,
}: SiteImageProps) {
  const [failed, setFailed] = useState(false);

  if (!isImageReady(image) || failed) {
    if (!fallback) {
      return null;
    }

    return <ImageFallback image={image} fill={fill} className={className} />;
  }

  const props = toImageProps(image, {
    alt,
    priority,
    sizes,
    quality,
    fill,
    loading,
  });
  const decorative = props.alt === "";
  const grade = shouldGradeImage(image);

  if (fill) {
    return (
      <div
        className={cn(
          "relative size-full overflow-hidden",
          grade && "image-grade",
          className,
        )}
        aria-hidden={decorative || undefined}
      >
        <Image
          {...props}
          fill
          draggable={false}
          className={cn("object-cover", grade && "image-grade-media", imageClassName)}
          onError={() => setFailed(true)}
        />
        {grade ? <span className="image-grade-veil" aria-hidden /> : null}
      </div>
    );
  }

  if (grade) {
    return (
      <div className={cn("image-grade relative w-full overflow-hidden", className)}>
        <Image
          {...props}
          width={image.width}
          height={image.height}
          draggable={false}
          className={cn("image-grade-media h-auto w-full", imageClassName)}
          onError={() => setFailed(true)}
        />
        <span className="image-grade-veil" aria-hidden />
      </div>
    );
  }

  return (
    <Image
      {...props}
      width={image.width}
      height={image.height}
      draggable={false}
      className={cn("h-auto w-full", className, imageClassName)}
      onError={() => setFailed(true)}
    />
  );
}
