"use client";

import { ChevronUp } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { footerContent } from "@/data/footer";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const visible = useScrolled(420);
  const reduceMotion = usePrefersReducedMotion();

  return (
    <button
      type="button"
      data-back-to-top
      aria-label={footerContent.backToTop}
      aria-hidden={!visible}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: reduceMotion ? "auto" : "smooth",
        })
      }
      tabIndex={visible ? 0 : -1}
      className={cn(
        buttonVariants({ variant: "outline", size: "icon" }),
        "fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 transition-opacity duration-300 sm:right-6 sm:bottom-6",
        visible
          ? "opacity-100"
          : "pointer-events-none opacity-0 motion-reduce:transition-none",
      )}
    >
      <ChevronUp aria-hidden />
    </button>
  );
}
