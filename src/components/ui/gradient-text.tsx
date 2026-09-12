import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type GradientTextProps = ComponentProps<"span">;

export function GradientText({ className, ...props }: GradientTextProps) {
  return <span className={cn("text-gradient", className)} {...props} />;
}
