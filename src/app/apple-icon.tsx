import { ImageResponse } from "next/og";

import { brandColors } from "@/lib/colors";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: brandColors.navy,
        color: brandColors.cyan,
        fontSize: 108,
        fontWeight: 700,
        letterSpacing: "-0.08em",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      S
    </div>,
    size,
  );
}
