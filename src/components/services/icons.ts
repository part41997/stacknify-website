import {
  AppWindow,
  CodeXml,
  Palette,
  Smartphone,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import type { ServiceIcon } from "@/types";

export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  sparkles: Sparkles,
  web: AppWindow,
  mobile: Smartphone,
  palette: Palette,
  code: CodeXml,
  growth: TrendingUp,
};
