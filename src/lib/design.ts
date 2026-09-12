export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const media = {
  sm: "(min-width: 40rem)",
  md: "(min-width: 48rem)",
  lg: "(min-width: 64rem)",
  xl: "(min-width: 80rem)",
  "2xl": "(min-width: 96rem)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
  hoverFine: "(hover: hover) and (pointer: fine)",
} as const;

export const containerWidths = {
  narrow: "max-w-container-narrow",
  default: "max-w-container",
  wide: "max-w-container-wide",
  prose: "max-w-container-prose",
  full: "max-w-none",
} as const;

export type ContainerWidth = keyof typeof containerWidths;

/** Semantic color tokens. Values live in `src/styles/tokens.css`. */
export const colorTokens = {
  backgroundPrimary: "bg-background-primary",
  backgroundSecondary: "bg-background-secondary",
  backgroundSoft: "bg-background-soft",
  surface: "bg-surface",
  surfaceHover: "bg-surface-hover",
  textPrimary: "text-text-primary",
  textSecondary: "text-text-secondary",
  textMuted: "text-text-muted",
  brandNavy: "text-brand-navy",
  brandSlate: "text-brand-slate",
  brandTeal: "text-brand-teal",
  brandTurquoise: "text-brand-turquoise",
  brandCyan: "text-brand-cyan",
  brandMint: "text-brand-mint",
  border: "border-border",
  borderBrand: "border-border-brand",
} as const;

export const typeTokens = {
  display: "font-heading text-display text-text-primary",
  h1: "font-heading text-h1 text-text-primary",
  h2: "font-heading text-h2 text-text-primary",
  h3: "font-heading text-h3 text-text-primary",
  bodyLarge: "text-body-lg text-text-secondary",
  body: "text-body text-text-secondary",
  small: "text-small text-text-secondary",
  caption: "text-caption text-text-muted",
} as const;

export const radiusTokens = {
  control: "rounded-xl",
  card: "rounded-2xl",
  stage: "rounded-3xl",
} as const;
