import type { CtaLink, SectionHeadingCopy } from "@/types";

export type DevPanelId =
  | "assistant"
  | "agent"
  | "workflow"
  | "code"
  | "testing"
  | "analytics";

export type DevCapability = {
  slug: string;
  title: string;
  summary: string;
  panel: DevPanelId;
};

export interface AiDevelopmentContent extends SectionHeadingCopy {
  eyebrow: string;
  visualLabel: string;
  categoriesLabel: string;
  cta: CtaLink;
}

export const aiDevelopmentContent: AiDevelopmentContent = {
  eyebrow: "AI-Powered Development",
  headingPrefix: "Build Faster With",
  headingAccent: "Intelligent Development.",
  description:
    "AI sits inside the build — assistants, agents, and checks next to the work. We use them to write, review, and ship software. We do not promise a specific speed gain.",
  visualLabel:
    "A software development workspace with abstract Code, AI Assistant, Workflow, Analytics, and Testing panels",
  categoriesLabel: "How AI shows up in the build",
  cta: {
    label: "Start Your Project",
    href: "/#contact",
  },
};

export const aiDevelopmentCapabilities: readonly DevCapability[] = [
  {
    slug: "ai-assistants",
    title: "AI Assistants",
    summary:
      "Drafts, explanations, and next steps from the codebase you actually have.",
    panel: "assistant",
  },
  {
    slug: "ai-agents",
    title: "AI Agents",
    summary:
      "Multi-step development tasks that run across tools — not a single chat window.",
    panel: "agent",
  },
  {
    slug: "automation",
    title: "Automation",
    summary:
      "Setup, checks, and handoffs that should not wait on a person every time.",
    panel: "workflow",
  },
  {
    slug: "code-intelligence",
    title: "Code Intelligence",
    summary:
      "Structure, search, and change suggestions grounded in the project.",
    panel: "code",
  },
  {
    slug: "testing",
    title: "Testing",
    summary: "Checks written and run as part of the build, not as an afterthought.",
    panel: "testing",
  },
  {
    slug: "analytics",
    title: "Analytics",
    summary:
      "Product and delivery signals after launch — what to improve next.",
    panel: "analytics",
  },
];
