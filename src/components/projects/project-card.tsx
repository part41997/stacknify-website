import Link from "next/link";

import {
  ImageHoverArrow,
  ImageHoverRoot,
} from "@/components/media/image-hover";
import { ProjectImage } from "@/components/projects/project-image";
import {
  getProjectCategoryLabel,
  getProjectHref,
  projectsContent,
} from "@/data/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  index: number;
  total: number;
  className?: string;
};

export function ProjectCard({ project, index, className }: ProjectCardProps) {
  const href = getProjectHref(project);
  const category = project.categories[0];

  return (
    <ImageHoverRoot className={cn("portfolio-hover h-full", className)}>
      <Link
        href={href}
        data-slot="project-card"
        className={cn(
          "group/project relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-navy/8 bg-white",
          "ring-1 ring-navy/8 outline-none",
          "transition-[transform,box-shadow,border-color] duration-300 ease-out",
          "hover:-translate-y-1 motion-reduce:transform-none motion-reduce:hover:translate-y-0",
          "focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2",
        )}
        aria-label={`${project.title}. ${projectsContent.viewCaseStudy}.`}
      >
        <div
          data-image-hover-media
          className="relative aspect-[410/382] overflow-hidden"
        >
          <div data-image-hover-scale className="absolute inset-0">
            <ProjectImage
              project={project}
              sizes="(min-width: 1024px) 26rem, (min-width: 640px) 46vw, 100vw"
            />
          </div>
        </div>

        <span data-portfolio-shine aria-hidden />

        <span data-portfolio-frame aria-hidden>
          <span data-corner="tl" />
          <span data-corner="tr" />
          <span data-corner="bl" />
          <span data-corner="br" />
        </span>

        <span className="absolute top-4 left-4 z-20 inline-flex min-h-9 min-w-9 items-center justify-center rounded-full bg-white/90 px-2.5 font-mono text-[0.6875rem] tracking-[0.16em] text-navy shadow-sm ring-1 ring-navy/8 backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative z-10 flex items-end justify-between gap-3 border-t border-navy/6 bg-gradient-to-r from-white via-white to-mint/35 px-4 py-4 backdrop-blur-sm sm:px-5">
          <div className="min-w-0">
            {category ? (
              <p className="text-overline text-teal uppercase">
                {getProjectCategoryLabel(category)}
                <span className="text-navy/20"> · </span>
                <span className="text-navy/40">{project.solutionType}</span>
              </p>
            ) : null}
            <h3 className="mt-1 font-heading text-[1.05rem] tracking-[-0.03em] text-navy">
              {project.title}
            </h3>
          </div>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy text-white transition-colors duration-300 group-hover/project:bg-teal">
            <ImageHoverArrow />
          </span>
        </div>
      </Link>
    </ImageHoverRoot>
  );
}
