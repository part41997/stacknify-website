import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { projectsContent } from "@/data/projects";

type ProjectsProps = {
  headingAs?: "h1" | "h2";
};

export function Projects({ headingAs = "h2" }: ProjectsProps) {
  return (
    <Section id="projects" spacing="comfortable" className="overflow-hidden">
      <Container width="wide" className="flex flex-col gap-8 lg:gap-10">
        <SectionHeading
          prefix={projectsContent.headingPrefix}
          accent={projectsContent.headingAccent}
          reveal
          description={projectsContent.description}
          as={headingAs}
          className="lg:max-w-3xl"
        />

        <FadeIn delay={0.06}>
          <ProjectGallery />
        </FadeIn>
      </Container>
    </Section>
  );
}
