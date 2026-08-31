import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { ProposalSection } from "@/components/proposal/proposal-section";
import { PrimaryButton } from "@/components/ui/button";
import { about } from "@/data/about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "fmv is the review service and wakeymoment is the company behind it. One engineer: six years of engineering, an app shipped to the App Store, front-end lead on a public-sector platform.",
  alternates: { canonical: "/about" },
};

// Typeset like the rest of the site: the 6rem mono margin, hairline rules, no
// card shells and no dark CTA band. The page this replaced had eight bordered
// panels and a full-bleed bg-ink section, which DESIGN.md forbids by name —
// panel-dark "is not page chrome, not a CTA background".
export default function AboutPage() {
  return (
    <div data-testid="about-page">
      <section aria-labelledby="about-lede" className="py-16 sm:py-24">
        <Container variant="wide">
          <div className="grid gap-8 lg:grid-cols-[6rem_minmax(0,1fr)] lg:gap-12">
            <p aria-hidden="true" className="font-mono text-sm text-ink-muted">
              {about.eyebrow}
            </p>

            <div className="flex flex-col gap-5">
              <h1
                id="about-lede"
                className="max-w-3xl text-balance font-display text-3xl font-normal leading-tight tracking-[-0.03em] text-ink sm:text-4xl"
              >
                {about.headline}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-ink sm:text-lg">{about.lede}</p>
            </div>
          </div>
        </Container>
      </section>

      <ProposalSection number="01" title={about.grounds.caption}>
        <ul className="flex max-w-2xl flex-col border-t border-rule">
          {about.grounds.items.map((item) => (
            <li key={item} className="border-b border-rule py-4 text-base leading-relaxed text-ink">
              {item}
            </li>
          ))}
        </ul>
      </ProposalSection>

      <ProposalSection number="02" title={about.method.caption}>
        <p className="max-w-2xl text-base leading-relaxed text-ink">{about.method.body}</p>

        <ul className="flex flex-wrap gap-6">
          {about.links.map((link) => (
            <li key={link.href}>
              <a
                className="text-sm text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </ProposalSection>

      <ProposalSection number="03" title={about.boundaries.caption}>
        {/* Exclusions are named, the way section 05 of the home page names them:
            in proposal grammar what is ruled out builds more trust than what is
            promised, so it is not buried. deferred, never a severity — being out
            of scope is not a finding. */}
        <ul className="flex max-w-2xl flex-col border-t border-rule">
          {about.boundaries.items.map((item) => (
            <li
              key={item}
              className="border-b border-rule py-4 text-base leading-relaxed text-deferred"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="pt-2">
          <PrimaryButton href={about.ctaHref}>{about.ctaLabel}</PrimaryButton>
        </div>
      </ProposalSection>
    </div>
  );
}
