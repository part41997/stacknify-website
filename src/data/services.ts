import type { SectionHeadingCopy, ServiceCategory } from "@/types";

export interface ServicesContent extends SectionHeadingCopy {
  categoryLabel: string;
  capabilitiesLabel: string;
  technologyLabel: string;
  problemLabel: string;
  approachLabel: string;
  whoLabel: string;
  outcomesLabel: string;
  industriesLabel: string;
  otherLabel: string;
  previousLabel: string;
  nextLabel: string;
  detailsLabel: string;
  ctaLabel: string;
  backLabel: string;
  fallbackTitle: string;
  loadingLabel: string;
}

export const servicesContent: ServicesContent = {
  headingPrefix: "What We",
  headingAccent: "Build.",
  description:
    "Six practices. One team. Software, design, AI, and growth built around how you actually work.",
  categoryLabel: "Services",
  capabilitiesLabel: "Capabilities",
  technologyLabel: "Technology",
  problemLabel: "The usual problem",
  approachLabel: "How we take it on",
  whoLabel: "Who it's for",
  outcomesLabel: "What changes",
  industriesLabel: "Where it shows up",
  otherLabel: "Other practices",
  previousLabel: "Previous",
  nextLabel: "Next",
  detailsLabel: "View details",
  ctaLabel: "Start this project",
  backLabel: "All services",
  fallbackTitle: "Service",
  loadingLabel: "Loading services",
};

function category(
  entry: Omit<ServiceCategory, "href">,
): ServiceCategory {
  return { ...entry, href: `/services/${entry.slug}` };
}

export const serviceCategories: ServiceCategory[] = [
  category({
    slug: "custom-software",
    number: "01",
    title: "Custom Software Development",
    shortTitle: "Custom Software",
    summary:
      "Tailored enterprise software and internal tools built for your exact workflows — built to scale.",
    details:
      "We shape internal systems, platforms, and integrations around the work your team already does, so the software fits the operation instead of forcing a new one.",
    problem:
      "Work lives in spreadsheets, inboxes, and tools that were never meant to talk to each other. Every new hire learns the workarounds. Volume makes the cracks obvious.",
    approach:
      "We map the real workflow first — who does what, where data sits, what breaks when it is busy. Then we build the system around that: internal tools, platforms, and integrations that share one source of truth.",
    who: "Operators who have outgrown generic software and need a system that matches how the work actually runs.",
    outcomes: [
      "One place to run the work instead of five disconnected tools.",
      "Handoffs that do not depend on memory, chat, or a spreadsheet tab.",
      "Software you can keep changing after the first release.",
    ],
    items: ["Enterprise Systems", "SaaS Platforms", "Integrations"],
    technologies: ["React", "Next.js", "Node.js", "Laravel"],
    icon: "code",
    accent: "#8B9CFF",
  }),
  category({
    slug: "web-development",
    number: "02",
    title: "Web Development",
    shortTitle: "Web Development",
    summary:
      "Custom websites and web applications engineered for performance, security, and growth.",
    details:
      "Sites and web apps built to load fast, rank, and convert — with architecture that stays maintainable after launch.",
    problem:
      "The site looks finished and still fails at the job: slow pages, a vague offer, forms that go nowhere, and a codebase nobody wants to touch six months later.",
    approach:
      "We treat the site as part of the operation — structure, performance, and the path to a conversation on the same page. Marketing pages and web apps share architecture you can keep shipping on.",
    who: "Companies that need a site or web app as part of how they sell, onboard, or run the work — not a brochure that goes stale.",
    outcomes: [
      "Pages that load and read clearly on a phone.",
      "A path from the offer to a real conversation.",
      "A codebase that can take the next feature without a rebuild.",
    ],
    items: ["Custom Sites", "Web Apps", "E-commerce"],
    technologies: ["Next.js", "React", "TypeScript"],
    icon: "web",
    accent: "#5BA3F5",
  }),
  category({
    slug: "mobile-apps",
    number: "03",
    title: "Mobile App Development",
    shortTitle: "Mobile Apps",
    summary:
      "Native and cross-platform mobile apps designed for smooth performance on iOS and Android.",
    details:
      "Mobile products connected to the same APIs, data, and workflows as your web software — apps people open and keep opening.",
    problem:
      "The work happens in the field or on the floor, but the system still lives on a desktop. People screenshot screens, delay updates, and catch up later.",
    approach:
      "We build iOS and Android apps on the same data and APIs as the rest of the operation — field tools, customer apps, and operator consoles that stay in sync.",
    who: "Teams whose customers or staff need the product in their pocket, not only at a desk.",
    outcomes: [
      "Records captured where the work happens.",
      "The same data on phone and web, without a second process.",
      "Apps people open because they make the next step easier.",
    ],
    items: ["iOS & Android", "Flutter", "React Native"],
    technologies: ["React Native", "Flutter", "TypeScript"],
    icon: "mobile",
    accent: "#2DD4BF",
  }),
  category({
    slug: "ui-ux-design",
    number: "04",
    title: "UI / UX Design",
    shortTitle: "UI / UX Design",
    summary:
      "Research-driven interfaces that balance usability and aesthetics to boost engagement and retention.",
    details:
      "Wireframes, prototypes, and design systems that guide every click on purpose — so the product is clear before a line of production code.",
    problem:
      "The software technically works and people still avoid it. Or production starts before anyone has agreed what the product is, which is how rebuilds start.",
    approach:
      "We settle the interface on purpose: research, wireframes, prototypes, then a design system the rest of the build can follow. Visual polish comes after the path is clear.",
    who: "Teams shipping a product people have to use every day — or a site where a confused visitor never becomes a conversation.",
    outcomes: [
      "Screens decided before production code locks them in.",
      "Fewer rebuilds caused by “we will figure out the UI later.”",
      "A system the rest of the product can keep using.",
    ],
    items: ["Wireframes", "Prototyping", "Design Systems"],
    technologies: ["Figma", "React", "TypeScript"],
    icon: "palette",
    accent: "#FF52A2",
  }),
  category({
    slug: "ai-automation",
    number: "05",
    title: "AI Automations",
    shortTitle: "AI Automations",
    summary:
      "Agents, chatbots, and workflow AI that take repetitive work off your team so people can focus on outcomes that scale.",
    details:
      "We embed AI where it changes output: fewer manual steps, faster response times, and products that feel intelligent to your customers.",
    problem:
      "The same requests sit in inboxes and spreadsheets. Someone always copies, classifies, or chases. It never quite becomes a process, and it does not scale with volume.",
    approach:
      "We put agents, chatbots, and workflow AI on the steps that actually change output — routing, drafting, extracting, following up — connected to the systems you already run. Not a chatbot for its own sake.",
    who: "Operators with repetitive work that still needs judgment at the edges, and products that should answer without adding headcount.",
    outcomes: [
      "Fewer manual steps between a request and a finished record.",
      "Faster responses without a larger support queue.",
      "People spending time on work that still needs a person.",
    ],
    items: ["Chatbots", "Workflow AI", "Data Pipelines"],
    technologies: ["OpenAI", "Claude", "Node.js"],
    icon: "sparkles",
    accent: "#8A7BFF",
  }),
  category({
    slug: "seo-digital-marketing",
    number: "06",
    title: "SEO & Digital Marketing",
    shortTitle: "SEO & Marketing",
    summary:
      "Data-backed SEO and marketing strategies that drive qualified traffic and measurable conversions.",
    details:
      "Search and conversion work built around your offer and your buyers — qualified demand, not vanity traffic.",
    problem:
      "Traffic that never turns into a conversation. Or a site search engines cannot read. Or ads that spend against an offer nobody understands on the landing page.",
    approach:
      "We start from the offer and the buyer, then fix what stands in the way: technical SEO, content that matches the work you sell, and paid demand that lands on a page built to convert.",
    who: "Companies that already do the work well and need the right people to find them — not a traffic report that looks busy.",
    outcomes: [
      "Pages structured so they can rank for the work you actually sell.",
      "Demand that matches the offer, not vanity sessions.",
      "A site and campaign that share the same story.",
    ],
    items: ["Technical SEO", "Paid Ads", "Content"],
    technologies: ["Next.js", "TypeScript"],
    icon: "growth",
    accent: "#F3A022",
  }),
];

export const services = serviceCategories.flatMap((entry) =>
  entry.items.map((title) => ({
    slug: `${entry.slug}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    title,
    summary: entry.summary,
  })),
);

export function getServiceBySlug(slug: string) {
  return serviceCategories.find((entry) => entry.slug === slug);
}

export function getServiceHref(entry: Pick<ServiceCategory, "slug">) {
  return `/services/${entry.slug}`;
}

export function getAdjacentServices(slug: string) {
  const index = serviceCategories.findIndex((entry) => entry.slug === slug);

  if (index === -1) {
    return { previous: undefined, next: undefined };
  }

  const last = serviceCategories.length - 1;

  return {
    previous: serviceCategories[index === 0 ? last : index - 1],
    next: serviceCategories[index === last ? 0 : index + 1],
  };
}
