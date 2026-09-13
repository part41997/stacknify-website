import type { CtaLink, SectionHeadingCopy } from "@/types";

export interface FinalCtaContent extends SectionHeadingCopy {
  lines: readonly [string, string];
  primary: CtaLink;
  secondary: CtaLink;
  visualLabel: string;
}

export type FinalCtaNodeId =
  | "idea"
  | "ai"
  | "software"
  | "automation"
  | "growth";

export type FinalCtaNode = {
  id: FinalCtaNodeId;
  label: string;
  x: number;
  y: number;
  result?: boolean;
};

export const finalCtaContent: FinalCtaContent = {
  headingPrefix: "Have An",
  headingAccent: "Idea?",
  lines: ["Have An Idea?", "Let's Build It."],
  description: "Tell us what you're building, automating or improving.",
  primary: {
    label: "Start Your Project",
    href: "/contact",
  },
  secondary: {
    label: "Talk To Our Team",
    href: "/contact",
  },
  visualLabel:
    "Abstract path from Idea, AI, Software, and Automation into Business Growth",
};

export const finalCtaNodes: readonly FinalCtaNode[] = [
  { id: "idea", label: "Idea", x: 168, y: 128 },
  { id: "ai", label: "AI", x: 472, y: 128 },
  { id: "software", label: "Software", x: 168, y: 318 },
  { id: "automation", label: "Automation", x: 472, y: 318 },
  { id: "growth", label: "Business Growth", x: 320, y: 548, result: true },
];

export const finalCtaOperators = [
  { id: "plus-idea-ai", mark: "+", x: 320, y: 128 },
  { id: "plus-software-automation", mark: "+", x: 320, y: 318 },
  { id: "equals-growth", mark: "=", x: 320, y: 430 },
] as const;

export const finalCtaFlows = [
  {
    id: "idea-growth",
    from: "idea",
    d: "M168 158 C 190 240, 240 430, 300 518",
    tone: "navy",
    duration: "18s",
    delay: "0s",
  },
  {
    id: "ai-growth",
    from: "ai",
    d: "M472 158 C 450 240, 400 430, 340 518",
    tone: "cyan",
    duration: "16s",
    delay: "-3s",
  },
  {
    id: "software-growth",
    from: "software",
    d: "M198 348 C 230 410, 270 470, 304 520",
    tone: "teal",
    duration: "14s",
    delay: "-6s",
  },
  {
    id: "automation-growth",
    from: "automation",
    d: "M442 348 C 410 410, 370 470, 336 520",
    tone: "turquoise",
    duration: "15s",
    delay: "-8s",
  },
] as const;
