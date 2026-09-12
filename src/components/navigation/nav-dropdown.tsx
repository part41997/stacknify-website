"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { serviceIcons } from "@/components/services/icons";
import { AnchorLink } from "@/components/navigation/anchor-link";
import { NavItemLink } from "@/components/navigation/nav-item";
import {
  navEntries,
  type NavLeaf,
  type NavMenuEntry,
} from "@/data/navigation";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { defaultEase } from "@/lib/motion";
import { getHash } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type DesktopNavProps = {
  activeId: string;
  onNavigate?: () => void;
};

export function DesktopNav({ activeId, onNavigate }: DesktopNavProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const closeTimer = useRef<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    return () => window.clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    if (!openId) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenId(null);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openId]);

  function open(id: string) {
    window.clearTimeout(closeTimer.current);
    setOpenId(id);
  }

  function scheduleClose() {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenId(null), 140);
  }

  function closeNow() {
    window.clearTimeout(closeTimer.current);
    setOpenId(null);
  }

  function handleNavigate() {
    closeNow();
    onNavigate?.();
  }

  return (
    <ul className="flex items-center">
      {navEntries.map((entry) => {
        if (entry.type === "link") {
          return (
            <li key={entry.href + entry.label}>
              <NavItemLink
                item={entry}
                activeId={activeId}
                onNavigate={handleNavigate}
              />
            </li>
          );
        }

        return (
          <NavDropdown
            key={entry.id}
            entry={entry}
            open={openId === entry.id}
            activeId={activeId}
            pathname={pathname}
            onOpen={() => open(entry.id)}
            onScheduleClose={scheduleClose}
            onClose={closeNow}
            onNavigate={handleNavigate}
          />
        );
      })}
    </ul>
  );
}

type NavDropdownProps = {
  entry: NavMenuEntry;
  open: boolean;
  activeId: string;
  pathname: string;
  onOpen: () => void;
  onScheduleClose: () => void;
  onClose: () => void;
  onNavigate: () => void;
};

function NavDropdown({
  entry,
  open,
  activeId,
  pathname,
  onOpen,
  onScheduleClose,
  onClose,
  onNavigate,
}: NavDropdownProps) {
  const reduceMotion = usePrefersReducedMotion();
  const panelId = useId();
  const isActive = isEntryActive(entry, activeId, pathname);
  const mega = entry.layout === "mega";

  return (
    <li
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onScheduleClose}
      onFocusCapture={onOpen}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          onClose();
        }
      }}
    >
      <AnchorLink
        href={entry.href}
        onClick={onNavigate}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={panelId}
        aria-current={isActive ? "location" : undefined}
        className={cn(
          "relative inline-flex items-center gap-1 rounded-md px-2.5 py-2 text-small tracking-[-0.01em] whitespace-nowrap text-brand-navy/80 outline-none transition-colors duration-200 xl:px-3",
          "hover:text-brand-teal focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary",
          (isActive || open) && "text-brand-navy",
        )}
      >
        {entry.label}
        <ChevronDown
          aria-hidden
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180 text-brand-teal",
          )}
        />
        {isActive && !open ? (
          <motion.span
            layoutId={reduceMotion ? undefined : "nav-active-indicator"}
            aria-hidden
            className="pointer-events-none absolute inset-x-3 -bottom-0.5 mx-auto h-0.5 w-4 rounded-sm bg-brand-teal"
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: defaultEase }}
          />
        ) : null}
      </AnchorLink>

      <AnimatePresence>
        {open ? (
          <div
            className={cn(
              "absolute top-full z-50 pt-3",
              mega
                ? "left-1/2 w-[min(42rem,calc(100vw-2rem))] -translate-x-1/2"
                : entry.id === "about"
                  ? "right-0 w-[min(20.5rem,calc(100vw-2rem))]"
                  : "left-0 w-[min(24rem,calc(100vw-2rem))]",
            )}
          >
            <motion.div
              id={panelId}
              role="menu"
              aria-label={entry.label}
              initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: defaultEase }}
              className="origin-top overflow-hidden rounded-[1.35rem] border border-navy/8 bg-white/96 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.35)] backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-navy/6 px-4 py-3">
                <div>
                  <p className="font-heading text-sm text-navy">{entry.label}</p>
                  <p className="mt-0.5 text-caption text-navy/50">
                    {entry.description}
                  </p>
                </div>
                <AnchorLink
                  href={entry.href}
                  role="menuitem"
                  onClick={onNavigate}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-caption text-teal outline-none transition-colors hover:bg-mint/60 focus-visible:ring-2 focus-visible:ring-ring/70"
                >
                  {entry.overviewLabel}
                  <ArrowRight className="size-3" aria-hidden />
                </AnchorLink>
              </div>

              {mega ? (
                <MegaItems
                  items={entry.items}
                  onNavigate={onNavigate}
                  reduceMotion={reduceMotion}
                  pathname={pathname}
                />
              ) : (
                <ListItems
                  items={entry.items}
                  onNavigate={onNavigate}
                  reduceMotion={reduceMotion}
                  compact={entry.id === "industries"}
                />
              )}
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

function MegaItems({
  items,
  onNavigate,
  reduceMotion,
  pathname,
}: {
  items: readonly NavLeaf[];
  onNavigate: () => void;
  reduceMotion: boolean;
  pathname: string;
}) {
  return (
    <ul className="grid grid-cols-2 gap-1 p-2">
      {items.map((item, index) => {
        const Icon = item.icon ? serviceIcons[item.icon] : null;
        const current = pathname === item.href;

        return (
          <motion.li
            key={item.href + item.label}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.28,
              ease: defaultEase,
              delay: reduceMotion ? 0 : index * 0.035,
            }}
          >
            <AnchorLink
              href={item.href}
              role="menuitem"
              aria-current={current ? "page" : undefined}
              onClick={onNavigate}
              className={cn(
                "group/item flex gap-3 rounded-xl p-3 outline-none transition-colors hover:bg-mint/45 focus-visible:bg-mint/45 focus-visible:ring-2 focus-visible:ring-ring/70",
                current && "bg-mint/45",
              )}
            >
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-mint/70 text-teal transition-colors group-hover/item:bg-white group-hover/item:text-navy">
                {Icon ? <Icon className="size-4" strokeWidth={1.7} aria-hidden /> : null}
              </span>
              <span className="min-w-0">
                <span className="block font-heading text-sm tracking-[-0.02em] text-navy">
                  {item.number ? (
                    <span className="mr-1.5 font-mono text-[0.625rem] tracking-[0.16em] text-teal">
                      {item.number}
                    </span>
                  ) : null}
                  {item.label}
                </span>
                {item.summary ? (
                  <span className="mt-1 line-clamp-2 block text-caption text-navy/50">
                    {item.summary}
                  </span>
                ) : null}
              </span>
            </AnchorLink>
          </motion.li>
        );
      })}
    </ul>
  );
}

function ListItems({
  items,
  onNavigate,
  reduceMotion,
  compact,
}: {
  items: readonly NavLeaf[];
  onNavigate: () => void;
  reduceMotion: boolean;
  compact?: boolean;
}) {
  return (
    <ul className={cn("grid gap-0.5 p-2", compact && "sm:grid-cols-2")}>
      {items.map((item, index) => (
        <motion.li
          key={item.href + item.label}
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.24,
            ease: defaultEase,
            delay: reduceMotion ? 0 : index * 0.025,
          }}
        >
          <AnchorLink
            href={item.href}
            role="menuitem"
            onClick={onNavigate}
            className="block rounded-xl px-3 py-2.5 outline-none transition-colors hover:bg-mint/45 focus-visible:bg-mint/45 focus-visible:ring-2 focus-visible:ring-ring/70"
          >
            <span className="block text-sm text-navy">{item.label}</span>
            {item.summary && !compact ? (
              <span className="mt-0.5 line-clamp-2 block text-caption text-navy/50">
                {item.summary}
              </span>
            ) : null}
          </AnchorLink>
        </motion.li>
      ))}
    </ul>
  );
}

function isEntryActive(entry: NavMenuEntry, activeId: string, pathname: string) {
  if (getHash(entry.href) === activeId) {
    return true;
  }

  if (
    entry.id === "industries" &&
    (pathname === "/industries" || pathname.startsWith("/industries/"))
  ) {
    return true;
  }

  if (entry.id === "services" && pathname.startsWith("/services/")) {
    return true;
  }

  return entry.items.some(
    (item) => item.href === pathname || getHash(item.href) === activeId,
  );
}
