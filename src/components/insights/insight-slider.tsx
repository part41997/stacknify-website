"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { InsightCard } from "@/components/insights/insight-card";
import { buttonVariants } from "@/components/ui/button";
import { insightsContent } from "@/data/insights";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import type { Insight } from "@/types";

const AUTO_MS = 4800;

type InsightSliderProps = {
  items: readonly Insight[];
};

export function InsightSlider({ items }: InsightSliderProps) {
  const reduceMotion = usePrefersReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [hidden, setHidden] = useState(false);
  const multiple = items.length > 1;

  const goTo = useCallback(
    (next: number) => {
      const scroller = scrollerRef.current;
      if (!scroller || items.length === 0) {
        return;
      }

      const target = ((next % items.length) + items.length) % items.length;
      const slide = scroller.querySelector<HTMLElement>(
        `[data-slide="${target}"]`,
      );

      if (!slide) {
        return;
      }

      const left =
        slide.getBoundingClientRect().left -
        scroller.getBoundingClientRect().left +
        scroller.scrollLeft;

      scroller.scrollTo({
        left,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [items.length, reduceMotion],
  );

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    const slides = [...scroller.querySelectorAll<HTMLElement>("[data-slide]")];
    if (slides.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) {
          return;
        }

        const next = slides.indexOf(visible.target as HTMLElement);
        if (next >= 0) {
          setIndex(next);
        }
      },
      { root: scroller, threshold: 0.55 },
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (!multiple || paused || reduceMotion || !inView || hidden) {
      return;
    }

    const timer = window.setInterval(() => goTo(index + 1), AUTO_MS);
    return () => window.clearInterval(timer);
  }, [goTo, hidden, inView, index, multiple, paused, reduceMotion]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={insightsContent.carouselLabel}
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background-soft to-transparent sm:w-12 lg:w-16"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background-soft to-transparent sm:w-12 lg:w-16"
        />

        <div
          ref={scrollerRef}
          tabIndex={0}
          onKeyDown={(event) => {
            if (!multiple) {
              return;
            }

            if (event.key === "ArrowLeft") {
              event.preventDefault();
              goTo(index - 1);
            }

            if (event.key === "ArrowRight") {
              event.preventDefault();
              goTo(index + 1);
            }
          }}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-gutter py-2 [scrollbar-width:none] [-ms-overflow-style:none] sm:gap-6 sm:px-gutter-md lg:gap-7 lg:px-gutter-lg [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, slideIndex) => (
            <div
              key={item.slug}
              data-slide={slideIndex}
              className="flex w-[min(20.5rem,calc(100vw-3rem))] shrink-0 snap-start sm:w-[min(24rem,calc(50vw-2.75rem))] lg:w-[min(26rem,calc(34vw-2rem))]"
            >
              <InsightCard insight={item} className="w-full" />
            </div>
          ))}
        </div>
      </div>

      {multiple ? (
        <div className="mx-auto mt-8 flex max-w-container items-center justify-center gap-4 px-gutter sm:justify-between sm:px-gutter-md lg:mt-10 lg:px-gutter-lg">
          <div className="flex items-center gap-2">
            {items.map((item, slideIndex) => (
              <button
                key={item.slug}
                type="button"
                aria-label={`Show insight ${slideIndex + 1}`}
                aria-current={slideIndex === index ? "true" : undefined}
                onClick={() => goTo(slideIndex)}
                className={cn(
                  "relative h-2 overflow-hidden rounded-full transition-[width,background-color] duration-300",
                  slideIndex === index
                    ? "w-7 bg-navy/15"
                    : "w-2 bg-navy/15 hover:bg-navy/30",
                )}
              >
                {slideIndex === index ? (
                  <span
                    key={`${item.slug}-${index}-${paused || reduceMotion || !inView || hidden ? "idle" : "run"}`}
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full bg-teal",
                      paused || reduceMotion || !inView || hidden
                        ? "w-full"
                        : "animate-insight-progress",
                    )}
                  />
                ) : null}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={insightsContent.previousLabel}
              onClick={() => goTo(index - 1)}
              className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              aria-label={insightsContent.nextLabel}
              onClick={() => goTo(index + 1)}
              className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
