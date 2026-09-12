import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-medium whitespace-nowrap transition-colors [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-transparent bg-brand-teal text-white",
        brand: "border-border bg-transparent text-text-muted",
        outline: "border-border bg-surface text-text-primary",
        muted: "border-transparent bg-background-secondary text-text-muted",
        glow: "border-border-brand bg-brand-mint/40 text-brand-teal",
      },
    },
    defaultVariants: {
      variant: "muted",
    },
  },
);

type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

function Badge({ className, variant = "muted", ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "text-overline uppercase",
        badgeVariants({ variant }),
        className,
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
