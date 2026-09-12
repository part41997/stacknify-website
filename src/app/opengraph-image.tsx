import { ImageResponse } from "next/og";

import { siteConfig } from "@/data/site";
import { brandColors } from "@/lib/colors";

export const alt = siteConfig.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: brandColors.snow,
        color: brandColors.navy,
        padding: "72px 80px",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: brandColors.teal,
        }}
      >
        {siteConfig.name}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            fontWeight: 600,
            maxWidth: 920,
          }}
        >
          {siteConfig.positioning}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            lineHeight: 1.4,
            color: brandColors.blueGray,
            maxWidth: 860,
          }}
        >
          {siteConfig.seo.description}
        </div>
      </div>
    </div>,
    size,
  );
}
