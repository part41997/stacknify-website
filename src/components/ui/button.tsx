import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 touch-manipulation items-center justify-center rounded-xl border border-transparent",
    "bg-clip-padding font-heading text-small font-medium whitespace-nowrap select-none outline-none",
    "transition-[color,background-color,box-shadow,border-color,transform] duration-200 ease-out",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary",
    "disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0",
    "motion-reduce:transform-none motion-reduce:hover:translate-y-0",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "[&_svg[data-icon=inline-end]]:transition-transform [&_svg[data-icon=inline-end]]:duration-200 [&_svg[data-icon=inline-end]]:ease-out",
    "motion-safe:group-hover/button:[&_svg[data-icon=inline-end]]:translate-x-0.5",
    "motion-safe:group-focus-visible/button:[&_svg[data-icon=inline-end]]:translate-x-0.5",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-brand-teal text-white shadow-xs hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--brand-teal)_82%,var(--brand-navy))] hover:shadow-sm",
        brand:
          "bg-brand-teal text-white shadow-xs hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--brand-teal)_82%,var(--brand-navy))] hover:shadow-sm",
        outline:
          "border-border bg-surface text-text-primary shadow-xs hover:-translate-y-0.5 hover:border-border-brand hover:bg-surface-hover hover:shadow-sm",
        secondary:
          "border-border bg-background-secondary text-text-primary shadow-xs hover:-translate-y-0.5 hover:border-border-brand hover:bg-surface-hover",
        ghost:
          "bg-transparent text-text-primary shadow-none hover:-translate-y-0.5 hover:bg-surface-hover",
        glow:
          "bg-brand-teal text-white shadow-xs hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--brand-teal)_82%,var(--brand-navy))] hover:shadow-sm",
        destructive:
          "bg-destructive/12 text-destructive hover:bg-destructive/18 focus-visible:ring-destructive/30",
        link: "rounded-none border-0 bg-transparent px-0 text-brand-teal shadow-none hover:text-navy hover:underline hover:underline-offset-4",
      },
      size: {
        sm: "h-11 min-h-11 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5 [&_svg:not([class*='size-'])]:size-3.5",
        default:
          "h-11 min-h-11 gap-2 px-5 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        lg: "h-12 min-h-12 gap-2 px-6 has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5 [&_svg:not([class*='size-'])]:size-[1.125rem]",
        icon: "size-11 min-h-11 min-w-11",
        "icon-sm":
          "size-11 min-h-11 min-w-11 [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "size-12 min-h-12 min-w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
