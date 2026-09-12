"use client";

import { useInView } from "framer-motion";
import { useId, useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const nodes = [
  { id: "app", label: "Application", x: 78, y: 214, hub: false },
  { id: "gateway", label: "API Gateway", x: 320, y: 214, hub: true },
  { id: "database", label: "Database", x: 562, y: 214, hub: false },
  { id: "cloud", label: "Cloud", x: 320, y: 62, hub: false },
  { id: "ai", label: "AI", x: 508, y: 96, hub: false },
  { id: "partners", label: "Third-party", x: 132, y: 348, hub: false },
  { id: "automation", label: "Automation", x: 508, y: 348, hub: false },
] as const;

const links = [
  { from: "app", lift: -22 },
  { from: "database", lift: 22 },
  { from: "cloud", lift: 0 },
  { from: "ai", lift: -14 },
  { from: "partners", lift: 18 },
  { from: "automation", lift: -12 },
] as const;

type ApiIntegrationVisualProps = {
  className?: string;
};

export function ApiIntegrationVisual({ className }: ApiIntegrationVisualProps) {
  const reduceMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.24, margin: "-6% 0px" });
  const live = inView && !reduceMotion;
  const uid = useId().replace(/:/g, "");
  const hub = nodes.find((node) => node.hub);

  return (
    <div
      ref={ref}
      className={cn("absolute inset-0 bg-[#F4F7F8]", className)}
      aria-hidden
    >
      <div className="absolute inset-[10%] rounded-[2rem] bg-[radial-gradient(circle_at_50%_46%,color-mix(in_srgb,var(--brand-mint)_34%,transparent),transparent_70%)]" />
      <svg
        viewBox="0 0 640 428"
        className="absolute inset-0 size-full"
        fill="none"
      >
        <defs>
          <linearGradient id={`${uid}-line`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#0C7A70" stopOpacity="0.22" />
            <stop offset="1" stopColor="#3FE9CF" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {hub
          ? links.map((link, index) => {
              const from = nodes.find((node) => node.id === link.from);
              if (!from) {
                return null;
              }

              const d = curve(from.x, from.y, hub.x, hub.y, link.lift);
              return (
                <g key={link.from}>
                  <path
                    d={d}
                    stroke={`url(#${uid}-line)`}
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  {live ? (
                    <circle r="3.2" fill="#3FE9CF">
                      <animateMotion
                        dur={`${3.2 + index * 0.32}s`}
                        begin={`${index * 0.24}s`}
                        repeatCount="indefinite"
                        path={d}
                      />
                    </circle>
                  ) : null}
                </g>
              );
            })
          : null}

        {nodes.map((node) => (
          <ServiceCard key={node.id} node={node} />
        ))}
      </svg>
    </div>
  );
}

function ServiceCard({ node }: { node: (typeof nodes)[number] }) {
  const wide = node.hub ? 152 : 120;
  const tall = node.hub ? 56 : 50;
  const x = node.x - wide / 2;
  const y = node.y - tall / 2;
  const twoLine = node.id === "partners";

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={wide}
        height={tall}
        rx={node.hub ? 16 : 14}
        fill={node.hub ? "#D8F6F0" : "#ffffff"}
        stroke={node.hub ? "#0C7A70" : "#E2E8F0"}
        strokeOpacity={node.hub ? 0.35 : 1}
        strokeWidth="1.2"
      />
      <Mark id={node.id} cx={x + 18} cy={node.y} />
      <text
        x={x + 34}
        y={twoLine ? node.y - 7 : node.y + 1}
        fill="#0F172A"
        fontSize={node.hub ? 13 : 12}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
      >
        {twoLine ? (
          <>
            <tspan x={x + 34} dy="0">
              Third-party
            </tspan>
            <tspan x={x + 34} dy="13">
              services
            </tspan>
          </>
        ) : (
          node.label
        )}
      </text>
    </g>
  );
}

function Mark({
  id,
  cx,
  cy,
}: {
  id: string;
  cx: number;
  cy: number;
}) {
  return (
    <g transform={`translate(${cx - 7} ${cy - 7})`} fill="none">
      {id === "app" ? (
        <rect x="1.5" y="1.5" width="11" height="11" rx="2.2" stroke="#0F172A" strokeWidth="1.35" />
      ) : null}
      {id === "gateway" ? (
        <path
          d="M3 3.8h8L9 2.2M11 10.2H3l2 1.6"
          stroke="#0C7A70"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}
      {id === "database" ? (
        <>
          <ellipse cx="7" cy="3.6" rx="4.6" ry="1.6" stroke="#0F172A" strokeWidth="1.25" />
          <path d="M2.4 3.6v6.6c0 .85 2 1.55 4.6 1.55s4.6-.7 4.6-1.55V3.6" stroke="#0F172A" strokeWidth="1.25" />
        </>
      ) : null}
      {id === "cloud" ? (
        <path
          d="M3.6 10h7a2.2 2.2 0 0 0 .15-4.4 2.9 2.9 0 0 0-5.4-1 2.15 2.15 0 0 0-1.75 5.4Z"
          stroke="#0F172A"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      ) : null}
      {id === "ai" ? (
        <>
          <circle cx="3.6" cy="7" r="1.15" fill="#0C7A70" />
          <circle cx="7" cy="4.6" r="1.15" fill="#0F172A" />
          <circle cx="10.4" cy="7" r="1.15" fill="#0C7A70" />
          <path d="M4.3 6.5 6.6 5m.8.2 2.1 1.4" stroke="#0F172A" strokeWidth="1.05" />
        </>
      ) : null}
      {id === "partners" ? (
        <>
          <rect x="1.6" y="2.4" width="5" height="5" rx="1.1" stroke="#0F172A" strokeWidth="1.25" />
          <rect x="7.2" y="6.4" width="5" height="5" rx="1.1" stroke="#0C7A70" strokeWidth="1.25" />
        </>
      ) : null}
      {id === "automation" ? (
        <path
          d="M2.4 4.8h7.4L8.2 3.2M11.4 9.4H4l1.7 1.5"
          stroke="#0F172A"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}
    </g>
  );
}

function curve(x1: number, y1: number, x2: number, y2: number, lift: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 + lift;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}
