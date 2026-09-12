import { ProjectCover } from "@/components/projects/project-cover";
import { SiteImage } from "@/components/media/site-image";
import { getProjectCoverImage } from "@/data/projects";
import { imageSizes } from "@/data/images";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

type ProjectImageProps = {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function ProjectImage({
  project,
  className,
  priority = false,
  sizes,
}: ProjectImageProps) {
  const cover = getProjectCoverImage(project);
  const layoutSizes = sizes ?? imageSizes.portfolio;

  return (
    <div className={cn("portfolio-stage relative h-full w-full overflow-hidden", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 site-grid opacity-[0.18]"
      />
      {cover ? (
        <>
          <SiteImage
            image={cover}
            fill
            priority={priority}
            sizes={layoutSizes}
            className="absolute inset-0 h-full w-full"
            imageClassName="object-contain object-center portfolio-grade-media"
          />
          <span className="portfolio-grade-veil" aria-hidden />
          <span className="portfolio-grade-light" aria-hidden />
        </>
      ) : (
        <ProjectCover category={project.categories[0] ?? "web"} />
      )}
    </div>
  );
}
