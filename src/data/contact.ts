import { siteConfig } from "@/data/site";
import { isSafeHttpUrl } from "@/lib/security/urls";
import type { SectionHeadingCopy, SocialPlatform } from "@/types";

export interface ContactNextStep {
  number: string;
  title: string;
  summary: string;
}

export interface ContactFormCopy {
  ariaLabel: string;
  sendAnother: string;
  sending: string;
  noSpam: string;
  selectService: string;
  selectBudget: string;
  loadingLabel: string;
  rateLimitMessage: string;
  unavailableMessage: string;
  verificationMessage: string;
  fields: {
    name: string;
    email: string;
    phone: string;
    company: string;
    service: string;
    budget: string;
    details: string;
  };
}

export type ContactChannelId = "email" | "phone" | "address";

export type ContactChannel = {
  id: ContactChannelId;
  label: string;
  value: string;
  href?: string;
};

export interface ContactContent extends SectionHeadingCopy {
  cta: string;
  successTitle: string;
  successMessage: string;
  errorMessage: string;
  socialHeading: string;
  nextStepsHeading: string;
  channelLabels: Record<ContactChannelId, string>;
  nextSteps: ContactNextStep[];
  form: ContactFormCopy;
}

export const contactContent: ContactContent = {
  headingPrefix: "Have an Idea?",
  headingAccent: "Let's Build It.",
  description:
    "Tell us what you're building, automating or trying to improve. We'll help you identify the right digital solution.",
  cta: "Discuss My Project",
  successTitle: "Thanks — we have your project details.",
  successMessage:
    "We'll review what you shared and follow up. If you need to add anything, you can send another note.",
  errorMessage: "Something went wrong while sending. Please try again.",
  socialHeading: "Social",
  nextStepsHeading: "What happens next",
  channelLabels: {
    email: "Email",
    phone: "Phone",
    address: "Location",
  },
  nextSteps: [
    {
      number: "01",
      title: "We read the brief",
      summary: "Your goals, constraints, and what success looks like.",
    },
    {
      number: "02",
      title: "We suggest an approach",
      summary: "The software, automation, or growth work that actually fits.",
    },
    {
      number: "03",
      title: "We talk through scope",
      summary: "A clear conversation about what to build first.",
    },
  ],
  form: {
    ariaLabel: "Project inquiry",
    sendAnother: "Send another",
    sending: "Sending",
    noSpam: "No spam. Just a conversation about the work.",
    selectService: "Select a service",
    selectBudget: "Select a budget",
    loadingLabel: "Loading contact form",
    rateLimitMessage:
      "Please wait a few minutes before sending another message.",
    unavailableMessage:
      "The form is temporarily unavailable. Please try again later.",
    verificationMessage: "Please complete the verification and try again.",
    fields: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      company: "Company",
      service: "Service",
      budget: "Budget",
      details: "Project Details",
    },
  },
};

export const contactServices = [
  "AI Automations",
  "Custom Software Development",
  "Web Development",
  "Mobile App Development",
  "UI / UX Design",
  "SEO & Digital Marketing",
  "Other",
] as const;

export const contactBudgets = [
  "Under ₹50K",
  "₹50K–₹1L",
  "₹1L–₹3L",
  "₹3L–₹5L",
  "₹5L+",
  "Not Sure",
] as const;

export type ContactService = (typeof contactServices)[number];
export type ContactBudget = (typeof contactBudgets)[number];

export type SocialLink = {
  id: SocialPlatform;
  label: string;
  href: string;
};

const socialLabels: Record<SocialPlatform, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
  pinterest: "Pinterest",
  youtube: "YouTube",
  x: "X",
};

const socialOrder: SocialPlatform[] = [
  "linkedin",
  "instagram",
  "facebook",
  "pinterest",
  "youtube",
  "x",
];

function configured(value: string) {
  return value.trim().length > 0;
}

export function getContactChannels(): ContactChannel[] {
  const { email, phone, address } = siteConfig;
  const channels: ContactChannel[] = [];

  if (configured(email) && !/[\r\n]/.test(email)) {
    channels.push({
      id: "email",
      label: contactContent.channelLabels.email,
      value: email,
      href: `mailto:${email}`,
    });
  }

  if (configured(phone)) {
    channels.push({
      id: "phone",
      label: contactContent.channelLabels.phone,
      value: phone,
      href: `tel:${phone.replace(/[^\d+]/g, "")}`,
    });
  }

  if (configured(address)) {
    channels.push({
      id: "address",
      label: contactContent.channelLabels.address,
      value: address,
    });
  }

  return channels;
}

export function getSocialLinks(): SocialLink[] {
  return socialOrder
    .map((id) => ({
      id,
      label: socialLabels[id],
      href: siteConfig.social[id],
    }))
    .filter((link) => configured(link.href) && isSafeHttpUrl(link.href));
}
