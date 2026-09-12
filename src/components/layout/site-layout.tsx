import type { ReactNode } from "react";

import { Analytics } from "@/components/analytics";
import { BackToTop } from "@/components/layout/back-to-top";
import { SiteBackground } from "@/components/layout/site-background";
import { SiteFooter } from "@/components/layout/site-footer";
import { SkipLink } from "@/components/layout/skip-link";
import { HashScroll } from "@/components/navigation/hash-scroll";
import { SiteHeader } from "@/components/navigation/site-header";
import { isAnalyticsConfigured } from "@/lib/analytics/config";

type SiteLayoutProps = {
  children: ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="relative isolate flex min-h-svh flex-col">
      <SiteBackground />
      <SkipLink />
      <HashScroll />
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 flex flex-1 flex-col overflow-x-clip outline-none"
      >
        {children}
      </main>
      <SiteFooter />
      <BackToTop />
      {isAnalyticsConfigured() ? <Analytics /> : null}
    </div>
  );
}
