"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type CSSProperties, type ReactNode } from "react";

import { useMotionProfile } from "@/hooks/use-motion-profile";
import {
  defaultEase,
  imageMask,
  imageMotion,
  imageReveal,
  imageRevealViewport,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

type ImageFrameProps = {
  children: ReactNode;
  className?: string;
  /** CSS aspect-ratio. Required when the frame is not `fill`. */
  aspect?: string;
  /** Occupy a parent that already has a size / aspect. */
  fill?: boolean;
  reveal?: boolean;
  /** Clip-path wipe for large story plates. */
  mask?: boolean;
  hoverZoom?: boolean;
  /** Scroll parallax. Desktop + hover-capable only. */
  parallax?: boolean;
  delay?: number;
};

export function ImageFrame({
  children,
  className,
  aspect,
  fill = false,
  reveal = true,
  mask = false,
  hoverZoom = false,
  parallax = false,
  delay = 0,
}: ImageFrameProps) {
  const { reduceMotion, isDesktop } = useMotionProfile();
  const variants = mask && isDesktop ? imageMask : imageReveal;

  return (
    <div
      data-slot="image-frame"
      className={cn(
        "relative overflow-hidden",
        fill ? "size-full" : "w-full",
        hoverZoom && "image-hover",
        className,
      )}
      style={
        !fill && aspect
          ? ({ aspectRatio: aspect } satisfies CSSProperties)
          : undefined
      }
    >
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion || !reveal ? false : "hidden"}
        whileInView={reduceMotion || !reveal ? undefined : "visible"}
        viewport={imageRevealViewport}
        variants={reduceMotion ? undefined : variants}
        transition={{
          duration: reduceMotion ? 0 : mask ? imageMotion.mask : imageMotion.duration,
          delay: reduceMotion ? 0 : delay,
          ease: defaultEase,
        }}
      >
        {parallax && !reduceMotion ? (
          <ImageParallaxLayer hoverZoom={hoverZoom}>{children}</ImageParallaxLayer>
        ) : (
          <div
            className="absolute inset-0"
            {...(hoverZoom ? { "data-image-hover-scale": "" } : {})}
          >
            {children}
          </div>
        )}
      </motion.div>
    </div>
  );
}

function ImageParallaxLayer({
  children,
  hoverZoom,
}: {
  children: ReactNode;
  hoverZoom: boolean;
}) {
  const { allowParallax } = useMotionProfile();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    allowParallax
      ? [`-${imageMotion.parallax}%`, `${imageMotion.parallax}%`]
      : ["0%", "0%"],
  );

  return (
    <motion.div ref={ref} className="absolute inset-[-8%]" style={{ y }}>
      <div
        className="absolute inset-0"
        {...(hoverZoom ? { "data-image-hover-scale": "" } : {})}
      >
        {children}
      </div>
    </motion.div>
  );
}
