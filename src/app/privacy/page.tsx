import { LegalPage } from "@/components/layout/legal-page";
import { JsonLd } from "@/components/seo";
import { privacyPolicy } from "@/data/legal";
import { routes } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  path: routes.privacy,
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: siteConfig.name, path: routes.home },
          { name: privacyPolicy.title, path: routes.privacy },
        ])}
      />
      <LegalPage document={privacyPolicy} />
    </>
  );
}
