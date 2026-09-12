"use client";

import { motion, useInView } from "framer-motion";
import { useId, useRef, type CSSProperties } from "react";

import { EditorialStage } from "@/components/media/editorial-stage";
import { finalCtaIcons } from "@/components/cta/icons";
import {
  finalCtaContent,
  finalCtaFlows,
  finalCtaNodes,
  finalCtaOperators,
} from "@/data/final-cta";
import { getSiteImage, imageSizes } from "@/data/images";
import { useMotionProfile } from "@/hooks/use-motion-profile";
import { usePointerParallax } from "@/hooks/use-pointer-parallax";
import { isImageReady } from "@/lib/images";
import { cn } from "@/lib/utils";

const TONE = {
  navy: { stroke: "var(--brand-navy)", opacity: 0.16 },
  teal: { stroke: "var(--brand-teal)", opacity: 0.34 },
  turquoise: { stroke: "var(--brand-turquoise)", opacity: 0.3 },
  cyan: { stroke: "var(--brand-cyan)", opacity: 0.4 },
} as const;

type FinalCtaVisualProps = {
  className?: string;
};

export function FinalCtaVisual({ className }: FinalCtaVisualProps) {
  const image = getSiteImage("cta.build");

  if (isImageReady(image)) {
    return (
      <EditorialStage
        image={image}
        className={className}
        sizes={imageSizes.stage}
        label={finalCtaContent.visualLabel}
      />
    );
  }

  return <FinalCtaDiagram className={className} />;
}

function FinalCtaDiagram({ className }: FinalCtaVisualProps) {
  const { reduceMotion, allowAmbient, allowParallax } = useMotionProfile();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.32, margin: "-8% 0px" });
  const uid = useId().replace(/:/g, "");
  const parallax = usePointerParallax(allowParallax, 5);
  const live = allowAmbient && inView && !reduceMotion;
  const growth = finalCtaNodes.find((node) => node.result);

  return (
    <div
      ref={ref}
      data-slot="final-cta-visual"
      data-inview={inView ? "true" : undefined}
      role="img"
      aria-label={finalCtaContent.visualLabel}
      onPointerMove={parallax.onPointerMove}
      onPointerLeave={parallax.onPointerLeave}
      className={cn(
        "cta-visual relative isolate overflow-hidden rounded-[1.75rem] border border-navy/8 bg-white shadow-sm lg:rounded-[2rem]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_78%,color-mix(in_srgb,var(--brand-mint)_28%,white),transparent_58%),radial-gradient(ellipse_at_16%_12%,color-mix(in_srgb,var(--brand-navy)_4%,transparent),transparent_46%),radial-gradient(ellipse_at_88%_8%,color-mix(in_srgb,var(--brand-teal)_6%,transparent),transparent_44%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 site-grid opacity-[0.16]"
      />

      <motion.div
        className="absolute inset-0"
        style={{ x: parallax.x, y: parallax.y }}
      >
        <svg
          viewBox="0 0 640 720"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 size-full"
          fill="none"
          aria-hidden
        >
          <defs>
            <linearGradient id={`${uid}-flow`} x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="var(--brand-navy)" stopOpacity="0.2" />
              <stop offset="0.45" stopColor="var(--brand-teal)" />
              <stop offset="1" stopColor="var(--brand-cyan)" />
            </linearGradient>
            <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
              <stop stopColor="var(--brand-cyan)" stopOpacity="0.28" />
              <stop offset="1" stopColor="var(--brand-cyan)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {growth ? (
            <>
              <circle
                cx={growth.x}
                cy={growth.y}
                r="118"
                fill={`url(#${uid}-glow)`}
              />
              <circle
                cx={growth.x}
                cy={growth.y}
                r="88"
                stroke="var(--brand-navy)"
                strokeOpacity="0.05"
              />
              <circle
                cx={growth.x}
                cy={growth.y}
                r="64"
                stroke="var(--brand-teal)"
                strokeOpacity="0.12"
                className={live ? "cta-core-ring" : undefined}
              />
            </>
          ) : null}

          {finalCtaFlows.map((flow) => (
            <path
              key={flow.id}
              d={flow.d}
              stroke={TONE[flow.tone].stroke}
              strokeOpacity={TONE[flow.tone].opacity}
              strokeWidth="1.35"
              strokeLinecap="round"
              className={live ? "cta-flow-line" : undefined}
              style={
                {
                  "--cta-flow-duration": flow.duration,
                  "--cta-flow-delay": flow.delay,
                } as CSSProperties
              }
            />
          ))}

          {live
            ? finalCtaFlows.map((flow) => (
                <circle
                  key={`${flow.id}-dot`}
                  r="2.2"
                  fill={TONE[flow.tone].stroke}
                  fillOpacity={flow.tone === "cyan" ? 0.7 : 0.45}
                >
                  <animateMotion
                    dur={flow.duration}
                    begin={flow.delay}
                    repeatCount="indefinite"
                    path={flow.d}
                  />
                </circle>
              ))
            : null}

          {finalCtaOperators.map((mark) => (
            <text
              key={mark.id}
              x={mark.x}
              y={mark.y + 6}
              textAnchor="middle"
              fill="var(--brand-teal)"
              fillOpacity="0.7"
              style={{
                fontSize: mark.mark === "=" ? 28 : 26,
                fontFamily: "var(--font-heading)",
              }}
            >
              {mark.mark}
            </text>
          ))}
        </svg>

        {finalCtaNodes.map((node, index) => {
          const Icon = finalCtaIcons[node.id];

          return (
            <div
              key={node.id}
              className={cn(
                "absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2",
                live && !node.result && "cta-node-live",
              )}
              style={{
                left: `${(node.x / 640) * 100}%`,
                top: `${(node.y / 720) * 100}%`,
                "--cta-node-delay": `${index * -0.8}s`,
              } as CSSProperties}
            >
              <span
                className={cn(
                  "relative flex items-center justify-center rounded-full border bg-white shadow-xs",
                  node.result
                    ? "size-[4.5rem] border-teal/40 text-teal sm:size-[5rem]"
                    : "size-14 border-navy/10 text-navy/55 sm:size-16",
                )}
              >
                {live ? (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-0 rounded-full",
                      node.result ? "cta-core-pulse" : "cta-node-pulse",
                    )}
                  />
                ) : null}
                <Icon className="size-5" strokeWidth={1.6} aria-hidden />
              </span>
              <span
                className={cn(
                  "font-heading tracking-[-0.02em] text-navy",
                  node.result
                    ? "text-[0.9375rem] sm:text-[1.0625rem]"
                    : "text-[0.75rem] sm:text-[0.8125rem]",
                )}
              >
                {node.label}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
