import { ArrowRight } from "lucide-react";

import { AnchorLink } from "@/components/navigation/anchor-link";
import { buttonVariants } from "@/components/ui/button";
import { mainNavigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  title: siteConfig.notFound.title,
  description: siteConfig.notFound.description,
  noIndex: true,
  canonical: false,
});

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-gutter">
      <div className="max-w-md text-center">
        <h1 className="font-heading text-headline text-navy">
          {siteConfig.notFound.title}
        </h1>
        <p className="mt-3 text-body text-blue-gray">
          {siteConfig.notFound.description}
        </p>
        <AnchorLink
          href={mainNavigation[0]?.href ?? "/"}
          className={cn(buttonVariants({ size: "lg" }), "mt-8")}
        >
          {mainNavigation[0]?.label ?? siteConfig.name}
          <ArrowRight data-icon="inline-end" aria-hidden />
        </AnchorLink>
      </div>
    </div>
  );
}
