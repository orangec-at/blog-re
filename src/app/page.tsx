import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { GateList } from "@/components/proposal/gate-list";
import { ProposalSection } from "@/components/proposal/proposal-section";
import { ScopeTable } from "@/components/proposal/scope-table";
import { SystemMapPanel } from "@/components/proposal/system-map-panel";
import { VerdictSheet } from "@/components/proposal/verdict-sheet";
import { PrimaryButton, TextLink } from "@/components/ui/button";
import { gates, hero, scope, systemMap, verdict, whyMe } from "@/data/proposal-content";

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

              {/* One button, one link. The two actions are not peers — one is a
                  commission and the other is a look around — and a page typeset
                  as a document does not set two buttons side by side. */}
              {/* Bottoms flush, not centres and not text baselines. The button is
                  a 50px padded box and the link is a 28px line with a 2px rule
                  under it; centring left the rule floating 9px above the button's
                  bottom edge, which is the line the eye actually reads the pair
                  against. Aligning the boxes costs 9px between the two labels'
                  baselines — the smaller of the two errors. */}
              <div className="flex flex-wrap items-end gap-6">
                <PrimaryButton href={hero.primaryCta.href}>{hero.primaryCta.label}</PrimaryButton>
                <TextLink href={hero.secondaryCta.href}>{hero.secondaryCta.label}</TextLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ProposalSection number="02" title="What you actually built">
        <SystemMapPanel
          layers={systemMap.layers}
          boundaries={systemMap.boundaries}
          argument={systemMap.argument}
        />
      </ProposalSection>

      <ProposalSection number="03" title="How I look at it">
        <p className="max-w-2xl text-base leading-relaxed text-ink-muted">
          The gates that apply to your stack, in order. Each one has a way it fails and a question that
          settles it.
        </p>
        <GateList gates={gates} />
      </ProposalSection>

      <ProposalSection number="04" title="What you get">
        <VerdictSheet title={verdict.title} sampleNotice={verdict.sampleNotice} sections={verdict.sections} />
      </ProposalSection>

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
          <PrimaryButton href={hero.primaryCta.href}>{whyMe.ctaLabel}</PrimaryButton>
        </div>
      </ProposalSection>
    </div>
  );
}
