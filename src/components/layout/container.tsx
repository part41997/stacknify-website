import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { containerWidths, type ContainerWidth } from "@/lib/design";

type ContainerProps = ComponentProps<"div"> & {
  width?: ContainerWidth;
};

export function Container({
  className,
  width = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-gutter sm:px-gutter-md lg:px-gutter-lg",
        containerWidths[width],
        className,
      )}
      {...props}
    />
  );
}
