import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type VisualStageProps = ComponentProps<"div">;

export function VisualStage({
  className,
  children,
  ...props
}: VisualStageProps) {
  return (
    <div
      data-slot="visual-stage"
      className={cn(
        "relative isolate rounded-3xl border border-navy/8 bg-white lg:rounded-[2rem]",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_12%,color-mix(in_srgb,var(--brand-mint)_18%,transparent),transparent_58%),radial-gradient(ellipse_at_88%_92%,color-mix(in_srgb,var(--brand-navy)_4%,transparent),transparent_52%)]" />
        <div className="absolute inset-0 site-grid opacity-22" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
