"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useId } from "react";

import { EditorialStage } from "@/components/media/editorial-stage";
import { getProblemImage, imageSizes } from "@/data/images";
import { isImageReady } from "@/lib/images";
import { cn } from "@/lib/utils";

type ProblemSceneVisualProps = {
  slug: string;
  progress: MotionValue<number>;
  className?: string;
};

export function ProblemSceneVisual({
  slug,
  progress,
  className,
}: ProblemSceneVisualProps) {
  const photo = getProblemImage(slug);

  if (isImageReady(photo)) {
    return (
      <EditorialStage
        image={photo}
        className={className}
        sizes={imageSizes.story}
      />
    );
  }

  return (
    <ProblemSceneDiagram
      slug={slug}
      progress={progress}
      className={className}
    />
  );
}

function ProblemSceneDiagram({
  slug,
  progress,
  className,
}: ProblemSceneVisualProps) {
  const uid = useId().replace(/:/g, "");
  const problemOpacity = useTransform(progress, [0, 0.28, 0.62], [1, 0.85, 0]);
  const solutionOpacity = useTransform(progress, [0.32, 0.68, 1], [0, 0.85, 1]);
  const line = useTransform(progress, [0.18, 0.72], [0, 1]);
  const shift = useTransform(progress, [0, 1], [12, -10]);
  const reveal = useTransform(progress, [0, 0.2], [0.97, 1]);
  const clip = useTransform(
    progress,
    [0, 0.22],
    ["inset(7% 5% 7% 5%)", "inset(0% 0% 0% 0%)"],
  );

  return (
    <motion.div
      className={cn(
        "relative isolate overflow-hidden rounded-3xl border border-border bg-background-soft shadow-sm lg:rounded-[2rem]",
        className,
      )}
      style={{ clipPath: clip, scale: reveal }}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_16%,color-mix(in_srgb,var(--brand-mint)_20%,white),transparent_58%),radial-gradient(ellipse_at_88%_84%,color-mix(in_srgb,var(--brand-navy)_4%,transparent),transparent_50%)]"
      />
      <div aria-hidden className="absolute inset-0 site-grid opacity-[0.2]" />

      <motion.div className="absolute inset-0" style={{ y: shift }}>
        <svg
          viewBox="0 0 960 720"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 size-full"
          fill="none"
          aria-hidden
        >
          <defs>
            <linearGradient id={`${uid}-flow`} x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="var(--brand-teal)" stopOpacity="0.25" />
              <stop offset="1" stopColor="var(--brand-cyan)" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          <motion.g style={{ opacity: problemOpacity }}>
            <ProblemLayer slug={slug} />
          </motion.g>
          <motion.g style={{ opacity: solutionOpacity }}>
            <SolutionLayer slug={slug} />
          </motion.g>
          <TransitionLine slug={slug} line={line} stroke={`url(#${uid}-flow)`} />
        </svg>
      </motion.div>
    </motion.div>
  );
}

function ProblemLayer({ slug }: { slug: string }) {
  switch (slug) {
    case "disconnected-systems":
      return <DisconnectedProblem />;
    case "outdated-software":
      return <PlatformProblem />;
    case "low-visibility":
      return <VisibilityProblem />;
    default:
      return <ManualProblem />;
  }
}

function SolutionLayer({ slug }: { slug: string }) {
  switch (slug) {
    case "disconnected-systems":
      return <DisconnectedSolution />;
    case "outdated-software":
      return <PlatformSolution />;
    case "low-visibility":
      return <VisibilitySolution />;
    default:
      return <ManualSolution />;
  }
}

function TransitionLine({
  slug,
  line,
  stroke,
}: {
  slug: string;
  line: MotionValue<number>;
  stroke: string;
}) {
  const d =
    slug === "low-visibility"
      ? "M120 560 C 280 480, 460 280, 780 160"
      : slug === "disconnected-systems"
        ? "M200 200 C 360 240, 520 300, 760 360"
        : "M180 360 H780";

  return (
    <motion.path
      d={d}
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      style={{ pathLength: line }}
    />
  );
}

function Panel({
  x,
  y,
  w,
  h,
  r = 20,
  muted = false,
}: {
  x: number | string;
  y: number | string;
  w: number | string;
  h: number | string;
  r?: number | string;
  muted?: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      fill="white"
      fillOpacity={muted ? 0.72 : 0.94}
      stroke="var(--brand-navy)"
      strokeOpacity={muted ? 0.06 : 0.08}
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

function Caption({
  x,
  y,
  children,
  center = false,
}: {
  x: number | string;
  y: number | string;
  children: string;
  center?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={center ? "middle" : "start"}
      fill="var(--brand-navy)"
      fillOpacity="0.38"
      fontSize="13"
      fontFamily="ui-sans-serif, system-ui"
    >
      {children}
    </text>
  );
}

function ManualProblem() {
  return (
    <g>
      {[
        { x: 72, y: 96, label: "Intake" },
        { x: 360, y: 168, label: "Copy" },
        { x: 648, y: 240, label: "Send" },
      ].map((card) => (
        <g key={card.label}>
          <Panel x={card.x} y={card.y} w="240" h="168" muted />
          <circle
            cx={card.x + 28}
            cy={card.y + 36}
            r="7"
            fill="var(--brand-navy)"
            fillOpacity="0.08"
          />
          <Line x={card.x + 48} y={card.y + 32} w="88" />
          <Line x={card.x + 24} y={card.y + 72} w="168" />
          <Line x={card.x + 24} y={card.y + 100} w="132" />
          <Line x={card.x + 24} y={card.y + 128} w="96" />
          <Caption x={card.x + 24} y={card.y + 196}>
            {card.label}
          </Caption>
        </g>
      ))}
      <path
        d="M312 180 H348 M600 252 H636"
        stroke="var(--brand-navy)"
        strokeOpacity="0.12"
        strokeDasharray="6 8"
      />
    </g>
  );
}

function ManualSolution() {
  return (
    <g>
      <Panel x="72" y="168" w="220" h="148" />
      <Line x="96" y="204" w="64" accent />
      <Line x="96" y="232" w="148" />
      <Line x="96" y="260" w="108" />
      <Caption x="96" y="340">Inbox</Caption>
      <circle cx="480" cy="300" r="92" fill="var(--brand-mint)" fillOpacity="0.55" />
      <circle cx="480" cy="300" r="58" fill="white" stroke="var(--brand-navy)" strokeOpacity="0.08" />
      <circle cx="480" cy="300" r="16" fill="var(--brand-teal)" fillOpacity="0.72" />
      <Caption x="480" y="418" center>
        AI Agent
      </Caption>
      <Panel x="668" y="380" w="220" h="148" />
      <Line x="692" y="416" w="72" accent />
      <Line x="692" y="444" w="136" />
      <Line x="692" y="472" w="96" />
      <Caption x="692" y="552">Done</Caption>
    </g>
  );
}

function DisconnectedProblem() {
  const nodes = [
    { x: 88, y: 88, label: "CRM" },
    { x: 692, y: 88, label: "Inbox" },
    { x: 88, y: 488, label: "ERP" },
    { x: 692, y: 488, label: "Store" },
  ];

  return (
    <g>
      <path
        d="M268 132 H692 M176 176 V488 M784 176 V488 M268 532 H692"
        stroke="var(--brand-navy)"
        strokeOpacity="0.1"
        strokeDasharray="5 10"
      />
      {nodes.map((node) => (
        <g key={node.label}>
          <Panel x={node.x} y={node.y} w="180" h="96" muted />
          <Caption x={node.x + 24} y={node.y + 56}>{node.label}</Caption>
        </g>
      ))}
    </g>
  );
}

function DisconnectedSolution() {
  const nodes = [
    { x: 80, y: 104, label: "CRM" },
    { x: 700, y: 104, label: "Inbox" },
    { x: 80, y: 488, label: "ERP" },
    { x: 700, y: 488, label: "Store" },
  ];

  return (
    <g>
      <path
        d="M260 152 H700 M170 200 V488 M790 200 V488 M260 536 H700"
        stroke="var(--brand-teal)"
        strokeOpacity="0.28"
      />
      {nodes.map((node) => (
        <g key={node.label}>
          <Panel x={node.x} y={node.y} w="176" h="96" />
          <Caption x={node.x + 24} y={node.y + 56}>{node.label}</Caption>
        </g>
      ))}
      <circle cx="480" cy="340" r="72" fill="var(--brand-mint)" fillOpacity="0.72" />
      <circle cx="480" cy="340" r="44" fill="white" stroke="var(--brand-teal)" strokeOpacity="0.35" />
      <text
        x="480"
        y="346"
        textAnchor="middle"
        fill="var(--brand-teal)"
        fontSize="14"
        fontFamily="ui-sans-serif, system-ui"
      >
        API
      </text>
    </g>
  );
}

function PlatformProblem() {
  return (
    <g>
      <rect
        x="140"
        y="88"
        width="680"
        height="500"
        rx="8"
        fill="white"
        fillOpacity="0.72"
        stroke="var(--brand-navy)"
        strokeOpacity="0.08"
      />
      <rect x="140" y="88" width="680" height="36" fill="var(--brand-navy)" fillOpacity="0.06" />
      <rect x="156" y="148" width="168" height="408" fill="var(--brand-navy)" fillOpacity="0.04" />
      <Line x="176" y="176" w="88" />
      <Line x="176" y="208" w="128" />
      <Line x="176" y="240" w="104" />
      <Line x="176" y="272" w="88" />
      <Line x="352" y="176" w="180" />
      <Line x="352" y="208" w="320" />
      <Line x="352" y="240" w="240" />
      <rect x="352" y="288" width="428" height="200" fill="var(--brand-navy)" fillOpacity="0.04" />
      <Line x="372" y="520" w="160" />
      <Line x="552" y="520" w="88" />
    </g>
  );
}

function PlatformSolution() {
  return (
    <g>
      <Panel x="64" y="56" w="832" h="592" r="28" />
      <rect x="64" y="56" width="832" height="52" rx="28" fill="var(--brand-navy)" fillOpacity="0.035" />
      <circle cx="104" cy="82" r="5" fill="var(--brand-teal)" fillOpacity="0.42" />
      <Panel x="92" y="132" w="188" h="484" r="18" />
      <Line x="116" y="168" w="72" accent />
      <Line x="116" y="204" w="132" />
      <Line x="116" y="236" w="108" />
      <Line x="116" y="268" w="96" />
      <Panel x="304" y="132" w="216" h="120" r="16" />
      <Line x="324" y="168" w="72" />
      <Panel x="540" y="132" w="216" h="120" r="16" />
      <Line x="560" y="168" w="80" accent />
      <Panel x="776" y="132" w="96" h="120" r="16" />
      <Panel x="304" y="276" w="568" h="340" r="18" />
      <path
        d="M348 548 C 430 510, 520 420, 640 372 C 724 340, 804 300, 836 248"
        stroke="var(--brand-teal)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  );
}

function VisibilityProblem() {
  return (
    <g>
      <Panel x="168" y="140" w="624" h="400" muted />
      <Panel x="200" y="176" w="560" h="56" r="14" muted />
      <Line x="224" y="200" w="200" />
      <Line x="240" y="280" w="160" />
      <Line x="240" y="320" w="360" />
      <Line x="240" y="360" w="220" />
      <Line x="240" y="400" w="280" />
      <Caption x="240" y="468">Search</Caption>
    </g>
  );
}

function VisibilitySolution() {
  return (
    <g>
      <Panel x="64" y="72" w="232" h="112" />
      <Line x="88" y="108" w="80" accent />
      <Caption x="88" y="156">Discovery</Caption>
      {[56, 88, 124, 164, 208, 256].map((height, index) => (
        <rect
          key={height}
          x={148 + index * 72}
          y={560 - height}
          width="32"
          height={height}
          rx="10"
          fill={index === 5 ? "var(--brand-teal)" : "var(--brand-navy)"}
          fillOpacity={index === 5 ? 0.4 : 0.07 + index * 0.025}
        />
      ))}
      <Panel x="664" y="72" w="232" h="112" />
      <Line x="688" y="108" w="96" accent />
      <Caption x="688" y="156">Offer</Caption>
    </g>
  );
}
