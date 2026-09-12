import { FaqAccordion } from "@/components/faq/faq-accordion";
import { SimplePage } from "@/components/layout/simple-page";
import { JsonLd } from "@/components/seo";
import { faqContent } from "@/data/faq";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: faqContent.heading,
  description: faqContent.description,
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: siteConfig.name, path: "/" },
          { name: faqContent.heading, path: "/faq" },
        ])}
      />
      <SimplePage
        title={faqContent.heading}
        description={faqContent.description}
      >
        <FaqAccordion />
      </SimplePage>
    </>
  );
}
