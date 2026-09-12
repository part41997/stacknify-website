import {
  Layers,
  Lightbulb,
  Sparkles,
  TrendingUp,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

import type { FinalCtaNodeId } from "@/data/final-cta";

export const finalCtaIcons: Record<FinalCtaNodeId, LucideIcon> = {
  idea: Lightbulb,
  ai: Sparkles,
  software: Layers,
  automation: Waypoints,
  growth: TrendingUp,
};
