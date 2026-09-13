import { Contact } from "@/components/sections/contact";
import { JsonLd } from "@/components/seo";
import { contactContent } from "@/data/contact";
import { routes } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: `${contactContent.headingPrefix} ${contactContent.headingAccent}`,
  description: contactContent.description,
  path: routes.contact,
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: siteConfig.name, path: routes.home },
          { name: "Contact", path: routes.contact },
        ])}
      />
      <Contact headingAs="h1" />
    </>
  );
}
