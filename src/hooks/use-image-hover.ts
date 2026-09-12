"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { media } from "@/lib/design";

export type ImageHoverMode = "link" | "toggle";

export function useImageHover(mode: ImageHoverMode = "link") {
  const canHover = useMediaQuery(media.hoverFine);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canHover) {
      setActive(false);
    }
  }, [canHover]);

  useEffect(() => {
    if (canHover || !active) {
      return;
    }

    function onPointerDown(event: PointerEvent) {
      if (ref.current?.contains(event.target as Node)) {
        return;
      }

      setActive(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [active, canHover]);

  function onClickCapture(event: MouseEvent<HTMLDivElement>) {
    if (canHover || event.detail === 0) {
      return;
    }

    const target = event.target as Element | null;
    const nestedControl = target?.closest("a, button");

    if (mode === "toggle") {
      if (nestedControl && nestedControl !== event.currentTarget) {
        return;
      }

      setActive((current) => !current);
      return;
    }

    if (active) {
      return;
    }

    event.preventDefault();
    setActive(true);
  }

  return {
    ref,
    active,
    rootProps: {
      ref,
      "data-image-hover": "",
      "data-active": active ? "true" : undefined,
      onClickCapture,
    },
  };
}
