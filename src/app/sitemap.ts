import type { MetadataRoute } from "next";

import { featuredIndustries } from "@/data/industries";
import { insights } from "@/data/insights";
import { projects } from "@/data/projects";
import { getServiceHref, serviceCategories } from "@/data/services";
import { getAbsoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const publishedProjects = projects.filter((project) => !project.placeholder);

  return [
    {
      url: getAbsoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: getAbsoluteUrl("/faq"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
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
