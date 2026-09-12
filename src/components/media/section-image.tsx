"use client";

import { type ComponentProps } from "react";

import { SiteImage } from "@/components/media/site-image";
import { getSiteImage } from "@/data/images";
import type { SiteImageId } from "@/types";

type SectionImageProps = Omit<ComponentProps<typeof SiteImage>, "image"> & {
  id: SiteImageId;
};

export function SectionImage({ id, ...props }: SectionImageProps) {
  return <SiteImage image={getSiteImage(id)} {...props} />;
}
