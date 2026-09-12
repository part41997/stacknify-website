import { getServiceHref, serviceCategories } from "@/data/services";
import type { NavItem, ServiceIcon } from "@/types";

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
  { type: "link", label: "Home", href: "/#home" },
  {
    type: "menu",
    id: "services",
    label: "Services",
    href: "/#services",
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
  { type: "link", label: "Solutions", href: "/#solutions" },
  { type: "link", label: "Portfolio", href: "/#projects" },
  { type: "link", label: "Blog", href: "/#insights" },
  {
    type: "menu",
    id: "about",
    label: "About",
    href: "/#about",
    layout: "list",
    description: "How we take on work — and stay with it.",
    overviewLabel: "About Stacknify",
    items: [
      {
        label: "About",
        href: "/#about",
        summary: "The practice behind the software.",
      },
      {
        label: "Why Stacknify",
        href: "/#why",
        summary: "How we take on work from the first conversation.",
      },
      {
        label: "Process",
        href: "/#process",
        summary: "Discover, design, build, and grow in the open.",
      },
      {
        label: "FAQ",
        href: "/#faq",
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
  href: "/#contact",
} as const;

export const skipToContent = "Skip to main content";

export const sectionIds = navEntries
  .map((entry) => entry.href.split("#")[1])
  .filter((id): id is string => Boolean(id));
