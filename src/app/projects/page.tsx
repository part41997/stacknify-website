import { Projects } from "@/components/sections/projects";
import { JsonLd } from "@/components/seo";
import { routes } from "@/data/navigation";
import { projectsContent } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: `${projectsContent.headingPrefix} ${projectsContent.headingAccent}`,
  description: projectsContent.description,
  path: routes.projects,
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: siteConfig.name, path: routes.home },
          { name: projectsContent.sectionLabel, path: routes.projects },
        ])}
      />
      <Projects headingAs="h1" />
    </>
  );
}
