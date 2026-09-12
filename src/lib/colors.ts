/**
 * Stacknify palette sampled from the official logo.
 * CSS variables in `src/styles/tokens.css` are the source of truth for the UI.
 * Use these hex values only where CSS variables cannot be read (OG images,
 * favicons, email HTML, and browser chrome).
 */
export const brandColors = {
  navy: "#0F172A",
  slate: "#1E293B",
  teal: "#0C7A70",
  turquoise: "#277F86",
  cyan: "#3FE9CF",
  mint: "#D8F6F0",
  white: "#FFFFFF",
  mist: "#F7F9FA",
  snow: "#F8FAFC",
  blueGray: "#475569",
  gray: "#64748B",
  border: "#E2E8F0",
  navyDeep: "#0F172A",
  tealSecondary: "#277F86",
} as const;

export type BrandColor = (typeof brandColors)[keyof typeof brandColors];
