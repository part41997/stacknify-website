import { siteConfig } from "@/data/site";
import type {
  SectionHeadingCopy,
  Technology,
  TechnologyCluster,
  TechnologyClusterId,
} from "@/types";

export interface TechnologiesContent extends SectionHeadingCopy {
  core: string;
  idleTitle: string;
  idleDescription: string;
  idleDescriptionTouch: string;
  loadingLabel: string;
  mapLabel: string;
  layersLabel: string;
  layerLabel: string;
}

export const technologiesContent: TechnologiesContent = {
  headingPrefix: "Built With Technology",
  headingAccent: "That Scales.",
  description:
    "The languages, models, and infrastructure we actually ship with — grouped the way a product is built.",
  core: siteConfig.name.toUpperCase(),
  idleTitle: `The ${siteConfig.name} stack`,
  idleDescription: "Select a layer to see the tools behind it.",
  idleDescriptionTouch: "Select a layer to see the tools behind it.",
  loadingLabel: "Loading technology stack",
  mapLabel: "Technology stack",
  layersLabel: "Architecture",
  layerLabel: "Stack layer",
};

export const technologyClusters: readonly TechnologyCluster[] = [
  {
    id: "frontend",
    label: "Web & Frontend",
    description:
      "Interfaces people use — fast to ship, clear to maintain, ready to grow.",
    x: 50,
    y: 8,
  },
  {
    id: "mobile",
    label: "Mobile Development",
    description:
      "Phone and tablet products on the same APIs as the rest of the stack.",
    x: 86,
    y: 16,
  },
  {
    id: "backend",
    label: "Backend & APIs",
    description:
      "Application logic, jobs, and APIs that last past the first launch.",
    x: 8,
    y: 42,
  },
  {
    id: "ai",
    label: "AI & LLM Solutions",
    description:
      "Language models, retrieval, and agents wired into real operational work.",
    x: 94,
    y: 38,
  },
  {
    id: "database",
    label: "Data & Databases",
    description:
      "Data the product can trust — stores, cache, and typed access.",
    x: 22,
    y: 92,
  },
  {
    id: "cloud",
    label: "Cloud & Infrastructure",
    description:
      "Where products run — deploy, scale, and stay observable.",
    x: 88,
    y: 72,
  },
  {
    id: "devops",
    label: "DevOps & CI/CD",
    description:
      "Repeatable builds and releases instead of a fragile handoff.",
    x: 62,
    y: 95,
  },
  {
    id: "design",
    label: "UI/UX & Product Design",
    description:
      "The source of the product experience — from wireframe to a system teams can ship.",
    x: 18,
    y: 12,
  },
  {
    id: "enterprise",
    label: "Enterprise & Business Solutions",
    description:
      "Internal systems operators actually use — records, dashboards, and admin work.",
    x: 50,
    y: 50,
  },
  {
    id: "integrations",
    label: "Integrations & Automation",
    description:
      "Payments, webhooks, and workflows that connect the product to the rest of the business.",
    x: 74,
    y: 50,
  },
  {
    id: "security",
    label: "Security & Performance",
    description:
      "Auth, protection, and speed treated as product requirements — not a late checklist.",
    x: 40,
    y: 70,
  },
  {
    id: "marketing",
    label: "Growth & Digital Marketing",
    description:
      "Search, ads, and conversion built around the offer — qualified demand, not vanity traffic.",
    x: 14,
    y: 10,
  },
];

function item(
  slug: string,
  name: string,
  cluster: TechnologyClusterId,
  description: string,
  related: readonly string[] = [],
): Technology {
  return { slug, name, cluster, description, related, x: 50, y: 50 };
}

export const technologies: Technology[] = [
  item(
    "react",
    "React",
    "frontend",
    "Component-driven interfaces for products that have to stay fast as they grow. We keep screens reusable instead of rebuilding the same UI in every release.",
    ["nextjs", "vue", "typescript", "javascript", "tailwind"],
  ),
  item(
    "nextjs",
    "Next.js",
    "frontend",
    "Web apps that ship quickly, rank well, and stay maintainable. Routing, rendering, and deployment stay in one place so the team is not gluing tools together.",
    ["react", "typescript", "javascript", "tailwind", "seo"],
  ),
  item(
    "vue",
    "Vue.js",
    "frontend",
    "Approachable front-ends when the interface needs to move quickly. Clear structure without forcing a heavier React stack onto every product.",
    ["react", "nextjs", "typescript", "javascript"],
  ),
  item(
    "typescript",
    "TypeScript",
    "frontend",
    "Safer, clearer code as the product and the team get larger. Types catch contract breaks early — in the UI, the API, and the data layer.",
    ["react", "nextjs", "javascript", "nodejs"],
  ),
  item(
    "javascript",
    "JavaScript",
    "frontend",
    "The language of the web when we need it in the browser and on the server. We use it where it is the right fit, not as a default for every layer.",
    ["typescript", "react", "nextjs", "nodejs"],
  ),
  item(
    "tailwind",
    "Tailwind CSS",
    "frontend",
    "Utility-first styling so interfaces stay consistent as the product grows. Design tokens live in the code, not in a disconnected stylesheet pile.",
    ["react", "nextjs", "vue"],
  ),
  item(
    "flutter",
    "Flutter",
    "mobile",
    "Native-feeling iOS and Android apps from one codebase when that fit is better. Shared UI and logic without running two separate mobile teams.",
    ["react-native", "expo", "android", "ios", "rest-apis"],
  ),
  item(
    "react-native",
    "React Native",
    "mobile",
    "Cross-platform apps that share logic with the web stack. One component model from the product UI to the phone, with native modules where they matter.",
    ["flutter", "expo", "react", "typescript", "rest-apis"],
  ),
  item(
    "expo",
    "Expo",
    "mobile",
    "Faster React Native delivery — builds, updates, and device APIs without extra ceremony. We get to a store build without standing up a fragile native toolchain.",
    ["react-native", "android", "ios"],
  ),
  item(
    "android",
    "Android",
    "mobile",
    "Store-ready Android delivery on Flutter or React Native, with native work when the platform requires it. Permissions, devices, and Play release stay in the plan.",
    ["ios", "flutter", "react-native", "expo"],
  ),
  item(
    "ios",
    "iOS",
    "mobile",
    "iPhone and iPad products that feel native and pass App Store review. We handle the platform details so the product is not stuck in a web wrapper.",
    ["android", "flutter", "react-native", "expo"],
  ),
  item(
    "rest-apis",
    "REST APIs",
    "mobile",
    "The contract mobile and web clients share — one set of APIs, not a separate stack. Auth, payloads, and errors stay explicit so clients do not guess.",
    ["react-native", "flutter", "nodejs", "rest"],
  ),
  item(
    "nodejs",
    "Node.js",
    "backend",
    "JavaScript on the server for APIs, jobs, and real-time flows. The same language as the front-end when that reduces handoff and keeps the team moving.",
    ["python", "laravel", "php", "fastapi", "graphql", "rest"],
  ),
  item(
    "python",
    "Python",
    "backend",
    "Services and data work when a product needs more than the PHP or Node core. Strong fit for AI pipelines, jobs, and APIs that have to stay readable.",
    ["nodejs", "fastapi", "openai"],
  ),
  item(
    "laravel",
    "Laravel",
    "backend",
    "Structured PHP applications teams can extend without starting over. Auth, queues, and admin work ship as a system — not a folder of scripts.",
    ["php", "nodejs", "mysql"],
  ),
  item(
    "php",
    "PHP",
    "backend",
    "Reliable server-side foundations for web products that last. We use it where the hosting, the team, or the existing product already depend on it.",
    ["laravel", "nodejs"],
  ),
  item(
    "fastapi",
    "FastAPI",
    "backend",
    "Typed Python APIs that stay fast to write and clear to consume. A strong path when AI services and product APIs need to live next to each other.",
    ["python", "nodejs", "graphql", "rest"],
  ),
  item(
    "graphql",
    "GraphQL",
    "backend",
    "Typed queries when clients need exactly the data they ask for. We use it when REST would otherwise turn into a pile of one-off endpoints.",
    ["nodejs", "rest", "rest-apis"],
  ),
  item(
    "rest",
    "REST",
    "backend",
    "Predictable HTTP APIs that web, mobile, and partners can all call. Resources, status codes, and auth stay boring on purpose so clients stay simple.",
    ["graphql", "nodejs", "rest-apis"],
  ),
  item(
    "openai",
    "OpenAI",
    "ai",
    "Language models wired into real business workflows — not a chat demo. We design prompts, tools, and fallbacks so operators can trust the output.",
    ["claude", "gemini", "llms", "rag", "ai-agents"],
  ),
  item(
    "claude",
    "Claude",
    "ai",
    "Long-context AI for documents, agents, and careful reasoning. Used when the work is large, sensitive, or needs a slower, more complete pass.",
    ["openai", "gemini", "llms", "rag"],
  ),
  item(
    "gemini",
    "Gemini",
    "ai",
    "Google’s models when the product already lives in that cloud or needs multimodal input. We pick it for the job, not as a default brand.",
    ["openai", "claude", "llms", "google-cloud"],
  ),
  item(
    "llms",
    "LLMs",
    "ai",
    "Model choice as an architecture decision — cost, latency, and quality against the actual task. We keep the product from locking to a single vendor.",
    ["openai", "claude", "gemini", "rag", "ai-agents"],
  ),
  item(
    "rag",
    "RAG",
    "ai",
    "Retrieval so answers come from your documents, not a generic guess. Chunking, citations, and evals sit in the build — not as an afterthought.",
    ["llms", "openai", "ai-agents", "mcp"],
  ),
  item(
    "ai-agents",
    "AI Agents",
    "ai",
    "Agents that take bounded actions in a workflow operators can still see. Tools, permissions, and logs keep the work inspectable when something goes wrong.",
    ["llms", "rag", "mcp", "openai"],
  ),
  item(
    "mcp",
    "MCP",
    "ai",
    "Model Context Protocol so tools and data can be shared with agents without a one-off integration each time. A cleaner way to give models access they can actually use.",
    ["ai-agents", "rag", "llms"],
  ),
  item(
    "postgresql",
    "PostgreSQL",
    "database",
    "Robust relational data when integrity and complexity both matter. Transactions, reporting, and product state stay in a store the rest of the stack can trust.",
    ["mysql", "mongodb", "redis", "prisma"],
  ),
  item(
    "mysql",
    "MySQL",
    "database",
    "Proven relational data for straightforward transactional products. A strong default when the hosting and the team already know it well.",
    ["postgresql", "laravel", "prisma"],
  ),
  item(
    "mongodb",
    "MongoDB",
    "database",
    "Document storage when the shape of the data is still moving. We use it where a rigid schema would slow the product down more than it would help.",
    ["postgresql", "redis", "firebase"],
  ),
  item(
    "redis",
    "Redis",
    "database",
    "Caching and short-lived state so the product stays fast under load. Sessions, queues, and rate limits live here instead of overloading the primary store.",
    ["postgresql", "nodejs", "mongodb"],
  ),
  item(
    "prisma",
    "Prisma",
    "database",
    "Typed data access for Node and TypeScript products that have to stay maintainable. Schema changes stay reviewable instead of hidden in raw SQL sprawl.",
    ["postgresql", "mysql", "nodejs", "typescript"],
  ),
  item(
    "firebase",
    "Firebase",
    "database",
    "Hosted data, auth, and realtime updates when the product needs to move before a full backend lands. We treat it as a stage, not a dead-end.",
    ["mongodb", "authentication", "google-cloud"],
  ),
  item(
    "aws",
    "AWS",
    "cloud",
    "Infrastructure that deploys, scales, and stays observable. We use the services the product actually needs — not a catalogue tour.",
    ["vercel", "google-cloud", "azure", "serverless", "docker"],
  ),
  item(
    "vercel",
    "Vercel",
    "cloud",
    "Where Next.js products ship — preview URLs, edge delivery, and straightforward deploys. The path from a pull request to a live URL stays short.",
    ["nextjs", "aws", "cloudflare", "serverless"],
  ),
  item(
    "cloudflare",
    "Cloudflare",
    "cloud",
    "CDN, DNS, and edge protection in front of the app. Caching and shielding sit at the edge so origin load and latency stay under control.",
    ["aws", "vercel", "performance"],
  ),
  item(
    "google-cloud",
    "Google Cloud",
    "cloud",
    "Google’s cloud when the product already uses its data, AI, or identity tools. We keep the footprint to what operations can actually run.",
    ["aws", "azure", "gemini", "firebase"],
  ),
  item(
    "azure",
    "Azure",
    "cloud",
    "Microsoft cloud for teams already in that estate. Identity, hosting, and data stay aligned with how the rest of the business already works.",
    ["aws", "google-cloud", "serverless"],
  ),
  item(
    "serverless",
    "Serverless",
    "cloud",
    "Functions and managed runtimes when the workload is spiky or event-driven. We use them to avoid idle servers — not to hide an unclear architecture.",
    ["aws", "vercel", "azure"],
  ),
  item(
    "docker",
    "Docker",
    "devops",
    "The same environment from a local build to a production release. Images stay small, explicit, and reviewable so “works on my machine” is not the process.",
    ["kubernetes", "git", "github-actions", "cicd"],
  ),
  item(
    "kubernetes",
    "Kubernetes",
    "devops",
    "Orchestration when the product needs scheduled, scalable services — not a single box. We adopt it when the operational cost is justified by the load.",
    ["docker", "terraform", "aws"],
  ),
  item(
    "git",
    "Git",
    "devops",
    "Versioned work so releases stay reviewable and repeatable. Branches, reviews, and history are how the team ships — not a zip of the last good copy.",
    ["github-actions", "docker", "cicd"],
  ),
  item(
    "github-actions",
    "GitHub Actions",
    "devops",
    "Repeatable checks and releases instead of a manual deploy checklist. Tests, builds, and promotions run the same way every time.",
    ["git", "cicd", "docker"],
  ),
  item(
    "cicd",
    "CI/CD",
    "devops",
    "Continuous integration and delivery as a path, not a slogan. Every change is built, checked, and releasable without a hero on the keyboard.",
    ["github-actions", "git", "docker", "terraform"],
  ),
  item(
    "terraform",
    "Terraform",
    "devops",
    "Infrastructure as code so environments are declared, not clicked together. Reviewable changes beat a console that only one person understands.",
    ["aws", "kubernetes", "cicd"],
  ),
  item(
    "figma",
    "Figma",
    "design",
    "The design source we turn into production UI — not a separate handoff pile. Components, spacing, and states stay aligned with what engineering ships.",
    ["design-systems", "prototyping", "wireframing", "ux"],
  ),
  item(
    "design-systems",
    "Design Systems",
    "design",
    "Shared tokens, components, and rules so new screens do not invent a new product. Design and code stay on the same language as the suite grows.",
    ["figma", "ux", "prototyping"],
  ),
  item(
    "prototyping",
    "Prototyping",
    "design",
    "Clickable flows before we commit engineering time. Stakeholders try the path, we fix the friction, and then we build what already made sense.",
    ["figma", "wireframing", "ux"],
  ),
  item(
    "wireframing",
    "Wireframing",
    "design",
    "Structure first — layout, hierarchy, and the job to be done. Visual polish comes after the flow is honest.",
    ["figma", "prototyping", "ux"],
  ),
  item(
    "ux",
    "UX",
    "design",
    "The experience of completing the work without extra steps. We design for the operator, the customer, and the empty state — not only the happy path screenshot.",
    ["figma", "design-systems", "wireframing"],
  ),
  item(
    "erp",
    "ERP",
    "enterprise",
    "Operational records, inventory, and process in one system the business can actually run. We build around how work happens, not a generic module list.",
    ["crm", "dashboards", "admin-panels"],
  ),
  item(
    "crm",
    "CRM",
    "enterprise",
    "Pipeline, accounts, and follow-up that sales and support can trust. The record is the source of truth — not a spreadsheet next to the tool.",
    ["erp", "saas", "portals"],
  ),
  item(
    "saas",
    "SaaS",
    "enterprise",
    "Multi-tenant products with billing, roles, and a path after launch. We design tenancy and permissions early so growth does not require a rewrite.",
    ["crm", "dashboards", "portals"],
  ),
  item(
    "dashboards",
    "Dashboards",
    "enterprise",
    "Numbers operators can act on — not a wall of charts. Each view answers a decision, with filters and export that match how the team already works.",
    ["erp", "saas", "admin-panels"],
  ),
  item(
    "portals",
    "Portals",
    "enterprise",
    "Customer and partner access to the work they need to do themselves. Status, documents, and requests stay in the product instead of an inbox thread.",
    ["saas", "crm", "admin-panels"],
  ),
  item(
    "admin-panels",
    "Admin Panels",
    "enterprise",
    "Internal tools for the people who keep the product running. Roles, audit, and bulk actions are designed in — not bolted on after the first incident.",
    ["dashboards", "erp", "portals"],
  ),
  item(
    "api-integration",
    "API Integration",
    "integrations",
    "Connecting the product to the systems the business already runs. Mapping, retries, and failure states are part of the build, not a weekend script.",
    ["webhooks", "payment-gateways", "workflow-automation"],
  ),
  item(
    "payment-gateways",
    "Payment Gateways",
    "integrations",
    "Checkout, invoices, and payouts through providers the business already trusts. Webhooks, reconciliation, and failed charges are designed as product flows.",
    ["api-integration", "webhooks", "saas"],
  ),
  item(
    "webhooks",
    "Webhooks",
    "integrations",
    "Event callbacks that other systems can rely on. Signed payloads, retries, and a log of what fired — so a missed event is visible, not silent.",
    ["api-integration", "workflow-automation", "payment-gateways"],
  ),
  item(
    "workflow-automation",
    "Workflow Automation",
    "integrations",
    "Repeatable business steps that used to live in someone’s head. Approvals, handoffs, and reminders run the same way every time, with a human still in the loop.",
    ["ai-automation", "webhooks", "api-integration"],
  ),
  item(
    "ai-automation",
    "AI Automation",
    "integrations",
    "Language models inside those workflows — drafting, classifying, routing — with an operator able to see and override the result. Automation without a black box.",
    ["workflow-automation", "ai-agents", "openai"],
  ),
  item(
    "authentication",
    "Authentication",
    "security",
    "Sign-in, sessions, and roles that match how the organisation actually works. MFA, recovery, and least privilege are product features, not a plugin afterthought.",
    ["api-security", "data-protection", "owasp"],
  ),
  item(
    "api-security",
    "API Security",
    "security",
    "Tokens, scopes, and rate limits so clients cannot wander the system. Every endpoint has an owner, an audience, and a failure mode we have already tested.",
    ["authentication", "owasp", "performance"],
  ),
  item(
    "owasp",
    "OWASP",
    "security",
    "The common web risks treated as a build checklist, not a surprise in a pentest. Injection, access control, and secrets handling are designed in from the start.",
    ["api-security", "authentication", "data-protection"],
  ),
  item(
    "data-protection",
    "Data Protection",
    "security",
    "Encryption, retention, and access so customer data is not a side effect of the feature. We know what is stored, who can see it, and how it leaves.",
    ["authentication", "owasp", "api-security"],
  ),
  item(
    "performance",
    "Performance",
    "security",
    "Load time, query cost, and cache as part of the product, not a later optimisation sprint. Slow paths are found with measurement, then cut.",
    ["api-security", "cloudflare", "redis"],
  ),
  item(
    "seo",
    "SEO",
    "marketing",
    "Search built around the offer — technical foundations, content, and intent. Rankings that turn into conversations, not a dashboard of vanity keywords.",
    ["ai-seo", "analytics", "cro", "nextjs"],
  ),
  item(
    "ai-seo",
    "AI SEO",
    "marketing",
    "AI used to research, draft, and structure content that still has to earn the click. Humans keep the offer honest; the model speeds the production, not the claim.",
    ["seo", "analytics", "llms"],
  ),
  item(
    "paid-ads",
    "Paid Ads",
    "marketing",
    "Paid demand that lands on a page built to convert. Spend follows a clear offer and a measured path — not a campaign against a vague homepage.",
    ["seo", "social-media", "analytics", "cro"],
  ),
  item(
    "social-media",
    "Social Media",
    "marketing",
    "Presence and campaigns that point back to the product, not a content treadmill. We treat social as a channel to the offer, not a separate brand universe.",
    ["paid-ads", "seo", "analytics"],
  ),
  item(
    "analytics",
    "Analytics",
    "marketing",
    "Measurement around the offer: what turned into a conversation, not vanity sessions. Events, funnels, and sources stay readable for the people who spend.",
    ["seo", "paid-ads", "cro"],
  ),
  item(
    "cro",
    "CRO",
    "marketing",
    "Conversion work on the pages that already get traffic. Copy, proof, and the form are tested against a real goal — a lead, a booking, a paid account.",
    ["seo", "paid-ads", "analytics"],
  ),
];

export const technologyCore = { slug: "core", x: 50, y: 50 } as const;

function edgeKey(from: string, to: string) {
  return from < to ? `${from}::${to}` : `${to}::${from}`;
}

function collectEdges() {
  const seen = new Set<string>();
  const edges: Array<readonly [string, string]> = [];

  function add(from: string, to: string) {
    if (from === to) {
      return;
    }

    const key = edgeKey(from, to);
    if (seen.has(key)) {
      return;
    }

    seen.add(key);
    edges.push([from, to]);
  }

  for (const tech of technologies) {
    add(technologyCore.slug, tech.slug);
    for (const other of tech.related ?? []) {
      add(tech.slug, other);
    }
  }

  return edges;
}

export const technologyEdges = collectEdges();

const technologyBySlug = new Map(
  technologies.map((tech) => [tech.slug, tech] as const),
);

export function getTechnologyPoint(slug: string) {
  if (slug === technologyCore.slug) {
    return technologyCore;
  }

  return technologyBySlug.get(slug) ?? null;
}

export function getRelatedTechnologySlugs(
  slug: string | null,
  clusterId?: TechnologyClusterId | null,
) {
  const related = new Set<string>();

  if (slug) {
    const active = technologyBySlug.get(slug);
    if (!active) {
      return related;
    }

    related.add(slug);
    related.add(technologyCore.slug);

    for (const tech of technologies) {
      if (tech.cluster === active.cluster) {
        related.add(tech.slug);
      }
    }

    for (const [from, to] of technologyEdges) {
      if (from === slug) {
        related.add(to);
      }
      if (to === slug) {
        related.add(from);
      }
    }

    return related;
  }

  if (clusterId) {
    related.add(technologyCore.slug);
    for (const tech of technologies) {
      if (tech.cluster === clusterId) {
        related.add(tech.slug);
      }
    }
  }

  return related;
}

export function getClusterLabel(id: TechnologyClusterId) {
  return technologyClusters.find((cluster) => cluster.id === id)?.label ?? id;
}

export function getClusterById(id: TechnologyClusterId) {
  return technologyClusters.find((cluster) => cluster.id === id);
}

export const technologyLayerOrder: readonly TechnologyClusterId[] = [
  "frontend",
  "mobile",
  "backend",
  "ai",
  "database",
  "cloud",
  "devops",
  "design",
  "enterprise",
  "integrations",
  "security",
  "marketing",
];

export function getClusterTechnologies(id: TechnologyClusterId) {
  return technologies.filter((tech) => tech.cluster === id);
}
