export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type CtaLink = {
  label: string;
  href: string;
};

export type SocialLinks = {
  linkedin: string;
  instagram: string;
  facebook: string;
  pinterest: string;
  youtube: string;
  x: string;
};

export type SocialPlatform = keyof SocialLinks;

export type SectionHeadingCopy = {
  headingPrefix: string;
  headingAccent: string;
  description?: string;
};

export type HeroContent = {
  eyebrow: string;
  headline: readonly string[];
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  scrollLabel: string;
  scrollHref: string;
  scrollAriaLabel: string;
};

export type SeoConfig = {
  title: string;
  description: string;
  topics: readonly string[];
};

export type PageCopy = {
  title: string;
  description: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  positioning: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  logo: string;
  ogImage: string;
  social: SocialLinks;
  locale: string;
  audiences: readonly Audience[];
  seo: SeoConfig;
  hero: HeroContent;
  notFound: PageCopy;
  privacy: PageCopy;
  terms: PageCopy;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Audience =
  | "Startups"
  | "SMEs"
  | "Entrepreneurs"
  | "International businesses"
  | "Agencies"
  | "Established companies";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description?: string;
};

export type ServiceIcon =
  | "sparkles"
  | "web"
  | "mobile"
  | "palette"
  | "code"
  | "growth";

export type ServiceCategory = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  details: string;
  problem: string;
  approach: string;
  who: string;
  outcomes: readonly string[];
  items: string[];
  technologies: string[];
  href: string;
  icon: ServiceIcon;
  /** Hex accent from the service visual. Used for hover glow only. */
  accent: string;
};

export type TrustStat = {
  id: string;
  label: string;
  /** Set a number to show and animate. Leave null to hide unless `placeholder` is set. */
  value: number | null;
  prefix?: string;
  suffix?: string;
  /** Shown when `value` is null. Never animated. Omit to hide the metric. */
  placeholder?: string;
};

export type SolutionIcon =
  | "bot"
  | "workflow"
  | "cpu"
  | "message"
  | "app"
  | "branch"
  | "file"
  | "database"
  | "zap"
  | "brain"
  | "layers";

export type WorkflowStep = {
  id: string;
  label: string;
  caption: string;
  detail: string;
};

export type SolutionTopic = {
  slug: string;
  title: string;
  summary: string;
  icon: SolutionIcon;
};

export type SolutionPillar = {
  slug: string;
  title: string;
  summary: string;
  details: string;
  icon: SolutionIcon;
  highlights: string[];
};

export type ProblemSolutionPair = {
  slug: string;
  number: string;
  title: string;
  problem: string;
  solution: string;
  solutionSummary: string;
  technology: readonly string[];
};

export const projectCategoryIds = [
  "ai",
  "web",
  "mobile",
  "saas",
  "design",
  "ecommerce",
  "automation",
  "marketing",
] as const;

export type ProjectCategoryId = (typeof projectCategoryIds)[number];

export type ProjectImage = {
  src: string;
  alt: string;
};

export const projectLayouts = [
  "featured",
  "portrait",
  "wide",
  "compact",
] as const;

export type ProjectLayout = (typeof projectLayouts)[number];

export type Project = {
  slug: string;
  title: string;
  industry: string;
  solutionType: string;
  categories: ProjectCategoryId[];
  challenge: string;
  approach: string;
  solution: string;
  technology: string[];
  result: string | null;
  placeholder: boolean;
  featured?: boolean;
  layout: ProjectLayout;
  client?: string;
  href?: string;
  image?: ProjectImage;
  screenshots?: readonly string[];
};

export type TechnologyClusterId =
  | "frontend"
  | "backend"
  | "mobile"
  | "database"
  | "ai"
  | "cloud"
  | "devops"
  | "marketing";

export type TechnologyCluster = {
  id: TechnologyClusterId;
  label: string;
  description: string;
  x: number;
  y: number;
};

export type Technology = {
  slug: string;
  name: string;
  description: string;
  cluster: TechnologyClusterId;
  x: number;
  y: number;
  related?: readonly string[];
};

export type WhyReason = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  angle: number;
};

export type ProcessStep = {
  slug: string;
  number: string;
  title: string;
  summary: string;
};

export const industryLayouts = [
  "featured",
  "portrait",
  "wide",
  "compact",
  "banner",
] as const;

export type IndustryLayout = (typeof industryLayouts)[number];

export type Industry = {
  slug: string;
  name: string;
  summary: string;
  examples: string[];
  services: string[];
  featured?: boolean;
  layout?: IndustryLayout;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  projectType: string;
  placeholder: boolean;
  /** Real client photo only. Never a stock or generated face. */
  avatar?: string;
};

export type InsightBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: readonly string[] };

export type Insight = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  image: SiteImageId;
  body: readonly InsightBlock[];
};

export type SiteImageId =
  | "brand.logo-horizontal"
  | "brand.logo-vertical"
  | "hero.system"
  | "ai.operating-layer"
  | "ai.workspace"
  | "services.custom-software"
  | "services.web-development"
  | "services.mobile-apps"
  | "services.ui-ux-design"
  | "services.ai-automation"
  | "services.seo-digital-marketing"
  | "projects.internal-management-system"
  | "projects.custom-client-platform"
  | "projects.enterprise-web-application"
  | "projects.workflow-orchestration"
  | "projects.business-process-automation"
  | "projects.ai-data-processing"
  | "projects.content-keyword-strategy"
  | "projects.enterprise-technical-seo"
  | "projects.performance-seo-integration"
  | "projects.mobile-app-ui-ux"
  | "projects.saas-dashboard-ux"
  | "projects.conversion-website-design"
  | "projects.swo-platform"
  | "projects.tasty-indian"
  | "projects.materialze-wallpaper"
  | "projects.stacko"
  | "projects.sajima-vpn"
  | "projects.leap-club"
  | "industries.startups"
  | "industries.healthcare"
  | "industries.education"
  | "industries.ecommerce"
  | "industries.real-estate"
  | "industries.finance"
  | "industries.logistics"
  | "industries.manufacturing"
  | "industries.retail"
  | "industries.professional-services"
  | "about.practice"
  | "problems.manual-work"
  | "problems.disconnected-systems"
  | "problems.outdated-software"
  | "problems.low-visibility"
  | "cta.build"
  | "process.discover"
  | "process.strategize"
  | "process.design"
  | "process.build"
  | "process.test"
  | "process.launch"
  | "process.grow"
  | "insights.ai-features"
  | "insights.design-systems"
  | "insights.custom-software"
  | "insights.technical-seo"
  | "insights.automation"
  | "icons.ai"
  | "icons.web"
  | "icons.mobile"
  | "icons.api"
  | "icons.cloud"
  | "icons.growth";

export type SiteImageCollection =
  | "brand"
  | "hero"
  | "ai"
  | "services"
  | "projects"
  | "industries"
  | "about"
  | "problems"
  | "cta"
  | "process"
  | "insights"
  | "icons";

export type SiteImageCategory =
  | "photograph"
  | "screenshot"
  | "illustration"
  | "brand"
  | "placeholder";

export type SiteImageSource = {
  provider: "unsplash" | "pexels" | "brand" | "self";
  license: string;
  photoId?: string;
};

export type SiteImageAsset = {
  id: SiteImageId;
  /** Public path. Components look this up by id — never hardcode it. */
  path: string;
  /** Alias of `path` for next/image. */
  src: string;
  alt: string;
  section: SiteImageCollection;
  category: SiteImageCategory;
  desktopAspectRatio: string;
  mobileAspectRatio: string;
  width: number;
  height: number;
  sizes: string;
  /**
   * Flip to true only after the file exists under public/images or public/brand.
   * Components must not request a missing file.
   */
  ready: boolean;
  /** Above-the-fold only. The header logo is the default; do not priority section photos. */
  priority?: boolean;
  decorative?: boolean;
  /** Why this asset exists. Not for display. */
  purpose: string;
  source: SiteImageSource;
};
