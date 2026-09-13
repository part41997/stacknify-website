import type { Audience, SiteConfig } from "@/types";

const name = "Stacknify";
const positioning = "AI, Software & Digital Growth Solutions";
const tagline = "Build Smarter. Automate Faster. Grow Better.";
const audiences = [
  "Startups",
  "SMEs",
  "Entrepreneurs",
  "International businesses",
  "Agencies",
  "Established companies",
] as const satisfies readonly Audience[];

export function formatAudienceList(
  items: readonly string[] = audiences,
): string {
  return items.join(", ").replace(/, ([^,]*)$/, ", and $1");
}

export const siteConfig: SiteConfig = {
  name,
  tagline,
  description: `${name} helps startups, SMEs, and international businesses build smarter software, automate faster, and grow with AI-first digital solutions.`,
  positioning,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "info@stacknify.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  address: process.env.NEXT_PUBLIC_CONTACT_LOCATION ?? "",
  website: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  logo: process.env.NEXT_PUBLIC_LOGO_URL ?? "",
  ogImage: process.env.NEXT_PUBLIC_OG_IMAGE_URL ?? "",
  social: {
    linkedin:
      process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ||
      "https://www.linkedin.com/company/stacknify",
    instagram:
      process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ||
      "https://www.instagram.com/stacknify",
    facebook:
      process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ||
      "https://www.facebook.com/stacknify",
    pinterest:
      process.env.NEXT_PUBLIC_SOCIAL_PINTEREST ||
      "https://www.pinterest.com/stacknify",
    youtube:
      process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE ||
      "https://www.youtube.com/@stacknify",
    x: process.env.NEXT_PUBLIC_SOCIAL_X || "https://x.com/stacknify",
  },
  locale: "en",
  audiences,
  seo: {
    title: `${name} | ${positioning}`,
    description: `${name} builds AI solutions, custom software, web and mobile applications, automation systems and digital growth strategies for modern businesses.`,
    topics: [
      "AI development",
      "AI automation",
      "AI agent development",
      "AI software development",
      "Custom software development",
      "Web development",
      "Mobile app development",
      "SaaS development",
      "Laravel development",
      "Vue.js development",
      "SEO services",
      "Digital marketing",
    ],
  },
  hero: {
    eyebrow: "Software  ·  AI  ·  Automation",
    headline: ["Build Smarter.", "Automate Faster.", "Grow Better."],
    description: `${name} designs and builds the software, AI, and automation businesses run on — systems for real operations, not a demo on the side.`,
    primaryCta: {
      label: "Start Your Project",
      href: "/contact",
    },
    secondaryCta: {
      label: "Explore Our Services",
      href: "/services",
    },
    scrollLabel: "Scroll",
    scrollHref: "/#solutions",
    scrollAriaLabel: "Scroll to solutions",
  },
  notFound: {
    title: "Page not found",
    description: `${name} could not find that page.`,
  },
  privacy: {
    title: "Privacy Policy",
    description: `${name} will publish this policy here. It has not been written yet, so nothing on this page should be treated as a live privacy statement.`,
  },
  terms: {
    title: "Terms & Conditions",
    description: `${name} will publish these terms here. They have not been written yet, so nothing on this page should be treated as a live agreement.`,
  },
};
