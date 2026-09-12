"use client";

import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFilters } from "@/components/projects/project-filters";
import {
  filterProjects,
  projectsContent,
  type ProjectFilterId,
} from "@/data/projects";
import { useMemo, useState } from "react";

export function ProjectGallery() {
  const [filter, setFilter] = useState<ProjectFilterId>("ai");
  const items = useMemo(() => filterProjects(filter), [filter]);

  return (
    <div>
      <ProjectFilters value={filter} onChange={setFilter} />

      {items.length === 0 ? (
        <p className="mt-8 text-body text-text-secondary">
          {projectsContent.emptyFilter}
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              total={items.length}
            />
          ))}
        </div>
      )}
    </div>
  );
}
