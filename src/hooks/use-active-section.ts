"use client";

import { useEffect, useState } from "react";

export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "home");

  useEffect(() => {
    if (ids.length === 0) {
      return;
    }

    const update = () => {
      if (window.scrollY < 48) {
        setActiveId(ids[0] ?? "home");
        return;
      }

      const offset =
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--header-height",
          ),
        ) * 16 || 72;
      const line = window.scrollY + offset + 24;
      let current = ids[0] ?? "home";

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) {
          continue;
        }

        if (element.offsetTop <= line) {
          current = id;
        }
      }

      setActiveId(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", update);
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", update);
      window.removeEventListener("resize", update);
    };
  }, [ids]);

  return activeId;
}
