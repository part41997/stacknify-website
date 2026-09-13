import type { CtaLink, SectionHeadingCopy, WorkflowStep } from "@/types";

export type SolutionsContent = SectionHeadingCopy & {
  eyebrow: string;
  positioning: string;
  stepsLabel: string;
  cta: CtaLink;
};

export const solutionsContent: SolutionsContent = {
  eyebrow: "AI & Automation",
  headingPrefix: "Turn Repetitive Work Into",
  headingAccent: "Intelligent Automation.",
  description:
    "We connect AI with the processes you already run — so work moves from request to result without a person in every loop.",
  positioning:
    "Stacknify doesn't just add an AI chatbot. We integrate AI into real business workflows.",
  stepsLabel: "Business process to business result",
  cta: {
    label: "Start Your Project",
    href: "/contact",
  },
};

export const aiFlowStages: WorkflowStep[] = [
  {
    id: "process",
    label: "Business process",
    caption: "Work enters the system.",
    detail:
      "A ticket, a file, a question, or a decision from your team or your systems.",
  },
  {
    id: "agent",
    label: "AI Agent",
    caption: "Analyzes intent and chooses a path.",
    detail:
      "The agent reads the request, plans the steps, and routes the work.",
  },
  {
    id: "tools",
    label: "Tools / API",
    caption: "Systems execute the next action.",
    detail:
      "The workflow talks to the software you already use — through APIs, not copy-paste.",
  },
  {
    id: "automation",
    label: "Automation",
    caption: "The workflow completes the steps.",
    detail:
      "Once the path is clear, steps run without waiting on a handoff.",
  },
  {
    id: "result",
    label: "Business result",
    caption: "A finished task lands in your stack.",
    detail:
      "An updated record, a completed request, or a decision your team can act on.",
  },
];

export const solutionCapabilities = [
  {
    slug: "ai-agents",
    title: "AI Agents",
    summary: "Plan, route, and complete multi-step work across your tools.",
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation",
    summary: "Move repetitive operational steps without a person in every loop.",
  },
  {
    slug: "llm-integration",
    title: "LLM Integration",
    summary: "Connect language models to the products and systems you already run.",
  },
  {
    slug: "rag",
    title: "RAG",
    summary: "Ground answers and actions in your documents, records, and history.",
  },
  {
    slug: "ai-assistants",
    title: "AI Assistants",
    summary: "Give teams and customers answers from your own knowledge.",
  },
  {
    slug: "business-intelligence",
    title: "Business Intelligence",
    summary: "Turn operational data into decisions — not another unused dashboard.",
  },
  {
    slug: "api-automation",
    title: "API Automation",
    summary: "Let software talk to the tools you already use.",
  },
] as const;
