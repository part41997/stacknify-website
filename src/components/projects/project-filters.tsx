"use client";

import { cn } from "@/lib/utils";
import { projectFilters, type ProjectFilterId } from "@/data/projects";

type ProjectFiltersProps = {
  value: ProjectFilterId;
  onChange: (value: ProjectFilterId) => void;
};

export function ProjectFilters({ value, onChange }: ProjectFiltersProps) {
  return (
    <div className="-mx-gutter px-gutter sm:mx-0 sm:px-0">
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex [scrollbar-width:none] gap-1.5 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] max-sm:flex-nowrap sm:flex-wrap [&::-webkit-scrollbar]:hidden"
      >
        {projectFilters.map((filter) => {
          const selected = value === filter.id;

          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(filter.id)}
              className={cn(
                "relative shrink-0 rounded-full px-3.5 text-sm transition-colors duration-200 outline-none",
                "inline-flex min-h-11 touch-manipulation items-center",
                "focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                selected
                  ? "bg-navy/[0.06] text-navy"
                  : "text-muted-foreground hover:text-navy",
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
