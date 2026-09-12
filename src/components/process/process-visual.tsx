"use client";

import { AnimatePresence, motion, type MotionValue } from "framer-motion";
import { useId } from "react";

import { SiteImage } from "@/components/media/site-image";
import { getProcessImage, imageSizes } from "@/data/images";
import { processJourney, processSteps } from "@/data/process";
import { isImageReady } from "@/lib/images";
import { defaultEase } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { SiteImageAsset } from "@/types";

type ProcessSceneProps = {
  activeIndex: number;
  compact?: boolean;
  className?: string;
};

export function ProcessJourney({
  activeIndex,
  compact = false,
  className,
}: ProcessSceneProps) {
  const step = processSteps[activeIndex] ?? processSteps[0];
  const caption =
    processJourney.nodes[activeIndex]?.label ?? processJourney.nodes[0]?.label;
  const frame = cn(
    "process-journey relative overflow-hidden rounded-[1.75rem] border border-navy/8 bg-white lg:rounded-[2rem]",
    compact
      ? "aspect-[16/10] min-h-[16rem]"
      : "aspect-[16/9] min-h-[20rem] lg:aspect-[16/8] lg:min-h-[28rem]",
    className,
  );
  const photos = processSteps.flatMap((item) => {
    const image = getProcessImage(item.slug);
    if (!isImageReady(image)) {
      return [];
    }

    return [{ slug: item.slug, image }];
  });
  const photosReady = photos.length === processSteps.length;

  if (photosReady) {
    return (
      <div data-slot="process-journey" className={frame}>
        {photos.map((item, index) => (
          <ProcessPhotoLayer
            key={item.image.id}
            image={item.image}
            active={index === activeIndex}
          />
        ))}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-white/92 via-white/20 to-transparent"
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={caption}
            className="absolute top-4 left-4 z-10 rounded-full bg-white/95 px-3 py-1 font-heading text-[0.625rem] tracking-[0.16em] text-navy uppercase sm:top-5 sm:left-5"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.28, ease: defaultEase }}
          >
            {caption}
          </motion.p>
        </AnimatePresence>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step.slug}
            className="absolute right-4 bottom-4 z-10 left-4 sm:right-5 sm:bottom-5 sm:left-5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: defaultEase }}
          >
            <p className="font-mono text-caption text-navy/55 tabular-nums">
              {step.number}
            </p>
            <p className="mt-1 font-heading text-title text-navy">{step.title}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <ProcessJourneyDiagram
      activeIndex={activeIndex}
      caption={caption}
      className={frame}
    />
  );
}

function ProcessPhotoLayer({
  image,
  active,
}: {
  image: SiteImageAsset;
  active: boolean;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.4, ease: defaultEase }}
      style={{ zIndex: active ? 1 : 0 }}
    >
      <SiteImage
        image={image}
        fill
        loading="eager"
        sizes={imageSizes.wide}
        className="absolute inset-0"
        imageClassName="object-cover object-center"
      />
    </motion.div>
  );
}

export function ProcessStepStill({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const photo = getProcessImage(slug);

  if (!isImageReady(photo)) {
    return null;
  }

  return (
    <figure
      className={cn(
        "relative mt-4 aspect-[16/10] overflow-hidden rounded-2xl border border-navy/8 bg-surface shadow-sm",
        className,
      )}
    >
      <SiteImage
        image={photo}
        fill
        sizes="(min-width: 640px) 28rem, 100vw"
        className="absolute inset-0"
        imageClassName="object-cover object-center"
      />
    </figure>
  );
}

function ProcessJourneyDiagram({
  activeIndex,
  caption,
  className,
}: {
  activeIndex: number;
  caption: string;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");

  return (
    <div data-slot="process-journey" className={className}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_16%_18%,color-mix(in_srgb,var(--brand-mint)_20%,white),transparent_56%),radial-gradient(ellipse_at_88%_84%,color-mix(in_srgb,var(--brand-navy)_4%,transparent),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 site-grid opacity-[0.2]"
      />

      <p className="relative z-10 px-5 pt-4 font-heading text-[0.625rem] tracking-[0.16em] text-navy/40 uppercase sm:px-6">
        {caption}
      </p>

      <svg
        viewBox="0 0 960 540"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id={`${uid}-flow`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="var(--brand-teal)" stopOpacity="0.25" />
            <stop offset="1" stopColor="var(--brand-cyan)" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        <SceneLayers activeIndex={activeIndex} stroke={`url(#${uid}-flow)`} />
      </svg>
    </div>
  );
}

function SceneLayers({
  activeIndex,
  stroke,
}: {
  activeIndex: number;
  stroke: string;
}) {
  const scenes = [
    <IdeaScene key="idea" />,
    <PlanScene key="plan" />,
    <WireScene key="wire" />,
    <CodeScene key="code" />,
    <TestScene key="test" />,
    <DeployScene key="deploy" />,
    <GrowthScene key="growth" />,
  ];

  return (
    <>
      <motion.path
        d="M80 420 C 220 400, 320 280, 460 260 C 600 240, 720 180, 880 140"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: (activeIndex + 1) / scenes.length }}
        transition={{ duration: 0.4, ease: defaultEase }}
      />

      {scenes.map((scene, index) => (
        <motion.g
          key={scene.key}
          initial={false}
          animate={{ opacity: index === activeIndex ? 1 : 0 }}
          transition={{ duration: 0.4, ease: defaultEase }}
        >
          {scene}
        </motion.g>
      ))}
    </>
  );
}

function Panel({
  x,
  y,
  w,
  h,
  r = 20,
}: {
  x: number | string;
  y: number | string;
  w: number | string;
  h: number | string;
  r?: number | string;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      fill="white"
      fillOpacity="0.92"
      stroke="var(--brand-navy)"
      strokeOpacity="0.08"
    />
  );
}

function Line({
  x,
  y,
  w,
  accent = false,
}: {
  x: number | string;
  y: number | string;
  w: number | string;
  accent?: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height="7"
      rx="3.5"
      fill={accent ? "var(--brand-teal)" : "var(--brand-navy)"}
      fillOpacity={accent ? 0.32 : 0.1}
    />
  );
}

function IdeaScene() {
  return (
    <g>
      <circle cx="480" cy="250" r="92" fill="var(--brand-mint)" fillOpacity="0.55" />
      <circle cx="480" cy="250" r="56" fill="white" stroke="var(--brand-navy)" strokeOpacity="0.08" />
      <circle cx="480" cy="250" r="14" fill="var(--brand-teal)" fillOpacity="0.72" />
      <path
        d="M480 132 V108 M404 176 L386 158 M556 176 L574 158 M400 250 H372 M588 250 H616"
        stroke="var(--brand-teal)"
        strokeOpacity="0.35"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </g>
  );
}

function PlanScene() {
  return (
    <g>
      {[
        { x: 180, y: 160 },
        { x: 480, y: 120 },
        { x: 760, y: 180 },
        { x: 420, y: 340 },
      ].map((node) => (
        <g key={`${node.x}-${node.y}`}>
          <Panel x={node.x} y={node.y} w="140" h="72" r="16" />
          <Line x={node.x + 20} y={node.y + 28} w="64" accent />
        </g>
      ))}
      <path
        d="M320 196 H480 M620 196 H760 M510 192 V340"
        stroke="var(--brand-navy)"
        strokeOpacity="0.12"
        strokeDasharray="5 8"
      />
    </g>
  );
}

function WireScene() {
  return (
    <g>
      <Panel x="88" y="88" w="784" h="364" r="28" />
      <rect x="88" y="88" width="784" height="44" rx="28" fill="var(--brand-navy)" fillOpacity="0.04" />
      <Panel x="116" y="156" w="176" h="260" r="16" />
      <Line x="136" y="184" w="72" accent />
      <Line x="136" y="216" w="128" />
      <Line x="136" y="248" w="96" />
      <Panel x="316" y="156" w="240" h="112" r="16" />
      <Panel x="576" y="156" w="260" h="112" r="16" />
      <Panel x="316" y="288" w="520" h="128" r="16" />
      <Line x="336" y="320" w="88" />
      <Line x="336" y="352" w="200" accent />
    </g>
  );
}

function CodeScene() {
  return (
    <g>
      <Panel x="120" y="96" w="720" h="348" r="24" />
      <Line x="168" y="148" w="48" accent />
      <Line x="232" y="148" w="160" />
      <Line x="188" y="188" w="280" />
      <Line x="188" y="228" w="200" />
      <Line x="168" y="268" w="48" accent />
      <Line x="232" y="268" w="220" />
      <Line x="188" y="308" w="320" />
      <Line x="188" y="348" w="140" />
      <path
        d="M760 180 L800 220 L760 260"
        stroke="var(--brand-cyan)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M200 180 L160 220 L200 260"
        stroke="var(--brand-teal)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function TestScene() {
  return (
    <g>
      <circle cx="480" cy="250" r="110" stroke="var(--brand-navy)" strokeOpacity="0.08" strokeWidth="2" />
      <circle cx="480" cy="250" r="72" fill="var(--brand-mint)" fillOpacity="0.5" />
      <path
        d="M436 252 L466 282 L536 212"
        stroke="var(--brand-teal)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Panel x="120" y="120" w="160" h="64" r="14" />
      <Line x="140" y="146" w="88" />
      <Panel x="680" y="120" w="160" h="64" r="14" />
      <Line x="700" y="146" w="72" accent />
      <Panel x="120" y="356" w="160" h="64" r="14" />
      <Line x="140" y="382" w="96" accent />
      <Panel x="680" y="356" w="160" h="64" r="14" />
      <Line x="700" y="382" w="80" />
    </g>
  );
}

function DeployScene() {
  return (
    <g>
      <Panel x="200" y="280" w="200" h="88" r="16" />
      <Line x="220" y="316" w="88" />
      <Panel x="380" y="220" w="200" h="88" r="16" />
      <Line x="400" y="256" w="72" accent />
      <Panel x="560" y="160" w="200" h="88" r="16" />
      <Line x="580" y="196" w="96" accent />
      <path
        d="M300 280 V220 M480 220 V160 M660 160 V100"
        stroke="var(--brand-teal)"
        strokeOpacity="0.28"
        strokeWidth="1.6"
      />
      <path
        d="M640 88 L660 56 L680 88"
        stroke="var(--brand-cyan)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function GrowthScene() {
  return (
    <g>
      {[72, 120, 168, 220, 272, 328].map((height, index) => (
        <rect
          key={height}
          x={180 + index * 100}
          y={420 - height}
          width="48"
          height={height}
          rx="12"
          fill={index === 5 ? "var(--brand-teal)" : "var(--brand-navy)"}
          fillOpacity={index === 5 ? 0.4 : 0.07 + index * 0.03}
        />
      ))}
      <Panel x="88" y="72" w="200" h="88" r="16" />
      <Line x="108" y="108" w="80" accent />
      <Panel x="672" y="72" w="200" h="88" r="16" />
      <Line x="692" y="108" w="96" />
    </g>
  );
}

export function ProcessRail({
  activeIndex,
  progress,
  onSelect,
}: {
  activeIndex: number;
  progress: MotionValue<number>;
  onSelect?: (index: number) => void;
}) {
  return (
    <ol
      aria-label={processJourney.ariaLabel}
      className="relative grid grid-cols-7 gap-1"
    >
      <div
        aria-hidden
        className="absolute top-3 right-[7%] left-[7%] h-px bg-navy/10"
      />
      <motion.div
        aria-hidden
        className="absolute top-3 left-[7%] h-px origin-left bg-gradient-to-r from-teal to-cyan"
        style={{ width: "86%", scaleX: progress }}
      />
      {processSteps.map((step, index) => {
        const active = index === activeIndex;
        const complete = index < activeIndex;
        const visual = processJourney.nodes[index];

        return (
          <li key={step.slug} className="relative flex flex-col items-center">
            <button
              type="button"
              aria-current={active ? "step" : undefined}
              aria-label={`${step.number} ${step.title}`}
              onClick={onSelect ? () => onSelect(index) : undefined}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl px-1 pt-0.5 pb-1 outline-none",
                onSelect &&
                  "focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2",
              )}
            >
              <span
                className={cn(
                  "size-2.5 rounded-full border transition-[background-color,border-color,transform,box-shadow] duration-300",
                  active &&
                    "scale-125 border-teal bg-teal shadow-[0_0_0_4px_color-mix(in_srgb,var(--brand-teal)_18%,transparent)]",
                  complete && !active && "border-navy/25 bg-navy/25",
                  !active && !complete && "border-navy/15 bg-white",
                )}
              />
              <span
                className={cn(
                  "font-mono text-[0.625rem] tabular-nums",
                  active ? "text-teal" : "text-navy/35",
                )}
              >
                {step.number}
              </span>
              <span
                className={cn(
                  "font-heading text-[0.7rem] tracking-[-0.02em] transition-colors duration-300",
                  active ? "text-navy" : complete ? "text-navy/55" : "text-navy/35",
                )}
              >
                {step.title}
              </span>
              {visual ? (
                <span className="hidden text-[0.6rem] tracking-[0.12em] text-navy/30 uppercase xl:block">
                  {visual.label}
                </span>
              ) : null}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
