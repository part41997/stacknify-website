import { siteConfig } from "@/data/site";
import type { FaqItem, SectionHeadingCopy } from "@/types";

export interface FaqContent extends SectionHeadingCopy {
  heading: string;
}

export const faqContent: FaqContent = {
  headingPrefix: "Questions Before We",
  headingAccent: "Build?",
  heading: "Questions Before We Build?",
  description: `Answers to common questions about starting a project with ${siteConfig.name}.`,
};

export const faqItems: FaqItem[] = [
  {
    question: "How do we start a project?",
    answer:
      "Use the contact form to tell us what you want to build, automate, or improve. We review the brief and follow up to discuss fit and next steps.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "Cost depends on the problem, the scope, and what already exists. We do not publish a fixed price list. After we understand the work, we share a clear estimate.",
  },
  {
    question: "How long does development take?",
    answer:
      "Timeline depends on scope, integrations, and how quickly decisions can be made. We outline a realistic sequence after we understand the brief — we do not quote a standard duration up front.",
  },
  {
    question: "Can you build custom AI solutions?",
    answer:
      "Yes. We build AI and automation around a real business process — agents, workflows, and AI-powered products — rather than adding a generic chatbot to a site.",
  },
  {
    question: "Can you integrate AI into existing software?",
    answer:
      "Yes. We connect AI and automation to the tools and systems you already use through APIs and integrations, so new capability sits inside current operations.",
  },
  {
    question: "Do you work with international clients?",
    answer: `Yes. ${siteConfig.name} works with startups, SMEs, and international businesses. Location is not a barrier to starting a conversation.`,
  },
  {
    question: "Can you sign an NDA?",
    answer:
      "Yes. We can review and sign an NDA before you share sensitive product or business details.",
  },
  {
    question: "Do you provide post-launch support?",
    answer:
      "Yes. We continue supporting and improving products after launch, so the work can keep pace with the business.",
  },
];
