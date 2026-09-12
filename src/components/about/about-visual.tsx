"use client";

import { motion } from "framer-motion";
import { useId } from "react";

import { aboutVisualLabel } from "@/data/about";
import { useMotionProfile } from "@/hooks/use-motion-profile";
import { defaultEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

type AboutVisualProps = {
  className?: string;
};

export function AboutVisual({ className }: AboutVisualProps) {
  const { reduceMotion, allowAmbient } = useMotionProfile();
  const uid = useId().replace(/:/g, "");

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden bg-background-soft", className)}
      role="img"
      aria-label={aboutVisualLabel}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_22%_18%,color-mix(in_srgb,var(--brand-mint)_26%,white),transparent_58%),radial-gradient(ellipse_at_86%_78%,color-mix(in_srgb,var(--brand-navy)_5%,transparent),transparent_52%),linear-gradient(165deg,#f8fafc_0%,#ffffff_48%,#f8fafc_100%)]"
      />
      <div aria-hidden className="absolute inset-0 site-grid opacity-[0.28]" />

      <motion.svg
        viewBox="0 0 640 800"
        className="absolute inset-0 size-full"
        fill="none"
        aria-hidden
        initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 0.72,
          ease: defaultEase,
        }}
      >
        <defs>
          <linearGradient id={`${uid}-glass`} x1="80" y1="90" x2="560" y2="620">
            <stop stopColor="#ffffff" stopOpacity="0.92" />
            <stop offset="1" stopColor="var(--brand-mint)" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id={`${uid}-flow`} x1="120" y1="220" x2="520" y2="560">
            <stop stopColor="var(--brand-teal)" stopOpacity="0.22" />
            <stop offset="1" stopColor="var(--brand-cyan)" stopOpacity="0.55" />
          </linearGradient>
          <radialGradient id={`${uid}-core`} cx="50%" cy="46%" r="48%">
            <stop stopColor="var(--brand-cyan)" stopOpacity="0.55" />
            <stop offset="1" stopColor="var(--brand-teal)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="430" cy="250" r="150" fill={`url(#${uid}-core)`} />

        <motion.g
          animate={allowAmbient ? { y: [0, -8, 0] } : undefined}
          transition={
            allowAmbient
              ? { duration: 10, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        >
          <rect
            x="86"
            y="148"
            width="292"
            height="196"
            rx="28"
            fill={`url(#${uid}-glass)`}
            stroke="var(--brand-navy)"
            strokeOpacity="0.08"
          />
          <rect
            x="108"
            y="176"
            width="132"
            height="8"
            rx="4"
            fill="var(--brand-navy)"
            fillOpacity="0.1"
          />
          <rect
            x="108"
            y="196"
            width="86"
            height="8"
            rx="4"
            fill="var(--brand-teal)"
            fillOpacity="0.28"
          />
          <rect
            x="108"
            y="236"
            width="248"
            height="72"
            rx="14"
            fill="white"
            fillOpacity="0.7"
            stroke="var(--brand-navy)"
            strokeOpacity="0.05"
          />
          <circle cx="136" cy="272" r="8" fill="var(--brand-cyan)" fillOpacity="0.7" />
          <rect
            x="156"
            y="266"
            width="72"
            height="6"
            rx="3"
            fill="var(--brand-navy)"
            fillOpacity="0.14"
          />
          <rect
            x="156"
            y="280"
            width="48"
            height="5"
            rx="2.5"
            fill="var(--brand-navy)"
            fillOpacity="0.08"
          />
        </motion.g>

        <motion.g
          animate={allowAmbient ? { y: [0, 6, 0] } : undefined}
          transition={
            allowAmbient
              ? { duration: 11.5, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        >
          <rect
            x="292"
            y="348"
            width="246"
            height="168"
            rx="26"
            fill="white"
            fillOpacity="0.82"
            stroke="var(--brand-navy)"
            strokeOpacity="0.07"
          />
          <rect
            x="316"
            y="378"
            width="64"
            height="6"
            rx="3"
            fill="var(--brand-navy)"
            fillOpacity="0.1"
          />
          {[0, 1, 2, 3, 4].map((index) => (
            <rect
              key={index}
              x={316 + index * 36}
              y={430 - index * 8}
              width="22"
              height={28 + index * 10}
              rx="6"
              fill={index === 3 ? "var(--brand-teal)" : "var(--brand-navy)"}
              fillOpacity={index === 3 ? 0.38 : 0.08 + index * 0.02}
            />
          ))}
        </motion.g>

        <path
          d="M232 344 C 260 380, 310 400, 338 420"
          stroke={`url(#${uid}-flow)`}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M378 148 C 420 190, 448 220, 430 250"
          stroke={`url(#${uid}-flow)`}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray={allowAmbient ? "5 10" : undefined}
        />
        <circle cx="232" cy="344" r="3.2" fill="var(--brand-teal)" fillOpacity="0.45" />
        <circle cx="338" cy="420" r="3.2" fill="var(--brand-cyan)" fillOpacity="0.55" />

        <g opacity="0.7">
          <circle cx="148" cy="560" r="46" fill="white" stroke="var(--brand-navy)" strokeOpacity="0.07" />
          <circle cx="148" cy="560" r="18" fill="var(--brand-mint)" />
          <circle cx="148" cy="560" r="6" fill="var(--brand-teal)" fillOpacity="0.7" />
          <text
            x="148"
            y="628"
            textAnchor="middle"
            fill="var(--brand-navy)"
            fillOpacity="0.42"
            fontSize="13"
            fontFamily="ui-sans-serif, system-ui"
          >
            AI
          </text>
        </g>
        <g opacity="0.7">
          <rect
            x="232"
            y="528"
            width="88"
            height="64"
            rx="16"
            fill="white"
            stroke="var(--brand-navy)"
            strokeOpacity="0.07"
          />
          <path
            d="M256 568 H296 M276 548 V588"
            stroke="var(--brand-turquoise)"
            strokeOpacity="0.55"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </g>
        <g opacity="0.7">
          <rect
            x="348"
            y="580"
            width="168"
            height="72"
            rx="18"
            fill="white"
            stroke="var(--brand-navy)"
            strokeOpacity="0.07"
          />
          <rect x="370" y="604" width="78" height="6" rx="3" fill="var(--brand-navy)" fillOpacity="0.1" />
          <rect x="370" y="620" width="48" height="6" rx="3" fill="var(--brand-teal)" fillOpacity="0.24" />
        </g>
      </motion.svg>
    </div>
  );
}
