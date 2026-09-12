/**
 * Animation hierarchy — do not flatten these into one duration.
 *
 * 1. Micro (CSS): buttons, links, icons, cards — 150–300ms
 * 2. Section (Framer): reveal, fade, slide, scale, stagger
 * 3. Story (GSAP ScrollTrigger): workflow, problem→solution, process, cases
 * 4. Ambient (CSS): lines, particles, washes — extremely subtle, pause off-screen
 */

export const defaultEase = [0.22, 1, 0.36, 1] as const;

export const duration = {
  /** Level 1 — hover / focus / icon */
  micro: 0.2,
  microFast: 0.16,
  microSlow: 0.28,
  /** Level 2 — section enter */
  fade: 0.48,
  base: 0.4,
  slow: 0.5,
  reveal: 0.62,
  enter: 0.72,
  stagger: 0.07,
} as const;

export const viewportOnce = {
  once: true,
  margin: "0px 0px -8% 0px",
  amount: 0.12,
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: duration.stagger,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: defaultEase },
  },
};

export const staggerItemFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.microSlow, ease: defaultEase },
  },
};

export const cardHover = {
  rest: { y: 0 },
  hover: { y: -6 },
};

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

/**
 * Image motion language — transform and opacity only.
 * Never animate width, height, or aspect-ratio. Frames stay clipped.
 */
export const imageMotion = {
  revealY: 12,
  revealScale: 0.97,
  settleScale: 1.03,
  hoverScale: 1.04,
  hoverScaleCompact: 1.02,
  parallax: 3.5,
  duration: duration.reveal,
  hover: 0.4,
  mask: 0.82,
  crossfade: duration.slow,
} as const;

/** Shared image hover / tap language. Transform and opacity only. */
export const imageHover = {
  scale: 1.04,
  titleY: -4,
  arrowX: 4,
  duration: 0.4,
  ease: defaultEase,
} as const;

export const imageRevealViewport = {
  once: true,
  margin: "-56px 0px",
  amount: 0.24,
} as const;

export const imageReveal = {
  hidden: {
    opacity: 0,
    y: imageMotion.revealY,
    scale: imageMotion.revealScale,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
} as const;

export const imageMask = {
  hidden: {
    opacity: 0,
    scale: imageMotion.settleScale,
    clipPath: "inset(8% 6% 8% 6%)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0%)",
  },
} as const;
