import type { Metadata } from "next";

import { siteConfig } from "@/data/site";
import { getOgImageUrl, getSiteUrl } from "@/lib/site";

type CreateMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  ogType?: "website" | "article";
  canonical?: string | false;
};

export function createMetadata({
  title,
  description = siteConfig.seo.description,
  path = "",
  noIndex = false,
  ogType = "website",
  canonical,
}: CreateMetadataInput = {}): Metadata {
  const url = `${getSiteUrl()}${path}`;
  const socialTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.seo.title;
  const image = {
    url: getOgImageUrl(),
    width: 1200,
    height: 630,
    alt: socialTitle,
  };
  const canonicalUrl = canonical === false ? undefined : (canonical ?? url);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: title
      ? title
      : {
          default: siteConfig.seo.title,
          template: `%s | ${siteConfig.name}`,
        },
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: getSiteUrl() }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "technology",
    keywords: [...siteConfig.seo.topics],
    referrer: "origin-when-cross-origin",
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [{ url: "/icon", type: "image/png", sizes: "32x32" }],
      apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
    },
    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,
    openGraph: {
      title: socialTitle,
      description,
      url: canonicalUrl ?? url,
      siteName: siteConfig.name,
      locale: siteConfig.locale === "en" ? "en_US" : siteConfig.locale,
      type: ogType,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
