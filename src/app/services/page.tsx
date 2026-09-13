import { AiDevelopment } from "@/components/sections/ai-development";
import { Services } from "@/components/sections/services";
import { Technology } from "@/components/sections/technology";
import { JsonLd } from "@/components/seo";
import { routes } from "@/data/navigation";
import { servicesContent } from "@/data/services";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: `${servicesContent.headingPrefix} ${servicesContent.headingAccent}`,
  description: servicesContent.description,
  path: routes.services,
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: siteConfig.name, path: routes.home },
          { name: servicesContent.categoryLabel, path: routes.services },
        ])}
      />
      <Services headingAs="h1" />
      <Technology />
      <AiDevelopment />
    </>
  );
}
