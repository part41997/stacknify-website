import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { getSiteUrl } from "@/lib/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path = "") {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `${getSiteUrl()}${normalized}`;
}

export function isExternalHref(href: string) {
  return /^(https?:\/\/|mailto:|tel:)/.test(href);
}
