import type { CtaLink, ProcessStep, SectionHeadingCopy } from "@/types";

export interface ProcessContent extends SectionHeadingCopy {
  cta: CtaLink;
  stepsLabel: string;
}

export const processContent: ProcessContent = {
  headingPrefix: "From Idea To",
  headingAccent: "Impact.",
  cta: {
    label: "Start Your Project",
    href: "/contact",
  },
  stepsLabel: "Process steps",
};

export const processSteps: ProcessStep[] = [
  {
    slug: "discover",
    number: "01",
    title: "Discover",
    summary:
      "We start with the business problem, the constraints, and what a successful outcome actually looks like.",
  },
  {
    slug: "strategize",
    number: "02",
    title: "Strategize",
    summary:
      "We choose the approach that serves the result — not a stack for its own sake.",
  },
  {
    slug: "design",
    number: "03",
    title: "Design",
    summary:
      "We shape the product and experience so people can complete the work without friction.",
  },
  {
    slug: "build",
    number: "04",
    title: "Build",
    summary:
      "We engineer the system to ship cleanly and grow without a rewrite.",
  },
  {
    slug: "test",
    number: "05",
    title: "Test",
    summary:
      "We prove it holds up in real conditions before customers ever depend on it.",
  },
  {
    slug: "launch",
    number: "06",
    title: "Launch",
    summary:
      "We release a stable version with a clear path for support, measurement, and the next iteration.",
  },
  {
    slug: "grow",
    number: "07",
    title: "Grow",
    summary:
      "We keep improving, automating, and expanding as the business learns from live use.",
  },
];

export const processJourney = {
  ariaLabel: "From idea to growth",
  caption: "Idea → Wireframe → Code → Testing → Deployment → Growth",
  nodes: [
    { slug: "discover", label: "Idea", motif: "idea" },
    { slug: "strategize", label: "Plan", motif: "plan" },
    { slug: "design", label: "Wireframe", motif: "wire" },
    { slug: "build", label: "Code", motif: "code" },
    { slug: "test", label: "Testing", motif: "test" },
    { slug: "launch", label: "Deployment", motif: "deploy" },
    { slug: "grow", label: "Growth", motif: "growth" },
  ],
} as const;

export function processStepLabel(step: ProcessStep) {
  const total = String(processSteps.length).padStart(2, "0");
  return `Step ${step.number} / ${total}`;
}
