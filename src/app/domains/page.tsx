import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { getAllDomains } from "@/data/projects";

export const metadata: Metadata = {
  title: "Domains",
  description: "Browse wakeymoment work by business domain, including FixMyVibe, DrawHatha, and infrastructure notes.",
  alternates: { canonical: "/domains" },
};


export default function DomainsIndexPage() {
  const domains = getAllDomains();

  return (
    <Container variant="wide" className="space-y-8 py-12">
      <header className="space-y-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-muted">Domains</p>
        <h1 className="text-4xl font-semibold text-ink">Domain showcases</h1>
        <p className="mx-auto max-w-3xl text-ink">
          Browse the work by business domain so posts, repos, and infrastructure notes stay grouped in one
          narrative.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {domains.map((domain) => (
          <article
            key={domain.id}
            className="flex h-full flex-col gap-4 rounded-2xl border border-rule bg-paper p-6"
          >
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
                {domain.eyebrow}
              </p>
              <h2 className="text-2xl font-semibold text-ink">{domain.name}</h2>
              <p className="text-ink">{domain.summary}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {domain.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-rule px-3 py-1 text-xs font-medium text-ink"
                >
                  {highlight}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-4">
              <Link href={`/domains/${domain.id}`} className="text-sm font-semibold text-ink">
                Open showcase →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
