"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useId, useRef, useState } from "react";

import { SectionImage } from "@/components/media/section-image";
import { whyIcons } from "@/components/why/icons";
import { siteConfig } from "@/data/site";
import {
  whyCenter,
  whyContent,
  whyOrbit,
  whyPoint,
  whyReasons,
  whySpokePath,
} from "@/data/why";
import { useMotionProfile } from "@/hooks/use-motion-profile";
import { usePointerParallax } from "@/hooks/use-pointer-parallax";
import { defaultEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

const COMPASS_TICKS = Array.from({ length: 28 }, (_, index) => index * (360 / 28));

export function WhyConstellation() {
  const { canHover, reduceMotion, allowAmbient, allowParallax } =
    useMotionProfile();
  const [activeSlug, setActiveSlug] = useState(whyReasons[0]?.slug ?? null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.24, margin: "-8% 0px" });
  const uid = useId().replace(/:/g, "");
  const parallax = usePointerParallax(allowParallax, 6);
  const live = allowAmbient && inView && !reduceMotion;
  const active = whyReasons.find((reason) => reason.slug === activeSlug) ?? whyReasons[0];

  function activate(slug: string) {
    setActiveSlug(slug);
  }

  return (
    <div
      ref={ref}
      data-slot="why-constellation"
      data-inview={inView ? "true" : undefined}
      className="why-constellation grid gap-6 lg:grid-cols-[minmax(19rem,22.5rem)_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[24rem_minmax(0,1fr)]"
    >
      <ul
        aria-label={whyContent.mapLabel}
        className="order-2 flex flex-col gap-2.5 lg:order-1"
      >
        {whyReasons.map((reason) => {
          const isActive = active?.slug === reason.slug;
          const Icon = whyIcons[reason.slug];

          return (
            <li key={reason.slug}>
              <button
                type="button"
                aria-pressed={isActive}
                aria-describedby="why-detail"
                onMouseEnter={canHover ? () => activate(reason.slug) : undefined}
                onFocus={() => activate(reason.slug)}
                onClick={() => activate(reason.slug)}
                className={cn(
                  "group/reason flex w-full items-start gap-3.5 rounded-2xl border px-4 py-3.5 text-left outline-none transition-[border-color,background-color,box-shadow,transform] duration-300 sm:py-4",
                  "focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2",
                  isActive
                    ? "border-teal/35 bg-white shadow-[0_16px_40px_-24px_rgba(15,23,42,0.35)]"
                    : "border-navy/8 bg-white/70 hover:border-navy/16 hover:bg-white",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                    isActive ? "bg-mint text-teal" : "bg-mint/50 text-navy/50",
                  )}
                >
                  {Icon ? (
                    <Icon className="size-4" strokeWidth={1.7} aria-hidden />
                  ) : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-2">
                    <span className="font-mono text-[0.625rem] tracking-[0.18em] text-teal">
                      {reason.number}
                    </span>
                    <span
                      className={cn(
                        "font-heading text-[0.95rem] tracking-[-0.02em] sm:text-[1.02rem]",
                        isActive ? "text-navy" : "text-navy/70",
                      )}
                    >
                      {reason.title}
                    </span>
                  </span>
                  <AnimatePresence initial={false}>
                    {isActive ? (
                      <motion.span
                        id="why-detail"
                        aria-live="polite"
                        initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: defaultEase }}
                        className="mt-1.5 block overflow-hidden text-small text-text-secondary"
                      >
                        {reason.summary}
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div
        aria-label={whyContent.visualLabel}
        onPointerMove={parallax.onPointerMove}
        onPointerLeave={parallax.onPointerLeave}
        className="relative isolate order-1 min-h-[22rem] overflow-hidden rounded-[1.75rem] border border-navy/8 bg-[linear-gradient(165deg,#ffffff_0%,color-mix(in_srgb,var(--brand-mint)_34%,white)_46%,#f8fafc_100%)] shadow-[0_24px_60px_-36px_rgba(15,23,42,0.28)] sm:min-h-[26rem] lg:order-2 lg:min-h-full lg:rounded-[2rem]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -left-10 top-6 size-72 rounded-full bg-[color-mix(in_srgb,var(--brand-mint)_80%,transparent)] blur-3xl" />
          <div className="absolute right-[-4rem] top-10 size-56 rounded-full bg-[color-mix(in_srgb,var(--brand-cyan)_18%,transparent)] blur-3xl" />
          <div className="absolute bottom-0 left-1/3 size-64 rounded-full bg-[color-mix(in_srgb,var(--brand-teal)_14%,transparent)] blur-3xl" />
          <div className="absolute inset-0 site-grid opacity-[0.18]" />
        </div>

        <motion.div
          className="absolute inset-0"
          style={{ x: parallax.x, y: parallax.y }}
        >
          <WhyPracticeTable
            uid={uid}
            live={live}
            activeSlug={active?.slug ?? null}
          />

          <div
            className="absolute z-20 flex -translate-x-1/2 -translate-y-[58%] flex-col items-center"
            style={{ left: `${whyCenter.x}%`, top: `${whyCenter.y}%` }}
          >
            <div className="relative flex size-[6.5rem] items-center justify-center rounded-full border border-white bg-white shadow-[0_22px_44px_-18px_rgba(15,23,42,0.4),0_0_0_8px_color-mix(in_srgb,var(--brand-mint)_75%,white)] sm:size-[7.75rem] lg:size-[8.5rem]">
              <span className="relative block h-[4.1rem] w-[3.75rem] sm:h-[4.9rem] sm:w-[4.5rem]">
                <SectionImage
                  id="brand.logo-vertical"
                  fill
                  fallback={false}
                  sizes="96px"
                  className="absolute inset-0"
                  imageClassName="object-contain"
                />
              </span>
            </div>
            <p className="sr-only">{siteConfig.name}</p>
          </div>

          <ul className="absolute inset-0" aria-hidden>
            {whyReasons.map((reason) => {
              const point = whyPoint(reason.angle);
              const isActive = active?.slug === reason.slug;
              const Icon = whyIcons[reason.slug];

              return (
                <li
                  key={reason.slug}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                >
                  <span
                    className={cn(
                      "flex size-12 items-center justify-center rounded-2xl border shadow-[0_12px_28px_-16px_rgba(15,23,42,0.4)] backdrop-blur-md transition-[transform,background-color,border-color] duration-300 sm:size-[3.35rem]",
                      isActive
                        ? "scale-110 border-teal/45 bg-white text-teal"
                        : "border-white/80 bg-white/90 text-navy/45",
                    )}
                  >
                    {Icon ? (
                      <Icon className="size-4" strokeWidth={1.7} />
                    ) : null}
                  </span>
                </li>
              );
            })}
          </ul>
        </motion.div>

        {active ? (
          <p className="absolute bottom-4 left-5 z-30 max-w-[16rem] font-heading text-[0.7rem] tracking-[0.14em] text-navy/45 uppercase sm:bottom-5 sm:left-6">
            {active.number} · {active.title}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function WhyPracticeTable({
  uid,
  live,
  activeSlug,
}: {
  uid: string;
  live: boolean;
  activeSlug: string | null;
}) {
  const active = whyReasons.find((reason) => reason.slug === activeSlug) ?? null;

  return (
    <svg
      viewBox="0 0 100 100"
      className="pointer-events-none absolute inset-0 size-full overflow-visible"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${uid}-line`} x1="18" y1="20" x2="82" y2="80">
          <stop stopColor="var(--brand-navy)" />
          <stop offset="0.45" stopColor="var(--brand-teal)" />
          <stop offset="1" stopColor="var(--brand-cyan)" />
        </linearGradient>
        <linearGradient id={`${uid}-floor`} x1="50" y1="36" x2="50" y2="82">
          <stop stopColor="color-mix(in srgb, var(--brand-mint) 55%, white)" />
          <stop offset="1" stopColor="color-mix(in srgb, var(--brand-navy) 6%, white)" />
        </linearGradient>
        <radialGradient id={`${uid}-well`} cx="50%" cy="50%" r="50%">
          <stop stopColor="var(--brand-cyan)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--brand-cyan)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d="M10 58 L50 80 L90 58 L50 36 Z"
        fill={`url(#${uid}-floor)`}
        fillOpacity="0.9"
      />
      <path
        d="M10 58 L50 80 L90 58 L50 36 Z"
        stroke="var(--brand-navy)"
        strokeOpacity="0.08"
        strokeWidth="0.3"
      />
      {["M22 52 L50 68 L78 52", "M30 48 L50 60 L70 48", "M18 62 L50 44", "M82 62 L50 44"].map(
        (d) => (
          <path
            key={d}
            d={d}
            stroke="var(--brand-navy)"
            strokeOpacity="0.05"
            strokeWidth="0.22"
          />
        ),
      )}

      <ellipse
        cx={whyOrbit.x}
        cy={whyOrbit.y + 6}
        rx="32"
        ry="8"
        fill="var(--brand-navy)"
        fillOpacity="0.07"
      />

      <ellipse
        cx={whyOrbit.x}
        cy={whyOrbit.y}
        rx={whyOrbit.rx + 3}
        ry={whyOrbit.ry + 3}
        stroke="var(--brand-navy)"
        strokeOpacity="0.08"
        strokeWidth="0.28"
      />
      <ellipse
        cx={whyOrbit.x}
        cy={whyOrbit.y}
        rx={whyOrbit.rx}
        ry={whyOrbit.ry}
        stroke="var(--brand-teal)"
        strokeOpacity="0.28"
        strokeDasharray="0.9 1.7"
      />
      <ellipse
        cx={whyOrbit.x}
        cy={whyOrbit.y}
        rx="22"
        ry="10"
        stroke="var(--brand-navy)"
        strokeOpacity="0.08"
      />

      {COMPASS_TICKS.map((angle) => {
        const cardinal = Math.round(angle) % 90 < 8;
        const inner = whyPoint(angle);
        const outer = {
          x: Number(
            (
              whyOrbit.x +
              Math.cos((angle * Math.PI) / 180) * (whyOrbit.rx + (cardinal ? 3.2 : 2.1))
            ).toFixed(2),
          ),
          y: Number(
            (
              whyOrbit.y +
              Math.sin((angle * Math.PI) / 180) * (whyOrbit.ry + (cardinal ? 1.5 : 1))
            ).toFixed(2),
          ),
        };

        return (
          <line
            key={angle}
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke="var(--brand-navy)"
            strokeOpacity={cardinal ? 0.18 : 0.07}
            strokeWidth={cardinal ? 0.28 : 0.14}
            strokeLinecap="round"
          />
        );
      })}

      {whyReasons.map((reason) => {
        const point = whyPoint(reason.angle);
        const isActive = activeSlug === reason.slug;

        return (
          <ellipse
            key={`${reason.slug}-well`}
            cx={point.x}
            cy={point.y}
            rx={isActive ? 8 : 5.5}
            ry={isActive ? 3.6 : 2.4}
            fill={`url(#${uid}-well)`}
            fillOpacity={isActive ? 1 : 0.55}
          />
        );
      })}

      {whyReasons.map((reason) => {
        const isActive = activeSlug === reason.slug;
        const dimmed = Boolean(activeSlug) && !isActive;

        return (
          <path
            key={reason.slug}
            d={whySpokePath(reason.angle)}
            stroke={isActive ? `url(#${uid}-line)` : "var(--brand-navy)"}
            strokeOpacity={isActive ? 0.95 : dimmed ? 0.08 : 0.2}
            strokeWidth={isActive ? 0.55 : 0.26}
            strokeLinecap="round"
            className={cn(
              "transition-[stroke-opacity,stroke-width] duration-300",
              isActive && live && "why-line-live",
            )}
          />
        );
      })}

      <ellipse
        cx={whyCenter.x}
        cy={whyCenter.y + 7.2}
        rx="13"
        ry="4.4"
        fill="var(--brand-navy)"
        fillOpacity="0.1"
      />
      <path
        d="M37.5 49.2 C37.5 51.4 43.1 53.2 50 53.2 C56.9 53.2 62.5 51.4 62.5 49.2 L62.5 51.6 C62.5 53.8 56.9 55.6 50 55.6 C43.1 55.6 37.5 53.8 37.5 51.6 Z"
        fill="var(--brand-teal)"
        fillOpacity="0.22"
      />
      <ellipse
        cx={whyCenter.x}
        cy={whyCenter.y + 2.4}
        rx="12.5"
        ry="4.2"
        fill="color-mix(in srgb, var(--brand-mint) 70%, white)"
        stroke="var(--brand-teal)"
        strokeOpacity="0.28"
        strokeWidth="0.3"
      />

      <g opacity="0.9">
        <rect x="16" y="24" width="14" height="8" rx="2.2" fill="white" stroke="var(--brand-navy)" strokeOpacity="0.08" />
        <rect x="18.2" y="27" width="6" height="1.4" rx="0.7" fill="var(--brand-teal)" fillOpacity="0.45" />
        <rect x="72" y="22" width="13" height="8" rx="2.2" fill="white" stroke="var(--brand-navy)" strokeOpacity="0.08" />
        <rect x="74.2" y="25" width="8" height="1.4" rx="0.7" fill="var(--brand-navy)" fillOpacity="0.12" />
        <rect x="78" y="72" width="12" height="7" rx="2" fill="white" stroke="var(--brand-navy)" strokeOpacity="0.08" />
        <rect x="80" y="74.6" width="7" height="1.3" rx="0.65" fill="var(--brand-cyan)" fillOpacity="0.5" />
      </g>

      {active && live ? (
        <circle key={active.slug} r="0.95" fill="var(--brand-cyan)">
          <animateMotion
            dur="2.1s"
            repeatCount="indefinite"
            path={whySpokePath(active.angle)}
          />
        </circle>
      ) : null}
    </svg>
  );
}
