"use client";

import { useSpring } from "framer-motion";
import type { PointerEvent } from "react";

export function usePointerParallax(enabled: boolean, strength = 14) {
  const x = useSpring(0, { stiffness: 50, damping: 22, mass: 0.6 });
  const y = useSpring(0, { stiffness: 50, damping: 22, mass: 0.6 });

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!enabled) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(px * strength);
    y.set(py * strength);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { x, y, onPointerMove, onPointerLeave };
}
