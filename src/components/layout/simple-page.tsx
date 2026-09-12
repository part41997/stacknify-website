import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

type SimplePageProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export function SimplePage({ title, description, children }: SimplePageProps) {
  return (
    <Section spacing="default">
      <Container className="flex max-w-container-prose flex-col gap-6">
        <div>
          <h1 className="font-heading text-headline text-navy">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 text-body text-blue-gray sm:text-body-lg">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </Container>
    </Section>
  );
}
