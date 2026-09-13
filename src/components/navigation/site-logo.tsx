import { SectionImage } from "@/components/media/section-image";
import { siteConfig } from "@/data/site";
import { getSiteImage } from "@/data/images";
import { isSafeAssetUrl, isSafeHttpUrl } from "@/lib/security/urls";
import { cn } from "@/lib/utils";

import { AnchorLink } from "@/components/navigation/anchor-link";

const placements = {
  header: {
    id: "brand.logo-horizontal" as const,
    frame:
      "relative block h-10 w-[6.3rem] transition-[height,width] duration-300 ease-out sm:h-11 sm:w-[6.93rem]",
    sizes: "111px",
    priority: true,
  },
  "header-compact": {
    id: "brand.logo-horizontal" as const,
    frame:
      "relative block h-8 w-[5.04rem] transition-[height,width] duration-300 ease-out sm:h-9 sm:w-[5.67rem]",
    sizes: "91px",
    priority: true,
  },
  footer: {
    id: "brand.logo-vertical" as const,
    frame: "relative block h-24 w-[5.53rem] sm:h-[6.5rem] sm:w-[5.99rem]",
    sizes: "96px",
    priority: false,
  },
} as const;

type SiteLogoProps = {
  className?: string;
  onNavigate?: () => void;
  size?: keyof typeof placements;
};

export function SiteLogo({
  className,
  onNavigate,
  size = "header",
}: SiteLogoProps) {
  const configured = siteConfig.logo.trim();
  const remote = Boolean(configured) && isSafeHttpUrl(configured);
  const placement = placements[size];
  const logo = getSiteImage(placement.id);
  const localOverride =
    !remote && configured && isSafeAssetUrl(configured) ? configured : null;

  return (
    <AnchorLink
      href="/"
      aria-label={`${siteConfig.name} home`}
      onClick={onNavigate}
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <span className={placement.frame}>
        {remote ? (
          // Remote hosts are not on the Next image allowlist.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={configured}
            alt=""
            width={logo.width}
            height={logo.height}
            decoding="async"
            className="absolute inset-0 size-full max-w-none object-contain object-left"
          />
        ) : localOverride ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={localOverride}
            alt=""
            width={logo.width}
            height={logo.height}
            decoding="async"
            className="absolute inset-0 size-full max-w-none object-contain object-left"
          />
        ) : (
          <SectionImage
            id={placement.id}
            fill
            fallback={false}
            priority={placement.priority}
            sizes={placement.sizes}
            className="absolute inset-0"
            imageClassName="object-contain object-left"
          />
        )}
      </span>
    </AnchorLink>
  );
}
