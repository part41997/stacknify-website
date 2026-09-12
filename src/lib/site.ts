import { siteConfig } from "@/data/site";

function configured(value: string) {
  return value.trim().length > 0;
}

export function getSiteUrl() {
  return siteConfig.website.replace(/\/$/, "");
}

export function getLogoUrl() {
  return configured(siteConfig.logo)
    ? siteConfig.logo
    : `${getSiteUrl()}/apple-icon`;
}

export function getOgImageUrl() {
  return configured(siteConfig.ogImage)
    ? siteConfig.ogImage
    : `${getSiteUrl()}/opengraph-image`;
}

export function getSocialProfileUrls() {
  return Object.values(siteConfig.social).filter(configured);
}

export function getAbsoluteUrl(path = "") {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `${getSiteUrl()}${normalized}`;
}
