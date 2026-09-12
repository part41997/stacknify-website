import { Container } from "@/components/layout/container";
import { SocialLinks } from "@/components/layout/social-links";
import { AnchorLink } from "@/components/navigation/anchor-link";
import { SiteLogo } from "@/components/navigation/site-logo";
import { footerColumns, footerContent } from "@/data/footer";
import type { NavItem } from "@/types";

const footerLinkClassName =
  "inline-flex min-h-11 min-w-11 items-center text-sm text-muted-foreground transition-colors duration-200 hover:text-navy focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none";

function FooterNavLink({ item }: { item: NavItem }) {
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer noopener"
        className={footerLinkClassName}
      >
        {item.label}
      </a>
    );
  }

  return (
    <AnchorLink href={item.href} className={footerLinkClassName}>
      {item.label}
    </AnchorLink>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-navy/8 bg-mist">
      <Container className="flex flex-col gap-12 py-14 sm:py-16 lg:gap-16 lg:py-20">
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,0.75fr))] lg:gap-16">
          <div className="max-w-md">
            <SiteLogo size="footer" />
            <p className="mt-5 text-body text-blue-gray">
              {footerContent.description}
            </p>
            <SocialLinks className="mt-7" />
          </div>

          <div className="grid grid-cols-1 gap-10 min-[24rem]:grid-cols-2 sm:grid-cols-3 lg:contents">
            {footerColumns.map((column) => (
              <nav
                key={column.title}
                aria-labelledby={`footer-${column.title}`}
              >
                <p
                  id={`footer-${column.title}`}
                  className="text-overline text-navy/45 uppercase"
                >
                  {column.title}
                </p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {column.links.map((item) => (
                    <li key={item.href + item.label}>
                      <FooterNavLink item={item} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </Container>
      <div className="bg-navy">
        <Container className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-white/50">
            {footerContent.copyright}
          </p>
          <SocialLinks tone="navy" />
        </Container>
      </div>
    </footer>
  );
}
