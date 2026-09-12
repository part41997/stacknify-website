import dynamic from "next/dynamic";

import { Section } from "@/components/layout/section";

const ProcessTimeline = dynamic(() =>
  import("@/components/process/process-timeline").then(
    (module) => module.ProcessTimeline,
  ),
);

export function Process() {
  return (
    <Section
      id="process"
      spacing="none"
      className="overflow-x-clip bg-background-primary"
    >
      <ProcessTimeline />
    </Section>
  );
}
