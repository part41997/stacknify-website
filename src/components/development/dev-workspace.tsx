"use client";

import { motion, useInView } from "framer-motion";
import { useId, useRef, type CSSProperties, type ReactNode } from "react";

import { EditorialStage } from "@/components/media/editorial-stage";
import { aiDevelopmentContent, type DevPanelId } from "@/data/ai-development";
import { getSiteImage, imageSizes } from "@/data/images";
import { useMotionProfile } from "@/hooks/use-motion-profile";
import { usePointerParallax } from "@/hooks/use-pointer-parallax";
import { isImageReady } from "@/lib/images";
import { cn } from "@/lib/utils";

type DevWorkspaceProps = {
  activePanel?: DevPanelId | null;
  className?: string;
};

export function DevWorkspace({
  activePanel = null,
  className,
}: DevWorkspaceProps) {
  const image = getSiteImage("ai.workspace");

  if (isImageReady(image)) {
    return (
      <EditorialStage
        image={image}
        className={className}
        sizes={imageSizes.story}
        label={aiDevelopmentContent.visualLabel}
      />
    );
  }

  return (
    <DevWorkspaceDiagram activePanel={activePanel} className={className} />
  );
}

function DevWorkspaceDiagram({
  activePanel = null,
  className,
}: DevWorkspaceProps) {
  const { reduceMotion, allowAmbient, allowParallax } = useMotionProfile();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.28, margin: "-8% 0px" });
  const parallax = usePointerParallax(allowParallax, 5);
  const uid = useId().replace(/:/g, "");
  const live = allowAmbient && inView && !reduceMotion;
  const codeActive = activePanel === "code";

  return (
    <div
      ref={ref}
      data-inview={inView ? "true" : undefined}
      role="img"
      aria-label={aiDevelopmentContent.visualLabel}
      onPointerMove={parallax.onPointerMove}
      onPointerLeave={parallax.onPointerLeave}
      className={cn(
        "dev-workspace relative isolate overflow-hidden rounded-[1.75rem] border border-navy/8 bg-white shadow-sm lg:rounded-[2rem]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_14%,color-mix(in_srgb,var(--brand-mint)_24%,white),transparent_56%),radial-gradient(ellipse_at_88%_86%,color-mix(in_srgb,var(--brand-navy)_4%,transparent),transparent_48%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 site-grid opacity-[0.2]"
      />

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ x: parallax.x, y: parallax.y }}
      >
        <svg
          viewBox="0 0 960 720"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 size-full"
          fill="none"
          aria-hidden
        >
          <defs>
            <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="white" stopOpacity="0.92" />
              <stop offset="1" stopColor="var(--brand-mint)" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id={`${uid}-window`} x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="var(--brand-mint)" stopOpacity="0.55" />
              <stop offset="1" stopColor="white" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id={`${uid}-desk`} x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="var(--brand-navy)" stopOpacity="0.04" />
              <stop offset="1" stopColor="var(--brand-navy)" stopOpacity="0.08" />
            </linearGradient>
            <radialGradient id={`${uid}-glow`} cx="50%" cy="42%" r="42%">
              <stop stopColor="var(--brand-cyan)" stopOpacity="0.16" />
              <stop offset="1" stopColor="var(--brand-cyan)" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="480" cy="310" r="268" fill={`url(#${uid}-glow)`} />
          <circle
            cx="480"
            cy="310"
            r="228"
            stroke="var(--brand-navy)"
            strokeOpacity="0.04"
          />
          <circle
            cx="480"
            cy="310"
            r="168"
            stroke="var(--brand-teal)"
            strokeOpacity="0.08"
          />

          <rect
            x="48"
            y="72"
            width="168"
            height="236"
            rx="18"
            fill={`url(#${uid}-window)`}
            stroke="var(--brand-navy)"
            strokeOpacity="0.06"
          />
          <path
            d="M132 72 V308"
            stroke="white"
            strokeOpacity="0.45"
            strokeWidth="2"
          />
          <path
            d="M48 190 H216"
            stroke="white"
            strokeOpacity="0.45"
            strokeWidth="2"
          />

          <ellipse
            cx="156"
            cy="548"
            rx="28"
            ry="8"
            fill="var(--brand-navy)"
            fillOpacity="0.06"
          />
          <path
            d="M156 470 C132 500, 128 530, 140 548 C152 534, 168 534, 172 548 C184 528, 180 498, 156 470 Z"
            fill="var(--brand-teal)"
            fillOpacity="0.18"
          />
          <rect
            x="150"
            y="536"
            width="12"
            height="22"
            rx="3"
            fill="var(--brand-navy)"
            fillOpacity="0.12"
          />

          <rect
            x="88"
            y="556"
            width="784"
            height="92"
            rx="28"
            fill={`url(#${uid}-desk)`}
          />
          <rect
            x="88"
            y="556"
            width="784"
            height="10"
            rx="5"
            fill="white"
            fillOpacity="0.55"
          />

          <rect
            x="236"
            y="132"
            width="488"
            height="348"
            rx="22"
            fill={`url(#${uid}-glass)`}
            stroke="var(--brand-navy)"
            strokeOpacity={codeActive ? 0.16 : 0.08}
          />
          <rect
            x="252"
            y="148"
            width="456"
            height="300"
            rx="14"
            fill="white"
            stroke="var(--brand-navy)"
            strokeOpacity={codeActive ? 0.14 : 0.07}
          />
          <rect
            x="252"
            y="148"
            width="456"
            height="32"
            rx="14"
            fill="var(--brand-navy)"
            fillOpacity="0.035"
          />
          <circle cx="274" cy="164" r="4" fill="var(--brand-teal)" fillOpacity="0.45" />
          <circle cx="290" cy="164" r="4" fill="var(--brand-navy)" fillOpacity="0.12" />
          <circle cx="306" cy="164" r="4" fill="var(--brand-navy)" fillOpacity="0.08" />
          <rect
            x="328"
            y="158"
            width="88"
            height="12"
            rx="6"
            fill="var(--brand-mint)"
            fillOpacity="0.7"
          />
          <rect
            x="424"
            y="158"
            width="64"
            height="12"
            rx="6"
            fill="var(--brand-navy)"
            fillOpacity="0.06"
          />

          <rect
            x="252"
            y="180"
            width="56"
            height="268"
            fill="var(--brand-navy)"
            fillOpacity="0.03"
          />
          {[0, 1, 2, 3, 4].map((row) => (
            <rect
              key={`nav-${row}`}
              x="266"
              y={196 + row * 28}
              width={row === 1 ? 28 : 22}
              height="8"
              rx="4"
              fill={row === 1 ? "var(--brand-teal)" : "var(--brand-navy)"}
              fillOpacity={row === 1 ? 0.32 : 0.1}
            />
          ))}

          {[
            { y: 200, w: 196, accent: false },
            { y: 224, w: 248, accent: true },
            { y: 248, w: 164, accent: false },
            { y: 272, w: 220, accent: false },
            { y: 296, w: 132, accent: false },
            { y: 320, w: 236, accent: true },
            { y: 344, w: 176, accent: false },
            { y: 368, w: 204, accent: false },
            { y: 392, w: 148, accent: false },
          ].map((line) => (
            <g key={line.y}>
              <rect
                x="324"
                y={line.y}
                width="18"
                height="8"
                rx="4"
                fill="var(--brand-navy)"
                fillOpacity="0.08"
              />
              <rect
                x="350"
                y={line.y}
                width={line.w}
                height="8"
                rx="4"
                fill={line.accent ? "var(--brand-teal)" : "var(--brand-navy)"}
                fillOpacity={line.accent ? 0.28 : 0.09}
              />
            </g>
          ))}

          <rect
            x="628"
            y="200"
            width="4"
            height="28"
            rx="2"
            fill="var(--brand-teal)"
            fillOpacity="0.55"
            className={live ? "dev-caret" : undefined}
          />

          <rect
            x="668"
            y="196"
            width="22"
            height="236"
            rx="6"
            fill="var(--brand-navy)"
            fillOpacity="0.04"
          />
          {[0, 1, 2, 3, 4, 5].map((bar) => (
            <rect
              key={`map-${bar}`}
              x="672"
              y={204 + bar * 36}
              width="14"
              height={bar === 2 ? 22 : 12}
              rx="3"
              fill="var(--brand-navy)"
              fillOpacity={bar === 2 ? 0.14 : 0.07}
            />
          ))}

          <rect
            x="454"
            y="480"
            width="52"
            height="22"
            rx="4"
            fill="var(--brand-navy)"
            fillOpacity="0.08"
          />
          <rect
            x="438"
            y="500"
            width="84"
            height="10"
            rx="3"
            fill="var(--brand-navy)"
            fillOpacity="0.05"
          />
          <rect
            x="336"
            y="528"
            width="288"
            height="18"
            rx="8"
            fill="white"
            stroke="var(--brand-navy)"
            strokeOpacity="0.08"
          />
          <rect
            x="640"
            y="524"
            width="48"
            height="26"
            rx="8"
            fill="white"
            stroke="var(--brand-navy)"
            strokeOpacity="0.08"
          />
        </svg>

        <FloatingPanel
          id="code"
          label="Code"
          active={activePanel === "code"}
          live={live}
          className="top-[8%] left-[5%] w-[min(40%,17.5rem)]"
          style={{ "--dev-fy": "-7px", "--dev-fd": "6.4s" }}
        >
          <CodePanel />
        </FloatingPanel>

        <FloatingPanel
          id="assistant"
          label="AI Assistant"
          active={activePanel === "assistant"}
          live={live}
          className="top-[7%] right-[5%] w-[min(38%,16.5rem)]"
          style={{
            "--dev-fy": "-9px",
            "--dev-fd": "7.2s",
            "--float-delay": "-1.2s",
          }}
        >
          <AssistantPanel />
        </FloatingPanel>

        <FloatingPanel
          id="workflow"
          label="Workflow"
          active={activePanel === "workflow" || activePanel === "agent"}
          live={live}
          className="bottom-[26%] left-[5%] w-[min(36%,15.5rem)]"
          style={{
            "--dev-fy": "-6px",
            "--dev-fd": "6.8s",
            "--float-delay": "-2.1s",
          }}
        >
          <WorkflowPanel agent={activePanel === "agent"} />
        </FloatingPanel>

        <FloatingPanel
          id="analytics"
          label="Analytics"
          active={activePanel === "analytics"}
          live={live}
          className="right-[6%] bottom-[30%] w-[min(34%,14.5rem)]"
          style={{
            "--dev-fy": "-8px",
            "--dev-fd": "7.6s",
            "--float-delay": "-0.6s",
          }}
        >
          <AnalyticsPanel />
        </FloatingPanel>

        <FloatingPanel
          id="testing"
          label="Testing"
          active={activePanel === "testing"}
          live={live}
          className="right-[16%] bottom-[7%] w-[min(36%,15.5rem)]"
          style={{
            "--dev-fy": "-5px",
            "--dev-fd": "6.2s",
            "--float-delay": "-1.8s",
          }}
        >
          <TestingPanel />
        </FloatingPanel>
      </motion.div>
    </div>
  );
}

function FloatingPanel({
  id,
  label,
  active,
  live,
  className,
  style,
  children,
}: {
  id: string;
  label: string;
  active: boolean;
  live: boolean;
  className?: string;
  style?: CSSProperties & Record<`--${string}`, string>;
  children: ReactNode;
}) {
  return (
    <div
      data-panel={id}
      data-active={active ? "true" : undefined}
      className={cn(
        "dev-float absolute z-10 rounded-2xl border bg-white/92 p-3 shadow-sm backdrop-blur-[6px] transition-[border-color,box-shadow,transform] duration-300",
        active ? "border-teal/45 shadow-md" : "border-navy/8",
        live && "dev-float-live",
        className,
      )}
      style={style}
    >
      <p className="mb-2 font-heading text-[0.625rem] tracking-[0.16em] text-navy/40 uppercase">
        {label}
      </p>
      {children}
    </div>
  );
}

function CodePanel() {
  return (
    <svg viewBox="0 0 220 92" className="w-full" fill="none" aria-hidden>
      {[0, 1, 2, 3].map((row) => (
        <g key={row}>
          <rect
            x="8"
            y={10 + row * 20}
            width="14"
            height="6"
            rx="3"
            fill="var(--brand-navy)"
            fillOpacity="0.12"
          />
          <rect
            x="30"
            y={10 + row * 20}
            width={row === 1 ? 150 : row === 3 ? 92 : 128}
            height="6"
            rx="3"
            fill={row === 1 ? "var(--brand-teal)" : "var(--brand-navy)"}
            fillOpacity={row === 1 ? 0.32 : 0.1}
          />
        </g>
      ))}
    </svg>
  );
}

function AssistantPanel() {
  return (
    <svg viewBox="0 0 200 96" className="w-full" fill="none" aria-hidden>
      <rect
        x="8"
        y="8"
        width="120"
        height="28"
        rx="12"
        fill="var(--brand-mint)"
        fillOpacity="0.7"
      />
      <rect
        x="20"
        y="18"
        width="72"
        height="8"
        rx="4"
        fill="var(--brand-navy)"
        fillOpacity="0.12"
      />
      <rect
        x="72"
        y="44"
        width="120"
        height="28"
        rx="12"
        fill="white"
        stroke="var(--brand-navy)"
        strokeOpacity="0.08"
      />
      <rect
        x="86"
        y="54"
        width="80"
        height="8"
        rx="4"
        fill="var(--brand-teal)"
        fillOpacity="0.28"
      />
    </svg>
  );
}

function WorkflowPanel({ agent }: { agent: boolean }) {
  return (
    <svg viewBox="0 0 200 72" className="w-full" fill="none" aria-hidden>
      <circle
        cx="24"
        cy="36"
        r="12"
        fill="white"
        stroke="var(--brand-navy)"
        strokeOpacity="0.12"
      />
      <circle
        cx="100"
        cy="36"
        r="14"
        fill={agent ? "var(--brand-mint)" : "white"}
        stroke="var(--brand-teal)"
        strokeOpacity={agent ? 0.55 : 0.28}
      />
      <circle
        cx="176"
        cy="36"
        r="12"
        fill="white"
        stroke="var(--brand-navy)"
        strokeOpacity="0.12"
      />
      <path
        d="M36 36 H86 M114 36 H164"
        stroke="var(--brand-teal)"
        strokeOpacity="0.35"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function AnalyticsPanel() {
  return (
    <svg viewBox="0 0 180 80" className="w-full" fill="none" aria-hidden>
      {[28, 44, 36, 58, 48].map((height, index) => (
        <rect
          key={`${height}-${index}`}
          x={18 + index * 32}
          y={70 - height}
          width="16"
          height={height}
          rx="6"
          fill={index === 3 ? "var(--brand-teal)" : "var(--brand-navy)"}
          fillOpacity={index === 3 ? 0.38 : 0.08 + index * 0.03}
        />
      ))}
    </svg>
  );
}

function TestingPanel() {
  return (
    <svg viewBox="0 0 200 78" className="w-full" fill="none" aria-hidden>
      {[0, 1, 2].map((row) => (
        <g key={row}>
          <circle
            cx="18"
            cy={16 + row * 24}
            r="8"
            fill="white"
            stroke="var(--brand-teal)"
            strokeOpacity="0.45"
          />
          <path
            d={`M14 ${14 + row * 24} L17 ${19 + row * 24} L23 ${12 + row * 24}`}
            stroke="var(--brand-teal)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="36"
            y={12 + row * 24}
            width={row === 1 ? 128 : 96}
            height="8"
            rx="4"
            fill="var(--brand-navy)"
            fillOpacity="0.1"
          />
        </g>
      ))}
    </svg>
  );
}
