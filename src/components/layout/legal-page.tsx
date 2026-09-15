import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { LegalBlock, LegalDocument } from "@/data/legal";
import { siteConfig } from "@/data/site";

type LegalPageProps = {
  document: LegalDocument;
};

function paragraphNumber(blocks: readonly LegalBlock[], at: number) {
  return blocks.slice(0, at + 1).filter((block) => block.type === "p").length;
}

export function LegalPage({ document }: LegalPageProps) {
  const contactEmail = siteConfig.email || "info@stacknify.com";
  const meta = [
    { label: "Issuing organisation", value: siteConfig.name },
    { label: "Document", value: document.title },
    { label: "Version", value: document.version },
    { label: "Classification", value: document.classification },
    { label: "Effective date", value: document.effectiveDate, iso: document.effectiveDateIso },
    { label: "Last updated", value: document.lastUpdated, iso: document.effectiveDateIso },
  ] as const;

  return (
    <Section spacing="default" className="bg-background-primary">
      <Container className="max-w-container-prose">
        <article>
          <header>
            <p className="text-overline text-text-muted uppercase">
              {document.kicker}
            </p>
            <h1 className="mt-3 font-heading text-headline text-navy">
              {document.title}
            </h1>
            <p className="mt-4 text-body text-text-secondary sm:text-body-lg">
              {document.intro}
            </p>

            <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
              {meta.map((item) => (
                <div
                  key={item.label}
                  className="bg-background-secondary/80 px-4 py-3.5"
                >
                  <dt className="text-overline text-text-muted uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-small text-navy">
                    {"iso" in item && item.iso ? (
                      <time dateTime={item.iso}>{item.value}</time>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </header>

          <nav
            aria-label="Contents"
            className="mt-10 rounded-xl border border-border bg-background-secondary/40 p-5 sm:p-6"
          >
            <p className="text-overline text-text-muted uppercase">Contents</p>
            <ol className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {document.sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="group flex items-baseline gap-3 text-small text-navy outline-none transition-colors hover:text-teal focus-visible:text-teal"
                  >
                    <span className="font-mono text-caption tabular-nums text-text-muted group-hover:text-teal">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <ol className="mt-12 flex flex-col gap-12">
            {document.sections.map((section, index) => {
              const article = index + 1;

              return (
                <li key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="flex items-baseline gap-3 font-heading text-h3 text-text-primary">
                    <span className="font-mono text-small tabular-nums tracking-[0.08em] text-teal">
                      {String(article).padStart(2, "0")}
                    </span>
                    <span>{section.title}</span>
                  </h2>
                  <div className="mt-4 flex flex-col gap-4 text-body text-text-secondary">
                    {section.blocks.map((block, blockIndex) =>
                      block.type === "ul" ? (
                        <ul
                          key={`${section.id}-ul-${blockIndex}`}
                          className="flex list-disc flex-col gap-2 pl-5 marker:text-teal"
                        >
                          {block.items.map((item) => (
                            <li key={item} className="pl-1">
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p
                          key={`${section.id}-p-${blockIndex}`}
                          className="flex gap-3"
                        >
                          <span className="mt-0.5 shrink-0 font-mono text-caption tabular-nums text-text-muted">
                            {article}.{paragraphNumber(section.blocks, blockIndex)}
                          </span>
                          <span>{block.text}</span>
                        </p>
                      ),
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          <footer className="mt-14 border-t border-border pt-8">
            <p className="text-overline text-text-muted uppercase">
              Related documents
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-small sm:flex-row sm:gap-6">
              {document.related.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-navy underline-offset-4 outline-none transition-colors hover:text-teal hover:underline focus-visible:text-teal"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-small text-text-secondary">
              Legal notices:{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="text-navy underline-offset-4 hover:text-teal hover:underline"
              >
                {contactEmail}
              </a>
              . Website:{" "}
              <a
                href="https://stacknify.com"
                className="text-navy underline-offset-4 hover:text-teal hover:underline"
              >
                https://stacknify.com
              </a>
              .
            </p>
            <p className="mt-4 font-mono text-caption text-text-muted">
              End of {document.title}. Document version {document.version}.
            </p>
          </footer>
        </article>
      </Container>
    </Section>
  );
}
