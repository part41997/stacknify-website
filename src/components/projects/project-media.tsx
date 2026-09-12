import { SiteImage } from "@/components/media/site-image";
import type { SiteImageAsset } from "@/types";

type ProjectMediaProps = {
  image: SiteImageAsset;
  priority?: boolean;
  sizes: string;
};

export function ProjectMedia({ image, priority, sizes }: ProjectMediaProps) {
  return (
    <SiteImage
      image={image}
      fill
      fallback
      priority={priority}
      sizes={sizes}
      className="absolute inset-0"
      imageClassName="object-cover"
    />
  );
}
