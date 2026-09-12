import type { ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";

import { Card, cardVariants } from "@/components/ui/card";

type AnimatedCardProps = ComponentProps<"div"> &
  VariantProps<typeof cardVariants>;

export function AnimatedCard({
  variant = "default",
  padding = "default",
  ...props
}: AnimatedCardProps) {
  return (
    <Card
      data-slot="animated-card"
      variant={variant}
      padding={padding}
      {...props}
    />
  );
}
