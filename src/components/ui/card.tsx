import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ElementType } from "react";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  [
    "group/card rounded-2xl border border-border bg-surface text-text-secondary shadow-sm",
    "transition-[border-color,box-shadow,transform,background-color,color] duration-200 ease-out",
    "[&_[data-slot=card-icon]]:transition-colors [&_[data-slot=card-icon]]:duration-200",
    "[&_[data-icon=inline-end]]:transition-transform [&_[data-icon=inline-end]]:duration-200 [&_[data-icon=inline-end]]:ease-out",
    "motion-safe:focus-within:[&_[data-icon=inline-end]]:translate-x-0.5",
    "motion-reduce:transform-none motion-reduce:hover:translate-y-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        service: "h-full overflow-hidden",
        project: "h-full overflow-hidden",
        technology: "overflow-hidden bg-surface",
        industry: "overflow-hidden",
        process:
          "relative rounded-xl before:absolute before:inset-y-4 before:left-3 before:w-0.5 before:rounded-sm before:bg-brand-teal/30 before:transition-colors before:duration-300 hover:before:bg-brand-teal",
        testimonial: "overflow-hidden",
        faq: "rounded-xl shadow-xs",
        featured: "relative overflow-hidden border-border bg-surface",
        muted: "border-transparent bg-background-secondary shadow-none",
        outline: "bg-transparent shadow-none",
      },
      padding: {
        none: "p-0",
        sm: "p-5",
        default: "p-5 sm:p-8",
        lg: "p-6 sm:p-10",
      },
      interactive: {
        true: [
          "hover:-translate-y-1 hover:border-border-brand hover:bg-surface-hover hover:shadow-md",
          "hover:[&_[data-slot=card-icon]]:text-brand-teal",
          "motion-safe:hover:[&_[data-icon=inline-end]]:translate-x-0.5",
        ].join(" "),
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "faq",
        interactive: true,
        class: "hover:-translate-y-[3px]",
      },
      {
        variant: "featured",
        interactive: true,
        class: "hover:border-border-brand",
      },
      {
        variant: "muted",
        interactive: true,
        class: "hover:border-border",
      },
    ],
    defaultVariants: {
      variant: "default",
      padding: "default",
      interactive: true,
    },
  },
);

type CardProps = ComponentProps<"div"> & VariantProps<typeof cardVariants>;

function Card({
  className,
  variant = "default",
  padding = "default",
  interactive = true,
  ...props
}: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, padding, interactive }), className)}
      {...props}
    />
  );
}

function CardIcon({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="card-icon"
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-xl bg-background-secondary text-text-primary",
        className,
      )}
      {...props}
    />
  );
}

type CardTitleProps = ComponentProps<"h3"> & {
  as?: Extract<ElementType, "h2" | "h3" | "p" | "span">;
};

function CardTitle({
  className,
  as: Comp = "h3",
  ...props
}: CardTitleProps) {
  return (
    <Comp
      className={cn("font-heading text-h3 text-text-primary", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p className={cn("text-body text-text-secondary", className)} {...props} />
  );
}

function CardAction({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-8 text-small text-text-primary",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardAction,
  CardDescription,
  CardIcon,
  CardTitle,
  cardVariants,
};
export type { CardProps };
