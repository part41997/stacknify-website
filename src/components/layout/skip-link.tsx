import { buttonVariants } from "@/components/ui/button";
import { skipToContent } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      data-skip-link
      className={cn(
        buttonVariants({ size: "sm" }),
        "sr-only z-[60] focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60]",
      )}
    >
      {skipToContent}
    </a>
  );
}
