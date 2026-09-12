import { notFound } from "next/navigation";

import { InsightArticle } from "@/components/insights/insight-article";
import { JsonLd } from "@/components/seo";
import {
  getInsightBySlug,
  getInsightHref,
  insights,
  insightsContent,
} from "@/data/insights";
import { siteConfig } from "@/data/site";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    return createMetadata({
      title: insightsContent.fallbackTitle,
      noIndex: true,
    });
  }

  return createMetadata({
    title: insight.title,
    description: insight.description,
    path: getInsightHref(insight),
    ogType: "article",
  });
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  return (
    <>
      <JsonLd data={articleJsonLd(insight)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: siteConfig.name, path: "/" },
          { name: insightsContent.eyebrow, path: "/#insights" },
          { name: insight.title, path: getInsightHref(insight) },
        ])}
      />
      <InsightArticle insight={insight} />
    </>
  );
}
