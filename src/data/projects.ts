import {
  getProjectGallerySlides,
  getProjectImage,
  getSiteImage,
} from "@/data/images";
import { isImageReady } from "@/lib/images";
import type {
  Project,
  ProjectCategoryId,
  ProjectLayout,
  SectionHeadingCopy,
  SiteImageAsset,
  SiteImageId,
} from "@/types";

export interface ProjectLabels {
  industry: string;
  solutionType: string;
  challenge: string;
  approach: string;
  solution: string;
  technology: string;
  screenshots: string;
  galleryLabel: string;
  previousSlide: string;
  nextSlide: string;
  slideLabel: string;
  result: string;
  client: string;
}

export interface ProjectsContent extends SectionHeadingCopy {
  viewCaseStudy: string;
  unpublishedResult: string;
  unpublishedScreenshots: string;
  placeholderLabel: string;
  placeholderNotice: string;
  emptyFilter: string;
  sectionLabel: string;
  backLabel: string;
  similarCta: string;
  similarNote: string;
  similarNoteAccent: string;
  labels: ProjectLabels;
  fallbackTitle: string;
}

export const projectsContent: ProjectsContent = {
  headingPrefix: "Built To Solve",
  headingAccent: "Real Problems.",
  description:
    "Selected work across software, apps, AI, design, and growth — shown as we shipped it.",
  viewCaseStudy: "View Case Study",
  unpublishedResult: "Outcome not published.",
  unpublishedScreenshots:
    "Project screenshots will appear here when we can share them.",
  placeholderLabel: "Unpublished",
  placeholderNotice:
    "This case study is not a published client engagement. No results or screenshots have been released.",
  emptyFilter: "No projects in this category yet.",
  sectionLabel: "Projects",
  backLabel: "Back to projects",
  similarCta: "Start a similar project",
  similarNote: "Interested in work like this?",
  similarNoteAccent: "Tell us about the problem.",
  labels: {
    industry: "Industry",
    solutionType: "Solution",
    challenge: "Challenge",
    approach: "Approach",
    solution: "Solution",
    technology: "Technology",
    screenshots: "Screenshots",
    galleryLabel: "Product views",
    previousSlide: "Previous view",
    nextSlide: "Next view",
    slideLabel: "Show view",
    result: "Outcome",
    client: "Client",
  },
  fallbackTitle: "Project",
};

export const projectCategoryLabels: Record<ProjectCategoryId, string> = {
  ai: "AI",
  web: "Web",
  mobile: "Mobile",
  saas: "SaaS",
  design: "Design",
  ecommerce: "E-commerce",
  automation: "Automation",
  marketing: "Marketing",
};

export const projectFilters = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "saas", label: "SaaS" },
  { id: "design", label: "Design" },
  { id: "marketing", label: "SEO" },
  { id: "automation", label: "Automation" },
] as const satisfies readonly {
  id: "all" | ProjectCategoryId;
  label: string;
}[];

export type ProjectFilterId = (typeof projectFilters)[number]["id"];

/**
 * Work samples from the Stacknify portfolio. Outcomes stay unpublished
 * unless a real result is cleared to share.
 */
export const projects: Project[] = [
  {
    slug: "internal-management-system",
    title: "Internal Management System",
    industry: "Operations",
    solutionType: "Custom Software",
    categories: ["saas", "web"],
    challenge:
      "Day-to-day work is split across tools, so reporting and access are hard to trust.",
    approach:
      "One system for records, roles, and reports — with authentication that matches who can see what.",
    solution:
      "An internal platform for data management, role-based dashboards, and secure sign-in.",
    technology: ["React", "Next.js", "Laravel", "PostgreSQL"],
    result: null,
    placeholder: false,
    featured: true,
    layout: "compact",
  },
  {
    slug: "custom-client-platform",
    title: "Custom Client Platform",
    industry: "B2B software",
    solutionType: "Custom Software",
    categories: ["saas", "web"],
    challenge:
      "Clients need a place to onboard, use the product, and stay within the right features.",
    approach:
      "Build the client surface around onboarding and permissions, not a generic portal template.",
    solution:
      "A client-facing platform with onboarding, feature access, and a secure interface that can scale.",
    technology: ["React", "Node.js", "PostgreSQL"],
    result: null,
    placeholder: false,
    layout: "compact",
  },
  {
    slug: "enterprise-web-application",
    title: "Enterprise Web Application",
    industry: "Enterprise",
    solutionType: "Custom Software",
    categories: ["web", "saas"],
    challenge:
      "The organisation needs one application that works across roles, devices, and growing data.",
    approach:
      "Design for scale and access first, then ship the dashboards people actually work in.",
    solution:
      "An enterprise web app with role-based access and data security across desktop and mobile.",
    technology: ["Next.js", "TypeScript", "Laravel"],
    result: null,
    placeholder: false,
    layout: "compact",
  },
  {
    slug: "swo-platform",
    title: "Sustainable Women Organization",
    industry: "Non-profit",
    solutionType: "Web Development",
    categories: ["web"],
    challenge:
      "Programs and events need an admin system the team can run without a fragile spreadsheet stack.",
    approach:
      "A Laravel application with a clear admin dashboard and a login path members will actually use.",
    solution:
      "A secure, scalable platform for program and event management.",
    technology: ["Laravel", "PHP", "MySQL"],
    result: null,
    placeholder: false,
    layout: "compact",
    client: "Sustainable Women Organization",
  },
  {
    slug: "tasty-indian",
    title: "Tasty Indian",
    industry: "Hospitality",
    solutionType: "Web Development",
    categories: ["web"],
    challenge:
      "A restaurant site has to show the menu clearly on a phone as well as a laptop.",
    approach:
      "Structure the menu and story for both viewports, then keep the stack simple to maintain.",
    solution:
      "A responsive site for Tasty Indian in Canada, with structured menus on desktop and mobile.",
    technology: ["HTML", "CSS", "JavaScript"],
    result: null,
    placeholder: false,
    layout: "compact",
    client: "Tasty Indian",
  },
  {
    slug: "materialze-wallpaper",
    title: "Materialze Wallpaper",
    industry: "Retail",
    solutionType: "Web Development",
    categories: ["web", "ecommerce"],
    challenge:
      "Wallpaper collections need a shop and an admin that can keep products and URLs in order.",
    approach:
      "Category collections, an admin panel, and SEO-friendly URLs on a Laravel foundation.",
    solution:
      "An interior product showcase with collections, admin, and search-ready pages.",
    technology: ["Laravel", "PHP", "SEO"],
    result: null,
    placeholder: false,
    layout: "compact",
    client: "Materialze Wallpaper",
  },
  {
    slug: "stacko",
    title: "Stacko",
    industry: "FinTech",
    solutionType: "Mobile App",
    categories: ["mobile"],
    challenge:
      "Investors need charts, orders, and alerts on a phone they will actually open.",
    approach:
      "A focused iOS app for portfolio view, trade actions, and price alerts.",
    solution:
      "Stacko — finance and investment tools with real-time charts, trading, and smart alerts.",
    technology: ["React Native", "TypeScript", "REST APIs"],
    result: null,
    placeholder: false,
    layout: "compact",
    client: "Stacko",
  },
  {
    slug: "sajima-vpn",
    title: "Sajima VPN",
    industry: "Cybersecurity",
    solutionType: "Mobile App",
    categories: ["mobile"],
    challenge:
      "People need a simple way to connect to a private server without a complicated setup.",
    approach:
      "A clear connected state, fastest-server list, and the same product on iOS and Android.",
    solution:
      "Sajima VPN — global servers and privacy protection on both platforms.",
    technology: ["React Native", "Flutter"],
    result: null,
    placeholder: false,
    layout: "compact",
    client: "Sajima VPN",
  },
  {
    slug: "leap-club",
    title: "Leap Club",
    industry: "Community",
    solutionType: "Mobile App",
    categories: ["mobile"],
    challenge:
      "Professionals need profiles, a feed, and events in one Android app.",
    approach:
      "Ship the community loop people already expect: profile, content, and meetups.",
    solution:
      "Leap Club — community and professional networking with profiles, feeds, and events.",
    technology: ["Flutter", "REST APIs"],
    result: null,
    placeholder: false,
    layout: "compact",
    client: "Leap Club",
  },
  {
    slug: "mobile-app-ui-ux",
    title: "Mobile App UI / UX",
    industry: "Product design",
    solutionType: "UI / UX Design",
    categories: ["design", "mobile"],
    challenge:
      "The app has to be clear on a phone before production code locks the screens in.",
    approach:
      "Research, wireframes, prototypes, and testing around the people who will use it.",
    solution:
      "A mobile UI/UX system from research through interactive prototypes.",
    technology: ["Figma", "React Native"],
    result: null,
    placeholder: false,
    layout: "compact",
  },
  {
    slug: "saas-dashboard-ux",
    title: "SaaS Dashboard UX",
    industry: "SaaS",
    solutionType: "UI / UX Design",
    categories: ["design", "saas"],
    challenge:
      "The dashboard works technically and still fails at usability, navigation, and data clarity.",
    approach:
      "Move from wireframes to a high-fidelity interface that people can read at a glance.",
    solution:
      "A SaaS dashboard UX redesign focused on usability, navigation, and clearer data.",
    technology: ["Figma", "React", "TypeScript"],
    result: null,
    placeholder: false,
    layout: "compact",
  },
  {
    slug: "conversion-website-design",
    title: "Conversion-Focused Website",
    industry: "Marketing sites",
    solutionType: "UI / UX Design",
    categories: ["design", "web"],
    challenge:
      "The site looks finished and still does not turn a visit into a conversation.",
    approach:
      "Mobile-first journeys, a clear CTA, and brand-consistent screens before build.",
    solution:
      "A conversion-focused website design with mobile-first layout and effective calls to action.",
    technology: ["Figma", "Next.js"],
    result: null,
    placeholder: false,
    layout: "compact",
  },
  {
    slug: "workflow-orchestration",
    title: "Workflow Orchestration",
    industry: "Operations",
    solutionType: "AI Automation",
    categories: ["ai", "automation"],
    challenge:
      "Tasks fire in the wrong order, fail silently, and never quite become a process.",
    approach:
      "Sequence the work, add retries, and connect the systems that already hold the data.",
    solution:
      "Intelligent workflow orchestration with task sequencing, fault tolerance, and integrations.",
    technology: ["OpenAI", "Claude", "Node.js"],
    result: null,
    placeholder: false,
    layout: "compact",
  },
  {
    slug: "business-process-automation",
    title: "Business Process Automation",
    industry: "Operations",
    solutionType: "AI Automation",
    categories: ["ai", "automation"],
    challenge:
      "The same intake, email, and reporting steps still need a person every time.",
    approach:
      "Custom workflows, automated sync, error logging, and reports in one platform.",
    solution:
      "A business process automation platform for workflows, data sync, and analytics.",
    technology: ["OpenAI", "Node.js", "PostgreSQL"],
    result: null,
    placeholder: false,
    layout: "compact",
  },
  {
    slug: "ai-data-processing",
    title: "AI Data Processing",
    industry: "Analytics",
    solutionType: "AI Automation",
    categories: ["ai"],
    challenge:
      "Data arrives faster than anyone can clean, analyse, and report on it.",
    approach:
      "Ingest, analyse, and surface dashboards and alerts where the team already looks.",
    solution:
      "An AI-based data processing and reporting system with ingestion, analysis, and live reports.",
    technology: ["Python", "OpenAI", "PostgreSQL"],
    result: null,
    placeholder: false,
    layout: "compact",
  },
  {
    slug: "content-keyword-strategy",
    title: "Content & Keyword Strategy",
    industry: "Growth",
    solutionType: "SEO",
    categories: ["marketing"],
    challenge:
      "Content exists, but it is not organised around the searches that actually matter.",
    approach:
      "Keyword research, pillar and cluster pages, metadata, and internal links.",
    solution:
      "A content and keyword strategy implementation built on pillar–cluster structure.",
    technology: ["Next.js", "SEO", "TypeScript"],
    result: null,
    placeholder: false,
    layout: "compact",
  },
  {
    slug: "enterprise-technical-seo",
    title: "Enterprise Technical SEO",
    industry: "Growth",
    solutionType: "SEO",
    categories: ["marketing"],
    challenge:
      "Search engines struggle to crawl, index, and trust a large site.",
    approach:
      "Fix crawl, Core Web Vitals, structured data, and index issues at the source.",
    solution:
      "Enterprise technical SEO optimisation for crawl, performance, and content indexation.",
    technology: ["Next.js", "TypeScript", "SEO"],
    result: null,
    placeholder: false,
    layout: "compact",
  },
  {
    slug: "performance-seo-integration",
    title: "Performance & SEO Integration",
    industry: "Growth",
    solutionType: "SEO",
    categories: ["marketing", "web"],
    challenge:
      "The site ranks poorly in part because it is slow and hard to measure.",
    approach:
      "Page speed, lazy loading, technical SEO, and ongoing performance monitoring together.",
    solution:
      "A performance and SEO integration project across speed, loading, and monitoring.",
    technology: ["Next.js", "TypeScript"],
    result: null,
    placeholder: false,
    layout: "compact",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectHref(project: Project) {
  return project.href ?? `/projects/${project.slug}`;
}

export function filterProjects(category: ProjectFilterId) {
  if (category === "all") {
    return projects;
  }

  return projects.filter((project) => project.categories.includes(category));
}

export function getProjectCategoryLabel(id: ProjectCategoryId) {
  return projectCategoryLabels[id];
}

export function getProjectResult(project: Project) {
  return project.result;
}

export function getProjectCoverImage(
  project: Project,
): SiteImageAsset | undefined {
  const catalog = getProjectImage(project.slug);

  if (isImageReady(catalog)) {
    return catalog;
  }

  return undefined;
}

export function getProjectGallery(project: Project): SiteImageAsset[] {
  const cover = getProjectCoverImage(project);
  const extras = getProjectGallerySlides(project.slug).filter(isImageReady);

  return [...(cover ? [cover] : []), ...extras];
}

export function getProjectScreenshots(project: Project): SiteImageAsset[] {
  const declared = (project.screenshots ?? [])
    .map((id) => getSiteImage(id as SiteImageId))
    .filter(isImageReady);

  if (declared.length > 0) {
    return declared;
  }

  return getProjectGallerySlides(project.slug).filter(isImageReady);
}

export function projectTileClass(
  layout: ProjectLayout,
  index: number,
  total: number,
) {
  if (total === 1) {
    return "sm:col-span-2 lg:col-span-12 min-h-[22rem] lg:min-h-[32rem]";
  }

  if (total === 2) {
    return index === 0
      ? "sm:col-span-2 lg:col-span-7 min-h-[20rem] lg:min-h-[28rem]"
      : "sm:col-span-2 lg:col-span-5 min-h-[18rem] lg:min-h-[28rem]";
  }

  if (total === 3) {
    return index === 0
      ? "sm:col-span-2 lg:col-span-12 min-h-[20rem] lg:min-h-[28rem]"
      : "lg:col-span-6 min-h-[18rem] lg:min-h-[22rem]";
  }

  switch (layout) {
    case "featured":
      return "sm:col-span-2 lg:col-span-7 lg:row-span-2 min-h-[20rem] lg:min-h-[34rem]";
    case "portrait":
      return "lg:col-span-5 min-h-[18rem] lg:min-h-[19rem]";
    case "wide":
      return "sm:col-span-2 lg:col-span-8 min-h-[18rem] lg:min-h-[22rem]";
    case "compact":
      return "lg:col-span-4 min-h-[18rem] lg:min-h-[22rem]";
  }
}
