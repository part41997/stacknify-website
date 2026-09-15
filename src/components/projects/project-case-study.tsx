import { ArrowLeft, ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AnchorLink } from "@/components/navigation/anchor-link";
import { ProjectImage } from "@/components/projects/project-image";
import { ProjectMediaSlider } from "@/components/projects/project-media-slider";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { imageSizes } from "@/data/images";
import {
  getProjectGallery,
  getProjectResult,
  projectsContent,
} from "@/data/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

export function ProjectCaseStudy({ project }: { project: Project }) {
  const { labels } = projectsContent;
  const gallery = getProjectGallery(project);
  const outcome = getProjectResult(project);

  return (
    <Section spacing="default" className="bg-background-primary">
      <Container className="flex flex-col gap-12 lg:gap-16">
        <AnchorLink
          href="/projects"
          className="inline-flex w-fit items-center gap-2 text-sm text-text-muted transition-colors hover:text-navy"
        >
          <ArrowLeft className="size-4" />
          {projectsContent.backLabel}
        </AnchorLink>

        {project.placeholder ? (
          <p className="max-w-3xl rounded-2xl border border-border bg-background-secondary px-4 py-3 text-caption text-text-muted">
            {projectsContent.placeholderNotice}
          </p>
        ) : null}

        <header className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {project.placeholder ? (
                <Badge variant="outline">{projectsContent.placeholderLabel}</Badge>
              ) : null}
              <p className="text-overline text-text-muted uppercase">
                {project.industry}
                <span className="text-border"> · </span>
                {project.solutionType}
              </p>
            </div>
            <h1 className="mt-4 font-heading text-h1 text-text-primary">
              {project.title}
            </h1>
          </div>
          <p className="max-w-md text-body text-text-secondary lg:justify-self-end">
            {project.challenge}
          </p>
        </header>

        {gallery.length > 1 ? (
          <ProjectMediaSlider images={gallery} title={project.title} />
        ) : (
          <div className="relative mx-auto aspect-[410/382] w-full max-w-4xl overflow-hidden rounded-[1.75rem] border border-navy/8 shadow-[0_28px_64px_-32px_color-mix(in_srgb,var(--brand-navy)_28%,transparent)] ring-1 ring-navy/8 lg:rounded-[2rem]">
            <ProjectImage
              project={project}
              priority
              sizes={imageSizes.pageHero}
            />
          </div>
        )}

        <section>
          <h2 className="text-overline text-text-muted uppercase">
            {projectsContent.storyLabel}
          </h2>
          <div className="mt-4 flex max-w-3xl flex-col gap-4 text-body text-text-secondary">
            {project.story.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </section>

        <dl className="grid gap-10 md:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
          <StudyBlock label={labels.challenge} body={project.challenge} />
          <StudyBlock label={labels.approach} body={project.approach} />
          <StudyBlock label={labels.solution} body={project.solution} />
          <div>
            <dt className="text-overline text-text-muted uppercase">
              {labels.technology}
            </dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {project.technology.map((item) => (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              ))}
            </dd>
          </div>
        </dl>

        <section>
          <h2 className="text-overline text-text-muted uppercase">
            {labels.result}
          </h2>
          <p className="mt-3 max-w-2xl text-body text-text-secondary">
            {outcome ?? projectsContent.unpublishedResult}
          </p>
        </section>

        {project.client ? (
          <section>
            <h2 className="text-overline text-text-muted uppercase">
              {labels.client}
            </h2>
            <p className="mt-3 text-body text-text-primary">{project.client}</p>
          </section>
        ) : null}

        <div className="flex flex-col gap-3">
          <AnchorLink
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "w-fit")}
          >
            {projectsContent.similarCta}
            <ArrowRight data-icon="inline-end" />
          </AnchorLink>
          <p className="text-caption text-text-muted">
            {projectsContent.similarNote}{" "}
            <span className="text-navy">{projectsContent.similarNoteAccent}</span>
          </p>
        </div>
      </Container>
    </Section>
  );
}

function StudyBlock({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <dt className="text-overline text-text-muted uppercase">{label}</dt>
      <dd className="mt-3 font-heading text-[1.25rem] leading-snug tracking-[-0.03em] text-text-primary">
        {body}
      </dd>
    </div>
  );
}
