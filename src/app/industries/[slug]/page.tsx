import { notFound } from "next/navigation";

import { IndustryDetail } from "@/components/industries/industry-detail";
import { JsonLd } from "@/components/seo";
import {
  featuredIndustries,
  getIndustryBySlug,
  industriesContent,
} from "@/data/industries";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return featuredIndustries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry?.featured) {
    return createMetadata({
      title: industriesContent.fallbackTitle,
      noIndex: true,
    });
  }

  return createMetadata({
    title: industry.name,
    description: industry.summary,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry?.featured) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: siteConfig.name, path: "/" },
          { name: industry.name, path: `/industries/${industry.slug}` },
        ])}
      />
      <IndustryDetail industry={industry} />
    </>
  );
}
