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
    label: "Frontend",
    description: "Interfaces people use — fast to ship, clear to maintain.",
    x: 50,
    y: 5,
  },
  {
    id: "mobile",
    label: "Mobile",
    description: "Phone and tablet products on the same APIs as the web stack.",
    x: 86,
    y: 14,
  },
  {
    id: "ai",
    label: "AI",
    description: "Language models wired into real operational work.",
    x: 94,
    y: 38,
  },
  {
    id: "cloud",
    label: "Cloud",
    description: "The environment products run in — deploy, scale, observe.",
    x: 88,
    y: 74,
  },
  {
    id: "devops",
    label: "DevOps",
    description: "Repeatable builds and releases instead of a fragile handoff.",
    x: 62,
    y: 95,
  },
  {
    id: "database",
    label: "Database",
    description: "Data the rest of the stack can trust — relational stores, cache, and typed access.",
    x: 20,
    y: 94,
  },
  {
    id: "backend",
    label: "Backend",
    description: "APIs, jobs, and application logic that last past launch.",
    x: 6,
    y: 42,
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Search and conversion built around the offer.",
    x: 14,
    y: 10,
  },
];

export const technologies: Technology[] = [
  {
    slug: "react",
    name: "React",
    cluster: "frontend",
    x: 35,
    y: 19,
    related: ["nextjs", "vue", "typescript", "rest-apis"],
    description:
      "Component-driven interfaces for products that have to stay fast as they grow.",
  },
  {
    slug: "nextjs",
    name: "Next.js",
    cluster: "frontend",
    x: 50,
    y: 16,
    related: ["react", "vue", "typescript", "seo", "aws"],
    description:
      "Web apps that ship quickly, rank well, and stay maintainable.",
  },
  {
    slug: "vue",
    name: "Vue.js",
    cluster: "frontend",
    x: 65,
    y: 19,
    related: ["react", "nextjs", "typescript"],
    description:
      "Approachable front-ends when the interface needs to move quickly.",
  },
  {
    slug: "typescript",
    name: "TypeScript",
    cluster: "frontend",
    x: 50,
    y: 27,
    related: ["react", "nextjs", "vue", "nodejs"],
    description: "Safer, clearer code as the product and the team get larger.",
  },
  {
    slug: "laravel",
    name: "Laravel",
    cluster: "backend",
    x: 16,
    y: 40,
    related: ["php", "nodejs", "mysql"],
    description:
      "Structured PHP applications teams can extend without starting over.",
  },
  {
    slug: "php",
    name: "PHP",
    cluster: "backend",
    x: 10,
    y: 52,
    related: ["laravel", "nodejs"],
    description: "Reliable server-side foundations for web products that last.",
  },
  {
    slug: "nodejs",
    name: "Node.js",
    cluster: "backend",
    x: 19,
    y: 64,
    related: ["php", "python", "laravel", "postgresql", "openai", "rest-apis"],
    description:
      "JavaScript on the server for APIs, jobs, and real-time flows.",
  },
  {
    slug: "python",
    name: "Python",
    cluster: "backend",
    x: 13,
    y: 76,
    related: ["nodejs"],
    description:
      "Services and data work when a product needs more than the PHP or Node core.",
  },
  {
    slug: "rest-apis",
    name: "REST APIs",
    cluster: "mobile",
    x: 80,
    y: 24,
    related: ["react", "nodejs", "typescript"],
    description:
      "The contract mobile and web clients share — one set of APIs, not a separate stack.",
  },
  {
    slug: "mysql",
    name: "MySQL",
    cluster: "database",
    x: 28,
    y: 84,
    related: ["postgresql", "laravel"],
    description:
      "Proven relational data for straightforward transactional products.",
  },
  {
    slug: "postgresql",
    name: "PostgreSQL",
    cluster: "database",
    x: 40,
    y: 88,
    related: ["mysql", "nodejs"],
    description: "Robust data when integrity and complexity both matter.",
  },
  {
    slug: "openai",
    name: "OpenAI",
    cluster: "ai",
    x: 84,
    y: 38,
    related: ["claude", "nodejs"],
    description: "Language models wired into real business workflows.",
  },
  {
    slug: "claude",
    name: "Claude",
    cluster: "ai",
    x: 88,
    y: 51,
    related: ["openai"],
    description:
      "Long-context AI for documents, agents, and careful reasoning.",
  },
  {
    slug: "aws",
    name: "AWS",
    cluster: "cloud",
    x: 78,
    y: 72,
    related: ["docker", "git", "nextjs"],
    description: "Infrastructure that deploys, scales, and stays observable.",
  },
  {
    slug: "docker",
    name: "Docker",
    cluster: "devops",
    x: 56,
    y: 84,
    related: ["aws", "git"],
    description:
      "The same environment from a local build to a production release.",
  },
  {
    slug: "git",
    name: "Git",
    cluster: "devops",
    x: 70,
    y: 86,
    related: ["docker", "aws"],
    description: "Versioned work so releases stay reviewable and repeatable.",
  },
  {
    slug: "seo",
    name: "SEO",
    cluster: "marketing",
    x: 20,
    y: 21,
    related: ["nextjs"],
    description:
      "Search and conversion around the offer — qualified demand, not vanity traffic.",
  },
  {
    slug: "tailwind",
    name: "Tailwind CSS",
    cluster: "frontend",
    x: 38,
    y: 24,
    related: ["react", "nextjs"],
    description:
      "Utility-first styling so interfaces stay consistent as the product grows.",
  },
  {
    slug: "figma",
    name: "Figma",
    cluster: "frontend",
    x: 62,
    y: 24,
    related: ["react", "nextjs"],
    description:
      "The design source we turn into production UI — not a separate handoff pile.",
  },
  {
    slug: "react-native",
    name: "React Native",
    cluster: "mobile",
    x: 78,
    y: 18,
    related: ["react", "typescript", "rest-apis"],
    description:
      "Cross-platform apps that share logic with the web stack.",
  },
  {
    slug: "flutter",
    name: "Flutter",
    cluster: "mobile",
    x: 88,
    y: 22,
    related: ["rest-apis"],
    description:
      "Native-feeling iOS and Android apps from one codebase when that fit is better.",
  },
  {
    slug: "expo",
    name: "Expo",
    cluster: "mobile",
    x: 84,
    y: 30,
    related: ["react-native", "typescript"],
    description:
      "Faster React Native delivery — builds, updates, and device APIs without extra ceremony.",
  },
  {
    slug: "graphql",
    name: "GraphQL",
    cluster: "backend",
    x: 22,
    y: 48,
    related: ["nodejs", "rest-apis"],
    description:
      "Typed queries when clients need exactly the data they ask for — not a second REST surface.",
  },
  {
    slug: "redis",
    name: "Redis",
    cluster: "database",
    x: 34,
    y: 80,
    related: ["nodejs", "postgresql"],
    description:
      "Caching and short-lived state so the product stays fast under load.",
  },
  {
    slug: "prisma",
    name: "Prisma",
    cluster: "database",
    x: 46,
    y: 82,
    related: ["postgresql", "nodejs", "typescript"],
    description:
      "Typed data access for Node and TypeScript products that have to stay maintainable.",
  },
  {
    slug: "vercel",
    name: "Vercel",
    cluster: "cloud",
    x: 82,
    y: 66,
    related: ["nextjs", "aws"],
    description:
      "Where Next.js products ship — preview URLs, edge delivery, and straightforward deploys.",
  },
  {
    slug: "cloudflare",
    name: "Cloudflare",
    cluster: "cloud",
    x: 74,
    y: 78,
    related: ["aws", "nextjs"],
    description:
      "CDN, DNS, and edge protection in front of the app.",
  },
  {
    slug: "github-actions",
    name: "GitHub Actions",
    cluster: "devops",
    x: 64,
    y: 90,
    related: ["git", "docker"],
    description:
      "Repeatable checks and releases instead of a manual deploy checklist.",
  },
  {
    slug: "paid-ads",
    name: "Paid Ads",
    cluster: "marketing",
    x: 16,
    y: 16,
    related: ["seo"],
    description:
      "Paid demand that lands on a page built to convert — not spend against a vague offer.",
  },
  {
    slug: "analytics",
    name: "Analytics",
    cluster: "marketing",
    x: 24,
    y: 14,
    related: ["seo", "nextjs"],
    description:
      "Measurement around the offer: what turned into a conversation, not vanity sessions.",
  },
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
  "database",
  "ai",
  "cloud",
  "devops",
  "marketing",
];

export function getClusterTechnologies(id: TechnologyClusterId) {
  return technologies.filter((tech) => tech.cluster === id);
}
