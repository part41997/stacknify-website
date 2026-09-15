import { notFound } from "next/navigation";

import { ProjectCaseStudy } from "@/components/projects/project-case-study";
import { JsonLd } from "@/components/seo";
import {
  getProjectBySlug,
  projects,
  projectsContent,
} from "@/data/projects";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return createMetadata({
      title: projectsContent.fallbackTitle,
      noIndex: true,
    });
  }

  return createMetadata({
    title: project.seo.title,
    description: project.seo.description,
    path: `/projects/${project.slug}`,
    noIndex: project.placeholder,
    keywords: project.seo.keywords,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      {project.placeholder ? null : (
        <>
          <JsonLd data={projectJsonLd(project)} />
          <JsonLd
            data={breadcrumbJsonLd([
              { name: siteConfig.name, path: "/" },
              { name: projectsContent.sectionLabel, path: "/projects" },
              { name: project.title, path: `/projects/${project.slug}` },
            ])}
          />
        </>
      )}
      <ProjectCaseStudy project={project} />
    </>
  );
}
