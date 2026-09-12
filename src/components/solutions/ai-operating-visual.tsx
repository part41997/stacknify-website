import { SectionImage } from "@/components/media/section-image";
import { imageSizes } from "@/data/images";
import { cn } from "@/lib/utils";

type AiOperatingVisualProps = {
  className?: string;
};

export function AiOperatingVisual({ className }: AiOperatingVisualProps) {
  return (
    <figure
      className={cn(
        "relative m-0 aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-navy/8 bg-surface shadow-sm lg:aspect-[5/6] lg:rounded-[2rem]",
        className,
      )}
    >
      <SectionImage
        id="ai.operating-layer"
        fill
        sizes={imageSizes.story}
        className="absolute inset-0"
        imageClassName="object-cover object-center"
      />
    </figure>
  );
}
