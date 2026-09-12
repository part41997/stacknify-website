import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { ServiceTile } from "@/components/services/service-tile";
import { serviceCategories } from "@/data/services";

export function ServiceShowcase() {
  return (
    <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
      {serviceCategories.map((category) => (
        <StaggerItem key={category.slug} className="h-full">
          <ServiceTile category={category} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
