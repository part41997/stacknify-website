import type { MetadataRoute } from "next";

import { featuredIndustries } from "@/data/industries";
import { insights } from "@/data/insights";
import { routes } from "@/data/navigation";
import { projects } from "@/data/projects";
import { getServiceHref, serviceCategories } from "@/data/services";
import { getAbsoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const publishedProjects = projects.filter((project) => !project.placeholder);

  return [
    {
      url: getAbsoluteUrl(routes.home),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: getAbsoluteUrl(routes.services),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl(routes.solutions),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl(routes.projects),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl(routes.insights),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: getAbsoluteUrl(routes.about),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: getAbsoluteUrl(routes.faq),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: getAbsoluteUrl(routes.privacy),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: getAbsoluteUrl(routes.terms),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...publishedProjects.map((project) => ({
      url: getAbsoluteUrl(`/projects/${project.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...featuredIndustries.map((industry) => ({
      url: getAbsoluteUrl(`/industries/${industry.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...serviceCategories.map((category) => ({
      url: getAbsoluteUrl(getServiceHref(category)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...insights.map((insight) => ({
      url: getAbsoluteUrl(`/insights/${insight.slug}`),
      lastModified: new Date(`${insight.publishedAt}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
