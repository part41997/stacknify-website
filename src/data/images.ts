import type {
  SiteImageAsset,
  SiteImageCategory,
  SiteImageCollection,
  SiteImageId,
  SiteImageSource,
} from "@/types";

export const imageRoot = "/images";

export const unsplashLicense = "Unsplash License";
export const pexelsLicense = "Pexels License";

export const imageSizes = {
  hero: "(min-width: 1280px) 36rem, (min-width: 1024px) 50vw, min(24rem, 92vw)",
  story: "(min-width: 1024px) 40vw, 100vw",
  panel: "(min-width: 1024px) 44vw, 100vw",
  cover: "(min-width: 1024px) 42vw, 100vw",
  card: "(min-width: 768px) 33vw, 100vw",
  service: "(min-width: 1024px) 36rem, (min-width: 640px) 50vw, 100vw",
  wide: "(min-width: 1024px) 56rem, 100vw",
  stage: "(min-width: 1280px) 34rem, (min-width: 1024px) 46vw, 100vw",
  pageHero: "(min-width: 1024px) 72rem, 100vw",
  industryFeatured: "(min-width: 1024px) 72vw, 100vw",
  industryWide: "(min-width: 1024px) 66vw, 100vw",
  industryTile: "(min-width: 1024px) 42vw, 100vw",
  projectFeatured: "(min-width: 1024px) 58vw, 100vw",
  projectWide: "(min-width: 1024px) 66vw, 100vw",
  screenshot: "(min-width: 768px) 36rem, 100vw",
  portfolio: "(min-width: 1024px) 26rem, (min-width: 640px) 46vw, 100vw",
  insight: "(min-width: 1024px) 22rem, (min-width: 640px) 46vw, 100vw",
  avatar: "56px",
  icon: "48px",
  logo: "111px",
} as const;

const dimensions = {
  square: { width: 1600, height: 1600 },
  story: { width: 1600, height: 1200 },
  cover: { width: 1600, height: 1000 },
  editorial: { width: 1600, height: 1066 },
  process: { width: 1600, height: 900 },
  insight: { width: 1600, height: 900 },
  service: { width: 1600, height: 1066 },
  portfolio: { width: 820, height: 764 },
  wide: { width: 1920, height: 1080 },
  icon: { width: 256, height: 256 },
  logoHorizontal: { width: 315, height: 125 },
  logoVertical: { width: 260, height: 282 },
} as const;

type ImageDraft = {
  id: SiteImageId;
  file: string;
  alt: string;
  category: SiteImageCategory;
  desktopAspectRatio: string;
  mobileAspectRatio: string;
  size: keyof typeof dimensions;
  sizes: string;
  source: SiteImageSource;
  purpose: string;
  ready?: boolean;
  decorative?: boolean;
  priority?: boolean;
  /** Set when the file lives outside /images (brand marks). */
  publicPath?: string;
};

function asset(draft: ImageDraft): SiteImageAsset {
  const path = draft.publicPath ?? `${imageRoot}/${draft.file}`;
  const section = draft.id.split(".")[0] as SiteImageCollection;

  return {
    id: draft.id,
    path,
    src: path,
    alt: draft.alt,
    section,
    category: draft.category,
    desktopAspectRatio: draft.desktopAspectRatio,
    mobileAspectRatio: draft.mobileAspectRatio,
    ...dimensions[draft.size],
    sizes: draft.sizes,
    ready: draft.ready ?? false,
    priority: draft.priority,
    decorative: draft.decorative,
    purpose: draft.purpose,
    source: draft.source,
  };
}

function unsplash(photoId: string): SiteImageSource {
  return {
    provider: "unsplash",
    license: unsplashLicense,
    photoId,
  };
}

function pexels(photoId: string): SiteImageSource {
  return {
    provider: "pexels",
    license: pexelsLicense,
    photoId,
  };
}

function directed(): SiteImageSource {
  return {
    provider: "self",
    license: "Stacknify art direction",
  };
}

function portfolioCover(slug: string, alt: string) {
  return asset({
    id: `projects.${slug}` as SiteImageId,
    file: `projects/${slug}.webp`,
    alt,
    category: "illustration",
    desktopAspectRatio: "410 / 382",
    mobileAspectRatio: "410 / 382",
    size: "portfolio",
    sizes: imageSizes.portfolio,
    ready: true,
    purpose: "Portfolio cover from Stacknify work samples.",
    source: directed(),
  });
}

const projectGalleryAlts: Record<string, readonly [string, string]> = {
  "internal-management-system": [
    "Records table with role filters and a teal reporting sparkline.",
    "Access-control matrix and audit log for the internal platform.",
  ],
  "custom-client-platform": [
    "Client onboarding checklist with teal completion states.",
    "Secure account panel, permission badges, and an activity timeline.",
  ],
  "enterprise-web-application": [
    "Enterprise dashboard with org tree, KPI tiles, and a schedule board.",
    "Data-access policies and an admin users table.",
  ],
  "swo-platform": [
    "Program calendar and event cards for the nonprofit admin.",
    "Member sign-in beside an upcoming programs list.",
  ],
  "tasty-indian": [
    "Restaurant menu cards with dishes, prices, and a reserve action.",
    "Mobile menu list with hours and a reservation path.",
  ],
  "materialze-wallpaper": [
    "Wallpaper collection grid with category chips and product cards.",
    "Shop admin with SKUs, inventory, and SEO-ready URLs.",
  ],
  stacko: [
    "Finance app portfolio chart, holdings, and trade actions.",
    "Price alerts and an order ticket on the Stacko iOS app.",
  ],
  "sajima-vpn": [
    "VPN map with a connected pin and live status.",
    "Fastest-server list with a connected badge.",
  ],
  "leap-club": [
    "Community feed of event cards and RSVP chips.",
    "Profile with upcoming meetups in the Leap Club app.",
  ],
  "mobile-app-ui-ux": [
    "Wireframes beside high-fidelity mobile screens.",
    "Prototype flow of three connected app screens.",
  ],
  "saas-dashboard-ux": [
    "Polished SaaS analytics dashboard with clear KPI cards.",
    "Wireframe-to-hi-fi split of the dashboard redesign.",
  ],
  "conversion-website-design": [
    "Conversion landing page with a navy headline and teal CTA.",
    "Mobile-first journey with stacked cards and a clear form.",
  ],
  "workflow-orchestration": [
    "Orchestration canvas with sequenced nodes and retries.",
    "Run log with task retries and teal success states.",
  ],
  "business-process-automation": [
    "Intake, email, and report columns with sync status.",
    "Automation analytics with error log and throughput.",
  ],
  "ai-data-processing": [
    "Ingest pipeline, analysis cards, and a live report chart.",
    "Alert dashboard with anomaly list and live metrics.",
  ],
  "content-keyword-strategy": [
    "Pillar-and-cluster board with keyword chips and links.",
    "Keyword planner table with volume bars and cluster tags.",
  ],
  "enterprise-technical-seo": [
    "Crawl tree and index status with Core Web Vitals gauges.",
    "Structured data cards and LCP / INP chips.",
  ],
  "performance-seo-integration": [
    "Page-load waterfall with lazy-load and an LCP marker.",
    "Uptime and SEO monitor with healthy teal status.",
  ],
};

function projectGallerySlide(
  slug: string,
  index: 2 | 3,
  alt: string,
): SiteImageAsset {
  return asset({
    id: `projects.${slug}` as SiteImageId,
    file: `projects/${slug}-${index}.webp`,
    alt,
    category: "illustration",
    desktopAspectRatio: "16 / 10",
    mobileAspectRatio: "16 / 10",
    size: "cover",
    sizes: imageSizes.pageHero,
    ready: true,
    purpose: "Project detail gallery slide.",
    source: directed(),
  });
}

export function getProjectGallerySlides(slug: string): SiteImageAsset[] {
  const alts = projectGalleryAlts[slug];

  if (!alts) {
    return [];
  }

  return [
    projectGallerySlide(slug, 2, alts[0]),
    projectGallerySlide(slug, 3, alts[1]),
  ];
}

/**
 * Single catalog for every site visual.
 * Look up by id or section slug. Do not hardcode paths in components.
 * `ready` stays false until the file exists. Hero LCP is the live 3D scene.
 *
 * Art direction (light theme): navy, slate, teal, turquoise, cyan, mint, white, gray.
 * Preferred: SaaS UI, AI workflows, isometric tech, architecture, developer rooms,
 * cloud, data, industry photography. No people, logos, neon, dark UI, or stock tropes.
 * Photographs get a shared mint/navy grade in SiteImage.
 */
export const siteImages = {
  "brand.logo-horizontal": asset({
    id: "brand.logo-horizontal",
    file: "logo-horizontal.png",
    publicPath: "/brand/logo-horizontal.png",
    alt: "Stacknify",
    category: "brand",
    desktopAspectRatio: "315 / 125",
    mobileAspectRatio: "315 / 125",
    size: "logoHorizontal",
    sizes: imageSizes.logo,
    ready: true,
    decorative: true,
    priority: true,
    purpose: "Primary wordmark for the header.",
    source: { provider: "brand", license: "Stacknify brand" },
  }),
  "brand.logo-vertical": asset({
    id: "brand.logo-vertical",
    file: "logo-vertical.png",
    publicPath: "/brand/logo-vertical.png",
    alt: "Stacknify",
    category: "brand",
    desktopAspectRatio: "260 / 282",
    mobileAspectRatio: "260 / 282",
    size: "logoVertical",
    sizes: "96px",
    ready: true,
    decorative: true,
    purpose: "Stacked mark for footer and Why constellation.",
    source: { provider: "brand", license: "Stacknify brand" },
  }),
  "hero.system": asset({
    id: "hero.system",
    file: "hero/system.webp",
    alt: "A bright software studio with a laptop and notebook on a white desk — IT services, ready to work.",
    category: "photograph",
    desktopAspectRatio: "3 / 2",
    mobileAspectRatio: "3 / 2",
    size: "cover",
    sizes: imageSizes.hero,
    ready: true,
    purpose: "Hero visual. Quiet IT workspace, no people, no product UI.",
    source: directed(),
  }),
  "ai.operating-layer": asset({
    id: "ai.operating-layer",
    file: "ai/operating-layer.webp",
    alt: "An empty modern office hall — the quiet room where automated work runs.",
    category: "photograph",
    desktopAspectRatio: "4 / 5",
    mobileAspectRatio: "16 / 10",
    size: "story",
    sizes: imageSizes.story,
    ready: true,
    purpose: "AI & Automation column. Operations space, not a chatbot screenshot.",
    source: unsplash("1497366216548-37526070297c"),
  }),
  "ai.workspace": asset({
    id: "ai.workspace",
    file: "ai/workspace.webp",
    alt: "An empty open office floor with desks ready for product work.",
    category: "photograph",
    desktopAspectRatio: "4 / 5",
    mobileAspectRatio: "16 / 10",
    size: "story",
    sizes: imageSizes.story,
    ready: true,
    purpose: "AI-native development visual.",
    source: unsplash("1497366811353-6870744d04b2"),
  }),
  "services.custom-software": asset({
    id: "services.custom-software",
    file: "services/custom-software.webp",
    alt: "Light-mode operations dashboard on a laptop — KPIs, workflow board, and connected modules.",
    category: "illustration",
    desktopAspectRatio: "3 / 2",
    mobileAspectRatio: "16 / 10",
    size: "service",
    sizes: imageSizes.service,
    ready: true,
    purpose: "Service tile for Custom Software Development.",
    source: directed(),
  }),
  "services.web-development": asset({
    id: "services.web-development",
    file: "services/web-development.webp",
    alt: "A marketing site and web-app dashboard on a studio monitor, mint bento cards and teal CTAs.",
    category: "illustration",
    desktopAspectRatio: "3 / 2",
    mobileAspectRatio: "16 / 10",
    size: "service",
    sizes: imageSizes.service,
    ready: true,
    purpose: "Service tile for Web Development.",
    source: directed(),
  }),
  "services.mobile-apps": asset({
    id: "services.mobile-apps",
    file: "services/mobile-apps.webp",
    alt: "Three phones with a field app — schedule, dashboard, and assistant in navy and teal.",
    category: "illustration",
    desktopAspectRatio: "3 / 2",
    mobileAspectRatio: "16 / 10",
    size: "service",
    sizes: imageSizes.service,
    ready: true,
    purpose: "Service tile for Mobile App Development.",
    source: directed(),
  }),
  "services.ui-ux-design": asset({
    id: "services.ui-ux-design",
    file: "services/ui-ux-design.webp",
    alt: "A design canvas: wireframes, hi-fi screens, and a navy-teal design system on a studio monitor.",
    category: "illustration",
    desktopAspectRatio: "3 / 2",
    mobileAspectRatio: "16 / 10",
    size: "service",
    sizes: imageSizes.service,
    ready: true,
    purpose: "Service tile for UI / UX Design.",
    source: directed(),
  }),
  "services.ai-automation": asset({
    id: "services.ai-automation",
    file: "services/ai-automation.webp",
    alt: "A light-mode agent canvas: inbox, classify, draft, and route nodes joined by teal edges.",
    category: "illustration",
    desktopAspectRatio: "3 / 2",
    mobileAspectRatio: "16 / 10",
    size: "service",
    sizes: imageSizes.service,
    ready: true,
    purpose: "Service tile for AI Automations.",
    source: directed(),
  }),
  "services.seo-digital-marketing": asset({
    id: "services.seo-digital-marketing",
    file: "services/seo-digital-marketing.webp",
    alt: "Search growth dashboard with teal ranking charts, keyword table, and traffic sources.",
    category: "illustration",
    desktopAspectRatio: "3 / 2",
    mobileAspectRatio: "16 / 10",
    size: "service",
    sizes: imageSizes.service,
    ready: true,
    purpose: "Service tile for SEO & Digital Marketing.",
    source: directed(),
  }),
  "projects.internal-management-system": portfolioCover(
    "internal-management-system",
    "Internal management system — dashboards for data, reporting, roles, and access.",
  ),
  "projects.custom-client-platform": portfolioCover(
    "custom-client-platform",
    "Custom client-facing platform with onboarding, access, and a secure interface.",
  ),
  "projects.enterprise-web-application": portfolioCover(
    "enterprise-web-application",
    "Enterprise web application across desktop and mobile, built for scale and access control.",
  ),
  "projects.workflow-orchestration": portfolioCover(
    "workflow-orchestration",
    "Intelligent workflow orchestration — sequenced tasks, retries, and system integrations.",
  ),
  "projects.business-process-automation": portfolioCover(
    "business-process-automation",
    "Business process automation platform with custom workflows, sync, and reporting.",
  ),
  "projects.ai-data-processing": portfolioCover(
    "ai-data-processing",
    "AI data processing and reporting — ingestion, analysis, dashboards, and alerts.",
  ),
  "projects.content-keyword-strategy": portfolioCover(
    "content-keyword-strategy",
    "Content and keyword strategy with pillar pages, clusters, and internal linking.",
  ),
  "projects.enterprise-technical-seo": portfolioCover(
    "enterprise-technical-seo",
    "Enterprise technical SEO — crawl, Core Web Vitals, structured data, and index fixes.",
  ),
  "projects.performance-seo-integration": portfolioCover(
    "performance-seo-integration",
    "Performance and SEO integration — page speed, lazy loading, and monitoring.",
  ),
  "projects.mobile-app-ui-ux": portfolioCover(
    "mobile-app-ui-ux",
    "Mobile app UI/UX — research, wireframes, prototyping, and interactive screens.",
  ),
  "projects.saas-dashboard-ux": portfolioCover(
    "saas-dashboard-ux",
    "SaaS dashboard UX redesign from wireframes to a clear, usable interface.",
  ),
  "projects.conversion-website-design": portfolioCover(
    "conversion-website-design",
    "Conversion-focused website design — mobile-first layout, journeys, and CTAs.",
  ),
  "projects.swo-platform": portfolioCover(
    "swo-platform",
    "Sustainable Women Organization platform — Laravel admin, events, and a secure system.",
  ),
  "projects.tasty-indian": portfolioCover(
    "tasty-indian",
    "Tasty Indian Canada website — responsive menus on desktop and phone.",
  ),
  "projects.materialze-wallpaper": portfolioCover(
    "materialze-wallpaper",
    "Materialze Wallpaper shop — collections, admin, and SEO-friendly product pages.",
  ),
  "projects.stacko": portfolioCover(
    "stacko",
    "Stacko finance app — real-time charts, trading actions, and smart alerts on iOS.",
  ),
  "projects.sajima-vpn": portfolioCover(
    "sajima-vpn",
    "Sajima VPN — iOS and Android app for global servers and privacy protection.",
  ),
  "projects.leap-club": portfolioCover(
    "leap-club",
    "Leap Club Android app — profiles, feeds, and community events.",
  ),
  "industries.startups": asset({
    id: "industries.startups",
    file: "industries/startups.webp",
    alt: "An empty coworking floor with long desks and daylight.",
    category: "photograph",
    desktopAspectRatio: "3 / 2",
    mobileAspectRatio: "16 / 10",
    size: "editorial",
    sizes: imageSizes.cover,
    ready: true,
    purpose: "Industry stage for startups.",
    source: unsplash("1497215728101-856f4ea42174"),
  }),
  "industries.healthcare": asset({
    id: "industries.healthcare",
    file: "industries/healthcare.webp",
    alt: "An empty clinic intake with a light-mode care workflow on the wall.",
    category: "photograph",
    desktopAspectRatio: "3 / 2",
    mobileAspectRatio: "16 / 10",
    size: "editorial",
    sizes: imageSizes.cover,
    ready: true,
    purpose: "Industry stage for healthcare.",
    source: directed(),
  }),
  "industries.education": asset({
    id: "industries.education",
    file: "industries/education.webp",
    alt: "An empty learning studio with a light-mode lesson display.",
    category: "photograph",
    desktopAspectRatio: "3 / 2",
    mobileAspectRatio: "16 / 10",
    size: "editorial",
    sizes: imageSizes.cover,
    ready: true,
    purpose: "Industry stage for education.",
    source: directed(),
  }),
  "industries.ecommerce": asset({
    id: "industries.ecommerce",
    file: "industries/ecommerce.webp",
    alt: "An empty fulfillment station with navy cartons and a light-mode order queue.",
    category: "photograph",
    desktopAspectRatio: "3 / 2",
    mobileAspectRatio: "16 / 10",
    size: "editorial",
    sizes: imageSizes.cover,
    ready: true,
    purpose: "Industry stage for e-commerce.",
    source: directed(),
  }),
  "industries.real-estate": asset({
    id: "industries.real-estate",
    file: "industries/real-estate.webp",
    alt: "An empty modern apartment with oak floors and a sofa.",
    category: "photograph",
    desktopAspectRatio: "3 / 2",
    mobileAspectRatio: "16 / 10",
    size: "editorial",
    sizes: imageSizes.cover,
    ready: true,
    purpose: "Industry stage for real estate.",
    source: unsplash("1560448204-e02f11c3d0e2"),
  }),
  "industries.finance": asset({
    id: "industries.finance",
    file: "industries/finance.webp",
    alt: "A bright finance desk with light-mode navy and teal market views.",
    category: "photograph",
    desktopAspectRatio: "3 / 2",
    mobileAspectRatio: "16 / 10",
    size: "editorial",
    sizes: imageSizes.cover,
    ready: true,
    purpose: "Industry stage for finance.",
    source: directed(),
  }),
  "industries.logistics": asset({
    id: "industries.logistics",
    file: "industries/logistics.webp",
    alt: "A bright warehouse aisle with navy racking and mint-teal totes.",
    category: "photograph",
    desktopAspectRatio: "3 / 2",
    mobileAspectRatio: "16 / 10",
    size: "editorial",
    sizes: imageSizes.cover,
    ready: true,
    purpose: "Industry stage for logistics.",
    source: directed(),
  }),
  "industries.manufacturing": asset({
    id: "industries.manufacturing",
    file: "industries/manufacturing.webp",
    alt: "A precision cell: navy CNC housing, machined parts, mint wall.",
    category: "photograph",
    desktopAspectRatio: "3 / 2",
    mobileAspectRatio: "16 / 10",
    size: "editorial",
    sizes: imageSizes.cover,
    ready: true,
    purpose: "Industry stage for manufacturing.",
    source: directed(),
  }),
  "industries.retail": asset({
    id: "industries.retail",
    file: "industries/retail.webp",
    alt: "A quiet boutique with garments on a rail beside a window.",
    category: "photograph",
    desktopAspectRatio: "3 / 2",
    mobileAspectRatio: "16 / 10",
    size: "editorial",
    sizes: imageSizes.cover,
    ready: true,
    purpose: "Industry stage for retail.",
    source: unsplash("1441984904996-e0b6ba687e04"),
  }),
  "industries.professional-services": asset({
    id: "industries.professional-services",
    file: "industries/professional-services.webp",
    alt: "An empty conference room with a long table.",
    category: "photograph",
    desktopAspectRatio: "3 / 2",
    mobileAspectRatio: "16 / 10",
    size: "editorial",
    sizes: imageSizes.cover,
    ready: true,
    purpose: "Industry stage for professional services.",
    source: unsplash("1497366754035-f200968a6e72"),
  }),
  "about.practice": asset({
    id: "about.practice",
    file: "about/practice.webp",
    alt: "An empty practice studio — white table, navy chairs, a system map on the wall.",
    category: "photograph",
    desktopAspectRatio: "4 / 5",
    mobileAspectRatio: "5 / 4",
    size: "story",
    sizes: imageSizes.story,
    ready: true,
    purpose: "About editorial. Replace with an original studio photograph when available.",
    source: directed(),
  }),
  "problems.manual-work": asset({
    id: "problems.manual-work",
    file: "problems/manual-work.webp",
    alt: "Unlabeled paper stacks on a pale desk — repetitive work before software.",
    category: "photograph",
    desktopAspectRatio: "8 / 5",
    mobileAspectRatio: "16 / 10",
    size: "cover",
    sizes: imageSizes.cover,
    ready: true,
    purpose: "Problem story still for manual work.",
    source: directed(),
  }),
  "problems.disconnected-systems": asset({
    id: "problems.disconnected-systems",
    file: "problems/disconnected-systems.webp",
    alt: "Mismatched light-mode screens that do not connect.",
    category: "photograph",
    desktopAspectRatio: "8 / 5",
    mobileAspectRatio: "16 / 10",
    size: "cover",
    sizes: imageSizes.cover,
    ready: true,
    purpose: "Problem story still for disconnected systems.",
    source: directed(),
  }),
  "problems.outdated-software": asset({
    id: "problems.outdated-software",
    file: "problems/outdated-software.webp",
    alt: "An old cramped interface beside a clean light-mode product view.",
    category: "photograph",
    desktopAspectRatio: "8 / 5",
    mobileAspectRatio: "16 / 10",
    size: "cover",
    sizes: imageSizes.cover,
    ready: true,
    purpose: "Problem story still for outdated software.",
    source: directed(),
  }),
  "problems.low-visibility": asset({
    id: "problems.low-visibility",
    file: "problems/low-visibility.webp",
    alt: "Analytics on a laptop in a quiet room.",
    category: "photograph",
    desktopAspectRatio: "8 / 5",
    mobileAspectRatio: "16 / 10",
    size: "cover",
    sizes: imageSizes.cover,
    ready: true,
    purpose: "Problem story still for low visibility.",
    source: unsplash("1460925895917-afdab827c52f"),
  }),
  "cta.build": asset({
    id: "cta.build",
    file: "cta/build.webp",
    alt: "An empty table ready for a conversation about what to build.",
    category: "photograph",
    desktopAspectRatio: "16 / 9",
    mobileAspectRatio: "4 / 5",
    size: "wide",
    sizes: imageSizes.wide,
    ready: true,
    decorative: true,
    purpose: "Final CTA atmosphere.",
    source: pexels("260689"),
  }),
  "process.discover": asset({
    id: "process.discover",
    file: "process/discover.webp",
    alt: "Navy and teal system maps on a white discovery wall.",
    category: "photograph",
    desktopAspectRatio: "16 / 9",
    mobileAspectRatio: "16 / 10",
    size: "process",
    sizes: imageSizes.wide,
    ready: true,
    purpose: "Process step still for Discover.",
    source: directed(),
  }),
  "process.strategize": asset({
    id: "process.strategize",
    file: "process/strategize.webp",
    alt: "A quiet strategy table with a light-mode roadmap.",
    category: "photograph",
    desktopAspectRatio: "16 / 9",
    mobileAspectRatio: "16 / 10",
    size: "process",
    sizes: imageSizes.wide,
    ready: true,
    purpose: "Process step still for Strategize.",
    source: directed(),
  }),
  "process.design": asset({
    id: "process.design",
    file: "process/design.webp",
    alt: "Light-mode interface frames on a white design desk.",
    category: "photograph",
    desktopAspectRatio: "16 / 9",
    mobileAspectRatio: "16 / 10",
    size: "process",
    sizes: imageSizes.wide,
    ready: true,
    purpose: "Process step still for Design.",
    source: directed(),
  }),
  "process.build": asset({
    id: "process.build",
    file: "process/build.webp",
    alt: "A bright developer desk with light-mode code and product UI.",
    category: "photograph",
    desktopAspectRatio: "16 / 9",
    mobileAspectRatio: "16 / 10",
    size: "process",
    sizes: imageSizes.wide,
    ready: true,
    purpose: "Process step still for Build.",
    source: directed(),
  }),
  "process.test": asset({
    id: "process.test",
    file: "process/test.webp",
    alt: "A light-mode test runner with teal pass indicators.",
    category: "photograph",
    desktopAspectRatio: "16 / 9",
    mobileAspectRatio: "16 / 10",
    size: "process",
    sizes: imageSizes.wide,
    ready: true,
    purpose: "Process step still for Test.",
    source: directed(),
  }),
  "process.launch": asset({
    id: "process.launch",
    file: "process/launch.webp",
    alt: "A bright operations room at go-live — a teal live indicator on a light-mode panel.",
    category: "photograph",
    desktopAspectRatio: "16 / 9",
    mobileAspectRatio: "16 / 10",
    size: "process",
    sizes: imageSizes.wide,
    ready: true,
    purpose: "Process step still for Launch.",
    source: directed(),
  }),
  "process.grow": asset({
    id: "process.grow",
    file: "process/grow.webp",
    alt: "A rising teal trend on a light-mode product view in a mint studio.",
    category: "photograph",
    desktopAspectRatio: "16 / 9",
    mobileAspectRatio: "16 / 10",
    size: "process",
    sizes: imageSizes.wide,
    ready: true,
    purpose: "Process step still for Grow.",
    source: directed(),
  }),
  "insights.ai-features": asset({
    id: "insights.ai-features",
    file: "insights/ai-features.webp",
    alt: "A bright studio desk with a closed laptop, mint cup, and navy notebook — ready for product work.",
    category: "photograph",
    desktopAspectRatio: "16 / 9",
    mobileAspectRatio: "16 / 9",
    size: "insight",
    sizes: imageSizes.insight,
    ready: true,
    purpose: "Insight cover: AI features operators keep.",
    source: directed(),
  }),
  "insights.design-systems": asset({
    id: "insights.design-systems",
    file: "insights/design-systems.webp",
    alt: "Paper geometry, teal markers, and a metal ruler on a white design desk.",
    category: "photograph",
    desktopAspectRatio: "16 / 9",
    mobileAspectRatio: "16 / 9",
    size: "insight",
    sizes: imageSizes.insight,
    ready: true,
    purpose: "Insight cover: design systems that last.",
    source: directed(),
  }),
  "insights.custom-software": asset({
    id: "insights.custom-software",
    file: "insights/custom-software.webp",
    alt: "A daylight server closet with white racks and neatly bundled teal cables.",
    category: "photograph",
    desktopAspectRatio: "16 / 9",
    mobileAspectRatio: "16 / 9",
    size: "insight",
    sizes: imageSizes.insight,
    ready: true,
    purpose: "Insight cover: custom software vs another SaaS seat.",
    source: directed(),
  }),
  "insights.technical-seo": asset({
    id: "insights.technical-seo",
    file: "insights/technical-seo.webp",
    alt: "A printed sitemap, magnifying glass, and navy notebook on a white planning desk.",
    category: "photograph",
    desktopAspectRatio: "16 / 9",
    mobileAspectRatio: "16 / 9",
    size: "insight",
    sizes: imageSizes.insight,
    ready: true,
    purpose: "Insight cover: technical SEO for product sites.",
    source: directed(),
  }),
  "insights.automation": asset({
    id: "insights.automation",
    file: "insights/automation.webp",
    alt: "A physical kanban board with mint, white, and navy cards on a bright desk.",
    category: "photograph",
    desktopAspectRatio: "16 / 9",
    mobileAspectRatio: "16 / 9",
    size: "insight",
    sizes: imageSizes.insight,
    ready: true,
    purpose: "Insight cover: automation operators will trust.",
    source: directed(),
  }),
  "icons.ai": asset({
    id: "icons.ai",
    file: "icons/ai.webp",
    alt: "AI and automation",
    category: "illustration",
    desktopAspectRatio: "1 / 1",
    mobileAspectRatio: "1 / 1",
    size: "icon",
    sizes: imageSizes.icon,
    decorative: true,
    purpose: "Unused pictogram slot. Lucide covers UI icons.",
    source: { provider: "self", license: "Unused" },
  }),
  "icons.web": asset({
    id: "icons.web",
    file: "icons/web.webp",
    alt: "Web and SaaS",
    category: "illustration",
    desktopAspectRatio: "1 / 1",
    mobileAspectRatio: "1 / 1",
    size: "icon",
    sizes: imageSizes.icon,
    decorative: true,
    purpose: "Unused pictogram slot.",
    source: { provider: "self", license: "Unused" },
  }),
  "icons.mobile": asset({
    id: "icons.mobile",
    file: "icons/mobile.webp",
    alt: "Mobile apps",
    category: "illustration",
    desktopAspectRatio: "1 / 1",
    mobileAspectRatio: "1 / 1",
    size: "icon",
    sizes: imageSizes.icon,
    decorative: true,
    purpose: "Unused pictogram slot.",
    source: { provider: "self", license: "Unused" },
  }),
  "icons.api": asset({
    id: "icons.api",
    file: "icons/api.webp",
    alt: "APIs and integrations",
    category: "illustration",
    desktopAspectRatio: "1 / 1",
    mobileAspectRatio: "1 / 1",
    size: "icon",
    sizes: imageSizes.icon,
    decorative: true,
    purpose: "Unused pictogram slot.",
    source: { provider: "self", license: "Unused" },
  }),
  "icons.cloud": asset({
    id: "icons.cloud",
    file: "icons/cloud.webp",
    alt: "Cloud and DevOps",
    category: "illustration",
    desktopAspectRatio: "1 / 1",
    mobileAspectRatio: "1 / 1",
    size: "icon",
    sizes: imageSizes.icon,
    decorative: true,
    purpose: "Unused pictogram slot.",
    source: { provider: "self", license: "Unused" },
  }),
  "icons.growth": asset({
    id: "icons.growth",
    file: "icons/growth.webp",
    alt: "SEO and digital growth",
    category: "illustration",
    desktopAspectRatio: "1 / 1",
    mobileAspectRatio: "1 / 1",
    size: "icon",
    sizes: imageSizes.icon,
    decorative: true,
    purpose: "Unused pictogram slot.",
    source: { provider: "self", license: "Unused" },
  }),
} as const satisfies Record<SiteImageId, SiteImageAsset>;

export type SiteImageRecord = typeof siteImages;

const collectionPrefix: Record<SiteImageCollection, string> = {
  brand: "brand.",
  hero: "hero.",
  ai: "ai.",
  services: "services.",
  projects: "projects.",
  industries: "industries.",
  about: "about.",
  problems: "problems.",
  cta: "cta.",
  process: "process.",
  insights: "insights.",
  icons: "icons.",
};

export function getSiteImage(id: SiteImageId): SiteImageAsset {
  return siteImages[id];
}

export function getSiteImageBySrc(src: string): SiteImageAsset | undefined {
  return Object.values(siteImages).find(
    (image) => image.path === src || image.src === src,
  );
}

export function getCollectionImages(
  collection: SiteImageCollection,
): SiteImageAsset[] {
  const prefix = collectionPrefix[collection];
  return Object.values(siteImages).filter((image) => image.id.startsWith(prefix));
}

export function getServiceImage(slug: string): SiteImageAsset | undefined {
  return getOptionalImage(`services.${slug}`);
}

export function getProjectImage(slug: string): SiteImageAsset | undefined {
  return getOptionalImage(`projects.${slug}`);
}

export function getIndustryImage(slug: string): SiteImageAsset | undefined {
  return getOptionalImage(`industries.${slug}`);
}

export function getProblemImage(slug: string): SiteImageAsset | undefined {
  return getOptionalImage(`problems.${slug}`);
}

export function getProcessImage(slug: string): SiteImageAsset | undefined {
  return getOptionalImage(`process.${slug}`);
}

export function getInsightImage(slug: string): SiteImageAsset | undefined {
  return getOptionalImage(`insights.${slug}`);
}

function getOptionalImage(id: string): SiteImageAsset | undefined {
  return id in siteImages ? siteImages[id as SiteImageId] : undefined;
}

export const readySiteImages = Object.values(siteImages).filter(
  (image) => image.ready,
);
