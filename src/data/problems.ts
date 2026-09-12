import type { ProblemSolutionPair, SectionHeadingCopy } from "@/types";

export type ProblemsContent = SectionHeadingCopy & {
  eyebrow: string;
  problemLabel: string;
  solutionLabel: string;
  technologyLabel: string;
  stepsLabel: string;
};

export const problemsContent: ProblemsContent = {
  eyebrow: "Problems We Solve",
  headingPrefix: "Technology Should",
  headingAccent: "Solve Problems.",
  description:
    "The same operational problems show up across businesses. We solve them with software, automation, and growth systems built for how the work actually runs.",
  problemLabel: "Problem",
  solutionLabel: "Solution",
  technologyLabel: "Technology",
  stepsLabel: "Business problems and digital solutions",
};

export const problemSolutions: ProblemSolutionPair[] = [
  {
    slug: "manual-work",
    number: "01",
    title: "Manual Processes",
    problem: "Your team spends hours repeating the same operational tasks.",
    solution: "AI Automation",
    solutionSummary:
      "Agents and workflows take the repetitive steps so people can focus on decisions.",
    technology: ["OpenAI", "Claude", "Node.js"],
  },
  {
    slug: "disconnected-systems",
    number: "02",
    title: "Disconnected Systems",
    problem: "CRM, ERP, inbox, and other tools do not talk to each other.",
    solution: "API Integration",
    solutionSummary:
      "A maintainable API layer moves work between the systems you already run.",
    technology: ["REST APIs", "Node.js", "Laravel"],
  },
  {
    slug: "outdated-software",
    number: "03",
    title: "Outdated Platforms",
    problem: "Your existing platform slows the business down.",
    solution: "Modern SaaS",
    solutionSummary:
      "A product people can actually use — clear architecture, ready for the next release.",
    technology: ["React", "Next.js", "Laravel"],
  },
  {
    slug: "low-visibility",
    number: "04",
    title: "Low Digital Visibility",
    problem: "Potential customers cannot find the offer.",
    solution: "SEO & Digital Growth",
    solutionSummary:
      "Search and conversion work built around your buyers — qualified demand, not vanity traffic.",
    technology: ["Next.js", "TypeScript"],
  },
];
