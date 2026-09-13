import { ProblemSolution } from "@/components/sections/problem-solution";
import { Solutions } from "@/components/sections/solutions";
import { JsonLd } from "@/components/seo";
import { routes } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { solutionsContent } from "@/data/solutions";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: `${solutionsContent.headingPrefix} ${solutionsContent.headingAccent}`,
  description: solutionsContent.description,
  path: routes.solutions,
});

export default function SolutionsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: siteConfig.name, path: routes.home },
          { name: "Solutions", path: routes.solutions },
        ])}
      />
      <Solutions />
      <ProblemSolution />
    </>
  );
}
