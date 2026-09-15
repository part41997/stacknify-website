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
  storyLabel: string;
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
  storyLabel: "What we built",
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
    seo: {
      title: "Internal Management System | Custom Software Case Study",
      description:
        "Custom internal management software with role-based dashboards, secure sign-in, and a single source of truth for operations reporting.",
      keywords: [
        "internal management system",
        "custom software development",
        "role-based dashboards",
        "enterprise web application",
        "Next.js Laravel",
      ],
    },
    story: [
      "This internal management system replaced scattered tools with one application for records, access, and reporting. Operations teams needed to trust who could see what, and leadership needed reports that did not start in a spreadsheet.",
      "We built a Next.js and Laravel platform with authentication, role-based dashboards, and PostgreSQL as the source of truth. The product is custom software for how the work actually runs — not a generic portal skin.",
    ],
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
    seo: {
      title: "Custom Client Platform | B2B SaaS Case Study",
      description:
        "A client-facing SaaS platform for onboarding, feature access, and secure permissions — custom software built to scale with B2B accounts.",
      keywords: [
        "client portal development",
        "B2B SaaS platform",
        "customer onboarding software",
        "custom web application",
      ],
    },
    story: [
      "B2B clients needed a place to onboard, use the product, and stay inside the right features. A generic portal template would have left permissions and onboarding as afterthoughts.",
      "The custom client platform is a React and Node.js application on PostgreSQL: onboarding flows, feature flags by account, and a secure interface operations can extend as the product grows.",
    ],
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
    seo: {
      title: "Enterprise Web Application | Role-Based Access Case Study",
      description:
        "Enterprise web application development with role-based access, data security, and dashboards that work across desktop and mobile.",
      keywords: [
        "enterprise web application",
        "role-based access control",
        "Next.js TypeScript",
        "Laravel enterprise software",
      ],
    },
    story: [
      "The organisation needed one web application that would hold up across roles, devices, and growing data. Scale and access had to be designed before dashboards were decorated.",
      "We shipped an enterprise web app in Next.js, TypeScript, and Laravel: role-based access, data security, and the screens people actually work in on desktop and mobile.",
    ],
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
    seo: {
      title: "Sustainable Women Organization | Laravel Web Platform",
      description:
        "Laravel web development for a non-profit: program and event management with a secure admin dashboard the team can run without spreadsheets.",
      keywords: [
        "Laravel web development",
        "non-profit website",
        "event management system",
        "PHP MySQL application",
      ],
    },
    story: [
      "Sustainable Women Organization needed program and event management that did not live in a fragile spreadsheet stack. Staff had to administer content without waiting on a developer for every change.",
      "We built a Laravel and MySQL web application with a clear admin dashboard and a login path members will actually use — secure enough for a growing organisation, simple enough to run day to day.",
    ],
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
    seo: {
      title: "Tasty Indian Restaurant Website | Responsive Web Design",
      description:
        "Responsive restaurant website development for Tasty Indian in Canada — structured menus that read clearly on phone and desktop.",
      keywords: [
        "restaurant website development",
        "responsive web design",
        "hospitality website",
        "mobile-friendly menu website",
      ],
    },
    story: [
      "A restaurant website has one job on a phone: show the menu and the story without making the guest pinch and hunt. Tasty Indian needed that on both viewports, with a stack the team could maintain.",
      "We built a responsive site in HTML, CSS, and JavaScript with structured menus for desktop and mobile — hospitality web development that stays fast and readable where guests actually look.",
    ],
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
    seo: {
      title: "Materialze Wallpaper | Laravel E-commerce Showcase",
      description:
        "Laravel e-commerce and product showcase for wallpaper collections — category pages, admin, and SEO-friendly URLs for interior retail.",
      keywords: [
        "Laravel e-commerce",
        "product catalogue website",
        "SEO-friendly URLs",
        "retail website development",
      ],
    },
    story: [
      "Wallpaper collections needed a shop and an admin that could keep products and URLs in order. Interior retail only works online if categories, images, and search-ready pages stay consistent.",
      "Materialze Wallpaper is a Laravel product showcase: collections, an admin panel, and SEO-friendly URLs so search engines and shoppers can find the same catalogue operations maintain.",
    ],
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
    seo: {
      title: "Stacko | React Native FinTech Investment App",
      description:
        "React Native iOS app development for Stacko — real-time charts, trading actions, and price alerts for finance and investment on mobile.",
      keywords: [
        "React Native app development",
        "FinTech mobile app",
        "iOS investment app",
        "trading app development",
      ],
    },
    story: [
      "Investors needed charts, orders, and alerts on a phone they would actually open. A desktop-only console would have left the product unused between market hours.",
      "Stacko is a focused React Native iOS app: portfolio view, trade actions, and smart price alerts on REST APIs. FinTech mobile development here means a small set of jobs done clearly, not a bloated terminal squeezed onto a screen.",
    ],
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
    seo: {
      title: "Sajima VPN | iOS & Android VPN Mobile App",
      description:
        "Cross-platform VPN app development for Sajima — simple private-server connect on iOS and Android with React Native and Flutter.",
      keywords: [
        "VPN app development",
        "iOS Android app",
        "React Native Flutter",
        "cybersecurity mobile app",
      ],
    },
    story: [
      "People needed a simple way to connect to a private server without a complicated setup. The product had to show a clear connected state and a fastest-server list on both stores.",
      "Sajima VPN ships on iOS and Android with React Native and Flutter in the stack: global servers and privacy protection, with the same product language on both platforms.",
    ],
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
    seo: {
      title: "Leap Club | Flutter Community & Networking App",
      description:
        "Flutter Android app development for Leap Club — professional networking with profiles, feeds, and events on a shared API.",
      keywords: [
        "Flutter app development",
        "community mobile app",
        "professional networking app",
        "Android app development",
      ],
    },
    story: [
      "Professionals needed profiles, a feed, and events in one Android app. The community loop had to match what people already expect from a network, not a brochure with a login.",
      "Leap Club is a Flutter application on REST APIs: profiles, content, and meetups in a single product. Community mobile development here is the loop people open daily, not a one-time download.",
    ],
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
    seo: {
      title: "Mobile App UI/UX Design | Figma Prototype Case Study",
      description:
        "Mobile UI/UX design from research through interactive prototypes — wireframes and Figma systems before React Native production locks the screens.",
      keywords: [
        "mobile app UI UX design",
        "Figma prototyping",
        "wireframing mobile apps",
        "React Native UI design",
      ],
    },
    story: [
      "The app had to be clear on a phone before production code locked the screens in. Shipping UI in React Native without a prototype is how teams rebuild the same flow twice.",
      "We ran research, wireframes, prototypes, and testing around the people who would use it. The deliverable is a mobile UI/UX system in Figma that engineering can implement without inventing navigation in code.",
    ],
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
    seo: {
      title: "SaaS Dashboard UX Redesign | Usability Case Study",
      description:
        "SaaS dashboard UX design focused on usability, navigation, and data clarity — from wireframes to a high-fidelity React interface.",
      keywords: [
        "SaaS dashboard UX",
        "dashboard UI design",
        "SaaS usability",
        "Figma React design system",
      ],
    },
    story: [
      "The dashboard worked technically and still failed at usability, navigation, and data clarity. Operators should not need a legend to read the numbers they use every morning.",
      "We moved from wireframes to a high-fidelity SaaS interface in Figma, then into React and TypeScript. The redesign is product design for density: hierarchy, navigation, and data people can scan.",
    ],
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
    seo: {
      title: "Conversion-Focused Website Design | UX Case Study",
      description:
        "Conversion-focused website design with mobile-first journeys and clear CTAs — Figma to Next.js for marketing sites that turn visits into conversations.",
      keywords: [
        "conversion-focused website design",
        "landing page UX",
        "mobile-first web design",
        "Next.js marketing site",
      ],
    },
    story: [
      "The site looked finished and still did not turn a visit into a conversation. Visual polish without a journey is how bounce rates stay high on phones.",
      "We designed mobile-first journeys, a clear call to action, and brand-consistent screens in Figma before the Next.js build. Conversion-focused website design is the path from offer to contact, not a new hero image.",
    ],
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
    seo: {
      title: "Workflow Orchestration | AI Automation Case Study",
      description:
        "Intelligent workflow orchestration with task sequencing, retries, and integrations — AI automation on OpenAI, Claude, and Node.js.",
      keywords: [
        "workflow orchestration",
        "AI automation",
        "workflow automation",
        "OpenAI Node.js integration",
      ],
    },
    story: [
      "Tasks fired in the wrong order, failed silently, and never quite became a process. Volume made the gaps obvious: no retries, no owner, no connection to the systems that already held the data.",
      "We sequenced the work, added fault tolerance, and connected existing tools. Workflow orchestration here is AI automation with a job — OpenAI, Claude, and Node.js behind steps operations can see and restart.",
    ],
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
    seo: {
      title: "Business Process Automation Platform | AI Workflows",
      description:
        "Business process automation for intake, email, and reporting — custom workflows, data sync, and analytics on OpenAI, Node.js, and PostgreSQL.",
      keywords: [
        "business process automation",
        "workflow automation software",
        "AI process automation",
        "operations automation",
      ],
    },
    story: [
      "The same intake, email, and reporting steps still needed a person every time. That is not a staffing problem first — it is a missing process with no system of record.",
      "We built a business process automation platform: custom workflows, automated sync, error logging, and reports. OpenAI handles the steps that need language; Node.js and PostgreSQL hold the workflow and the audit trail.",
    ],
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
    seo: {
      title: "AI Data Processing & Reporting System | Analytics",
      description:
        "AI data processing for ingest, analysis, and live reports — Python, OpenAI, and PostgreSQL dashboards where the team already looks.",
      keywords: [
        "AI data processing",
        "automated reporting",
        "Python OpenAI",
        "analytics dashboards",
      ],
    },
    story: [
      "Data arrived faster than anyone could clean, analyse, and report on it. Manual exports were the bottleneck, not the warehouse.",
      "The AI data processing system ingests, analyses, and surfaces dashboards and alerts where the team already looks. Python and OpenAI sit on PostgreSQL — reporting that keeps up with volume without a larger analyst queue.",
    ],
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
    seo: {
      title: "Content & Keyword Strategy | SEO Case Study",
      description:
        "Content and keyword strategy on a Next.js site — pillar–cluster pages, metadata, and internal links around searches that match the offer.",
      keywords: [
        "keyword strategy",
        "content SEO",
        "pillar cluster content",
        "Next.js SEO",
      ],
    },
    story: [
      "Content existed, but it was not organised around the searches that actually matter. Pages competed with each other and missed the queries that match the work sold.",
      "We implemented keyword research, pillar and cluster pages, metadata, and internal links on Next.js. Content strategy here is search engine optimization for the offer — not a calendar of unrelated posts.",
    ],
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
    seo: {
      title: "Enterprise Technical SEO | Crawl, Speed & Indexation",
      description:
        "Enterprise technical SEO for large Next.js sites — crawl, Core Web Vitals, structured data, and indexation fixed at the source.",
      keywords: [
        "enterprise technical SEO",
        "Core Web Vitals",
        "crawlability",
        "structured data SEO",
      ],
    },
    story: [
      "Search engines struggled to crawl, index, and trust a large site. Content was not the first problem — the template, performance, and information architecture were.",
      "We fixed crawl, Core Web Vitals, structured data, and index issues in the Next.js and TypeScript codebase. Enterprise technical SEO is engineering: if the site cannot be read, more blog posts will not rank it.",
    ],
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
    seo: {
      title: "Performance & SEO Integration | Page Speed Case Study",
      description:
        "Website performance and SEO integration — page speed, lazy loading, technical SEO, and monitoring on Next.js so rankings are not blocked by a slow site.",
      keywords: [
        "website performance SEO",
        "page speed optimization",
        "Core Web Vitals",
        "Next.js performance",
      ],
    },
    story: [
      "The site ranked poorly in part because it was slow and hard to measure. Search and speed are the same problem when Core Web Vitals and crawl waste sit on the same pages.",
      "We treated page speed, lazy loading, technical SEO, and monitoring as one Next.js project. Performance and SEO integration means the site can be crawled and completed on a phone — then measurement continues after launch.",
    ],
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
