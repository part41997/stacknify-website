import { contactContent } from "@/data/contact";
import { finalCtaContent } from "@/data/final-cta";
import { primaryCta } from "@/data/navigation";
import { processContent } from "@/data/process";
import { projectsContent } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { analyticsEvents, type AnalyticsEvent } from "@/lib/analytics/events";

function visibleLabel(element: Element) {
  return (element.textContent ?? "").replace(/\s+/g, " ").trim();
}

function hrefOf(element: Element) {
  if (!(element instanceof HTMLAnchorElement)) {
    return "";
  }

  return element.getAttribute("href") ?? element.href ?? "";
}

function closestClickable(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest("a, button");
}

const letsTalkLabels = new Set<string>([primaryCta.label]);

const startProjectLabels = new Set<string>([
  siteConfig.hero.primaryCta.label,
  processContent.cta.label,
  finalCtaContent.primary.label,
  projectsContent.similarCta,
]);

export function resolveClickEvent(
  target: EventTarget | null,
): AnalyticsEvent | null {
  const clickable = closestClickable(target);
  if (!clickable) {
    return null;
  }

  const href = hrefOf(clickable).toLowerCase();

  if (href.startsWith("mailto:")) {
    return analyticsEvents.emailClick;
  }

  if (href.startsWith("tel:")) {
    return analyticsEvents.phoneClick;
  }

  if (clickable.closest('[data-slot="service-tile"]')) {
    return analyticsEvents.serviceClick;
  }

  if (clickable.closest('[data-slot="project-card"]')) {
    return analyticsEvents.portfolioClick;
  }

  try {
    const url = new URL(href, window.location.origin);
    if (url.pathname.startsWith("/projects/")) {
      return analyticsEvents.portfolioClick;
    }
  } catch {
    if (href.includes("/projects/")) {
      return analyticsEvents.portfolioClick;
    }
  }

  const label = visibleLabel(clickable);

  if (letsTalkLabels.has(label)) {
    return analyticsEvents.letsTalkCta;
  }

  if (startProjectLabels.has(label)) {
    return analyticsEvents.startProjectCta;
  }

  return null;
}

export function isContactForm(element: EventTarget | null) {
  if (!(element instanceof Element)) {
    return false;
  }

  const form =
    element instanceof HTMLFormElement ? element : element.closest("form");
  return form?.getAttribute("aria-label") === contactContent.form.ariaLabel;
}
