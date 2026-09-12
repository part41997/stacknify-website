import { SiteImage } from "@/components/media/site-image";
import { getServiceImage, imageSizes } from "@/data/images";
import { isImageReady } from "@/lib/images";
import { cn } from "@/lib/utils";

type ServiceVisualProps = {
  slug: string;
  className?: string;
};

export function ServiceVisual({ slug, className }: ServiceVisualProps) {
  const photo = getServiceImage(slug);

  if (isImageReady(photo)) {
    return (
      <SiteImage
        image={photo}
        fill
        sizes={imageSizes.service}
        className={cn("absolute inset-0", className)}
        imageClassName="object-cover object-center"
      />
    );
  }

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#0B0E14]",
        className,
      )}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,color-mix(in_srgb,var(--brand-cyan)_18%,transparent),transparent_58%)]" />
      <div className="absolute inset-0 site-grid opacity-[0.18]" />
    </div>
  );
}
