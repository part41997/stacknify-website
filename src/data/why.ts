import type { SectionHeadingCopy, TrustStat, WhyReason } from "@/types";

export interface WhyContent extends SectionHeadingCopy {
  mapLabel: string;
  visualLabel: string;
  idleDescription: string;
  idleDescriptionTouch: string;
}

export const whyContent: WhyContent = {
  headingPrefix: "Why Businesses Choose",
  headingAccent: "Stacknify.",
  description:
    "How we take on work — from the first conversation through the years after launch.",
  mapLabel: "Why businesses choose Stacknify",
  visualLabel:
    "Stacknify connected to Business First, Modern Technology, AI Ready, Transparent Process, and Long-Term Support",
  idleDescription: "Hover a principle to see how we work.",
  idleDescriptionTouch: "Choose a principle to see how we work.",
};

export const whyReasons: WhyReason[] = [
  {
    slug: "business-first",
    number: "01",
    title: "Business First",
    summary: "Technology starts with the problem — not a stack looking for a use.",
    angle: -90,
  },
  {
    slug: "modern-technology",
    number: "02",
    title: "Modern Technology",
    summary: "We build with current, proven tools that can grow with the product.",
    angle: -18,
  },
  {
    slug: "ai-ready",
    number: "03",
    title: "AI Ready",
    summary:
      "We look for practical AI and automation where it actually helps the work.",
    angle: 54,
  },
  {
    slug: "transparent-process",
    number: "04",
    title: "Transparent Process",
    summary: "You see the plan, the progress, and the trade-offs as we go.",
    angle: 126,
  },
  {
    slug: "long-term-support",
    number: "05",
    title: "Long-Term Support",
    summary: "Launch is not the end. We stay with the product as it needs to change.",
    angle: 198,
  },
];

export const whyMetrics: TrustStat[] = [
  { id: "projects", label: "Projects Delivered", value: null },
  { id: "clients", label: "Clients", value: null },
  { id: "technologies", label: "Technologies", value: null },
  { id: "years", label: "Years Experience", value: null },
];

export function isConfiguredMetric(
  stat: TrustStat,
): stat is TrustStat & { value: number } {
  return typeof stat.value === "number";
}

export function isVisibleMetric(stat: TrustStat): boolean {
  return typeof stat.value === "number" || Boolean(stat.placeholder);
}

const CENTER = { x: 50, y: 47 } as const;
const ORBIT = { x: 50, y: 56, rx: 35, ry: 16 } as const;

function coord(value: number) {
  return Number(value.toFixed(2));
}

export function whyPoint(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: coord(ORBIT.x + Math.cos(rad) * ORBIT.rx),
    y: coord(ORBIT.y + Math.sin(rad) * ORBIT.ry),
  };
}

export function whySpokePath(angle: number) {
  const rad = (angle * Math.PI) / 180;
  const start = {
    x: coord(CENTER.x + Math.cos(rad) * 10),
    y: coord(CENTER.y + Math.sin(rad) * 4.2 + 4),
  };
  const end = whyPoint(angle);
  const mid = {
    x: coord((start.x + end.x) / 2 - Math.sin(rad) * 3.2),
    y: coord((start.y + end.y) / 2 + Math.cos(rad) * 1.6),
  };
  return `M ${start.x} ${start.y} Q ${mid.x} ${mid.y} ${end.x} ${end.y}`;
}

export const whyCenter = CENTER;
export const whyOrbit = ORBIT;
