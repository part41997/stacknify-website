import { SiteImage } from "@/components/media/site-image";
import { imageSizes } from "@/data/images";
import { cn } from "@/lib/utils";
import type { SiteImageAsset } from "@/types";

type EditorialStageProps = {
  image: SiteImageAsset;
  className?: string;
  sizes?: string;
  label?: string;
};

export function EditorialStage({
  image,
  className,
  sizes = imageSizes.story,
  label,
}: EditorialStageProps) {
  return (
    <div
      className={cn(
        "relative isolate min-h-[22rem] overflow-hidden rounded-[1.75rem] border border-navy/8 bg-surface shadow-sm lg:min-h-[28rem] lg:rounded-[2rem]",
        className,
      )}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <SiteImage
        image={image}
        fill
        sizes={sizes}
        className="absolute inset-0"
        imageClassName="object-cover object-center"
      />
    </div>
  );
}
