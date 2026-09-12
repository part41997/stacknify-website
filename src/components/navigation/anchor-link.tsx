import Link from "next/link";
import type { ComponentProps } from "react";

type AnchorLinkProps = ComponentProps<typeof Link>;

export function AnchorLink({
  href,
  prefetch,
  scroll,
  ...props
}: AnchorLinkProps) {
  const hrefString = typeof href === "string" ? href : (href.pathname ?? "/");
  const isHash = hrefString.includes("#");

  return (
    <Link
      href={href}
      scroll={scroll ?? !isHash}
      prefetch={isHash ? false : prefetch}
      {...props}
    />
  );
}
