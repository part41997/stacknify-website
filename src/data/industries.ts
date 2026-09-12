import { serviceCategories } from "@/data/services";
import type {
  Industry,
  IndustryLayout,
  SectionHeadingCopy,
  ServiceCategory,
} from "@/types";

export interface IndustriesContent extends SectionHeadingCopy {
  examplesLabel: string;
  servicesLabel: string;
  navLabel: string;
  viewIndustry: string;
  backLabel: string;
  ctaLabel: string;
  fallbackTitle: string;
}

export const industriesContent: IndustriesContent = {
  headingPrefix: "We Work With",
  headingAccent: "Any Industry.",
  description:
    "We are not a vertical shop. The names below are examples of work we already know — not a closed list. If your sector is missing, we still take the project.",
  examplesLabel: "Solution examples",
  servicesLabel: "Related services",
  navLabel: "Industries",
  viewIndustry: "View example",
  backLabel: "Back to home",
  ctaLabel: "Start a project",
  fallbackTitle: "Industry",
};

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    featured: true,
    layout: "featured",
    summary:
      "Healthcare operators typically need less admin work, clearer communication, and software that keeps day-to-day operations organized.",
    examples: [
      "Intake and scheduling flows",
      "Admin automation",
      "Internal operations tools",
      "Staff and patient communication",
      "Cloud hosting and maintenance",
    ],
    services: ["web-development", "ai-automation", "custom-software"],
  },
  {
    slug: "finance",
    name: "FinTech",
    featured: true,
    layout: "portrait",
    summary:
      "Finance teams and product owners typically need reliable internal tools, clearer reporting flows, and software that stays maintainable.",
    examples: [
      "Internal operations tools",
      "Reporting dashboards",
      "System integrations",
      "Process automation",
      "Cloud deployment",
    ],
    services: ["web-development", "custom-software", "ai-automation", "ui-ux-design"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    featured: true,
    layout: "portrait",
    summary:
      "Agencies and property businesses typically need inquiry handling, local visibility, and tools that keep listings and leads together.",
    examples: [
      "Listing websites",
      "Inquiry handling",
      "Local discovery",
      "Lead intake",
      "Property data integrations",
    ],
    services: ["web-development", "ai-automation", "seo-digital-marketing"],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    featured: true,
    layout: "wide",
    summary:
      "Teams selling online typically need a store that is easier to run, fewer spreadsheet operations, and a clearer path from visit to order.",
    examples: [
      "Storefronts",
      "Inventory integrations",
      "Payment integrations",
      "Order automation",
      "Customer support",
    ],
    services: [
      "ai-automation",
      "web-development",
      "custom-software",
      "seo-digital-marketing",
    ],
  },
  {
    slug: "education",
    name: "Education",
    featured: true,
    layout: "compact",
    summary:
      "Schools and training businesses typically need delivery platforms, simpler admin, and a presence people can find.",
    examples: [
      "Learning portals",
      "Admin workflows",
      "Student and staff communication",
      "Course catalogs",
      "Search and discovery",
    ],
    services: ["web-development", "ai-automation", "seo-digital-marketing"],
  },
  {
    slug: "logistics",
    name: "Logistics",
    featured: true,
    layout: "wide",
    summary:
      "Operators moving goods typically need fewer manual handoffs, clearer status, and systems that connect to tools they already use.",
    examples: [
      "Status tracking",
      "Handoff automation",
      "Partner portals",
      "API integrations",
      "Operations dashboards",
    ],
    services: ["ai-automation", "custom-software", "web-development", "mobile-apps"],
  },
  {
    slug: "retail",
    name: "Retail",
    featured: true,
    layout: "compact",
    summary:
      "Retail teams typically need storefronts, local discovery, and operations that keep up with demand.",
    examples: [
      "Storefronts",
      "Local discovery",
      "Inventory connections",
      "Customer support",
      "Staff tools",
    ],
    services: [
      "web-development",
      "ai-automation",
      "mobile-apps",
      "seo-digital-marketing",
    ],
  },
  {
    slug: "startups",
    name: "Startups",
    featured: true,
    layout: "banner",
    summary:
      "Early teams typically need a first product, less manual work, and a site that explains the offer clearly.",
    examples: [
      "MVP web products",
      "Workflow automation",
      "Customer onboarding",
      "Launch-ready websites",
      "Product analytics connections",
    ],
    services: ["web-development", "ai-automation", "seo-digital-marketing"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    summary:
      "Makers and suppliers typically need internal software, process automation, and portals that keep partners up to date.",
    examples: [
      "Internal operations software",
      "Process automation",
      "Supplier portals",
      "Inventory connections",
      "Cloud deployment",
    ],
    services: ["custom-software", "ai-automation", "web-development"],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    summary:
      "Firms selling expertise typically need a site that converts, smoother intake, and less time on repetitive admin.",
    examples: [
      "Service websites",
      "Intake automation",
      "Client portals",
      "Content and SEO",
      "Scheduling",
    ],
    services: [
      "web-development",
      "ui-ux-design",
      "ai-automation",
      "seo-digital-marketing",
    ],
  },
];

export const featuredIndustries = industries.filter(
  (industry) => industry.featured,
);

export function getIndustryBySlug(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

export function getIndustryHref(industry: Industry) {
  return `/industries/${industry.slug}`;
}

export function getIndustryServices(industry: Industry): ServiceCategory[] {
  return industry.services
    .map((slug) =>
      serviceCategories.find((category) => category.slug === slug),
    )
    .filter((item): item is ServiceCategory => Boolean(item));
}

export function getIndustriesForService(slug: string) {
  return industries.filter(
    (industry) => industry.featured && industry.services.includes(slug),
  );
}

export function industryTileClass(layout: IndustryLayout = "compact") {
  switch (layout) {
    case "featured":
      return "sm:col-span-2 lg:col-span-7 lg:row-span-2 min-h-[20rem] lg:min-h-[34rem]";
    case "portrait":
      return "lg:col-span-5 min-h-[18rem] lg:min-h-[18rem]";
    case "wide":
      return "sm:col-span-2 lg:col-span-8 min-h-[18rem] lg:min-h-[24rem]";
    case "compact":
      return "lg:col-span-4 min-h-[18rem] lg:min-h-[24rem]";
    case "banner":
      return "sm:col-span-2 lg:col-span-12 min-h-[18rem] lg:min-h-[22rem]";
  }
}
