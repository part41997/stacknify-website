import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/site";
import { brandColors } from "@/lib/colors";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.seo.title,
    short_name: siteConfig.name,
    description: siteConfig.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: brandColors.snow,
    theme_color: brandColors.snow,
    lang: siteConfig.locale,
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
