import { getServiceHref, serviceCategories } from "@/data/services";
import type { NavItem, ServiceIcon } from "@/types";

export const routes = {
  home: "/",
  services: "/services",
  solutions: "/solutions",
  projects: "/projects",
  insights: "/insights",
  about: "/about",
  faq: "/faq",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export type NavLeaf = {
  label: string;
  href: string;
  summary?: string;
  number?: string;
  icon?: ServiceIcon;
};

export type NavLinkEntry = {
  type: "link";
  label: string;
  href: string;
};

export type NavMenuEntry = {
  type: "menu";
  id: string;
  label: string;
  href: string;
  layout: "mega" | "list";
  description: string;
  overviewLabel: string;
  items: readonly NavLeaf[];
};

export type NavEntry = NavLinkEntry | NavMenuEntry;

export const navEntries: readonly NavEntry[] = [
  { type: "link", label: "Home", href: routes.home },
  {
    type: "menu",
    id: "services",
    label: "Services",
    href: routes.services,
    layout: "mega",
    description: "Six practices. One team.",
    overviewLabel: "View all services",
    items: serviceCategories.map((category) => ({
      label: category.title,
      href: getServiceHref(category),
      summary: category.summary,
      number: category.number,
      icon: category.icon,
    })),
  },
  { type: "link", label: "Solutions", href: routes.solutions },
  { type: "link", label: "Portfolio", href: routes.projects },
  { type: "link", label: "Blog", href: routes.insights },
  {
    type: "menu",
    id: "about",
    label: "About",
    href: routes.about,
    layout: "list",
    description: "How we take on work — and stay with it.",
    overviewLabel: "About Stacknify",
    items: [
      {
        label: "About",
        href: `${routes.about}#about`,
        summary: "The practice behind the software.",
      },
      {
        label: "Why Stacknify",
        href: `${routes.about}#why`,
        summary: "How we take on work from the first conversation.",
      },
      {
        label: "Process",
        href: `${routes.about}#process`,
        summary: "Discover, design, build, and grow in the open.",
      },
      {
        label: "FAQ",
        href: routes.faq,
        summary: "Straight answers about working with us.",
      },
    ],
  },
];

export const mainNavigation: NavItem[] = navEntries.map((entry) => ({
  label: entry.label,
  href: entry.href,
}));

export const primaryCta = {
  label: "Let's Talk",
  href: routes.contact,
} as const;

export const skipToContent = "Skip to main content";

export function hrefPath(href: string) {
  return href.split("#")[0] || "/";
}

export function isPathActive(href: string, pathname: string) {
  const path = hrefPath(href);

  if (path === "/") {
    return pathname === "/";
  }

  return pathname === path || pathname.startsWith(`${path}/`);
}

export const sectionIds = [
  ...new Set(
    navEntries.flatMap((entry) => {
      const hrefs =
        entry.type === "menu"
          ? [entry.href, ...entry.items.map((item) => item.href)]
          : [entry.href];

      return hrefs
        .map((href) => href.split("#")[1])
        .filter((id): id is string => Boolean(id));
    }),
  ),
];
