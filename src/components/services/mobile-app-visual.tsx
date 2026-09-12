"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";

import { useMotionProfile } from "@/hooks/use-motion-profile";
import { usePointerParallax } from "@/hooks/use-pointer-parallax";
import { cn } from "@/lib/utils";

type MobileAppVisualProps = {
  className?: string;
};

export function MobileAppVisual({ className }: MobileAppVisualProps) {
  const { reduceMotion, canHover } = useMotionProfile();
  const parallax = usePointerParallax(canHover && !reduceMotion, 6);
  const leftX = useTransform(parallax.x, (value) => value * -0.28);
  const leftY = useTransform(parallax.y, (value) => value * 0.22);
  const centerX = useTransform(parallax.x, (value) => value * 0.42);
  const centerY = useTransform(parallax.y, (value) => value * 0.38);
  const rightX = useTransform(parallax.x, (value) => value * 0.3);
  const rightY = useTransform(parallax.y, (value) => value * 0.2);

  return (
    <div
      className={cn("mobile-stage absolute inset-0 bg-[#F4F7F8]", className)}
      onPointerMove={parallax.onPointerMove}
      onPointerLeave={parallax.onPointerLeave}
      aria-hidden
    >
      <div className="absolute inset-[8%] rounded-[2rem] bg-[radial-gradient(circle_at_50%_42%,color-mix(in_srgb,var(--brand-mint)_36%,transparent),transparent_68%)]" />

      <div className="absolute inset-0 flex items-center justify-center">
        <Phone
          slot="left"
          screenX={leftX}
          screenY={leftY}
        >
          <BookingScreen />
        </Phone>
        <Phone
          slot="center"
          screenX={centerX}
          screenY={centerY}
        >
          <DashboardScreen />
        </Phone>
        <Phone
          slot="right"
          screenX={rightX}
          screenY={rightY}
        >
          <AssistantScreen />
        </Phone>
      </div>
    </div>
  );
}

function Phone({
  slot,
  children,
  screenX,
  screenY,
}: {
  slot: "left" | "center" | "right";
  children: ReactNode;
  screenX: MotionValue<number>;
  screenY: MotionValue<number>;
}) {
  return (
    <div
      data-phone={slot}
      className="absolute aspect-[9/19] w-[36%] origin-bottom md:w-[30%]"
    >
      <div className="size-full rounded-[1.65rem] border-[5px] border-navy bg-navy p-[3px] shadow-[0_28px_48px_-18px_rgb(15_23_42_/_0.42)]">
        <div className="relative size-full overflow-hidden rounded-[1.25rem] bg-white">
          <span className="absolute top-1.5 left-1/2 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-navy/80" />
          <motion.div
            className="size-full"
            style={{ x: screenX, y: screenY }}
          >
            {children}
          </motion.div>
          <span className="absolute bottom-1.5 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-navy/20" />
        </div>
      </div>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="flex size-full flex-col bg-[#F7FAFA] px-2.5 pt-5 pb-3">
      <p className="text-[0.45rem] tracking-[0.14em] text-navy/40 uppercase">Cove</p>
      <p className="font-heading text-[0.7rem] tracking-[-0.04em] text-navy">Today</p>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <div className="rounded-lg bg-white p-1.5 ring-1 ring-navy/8">
          <p className="text-[0.4rem] text-navy/40">Routes</p>
          <p className="font-heading text-[0.8rem] text-navy">12</p>
        </div>
        <div className="rounded-lg bg-white p-1.5 ring-1 ring-navy/8">
          <p className="text-[0.4rem] text-navy/40">On time</p>
          <p className="font-heading text-[0.8rem] text-teal">96%</p>
        </div>
      </div>
      <div className="mt-2 flex flex-1 items-end gap-1 rounded-lg bg-white px-2 pt-3 pb-2 ring-1 ring-navy/8">
        {[40, 62, 48, 78, 55, 88, 70].map((height) => (
          <span
            key={height}
            className="flex-1 rounded-sm bg-mint last:bg-brand-teal"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function BookingScreen() {
  return (
    <div className="flex size-full flex-col bg-white px-2.5 pt-5 pb-3">
      <p className="text-[0.45rem] tracking-[0.14em] text-navy/40 uppercase">Schedule</p>
      <p className="font-heading text-[0.7rem] tracking-[-0.04em] text-navy">Next visits</p>
      <div className="mt-2 flex flex-col gap-1.5">
        {[
          { time: "09:30", place: "North depot" },
          { time: "11:15", place: "Harbor gate" },
          { time: "14:00", place: "East yard" },
        ].map((slot, index) => (
          <div
            key={slot.time}
            className={cn(
              "flex items-center gap-2 rounded-lg px-1.5 py-1.5 ring-1",
              index === 0 ? "bg-mint ring-teal/20" : "bg-[#F7FAFA] ring-navy/8",
            )}
          >
            <span className="font-mono text-[0.45rem] text-navy/55">{slot.time}</span>
            <span className="text-[0.5rem] text-navy">{slot.place}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-lg bg-navy px-2 py-1.5 text-center text-[0.45rem] tracking-[0.08em] text-white uppercase">
        Book slot
      </div>
    </div>
  );
}

function AssistantScreen() {
  return (
    <div className="flex size-full flex-col bg-[#F7FAFA] px-2.5 pt-5 pb-3">
      <p className="text-[0.45rem] tracking-[0.14em] text-navy/40 uppercase">Assistant</p>
      <p className="font-heading text-[0.7rem] tracking-[-0.04em] text-navy">Ask Cove</p>
      <div className="mt-2 flex flex-1 flex-col gap-1.5">
        <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white px-2 py-1.5 text-[0.45rem] leading-snug text-navy/70 ring-1 ring-navy/8">
          Which route is slipping this morning?
        </div>
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-navy px-2 py-1.5 text-[0.45rem] leading-snug text-white">
          East yard is 14 minutes behind. Reorder the 11:15 stop?
        </div>
        <div className="rounded-full bg-mint px-2 py-1 text-center text-[0.4rem] tracking-[0.06em] text-navy uppercase">
          Confirm reorder
        </div>
      </div>
    </div>
  );
}
