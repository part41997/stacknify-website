import type { TrustStat } from "@/types";

export const statsContent = {
  label: "Results at a glance",
} as const;

export const proofStats: TrustStat[] = [
  { id: "awards", label: "Winning awards", value: 5, suffix: "+" },
  { id: "clients", label: "Happy clients", value: 10, suffix: "+" },
  { id: "projects", label: "Completed projects", value: 15, suffix: "+" },
  { id: "reviews", label: "Client reviews", value: 10, suffix: "+" },
];
