import { faqItems } from "@/data/faq";
import { getProjectHref } from "@/data/projects";
import { getInsightCover, getInsightHref } from "@/data/insights";
import { getServiceHref, serviceCategories } from "@/data/services";
import { siteConfig } from "@/data/site";
import type { FaqItem, Insight, Project, ServiceCategory } from "@/types";
import {
  getAbsoluteUrl,
  getLogoUrl,
  getSiteUrl,
  getSocialProfileUrls,
} from "@/lib/site";

type JsonLd = Record<string, unknown>;

function compact<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function organizationId() {
  return `${getSiteUrl()}/#organization`;
}

function websiteId() {
  return `${getSiteUrl()}/#website`;
}

export function organizationJsonLd(): JsonLd {
  const email = siteConfig.email.trim();
  const phone = siteConfig.phone.trim();
  const address = siteConfig.address.trim();
  const sameAs = getSocialProfileUrls();

  return compact({
    "@type": ["Organization", "ProfessionalService"],
    "@id": organizationId(),
    name: siteConfig.name,
    legalName: siteConfig.name,
    url: getSiteUrl(),
    logo: {
      "@type": "ImageObject",
      url: getLogoUrl(),
    },
    image: getLogoUrl(),
    description: siteConfig.seo.description,
    email: email || undefined,
    telephone: phone || undefined,
    address: address
      ? {
          "@type": "PostalAddress",
          addressLocality: address,
        }
      : undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    knowsAbout: [...siteConfig.seo.topics],
    contactPoint: email
      ? [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email,
            telephone: phone || undefined,
            url: getAbsoluteUrl("/contact"),
          },
        ]
      : undefined,
  });
}

export function websiteJsonLd(): JsonLd {
  return compact({
    "@type": "WebSite",
    "@id": websiteId(),
    url: getSiteUrl(),
    name: siteConfig.name,
    alternateName: siteConfig.positioning,
    description: siteConfig.seo.description,
    inLanguage: siteConfig.locale,
    publisher: { "@id": organizationId() },
  });
}

export function servicesJsonLd(): JsonLd[] {
  return serviceCategories.map((category) =>
    compact({
      "@type": "Service",
      "@id": getAbsoluteUrl(getServiceHref(category)),
      name: category.title,
      description: category.seo.description,
      serviceType: category.items.join(", "),
      url: getAbsoluteUrl(getServiceHref(category)),
      provider: { "@id": organizationId() },
    }),
  );
}

export function serviceJsonLd(category: ServiceCategory): JsonLd {
  return compact({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": getAbsoluteUrl(getServiceHref(category)),
    name: category.title,
    description: category.seo.description,
    serviceType: category.items.join(", "),
    url: getAbsoluteUrl(getServiceHref(category)),
    provider: { "@id": organizationId() },
    areaServed: [...siteConfig.audiences],
  });
}

export function siteGraphJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(), websiteJsonLd(), ...servicesJsonLd()],
  };
}

export function faqJsonLd(): JsonLd {
  return faqPageJsonLd(faqItems);
}

export function faqPageJsonLd(items: readonly FaqItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function projectJsonLd(project: Project): JsonLd {
  return compact({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.seo.description,
    keywords: project.seo.keywords.join(", "),
    url: getAbsoluteUrl(getProjectHref(project)),
    about: project.solutionType,
    inLanguage: siteConfig.locale,
    provider: { "@id": organizationId() },
  });
}

export function breadcrumbJsonLd(
  items: readonly { name: string; path: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(insight: Insight): JsonLd {
  const cover = getInsightCover(insight);

  return compact({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: insight.title,
    description: insight.description,
    datePublished: insight.publishedAt,
    url: getAbsoluteUrl(getInsightHref(insight)),
    image: cover ? getAbsoluteUrl(cover.path) : undefined,
    articleSection: insight.category,
    inLanguage: siteConfig.locale,
    author: { "@id": organizationId() },
    publisher: { "@id": organizationId() },
    mainEntityOfPage: getAbsoluteUrl(getInsightHref(insight)),
  });
}
