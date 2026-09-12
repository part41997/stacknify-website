"use client";

import { motion } from "framer-motion";

import { AnchorLink } from "@/components/navigation/anchor-link";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { defaultEase } from "@/lib/motion";
import { getHash } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

type NavItemLinkProps = {
  item: NavItem;
  activeId: string;
  onNavigate?: () => void;
  appearance?: "desktop" | "mobile";
};

export function NavItemLink({
  item,
  activeId,
  onNavigate,
  appearance = "desktop",
}: NavItemLinkProps) {
  const sectionId = getHash(item.href) ?? "";
  const isActive = sectionId === activeId;
  const reduceMotion = usePrefersReducedMotion();

  return (
    <AnchorLink
      href={item.href}
      onClick={onNavigate}
      aria-current={isActive ? "location" : undefined}
      className={cn(
        "relative text-brand-navy/80 outline-none transition-colors duration-200 hover:text-brand-teal",
        "focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary",
        appearance === "desktop" &&
          "rounded-md px-2.5 py-2 text-small tracking-[-0.01em] whitespace-nowrap xl:px-3",
        appearance === "mobile" &&
          "flex min-h-12 items-center rounded-xl px-3 py-3 font-heading text-h3",
        isActive && "text-brand-navy",
      )}
    >
      {item.label}
      {appearance === "desktop" && isActive ? (
        <motion.span
          layoutId={reduceMotion ? undefined : "nav-active-indicator"}
          aria-hidden
          className="pointer-events-none absolute inset-x-3 -bottom-0.5 mx-auto h-0.5 w-4 rounded-sm bg-brand-teal"
          transition={{ duration: reduceMotion ? 0 : 0.22, ease: defaultEase }}
        />
      ) : null}
      {appearance === "mobile" && isActive ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-3 left-0 w-0.5 rounded-sm bg-brand-teal"
        />
      ) : null}
    </AnchorLink>
  );
}
