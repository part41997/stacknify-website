"use client";

import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { useImageHover, type ImageHoverMode } from "@/hooks/use-image-hover";
import { cn } from "@/lib/utils";

type ImageHoverRootProps = ComponentProps<"div"> & {
  mode?: ImageHoverMode;
};

export function ImageHoverRoot({
  mode = "link",
  className,
  ...props
}: ImageHoverRootProps) {
  const { rootProps } = useImageHover(mode);

  return (
    <div
      {...props}
      {...rootProps}
      className={cn("image-hover", className)}
    />
  );
}

type ImageHoverMediaProps = ComponentProps<"div"> & {
  overlay?: boolean;
  accent?: boolean;
  caption?: ReactNode;
};

export function ImageHoverMedia({
  className,
  children,
  overlay = true,
  accent = true,
  caption,
  ...props
}: ImageHoverMediaProps) {
  return (
    <div
      data-image-hover-media
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <div data-image-hover-scale className="absolute inset-0">
        {children}
      </div>
      {overlay ? <ImageHoverOverlay /> : null}
      {accent ? <ImageHoverAccent /> : null}
      {caption ? <ImageHoverMeta>{caption}</ImageHoverMeta> : null}
    </div>
  );
}

export function ImageHoverOverlay({ className }: { className?: string }) {
  return (
    <div
      data-image-hover-overlay
      aria-hidden
      className={className}
    />
  );
}

export function ImageHoverAccent({ className }: { className?: string }) {
  return (
    <span
      data-image-hover-accent
      aria-hidden
      className={className}
    />
  );
}

export function ImageHoverTitle({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div data-image-hover-title className={className} {...props} />
  );
}

export function ImageHoverArrow({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <span data-image-hover-arrow className={cn("inline-flex shrink-0", className)}>
      {children ?? <ArrowRight className="size-4" aria-hidden />}
    </span>
  );
}

export function ImageHoverMeta({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      data-image-hover-meta
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 z-10 px-4 pb-4 text-caption text-navy",
        className,
      )}
      {...props}
    />
  );
}

export function ImageHoverMark({
  className,
  ...props
}: ComponentProps<"span">) {
  return <span data-image-hover-mark className={className} {...props} />;
}
