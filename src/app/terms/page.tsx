import { LegalPage } from "@/components/layout/legal-page";
import { JsonLd } from "@/components/seo";
import { termsAndConditions } from "@/data/legal";
import { routes } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: termsAndConditions.title,
  description: termsAndConditions.description,
  path: routes.terms,
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: siteConfig.name, path: routes.home },
          { name: termsAndConditions.title, path: routes.terms },
        ])}
      />
      <LegalPage document={termsAndConditions} />
    </>
  );
}
