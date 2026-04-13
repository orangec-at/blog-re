import type { DomainShowcase } from "@/data/projects";
import { Container } from "@/components/layout/container";

type DomainHeroProps = {
  domain: DomainShowcase;
};

export function DomainHero({ domain }: DomainHeroProps) {
  return (
    <section data-testid="domain-hero" className="bg-cream py-16">
      <Container variant="wide" className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zapier-gray">
            {domain.eyebrow}
          </p>
          <h1 className="text-4xl font-semibold text-zapier-black sm:text-5xl">{domain.name}</h1>
          <p className="max-w-3xl text-lg text-zapier-charcoal">{domain.headline}</p>
          <p className="max-w-3xl text-base text-zapier-charcoal">{domain.summary}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {domain.highlights.map((highlight) => (
            <span
              key={highlight}
              className="rounded-full border border-zapier-sand px-3 py-1 text-sm font-medium text-zapier-charcoal"
            >
              {highlight}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {domain.links.map((link) => (
            <a
              key={`${link.label}-${link.href}`}
              href={link.href}
              className="inline-flex items-center rounded-full border border-zapier-sand px-4 py-2 text-sm font-semibold text-zapier-charcoal transition hover:border-zapier-orange hover:text-zapier-orange"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
