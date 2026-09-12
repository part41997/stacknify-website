"use client";

import { motion } from "framer-motion";
import { useId, useState } from "react";

import { faqItems } from "@/data/faq";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { defaultEase, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";

type FaqAccordionProps = {
  headingAs?: "h2" | "h3";
};

export function FaqAccordion({ headingAs: Heading = "h2" }: FaqAccordionProps) {
  const reduceMotion = usePrefersReducedMotion();
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className="border-t border-border">
      {faqItems.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div
            key={item.question}
            className={cn(
              "border-b border-border transition-colors duration-300",
              open
                ? "bg-navy/[0.025]"
                : "hover:bg-navy/[0.018]",
            )}
          >
            <Heading className="font-heading text-[1.15rem] tracking-[-0.03em] text-navy sm:text-[1.35rem] lg:text-[1.5rem]">
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() =>
                  setOpenIndex((current) => (current === index ? -1 : index))
                }
                className={cn(
                  "group flex min-h-14 w-full items-center justify-between gap-6 py-4 text-left outline-none sm:min-h-16 sm:py-5 lg:py-6",
                  "focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  open ? "text-navy" : "text-navy/80",
                )}
              >
                <span
                  className={cn(
                    "min-w-0 text-balance transition-colors duration-300",
                    open && "text-navy",
                  )}
                >
                  {item.question}
                </span>
                <PlusMinus open={open} reduceMotion={reduceMotion} />
              </button>
            </Heading>

            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={open ? undefined : true}
              aria-hidden={open ? undefined : true}
              initial={false}
              animate={{
                height: open ? "auto" : 0,
                opacity: open ? 1 : 0,
              }}
              transition={{
                duration: reduceMotion ? 0 : duration.base,
                ease: defaultEase,
              }}
              className="overflow-hidden"
            >
              <p className="max-w-2xl pb-6 text-body text-blue-gray sm:pb-7 sm:text-body-lg">
                {item.answer}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

function PlusMinus({
  open,
  reduceMotion,
}: {
  open: boolean;
  reduceMotion: boolean;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative flex size-10 shrink-0 items-center justify-center rounded-full border transition-[border-color,color,background-color] duration-300",
        open
          ? "border-navy bg-navy text-white"
          : "border-navy/12 bg-transparent text-navy/45 group-hover:border-navy/30 group-hover:text-navy",
      )}
    >
      <span className="absolute h-px w-3 bg-current" />
      <motion.span
        className="absolute h-3 w-px bg-current"
        initial={false}
        animate={{
          scaleY: open ? 0 : 1,
          opacity: open ? 0 : 1,
        }}
        transition={{
          duration: reduceMotion ? 0 : duration.microSlow,
          ease: defaultEase,
        }}
      />
    </span>
  );
}
