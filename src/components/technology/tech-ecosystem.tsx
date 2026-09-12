"use client";

import { AnimatePresence, LayoutGroup, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { clusterIcons, getTechIcon } from "@/components/technology/icons";
import {
  getClusterById,
  getClusterTechnologies,
  technologiesContent,
  technologyLayerOrder,
} from "@/data/technologies";
import { useMotionProfile } from "@/hooks/use-motion-profile";
import { defaultEase, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Technology, TechnologyClusterId } from "@/types";

const CYCLE_MS = 4200;

export function TechEcosystem() {
  const { canHover, reduceMotion, allowAmbient } = useMotionProfile();
  const [activeCluster, setActiveCluster] =
    useState<TechnologyClusterId>("frontend");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(boardRef, { amount: 0.28, once: false });
  const live = allowAmbient && inView && !paused;

  const cluster = getClusterById(activeCluster);
  const layerTools = getClusterTechnologies(activeCluster);
  const activeTech =
    layerTools.find((tech) => tech.slug === activeSlug) ?? layerTools[0];
  const ClusterIcon = cluster ? clusterIcons[cluster.id] : null;

  useEffect(() => {
    if (!live) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveCluster((current) => {
        const index = technologyLayerOrder.indexOf(current);
        return technologyLayerOrder[(index + 1) % technologyLayerOrder.length];
      });
      setActiveSlug(null);
    }, CYCLE_MS);

    return () => window.clearInterval(timer);
  }, [live]);

  function selectCluster(id: TechnologyClusterId) {
    setPaused(true);
    setActiveCluster(id);
    setActiveSlug(null);
  }

  function selectTech(tech: Technology) {
    setPaused(true);
    setActiveCluster(tech.cluster);
    setActiveSlug(tech.slug);
  }

  return (
    <div
      ref={boardRef}
      data-slot="tech-ecosystem"
      data-inview={inView ? "true" : undefined}
      className="flex flex-col gap-5"
      onMouseEnter={canHover ? () => setPaused(true) : undefined}
      onMouseLeave={canHover ? () => setPaused(false) : undefined}
    >
      <div
        role="tablist"
        aria-label={technologiesContent.mapLabel}
        className="-mx-gutter flex gap-1.5 overflow-x-auto px-gutter pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {technologyLayerOrder.map((id) => {
          const item = getClusterById(id);
          if (!item) {
            return null;
          }

          const selected = item.id === activeCluster;
          const Icon = clusterIcons[item.id];

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => selectCluster(item.id)}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-3.5 text-sm transition-colors duration-200 outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2",
                selected
                  ? "border-teal/40 bg-mint/50 text-navy"
                  : "border-navy/10 bg-white text-text-muted hover:border-navy/25 hover:text-navy",
              )}
            >
              <Icon className="size-3.5" strokeWidth={1.8} aria-hidden />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-6">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-navy/8 bg-white lg:rounded-[2rem]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_0%,color-mix(in_srgb,var(--brand-mint)_28%,transparent),transparent_42%),radial-gradient(ellipse_at_100%_100%,color-mix(in_srgb,var(--brand-navy)_5%,transparent),transparent_48%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 site-grid opacity-[0.16]"
          />
          {live ? <span aria-hidden className="tech-stack-scan" /> : null}

          <div className="relative flex items-center justify-between px-5 pt-5 pb-3 sm:px-6">
            <p className="font-heading text-[0.6875rem] tracking-[0.18em] text-navy/45 uppercase">
              {technologiesContent.core}
            </p>
            <p className="font-mono text-[0.625rem] tracking-[0.16em] text-teal">
              {technologiesContent.layersLabel}
            </p>
          </div>

          <LayoutGroup>
            <ul className="relative flex max-h-[min(42rem,70vh)] flex-col gap-0.5 overflow-y-auto px-3 pb-4 sm:px-4">
              {technologyLayerOrder.map((id, index) => {
                const item = getClusterById(id);
                if (!item) {
                  return null;
                }

                const tools = getClusterTechnologies(id);
                const selected = id === activeCluster;
                const Icon = clusterIcons[id];

                return (
                  <li key={id}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => selectCluster(id)}
                      className="relative flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/70"
                    >
                      {selected ? (
                        <motion.span
                          layoutId={reduceMotion ? undefined : "tech-layer-active"}
                          aria-hidden
                          className="absolute inset-0 rounded-2xl border border-teal/30 bg-mint/55 shadow-[0_12px_28px_-20px_rgba(15,23,42,0.35)]"
                          transition={{ duration: 0.32, ease: defaultEase }}
                        />
                      ) : null}
                      <span
                        className={cn(
                          "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-xl transition-colors",
                          selected ? "bg-white text-teal" : "bg-mist text-navy/40",
                        )}
                      >
                        <Icon className="size-4" strokeWidth={1.7} aria-hidden />
                      </span>
                      <span className="relative z-10 min-w-0 flex-1">
                        <span
                          className={cn(
                            "block font-heading text-sm tracking-[-0.02em]",
                            selected ? "text-navy" : "text-navy/55",
                          )}
                        >
                          {item.label}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 block truncate text-[0.6875rem] tracking-[-0.01em]",
                            selected ? "text-navy/55" : "text-navy/30",
                          )}
                        >
                          {tools.map((tech) => tech.name).join(" · ")}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "relative z-10 font-mono text-[0.625rem] tracking-[0.14em]",
                          selected ? "text-teal" : "text-navy/25",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </LayoutGroup>
        </div>

        <div className="flex flex-col rounded-[1.75rem] border border-navy/8 bg-mist/60 p-5 sm:p-6 lg:rounded-[2rem]">
          <div className="flex items-start gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white text-teal shadow-xs ring-1 ring-navy/8">
              {ClusterIcon ? (
                <ClusterIcon className="size-5" strokeWidth={1.7} aria-hidden />
              ) : null}
            </span>
            <div>
              <p className="text-overline text-navy/45 uppercase">
                {technologiesContent.layerLabel}
              </p>
              <h3 className="mt-1 font-heading text-title text-navy">
                {cluster?.label}
              </h3>
            </div>
          </div>
          <p className="mt-3 max-w-lg text-body text-text-secondary">
            {cluster?.description}
          </p>

          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={activeCluster}
              aria-label={cluster?.label}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: defaultEase }}
              className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3"
            >
              {layerTools.map((tech, index) => {
                const selected = activeTech?.slug === tech.slug;
                const Icon = getTechIcon(tech.slug);

                return (
                  <motion.li
                    key={tech.slug}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.28,
                      ease: defaultEase,
                      delay: reduceMotion ? 0 : index * duration.stagger,
                    }}
                  >
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => selectTech(tech)}
                      className={cn(
                        "flex h-full w-full flex-col items-center gap-2.5 rounded-2xl border px-3 py-4 text-center outline-none transition-[border-color,background-color,box-shadow,transform] duration-200",
                        "focus-visible:ring-2 focus-visible:ring-ring/70",
                        selected
                          ? "border-teal/40 bg-white shadow-[0_16px_36px_-28px_rgba(15,23,42,0.4)]"
                          : "border-navy/8 bg-white/80 hover:border-navy/16 hover:bg-white",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-12 items-center justify-center rounded-2xl transition-colors",
                          selected
                            ? "bg-mint text-teal"
                            : "bg-mist text-navy/55",
                        )}
                      >
                        <Icon className="size-5" strokeWidth={1.7} aria-hidden />
                      </span>
                      <span className="font-heading text-sm tracking-[-0.02em] text-navy">
                        {tech.name}
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </AnimatePresence>

          <div
            id="tech-detail"
            aria-live="polite"
            className="mt-auto border-t border-navy/8 pt-4"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTech?.slug ?? "idle"}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.24, ease: defaultEase }}
              >
                <p className="font-heading text-sm text-navy">
                  {activeTech?.name ?? technologiesContent.idleTitle}
                </p>
                <p className="mt-1 text-caption text-text-secondary">
                  {activeTech?.description ?? technologiesContent.idleDescription}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
