import { SimplePage } from "@/components/layout/simple-page";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: siteConfig.privacy.title,
  description: siteConfig.privacy.description,
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <SimplePage
      title={siteConfig.privacy.title}
      description={siteConfig.privacy.description}
    />
  );
}
