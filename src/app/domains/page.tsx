import Link from "next/link";
import { Container } from "@/components/layout/container";
import { getAllDomains } from "@/data/projects";

export default function DomainsIndexPage() {
  const domains = getAllDomains();

  return (
    <Container variant="wide" className="space-y-8 py-12">
      <header className="space-y-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zapier-gray">Domains</p>
        <h1 className="text-4xl font-semibold text-zapier-black">Domain showcases</h1>
        <p className="mx-auto max-w-3xl text-zapier-charcoal">
          Browse the work by business domain so posts, repos, and infrastructure notes stay grouped in one
          narrative.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {domains.map((domain) => (
          <article
            key={domain.id}
            className="flex h-full flex-col gap-4 rounded-2xl border border-zapier-sand bg-offwhite p-6"
          >
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zapier-gray">
                {domain.eyebrow}
              </p>
              <h2 className="text-2xl font-semibold text-zapier-black">{domain.name}</h2>
              <p className="text-zapier-charcoal">{domain.summary}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {domain.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-zapier-sand px-3 py-1 text-xs font-medium text-zapier-charcoal"
                >
                  {highlight}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-4">
              <Link href={`/domains/${domain.id}`} className="text-sm font-semibold text-zapier-orange">
                Open showcase →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
