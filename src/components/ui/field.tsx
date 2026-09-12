import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
};

export function Field({
  id,
  label,
  error,
  optional = false,
  className,
  children,
}: FieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-overline text-text-muted uppercase">
        {label}
        {optional ? (
          <span className="tracking-normal text-text-muted/75 normal-case">
            {" "}
            (optional)
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={errorId} role="alert" className="text-caption text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function fieldA11y(id: string, error?: string) {
  return {
    id,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
    "aria-required": true as const,
  };
}
