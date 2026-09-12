"use client";

import type { ComponentProps, ReactNode } from "react";

import { TextReveal } from "@/components/animations/text-reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = Omit<ComponentProps<"div">, "title"> & {
  eyebrow?: ReactNode;
  title?: ReactNode;
  prefix?: string;
  accent?: string;
  description?: ReactNode;
  align?: "left" | "center";
  /** Teal is reserved for a few chapters. Default stays navy. */
  accentTone?: "navy" | "teal";
  gradient?: boolean;
  reveal?: boolean;
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  title,
  prefix,
  accent,
  description,
  align = "left",
  accentTone = "navy",
  gradient = false,
  reveal = false,
  as: Heading = "h2",
  className,
  ...props
}: SectionHeadingProps) {
  const accentClass = gradient
    ? "text-gradient"
    : accentTone === "teal"
      ? "text-brand-teal"
      : "text-text-primary";

  const content =
    title ??
    (prefix || accent ? (
      <>
        {prefix ? <span className="block">{prefix}</span> : null}
        {accent ? <span className={cn("block", accentClass)}>{accent}</span> : null}
      </>
    ) : null);

  return (
    <div
      data-slot="section-heading"
      className={cn(
        "flex max-w-container-prose flex-col",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
      {...props}
    >
      {eyebrow ? (
        <p className="flex items-center gap-3 text-overline text-text-muted uppercase">
          <span aria-hidden className="h-px w-8 bg-navy/20" />
          {eyebrow}
        </p>
      ) : (
        <span
          aria-hidden
          className={cn(
            "h-px w-10 bg-navy/15",
            align === "center" && "mx-auto",
          )}
        />
      )}
      <Heading
        className={cn(
          "mt-3 font-heading text-h2 text-text-primary sm:mt-3.5",
          Heading === "h1" && "text-h1",
        )}
      >
        {reveal ? <TextReveal>{content}</TextReveal> : content}
      </Heading>
      {description ? (
        <p className="mt-3 max-w-2xl text-body text-text-secondary sm:mt-4 sm:text-body-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
