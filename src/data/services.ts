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
  storyLabel: string;
  faqLabel: string;
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
  storyLabel: "What this practice covers",
  faqLabel: "Questions about this work",
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
    seo: {
      title: "Custom Software Development for Internal Tools & SaaS",
      description:
        "Stacknify builds custom software, enterprise systems, and SaaS platforms around your workflows — internal tools, integrations, and applications you can keep changing after launch.",
      keywords: [
        "custom software development",
        "enterprise software",
        "SaaS development",
        "internal tools",
        "workflow software",
        "Laravel development",
        "Next.js applications",
        "API integration",
      ],
    },
    story: [
      "Custom software development is the right move when off-the-shelf tools force workarounds. We design enterprise software and internal tools around how your team already operates: records, roles, approvals, and the reports leadership actually needs.",
      "A typical build includes a web application, role-based access, and integrations with the CRM, ERP, inbox, or warehouse system you already run. We use React, Next.js, Node.js, and Laravel when they fit the product — not as a stack looking for a use.",
      "SaaS platforms follow the same rule. Multi-tenant access, billing-ready architecture, and APIs that mobile or partner products can call later. The first release should be usable. The next release should not require a rewrite.",
    ],
    faqs: [
      {
        question: "When do we need custom software instead of a SaaS subscription?",
        answer:
          "When the workflow is the product, not a side process. If every new hire learns a spreadsheet workaround, or two systems never share a source of truth, custom software development usually costs less than another year of glue and overtime.",
      },
      {
        question: "Can you integrate new software with our existing tools?",
        answer:
          "Yes. Most projects include API integration — CRM, ERP, payments, email, or internal databases — so the new application does not become another island. We map data ownership before we write endpoints.",
      },
      {
        question: "Do you build SaaS products as well as internal tools?",
        answer:
          "Both. Internal management systems and client-facing SaaS platforms share the same engineering: authentication, permissions, dashboards, and a codebase you can extend. The difference is who logs in, not whether the software is “real.”",
      },
    ],
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
    seo: {
      title: "Web Development for Fast, Search-Ready Sites & Apps",
      description:
        "Custom websites and web applications built with Next.js, React, and TypeScript — performance, technical SEO, and conversion paths that stay maintainable after launch.",
      keywords: [
        "web development",
        "custom website development",
        "web application development",
        "Next.js development",
        "React websites",
        "e-commerce development",
        "conversion-focused websites",
        "technical SEO websites",
      ],
    },
    story: [
      "Web development here means a site or web app that does a job: explain the offer, collect a lead, take an order, or run a workflow in the browser. We build custom websites and web applications on Next.js, React, and TypeScript so pages stay fast on a phone and the codebase can take the next feature.",
      "Marketing sites get clear information architecture, Core Web Vitals, and technical SEO so search engines can read the work you sell. Web apps get authentication, dashboards, and APIs. E-commerce gets catalogues, checkout, and admin that operations can actually use.",
      "We do not treat launch as the finish line. The same architecture should support a landing page this quarter and a customer portal next quarter without a full rebuild.",
    ],
    faqs: [
      {
        question: "Do you build marketing websites and web applications?",
        answer:
          "Yes. Brochure sites, conversion landing pages, and authenticated web apps share one practice. The stack is Next.js and React when they fit; the decision is what the visitor or operator needs to complete.",
      },
      {
        question: "Will the website be set up for SEO?",
        answer:
          "Technical SEO is part of the build: crawlable HTML, metadata, structured headings, and performance. Rankings still need the right offer and content. We do not sell “guaranteed first page” with a template site.",
      },
      {
        question: "Can you build e-commerce as well as lead-gen sites?",
        answer:
          "Yes. E-commerce development is a web application with catalogue, cart, and operations — not only a pretty product grid. We size the shop to how you actually fulfil orders.",
      },
    ],
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
    seo: {
      title: "Mobile App Development for iOS & Android",
      description:
        "Native-feeling iOS and Android apps with Flutter or React Native — field tools, customer apps, and operator consoles on the same APIs as your web software.",
      keywords: [
        "mobile app development",
        "iOS app development",
        "Android app development",
        "Flutter app development",
        "React Native development",
        "cross-platform mobile apps",
        "custom mobile applications",
      ],
    },
    story: [
      "Mobile app development is for work that happens away from a desk: field teams, customers on a commute, operators on a floor. We ship iOS and Android apps that talk to the same APIs and data as your web product, so the phone is not a second process.",
      "Cross-platform builds use Flutter or React Native when one codebase is the honest choice. Native modules go in where the store, the camera, or the device actually requires them. TypeScript keeps the React Native side aligned with the rest of a JS stack.",
      "Store submission, permissions, and push notifications are part of delivery — not an afterthought. The measure of the app is whether people keep opening it because the next step is easier on the phone.",
    ],
    faqs: [
      {
        question: "Do you build both iOS and Android apps?",
        answer:
          "Yes. Most products ship on both stores. We choose Flutter or React Native for a shared codebase when that is faster and still feels native, and we write platform-specific code when iOS or Android requires it.",
      },
      {
        question: "Can the mobile app use the same backend as our website?",
        answer:
          "That is the default. Customer apps, field tools, and operator consoles should share APIs, authentication, and records with the web application. A separate mobile database is how teams go out of sync.",
      },
      {
        question: "Flutter or React Native — how do you choose?",
        answer:
          "React Native when the product already lives in a React/TypeScript stack. Flutter when a single UI toolkit across iOS and Android is the cleaner fit. We pick from the product, not from a preferred logo.",
      },
    ],
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
    seo: {
      title: "UI/UX Design for Web, Mobile & SaaS Products",
      description:
        "Research-driven UI/UX design in Figma — wireframes, interactive prototypes, and design systems that make web, mobile, and SaaS products clearer before production.",
      keywords: [
        "UI UX design",
        "product design",
        "wireframing",
        "prototyping",
        "design systems",
        "SaaS dashboard UX",
        "mobile app UI design",
        "Figma design",
      ],
    },
    story: [
      "UI/UX design is how we stop building the wrong screens. We start with the job: who uses the product, how often, and what “done” looks like. Then wireframes, interactive prototypes, and a design system in Figma so engineering is not guessing in production.",
      "SaaS dashboard UX, mobile app UI, and conversion-focused websites are different surfaces with the same rule: navigation, hierarchy, and a next step that does not need a legend. Visual polish comes after the path is agreed.",
      "When design and engineering stay in one team, the Figma file is not a throwaway mock. Components map to React. That is how products stay consistent after the first release.",
    ],
    faqs: [
      {
        question: "Do you design before development, or only polish an existing product?",
        answer:
          "Both. New products go through research, wireframes, and prototypes before production code. Existing SaaS dashboards and mobile apps get a UX pass when the software works and people still cannot find the next action.",
      },
      {
        question: "What do we get at the end of a UI/UX engagement?",
        answer:
          "A Figma source of truth: flows, screens, and a design system the build can follow. For conversion websites, that includes mobile-first layouts and calls to action. We do not hand over mood boards with no path to ship.",
      },
      {
        question: "Can UI/UX and development happen in the same project?",
        answer:
          "That is how we prefer to work. Design decisions lock before they are expensive, and React or React Native implementation follows the same system. Split agencies are how rebuilds start.",
      },
    ],
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
    seo: {
      title: "AI Automation, Agents & Workflow AI for Operations",
      description:
        "AI automation for real work: agents, chatbots, and workflow AI connected to your systems — OpenAI and Claude where they change output, not a demo chatbot on the side.",
      keywords: [
        "AI automation",
        "AI agent development",
        "workflow automation",
        "chatbot development",
        "business process automation",
        "OpenAI integration",
        "Claude AI",
        "AI software development",
      ],
    },
    story: [
      "AI automation is useful when a person still copies, classifies, or chases the same request. We build agents, chatbots, and workflow AI on the steps that change output — routing tickets, drafting replies, extracting documents, following up — connected to the CRM, inbox, or database you already run.",
      "Models are components. OpenAI, Claude, and Node.js services sit behind a job: who does it, what the input is, and what happens when the model is wrong. Human review stays in the loop until the loop earns trust.",
      "We do not sell a generic chatbot bolted onto a homepage. If the work is not in the workflow, the feature will not get used after week two. Data pipelines and reporting follow the same rule: ingest, analyse, and surface where the team already looks.",
    ],
    faqs: [
      {
        question: "Can you add AI to software we already use?",
        answer:
          "Yes. Most AI automation work is integration: APIs into the tools you already run, with an agent or workflow on a specific job. A standalone chat window that cannot see your records is not an automation.",
      },
      {
        question: "Do you build custom AI agents or only chatbots?",
        answer:
          "Agents, workflow AI, and chatbots when a conversation is the right interface. An agent that plans steps and writes back to a system is different from a FAQ bot. We name the job first, then the model.",
      },
      {
        question: "Which AI models do you use?",
        answer:
          "OpenAI and Claude where they fit the task, with Node.js (and Python when the pipeline needs it) around the model. The model is replaceable. The workflow, permissions, and failure path are not.",
      },
    ],
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
    seo: {
      title: "SEO Services & Digital Marketing for Qualified Demand",
      description:
        "Technical SEO, content strategy, and digital marketing on Next.js sites — search and campaigns built around your offer, not vanity traffic.",
      keywords: [
        "SEO services",
        "technical SEO",
        "digital marketing",
        "search engine optimization",
        "content strategy",
        "keyword research",
        "conversion rate optimization",
        "Next.js SEO",
      ],
    },
    story: [
      "SEO services and digital marketing only work if the site can be crawled, the offer is clear, and the landing page matches the search. We start from the buyer and the work you sell, then fix technical SEO, content, and paid demand against that story.",
      "Technical SEO on Next.js covers crawl, indexation, metadata, structured data, and Core Web Vitals. Content work is keyword research, pillar and cluster pages, and internal links — not a blog nobody asked for. Paid ads only make sense when the page is built to convert.",
      "The goal is qualified conversations, not a traffic spike. If search engines cannot read the site, we fix the site. If the site ranks for the wrong queries, we change the content. We do not sell rankings we cannot influence.",
    ],
    faqs: [
      {
        question: "Do you offer technical SEO and content, or only ads?",
        answer:
          "Technical SEO, content and keyword strategy, and paid campaigns when the landing page is ready. Digital marketing without a readable, converting site is spend against a broken path.",
      },
      {
        question: "Can you SEO a site you did not originally build?",
        answer:
          "Yes. Enterprise technical SEO often starts with crawl, speed, and index issues on an existing codebase. If the stack cannot rank, we say so before we write more pages.",
      },
      {
        question: "How do you measure SEO work?",
        answer:
          "Indexation, the queries that match the offer, and whether those visits become conversations. Vanity sessions without a lead or a sale are not the report we optimise for.",
      },
    ],
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
