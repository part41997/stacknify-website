import { siteConfig } from "@/data/site";
import { whyMetrics } from "@/data/why";
import type { CtaLink } from "@/types";

export interface AboutStatement {
  label: string;
  body: string;
}

export interface AboutContent {
  label: string;
  heading: string;
  description: string;
  mission: AboutStatement;
  vision: AboutStatement;
  cta: CtaLink;
}

export const aboutContent: AboutContent = {
  label: "About Stacknify",
  heading: "Engineering Technology That Moves Businesses Forward.",
  description:
    "Stacknify is a technology partner for businesses that need software, AI, and automation to work as one system. We design and build products people use in real operations — then stay with them after launch.",
  mission: {
    label: "Mission",
    body: "Help ambitious businesses work smarter by building practical software, AI-powered systems, and automation they can run every day.",
  },
  vision: {
    label: "Vision",
    body: "Technology should be the operating layer of a business — not a pile of unused tools. We build toward that standard.",
  },
  cta: {
    label: "Start Your Project",
    href: "/contact",
  },
};

/**
 * Shared with Why. Leave `value` null until a real number exists.
 * Do not invent Projects, Clients, Years, or Technologies.
 */
export const aboutMetrics = whyMetrics;

export const aboutImageId = "about.practice" as const;

export const aboutVisualLabel = `${siteConfig.name} software and AI practice`;
