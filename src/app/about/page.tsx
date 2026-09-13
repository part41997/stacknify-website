import { About } from "@/components/sections/about";
import { Process } from "@/components/sections/process";
import { Stats } from "@/components/sections/stats";
import { Why } from "@/components/sections/why";
import { JsonLd } from "@/components/seo";
import { aboutContent } from "@/data/about";
import { routes } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: aboutContent.heading,
  description: aboutContent.description,
  path: routes.about,
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: siteConfig.name, path: routes.home },
          { name: aboutContent.label, path: routes.about },
        ])}
      />
      <About headingAs="h1" />
      <Why />
      <Process />
      <Stats />
    </>
  );
}
