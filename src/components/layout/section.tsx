import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const sectionVariants = cva("relative", {
  variants: {
    spacing: {
      none: "py-0",
      compact: "py-section-sm",
      comfortable: "py-section-md",
      default: "py-section",
      spacious: "py-section-lg",
    },
    tone: {
      default: "",
      surface: "bg-surface",
      muted: "bg-background-secondary",
      mist: "bg-background-secondary",
      soft: "bg-background-soft",
    },
  },
  defaultVariants: {
    spacing: "default",
    tone: "default",
  },
});

type SectionProps = ComponentProps<"section"> &
  VariantProps<typeof sectionVariants> & {
    defer?: boolean;
  };

export function Section({
  className,
  spacing = "default",
  tone = "default",
  defer = false,
  ...props
}: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn(
        sectionVariants({ spacing, tone }),
        defer && "content-auto",
        className,
      )}
      {...props}
    />
  );
}
