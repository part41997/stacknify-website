"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

import { NavItemLink } from "@/components/navigation/nav-item";
import { AnchorLink } from "@/components/navigation/anchor-link";
import { buttonVariants } from "@/components/ui/button";
import {
  navEntries,
  primaryCta,
  type NavMenuEntry,
} from "@/data/navigation";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { defaultEase } from "@/lib/motion";
import { getHash } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  activeId: string;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

function getFocusable(panel: HTMLElement, trigger: HTMLButtonElement | null) {
  const inPanel = [
    ...panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ];

  return [trigger, ...inPanel].filter((node): node is HTMLElement =>
    Boolean(node),
  );
}

export function MobileMenu({
  open,
  activeId,
  onClose,
  triggerRef,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setExpandedId(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const inertTargets = [
      document.querySelector("[data-skip-link]"),
      document.getElementById("main-content"),
      document.querySelector("footer"),
      document.querySelector("[data-back-to-top]"),
    ];
    inertTargets.forEach((node) => node?.setAttribute("inert", ""));

    const panel = panelRef.current;
    const firstLink = panel?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panel) {
        return;
      }

      const focusable = getFocusable(panel, triggerRef.current);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      inertTargets.forEach((node) => node?.removeAttribute("inert"));
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-40 lg:hidden"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2, ease: defaultEase }}
        >
          <div
            aria-hidden
            className="pointer-events-auto absolute inset-x-0 top-[var(--header-height)] bottom-0 bg-brand-navy/8"
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduceMotion ? undefined : { x: "100%" }}
            transition={{ duration: 0.28, ease: defaultEase }}
            className="pointer-events-auto absolute top-[var(--header-height)] right-0 flex h-[calc(100svh-var(--header-height))] w-full max-w-[22rem] flex-col overflow-y-auto border-l border-border bg-white px-6 pt-6 pb-[max(2rem,env(safe-area-inset-bottom))] shadow-lg"
          >
            <nav aria-label="Mobile" className="flex flex-1 flex-col">
              <ul className="flex flex-col gap-1">
                {navEntries.map((entry) => {
                  if (entry.type === "link") {
                    return (
                      <li key={entry.href + entry.label}>
                        <NavItemLink
                          item={entry}
                          activeId={activeId}
                          appearance="mobile"
                          onNavigate={onClose}
                        />
                      </li>
                    );
                  }

                  return (
                    <MobileAccordion
                      key={entry.id}
                      entry={entry}
                      activeId={activeId}
                      expanded={expandedId === entry.id}
                      reduceMotion={reduceMotion}
                      onToggle={() =>
                        setExpandedId((current) =>
                          current === entry.id ? null : entry.id,
                        )
                      }
                      onClose={onClose}
                    />
                  );
                })}
              </ul>
              <AnchorLink
                href={primaryCta.href}
                onClick={onClose}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-auto w-full bg-brand-teal text-white",
                )}
              >
                {primaryCta.label}
                <ArrowRight data-icon="inline-end" aria-hidden />
              </AnchorLink>
            </nav>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function MobileAccordion({
  entry,
  activeId,
  expanded,
  reduceMotion,
  onToggle,
  onClose,
}: {
  entry: NavMenuEntry;
  activeId: string;
  expanded: boolean;
  reduceMotion: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const panelId = `${entry.id}-mobile-panel`;
  const isActive =
    getHash(entry.href) === activeId ||
    pathname.startsWith(`/${entry.id}/`) ||
    entry.items.some(
      (item) => item.href === pathname || getHash(item.href) === activeId,
    );

  return (
    <li>
      <div className="flex items-center gap-1">
        <div className="min-w-0 flex-1">
          <NavItemLink
            item={{ label: entry.label, href: entry.href }}
            activeId={isActive ? (getHash(entry.href) ?? activeId) : activeId}
            appearance="mobile"
            onNavigate={onClose}
          />
        </div>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          aria-label={`${expanded ? "Hide" : "Show"} ${entry.label} links`}
          onClick={onToggle}
          className={cn(
            "ml-auto flex size-11 shrink-0 items-center justify-center rounded-xl text-navy/50 outline-none transition-colors",
            "hover:bg-surface-hover hover:text-navy focus-visible:ring-2 focus-visible:ring-ring/70",
            expanded && "text-teal",
          )}
        >
          <ChevronDown
            aria-hidden
            className={cn(
              "size-4 transition-transform duration-200",
              expanded && "rotate-180",
            )}
          />
        </button>
      </div>
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.ul
            id={panelId}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: defaultEase }}
            className="overflow-hidden pl-3"
          >
            {entry.items.map((item) => (
              <li key={item.href + item.label}>
                <AnchorLink
                  href={item.href}
                  onClick={onClose}
                  className="flex min-h-11 items-center rounded-xl px-3 py-2 text-sm text-navy/70 outline-none transition-colors hover:bg-mint/40 hover:text-navy focus-visible:ring-2 focus-visible:ring-ring/70"
                >
                  {item.label}
                </AnchorLink>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
