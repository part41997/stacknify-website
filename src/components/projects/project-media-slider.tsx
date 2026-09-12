"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { SiteImage } from "@/components/media/site-image";
import { buttonVariants } from "@/components/ui/button";
import { imageSizes } from "@/data/images";
import { projectsContent } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { defaultEase, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { SiteImageAsset } from "@/types";

const AUTO_MS = 5600;
const SWIPE_PX = 48;

type ProjectMediaSliderProps = {
  images: SiteImageAsset[];
  title: string;
};

export function ProjectMediaSlider({ images, title }: ProjectMediaSliderProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const multiple = images.length > 1;
  const current = images[index];
  const { labels } = projectsContent;

  const goTo = useCallback(
    (next: number, dir?: number) => {
      if (images.length === 0) {
        return;
      }

      const target = ((next % images.length) + images.length) % images.length;
      setDirection(dir ?? (target > index ? 1 : -1));
      setIndex(target);
    },
    [images.length, index],
  );

  const step = useCallback(
    (delta: number) => goTo(index + delta, delta),
    [goTo, index],
  );

  useEffect(() => {
    if (!multiple || paused || reduceMotion) {
      return;
    }

    const timer = window.setInterval(() => step(1), AUTO_MS);
    return () => window.clearInterval(timer);
  }, [multiple, paused, reduceMotion, step]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_PX) {
      step(1);
    } else if (info.offset.x > SWIPE_PX) {
      step(-1);
    }
  };

  if (!current) {
    return null;
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} ${labels.galleryLabel}`}
      className="flex flex-col gap-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      <div
        tabIndex={multiple ? 0 : undefined}
        onKeyDown={(event) => {
          if (!multiple) {
            return;
          }

          if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          }

          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          }
        }}
        className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-navy/8 bg-background-soft shadow-[0_28px_64px_-32px_color-mix(in_srgb,var(--brand-navy)_28%,transparent)] ring-1 ring-navy/8 outline-none focus-visible:ring-2 focus-visible:ring-ring/70 lg:rounded-[2rem]"
      >
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            key={current.path}
            custom={direction}
            drag={multiple && !reduceMotion ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={onDragEnd}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: direction * 56 }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: direction * -56 }
            }
            transition={{ duration: duration.slow, ease: defaultEase }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <SiteImage
              image={current}
              fill
              priority={index === 0}
              sizes={imageSizes.pageHero}
              className="absolute inset-0"
              imageClassName="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {multiple ? (
          <>
            <button
              type="button"
              aria-label={labels.previousSlide}
              onClick={() => step(-1)}
              className={cn(
                buttonVariants({ variant: "outline", size: "icon-sm" }),
                "absolute top-1/2 left-3 z-10 -translate-y-1/2 bg-white/90 shadow-sm backdrop-blur-sm sm:left-4",
              )}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              aria-label={labels.nextSlide}
              onClick={() => step(1)}
              className={cn(
                buttonVariants({ variant: "outline", size: "icon-sm" }),
                "absolute top-1/2 right-3 z-10 -translate-y-1/2 bg-white/90 shadow-sm backdrop-blur-sm sm:right-4",
              )}
            >
              <ChevronRight />
            </button>
          </>
        ) : null}
      </div>

      {multiple ? (
        <div className="flex items-center justify-between gap-4 px-1">
          <p className="font-mono text-caption text-text-muted tabular-nums">
            {String(index + 1).padStart(2, "0")}
            <span className="px-1.5 text-navy/25">/</span>
            {String(images.length).padStart(2, "0")}
          </p>

          <div className="flex items-center gap-2">
            {images.map((image, slideIndex) => (
              <button
                key={image.path}
                type="button"
                aria-label={`${labels.slideLabel} ${slideIndex + 1}`}
                aria-current={slideIndex === index ? "true" : undefined}
                onClick={() => goTo(slideIndex)}
                className={cn(
                  "h-2 rounded-full transition-[width,background-color] duration-300",
                  slideIndex === index
                    ? "w-7 bg-brand-teal"
                    : "w-2 bg-navy/15 hover:bg-navy/30",
                )}
              />
            ))}
          </div>

          <p className="hidden text-caption text-text-muted sm:block">
            {labels.galleryLabel}
          </p>
        </div>
      ) : null}
    </div>
  );
}
