import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { ProposalSection } from "@/components/proposal/proposal-section";
import { ScopeTable } from "@/components/proposal/scope-table";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { hero, scope, whyMe } from "@/data/proposal-content";

export const metadata: Metadata = {
  title: "Home",
  description: hero.subheadline,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div data-testid="home-page">
      <section aria-labelledby="section-01" className="py-16 sm:py-24">
        <Container variant="wide">
          <div className="grid gap-8 lg:grid-cols-[6rem_minmax(0,1fr)] lg:gap-12">
            <p aria-hidden="true" className="font-mono text-sm text-ink-muted">01</p>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-5">
                {/* text-balance keeps the second sentence off a one-word line — without
                    it 1280px orphans "check." by itself under a nearly full first line. */}
                <h1
                  id="section-01"
                  className="max-w-3xl text-balance font-display text-3xl font-normal leading-tight tracking-[-0.03em] text-ink sm:text-4xl"
                >
                  {hero.headline}
                </h1>

                <p className="max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
                  {hero.subheadline}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <PrimaryButton href={hero.primaryCta.href}>{hero.primaryCta.label}</PrimaryButton>
                <SecondaryButton href={hero.secondaryCta.href}>{hero.secondaryCta.label}</SecondaryButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ProposalSection number="05" title="Scope">
        <p className="text-base leading-relaxed text-ink-muted">
          {scope.duration} {scope.priceNote}
        </p>
        <ScopeTable included={scope.included} excluded={scope.excluded} />
      </ProposalSection>

      <ProposalSection number="06" title="Why me">
        <p className="max-w-2xl text-base leading-relaxed text-ink-muted">{whyMe.body}</p>
        <ul className="flex flex-wrap gap-6">
          {whyMe.links.map((link) => (
            <li key={link.href}>
              <a className="text-sm text-ink underline decoration-rule underline-offset-4 hover:decoration-ink" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="pt-2">
          <PrimaryButton href={hero.primaryCta.href}>Get an independent review</PrimaryButton>
        </div>
      </ProposalSection>
    </div>
  );
}
