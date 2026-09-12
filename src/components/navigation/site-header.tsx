"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { LayoutGroup } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

import { Container } from "@/components/layout/container";
import { DesktopNav } from "@/components/navigation/nav-dropdown";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { ScrollProgress } from "@/components/navigation/scroll-progress";
import { SiteLogo } from "@/components/navigation/site-logo";
import { AnchorLink } from "@/components/navigation/anchor-link";
import { buttonVariants } from "@/components/ui/button";
import { primaryCta, sectionIds } from "@/data/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useScrolled } from "@/hooks/use-scrolled";
import { media } from "@/lib/design";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(16);
  const activeId = useActiveSection(sectionIds);
  const isDesktop = useMediaQuery(media.lg);
  const menuOpen = open && !isDesktop;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonId = useId();
  const wasOpen = useRef(false);
  const compact = scrolled || menuOpen;

  useEffect(() => {
    if (wasOpen.current && !menuOpen) {
      menuButtonRef.current?.focus();
    }

    wasOpen.current = menuOpen;
  }, [menuOpen]);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 overflow-visible border-b border-border bg-white/80 backdrop-blur-xl",
        "transition-[height,background-color,box-shadow,border-color] duration-300 ease-out",
        compact && "bg-white/92 shadow-sm",
      )}
      style={{
        ["--header-height" as string]: compact ? "3.5rem" : undefined,
      }}
    >
      <Container
        className={cn(
          "relative z-50 flex items-center justify-between gap-3 transition-[height] duration-300 ease-out sm:gap-4",
          compact ? "h-14" : "h-[var(--header-height)]",
        )}
      >
        <SiteLogo
          onNavigate={closeMenu}
          size={compact ? "header-compact" : "header"}
        />

        <nav aria-label="Primary" className="hidden lg:block">
          <LayoutGroup>
            <DesktopNav activeId={activeId} onNavigate={closeMenu} />
          </LayoutGroup>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <AnchorLink
            href={primaryCta.href}
            onClick={closeMenu}
            className={cn(
              buttonVariants({ size: compact ? "sm" : "default" }),
              "hidden bg-brand-teal text-white shadow-xs sm:inline-flex",
            )}
          >
            {primaryCta.label}
            <ArrowRight data-icon="inline-end" aria-hidden />
          </AnchorLink>

          <button
            ref={menuButtonRef}
            id={menuButtonId}
            type="button"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-sm" }),
              "text-brand-navy lg:hidden",
              menuOpen && "bg-surface-hover",
            )}
            aria-haspopup="dialog"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((current) => !current)}
          >
            {menuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </Container>

      <MobileMenu
        open={menuOpen}
        activeId={activeId}
        onClose={closeMenu}
        triggerRef={menuButtonRef}
      />
      <ScrollProgress />
    </header>
  );
}
