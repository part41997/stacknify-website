"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { defaultEase, duration, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type FadeVariant = "up" | "fade" | "scale";

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  variant?: FadeVariant;
};

const hidden = {
  up: { opacity: 0, y: 14 },
  fade: { opacity: 0 },
  scale: { opacity: 0, scale: 0.98 },
} as const;

const visible = {
  up: { opacity: 1, y: 0 },
  fade: { opacity: 1 },
  scale: { opacity: 1, scale: 1 },
} as const;

export function FadeIn({
  className,
  delay = 0,
  variant = "up",
  children,
  ...props
}: FadeInProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : hidden[variant]}
      whileInView={visible[variant]}
      viewport={viewportOnce}
      transition={{
        duration: reduceMotion ? 0 : duration.slow,
        delay: reduceMotion ? 0 : delay,
        ease: defaultEase,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "ul" | "ol";
  "aria-label"?: string;
};

export function Stagger({
  children,
  className,
  delay = 0,
  as = "div",
  "aria-label": ariaLabel,
}: StaggerProps) {
  const reduceMotion = usePrefersReducedMotion();
  const Tag = as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div;

  return (
    <Tag
      className={className}
      aria-label={ariaLabel}
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduceMotion ? 0 : duration.stagger,
            delayChildren: reduceMotion ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </Tag>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
};

export function StaggerItem({
  children,
  className,
  as = "div",
}: StaggerItemProps) {
  const Tag = as === "li" ? motion.li : motion.div;

  return (
    <Tag
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: duration.slow, ease: defaultEase },
        },
      }}
    >
      {children}
    </Tag>
  );
}
