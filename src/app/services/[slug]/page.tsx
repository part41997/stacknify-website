import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/services/service-detail";
import { JsonLd } from "@/components/seo";
import {
  getServiceBySlug,
  serviceCategories,
  servicesContent,
} from "@/data/services";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/json-ld";
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
    title: category.title,
    description: category.summary,
    path: `/services/${category.slug}`,
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
      <JsonLd
        data={breadcrumbJsonLd([
          { name: siteConfig.name, path: "/" },
          { name: servicesContent.categoryLabel, path: "/#services" },
          { name: category.title, path: `/services/${category.slug}` },
        ])}
      />
      <ServiceDetail category={category} />
    </>
  );
}
