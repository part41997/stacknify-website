import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/services/service-detail";
import { JsonLd } from "@/components/seo";
import {
  getServiceBySlug,
  serviceCategories,
  servicesContent,
} from "@/data/services";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const category = getServiceBySlug(slug);

  if (!category) {
    return createMetadata({
      title: servicesContent.fallbackTitle,
      noIndex: true,
    });
  }

  return createMetadata({
    title: category.seo.title,
    description: category.seo.description,
    path: `/services/${category.slug}`,
    keywords: category.seo.keywords,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const category = getServiceBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <JsonLd data={serviceJsonLd(category)} />
      <JsonLd data={faqPageJsonLd(category.faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: siteConfig.name, path: "/" },
          { name: servicesContent.categoryLabel, path: "/services" },
          { name: category.title, path: `/services/${category.slug}` },
        ])}
      />
      <ServiceDetail category={category} />
    </>
  );
}
