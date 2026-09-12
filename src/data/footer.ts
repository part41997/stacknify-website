import { getServiceHref, serviceCategories } from "@/data/services";
import { siteConfig } from "@/data/site";
import type { NavItem } from "@/types";

const copyrightYear = 2026;

export interface FooterContent {
  description: string;
  copyrightYear: number;
  copyright: string;
  backToTop: string;
}

export const footerContent: FooterContent = {
  description: `${siteConfig.positioning}.`,
  copyrightYear,
  copyright: `© ${copyrightYear} ${siteConfig.name}. All rights reserved.`,
  backToTop: "Back to top",
};

export const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Services", href: "/#services" },
      { label: "Projects", href: "/#projects" },
      { label: "Process", href: "/#process" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Services",
    links: serviceCategories.map((entry) => ({
      label: entry.shortTitle,
      href: getServiceHref(entry),
    })),
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "/#faq" },
      { label: "Blog", href: "/#insights" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
] as const satisfies readonly {
  title: string;
  links: readonly NavItem[];
}[];
