import { SimplePage } from "@/components/layout/simple-page";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: siteConfig.terms.title,
  description: siteConfig.terms.description,
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <SimplePage
      title={siteConfig.terms.title}
      description={siteConfig.terms.description}
    />
  );
}
