import { Insights } from "@/components/sections/insights";
import { JsonLd } from "@/components/seo";
import { insightsContent } from "@/data/insights";
import { routes } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: insightsContent.heading,
  description: insightsContent.eyebrow,
  path: routes.insights,
});

export default function InsightsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: siteConfig.name, path: routes.home },
          { name: insightsContent.eyebrow, path: routes.insights },
        ])}
      />
      <Insights headingAs="h1" />
    </>
  );
}
