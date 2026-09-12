import {
  BadgeCheck,
  Boxes,
  Map,
  PenTool,
  Rocket,
  Search,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export const processIcons: Record<string, LucideIcon> = {
  discover: Search,
  strategize: Map,
  design: PenTool,
  build: Boxes,
  test: BadgeCheck,
  launch: Rocket,
  grow: TrendingUp,
};
