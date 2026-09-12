import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Poppins } from "next/font/google";

import { SiteLayout } from "@/components/layout/site-layout";
import { JsonLd } from "@/components/seo";
import { siteConfig } from "@/data/site";
import { brandColors } from "@/lib/colors";
import { siteGraphJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const heading = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = createMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: brandColors.white,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.locale}
      className={cn(
        "font-sans antialiased",
        sans.variable,
        heading.variable,
        mono.variable,
      )}
    >
      <body>
        <JsonLd data={siteGraphJsonLd()} />
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
