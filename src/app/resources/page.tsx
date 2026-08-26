import type { Metadata } from "next";
import { ContactCta } from "@/components/home";
import { Container } from "@/components/layout/container";
import { NarrowPage } from "@/components/layout/narrow-page";
import {
  capabilityItems,
  founderHelpItems,
  resourcesFinalCta,
  resourcesIntro,
} from "@/data/resources-content";

export const metadata: Metadata = {
  title: "Resources",
  description: "Founder-friendly resources for AI MVP launch-readiness, technical debt diagnosis, and remodeling decisions.",
  alternates: { canonical: "/resources" },
};


export default async function ResourcesPage() {
  return (
    <div className="flex flex-col gap-12">
      <NarrowPage>
        <header className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-muted">
            {resourcesIntro.eyebrow}
          </p>
          <h1 className="text-4xl font-semibold text-ink">{resourcesIntro.title}</h1>
          <p className="mx-auto max-w-2xl text-ink">{resourcesIntro.body}</p>
        </header>

        <section className="rounded-2xl border border-rule bg-paper p-6 text-left shadow-sm">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-muted">Download</p>
            <h2 className="text-2xl font-semibold text-ink">Portfolio summary</h2>
            <p className="text-ink">{resourcesIntro.downloadNote}</p>
            <a
              href={resourcesIntro.downloadHref}
              className="inline-flex items-center justify-center rounded-lg border border-rule bg-ink px-5 py-3 text-sm font-semibold text-paper"
            >
              {resourcesIntro.downloadLabel}
            </a>
          </div>
        </section>
      </NarrowPage>

      <Container variant="wide" className="space-y-12 pb-12">
        <section className="space-y-6">
          <div className="space-y-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-muted">Capabilities</p>
            <h2 className="text-3xl font-semibold text-ink">Capabilities</h2>
            <p className="mx-auto max-w-3xl text-ink">
              A focused stack for founder-led launches that need credible delivery without enterprise overhead.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {capabilityItems.map((item) => (
              <article
                key={item.name}
                className="flex h-full flex-col gap-4 rounded-2xl border border-rule bg-paper p-6"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-ink">{item.name}</h3>
                  <p className="text-ink">{item.summary}</p>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {item.stack.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-rule px-3 py-1 text-xs font-medium text-ink"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-muted">Founder-friendly help</p>
            <h2 className="text-3xl font-semibold text-ink">Founder-friendly problem solving</h2>
            <p className="mx-auto max-w-3xl text-ink">
              The work is structured around common launch blockers: unclear proof, brittle demos, and handoff gaps.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {founderHelpItems.map((item) => (
              <article key={item.title} className="rounded-2xl border border-rule bg-paper p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Problem</p>
                    <p className="text-ink">{item.problem}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Solution</p>
                    <p className="text-ink">{item.solution}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Container>

      <ContactCta data={resourcesFinalCta} />
    </div>
  );
}
