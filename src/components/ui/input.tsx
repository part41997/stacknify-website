import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  [
    "w-full rounded-xl border border-border bg-surface text-text-primary outline-none",
    "transition-[border-color,box-shadow,background-color] duration-200",
    "placeholder:text-text-muted/70",
    "hover:border-border-brand hover:bg-surface-hover",
    "focus-visible:border-border-brand focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-[invalid=true]:border-destructive/50 aria-[invalid=true]:focus-visible:ring-destructive/30",
  ].join(" "),
  {
    variants: {
      size: {
        default: "h-12 min-h-12 px-3.5 text-body md:h-11 md:min-h-11 md:text-small",
        lg: "h-12 min-h-12 px-4 text-body",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type InputProps = Omit<ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>;

function Input({ className, size, ...props }: InputProps) {
  return (
    <input
      data-slot="input"
      className={cn(inputVariants({ size }), className)}
      {...props}
    />
  );
}

const textareaVariants = cva(
  [
    "min-h-32 w-full resize-y rounded-xl border border-border bg-surface px-3.5 py-3 text-body text-text-primary outline-none",
    "transition-[border-color,box-shadow,background-color] duration-200",
    "placeholder:text-text-muted/70",
    "hover:border-border-brand hover:bg-surface-hover",
    "focus-visible:border-border-brand focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-[invalid=true]:border-destructive/50 aria-[invalid=true]:focus-visible:ring-destructive/30",
    "md:text-small",
  ].join(" "),
);

function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants(), className)}
      {...props}
    />
  );
}

export { Input, Textarea, inputVariants, textareaVariants };
