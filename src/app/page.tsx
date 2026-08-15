import type { Metadata } from "next";

import { ServiceCardVisual } from "@/components/home/service-card-visual";
import { Container } from "@/components/layout/container";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Home",
  description: "Launch-readiness engineering for software built with AI.",
  alternates: { canonical: "/" },
};

// ponytail: three offers stay inline — a data module earns its place at the second consumer.
const offers = [
  {
    name: "Launch Readiness Review",
    summary: "Workflow, data permissions, and payment risk — reviewed before your first real user.",
    availability: "Next available September '26",
    visual: "gate",
  },
  {
    name: "Technical Debt Audit",
    summary: "A risk table and a two-week plan for apps built with Cursor, Lovable, or Bolt.",
    availability: "Next available October '26",
    visual: "risk-table",
  },
  {
    name: "Founder Tech Partner",
    summary: "Ongoing technical judgment for founders shipping with AI and freelancers.",
    availability: "Currently full",
    visual: "partner",
  },
] as const;

export default function Home() {
  return (
    <div data-testid="home-page" className="py-16 sm:py-24">
      <Container variant="wide" className="flex flex-col gap-16 sm:gap-24">
        <section className="flex flex-col gap-8">
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.03em] text-zapier-black sm:text-4xl">
            Launch-readiness engineering for software built with AI.
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <PrimaryButton href="/contact">Start a review</PrimaryButton>
            <SecondaryButton href="/posts/ai-mvp-technical-debt-audit-sample-report">
              Read a sample report
            </SecondaryButton>
          </div>
        </section>

        {/* Three columns at sm squeezes each card to 196px and wraps every title
            onto three lines. Hold the stack until md, where a card gets 239px. */}
        <section
          aria-label="Services"
          className="grid gap-px overflow-hidden rounded-[5px] border border-zapier-sand bg-zapier-sand md:grid-cols-3"
        >
          {offers.map((offer) => (
            <article key={offer.name} className="flex flex-col bg-white">
              <ServiceCardVisual variant={offer.visual} />

              <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
                <h2 className="text-lg font-semibold tracking-[-0.02em] text-zapier-black">{offer.name}</h2>
                <p className="text-sm leading-relaxed text-zapier-charcoal">{offer.summary}</p>
                <p className="mt-auto pt-4 text-xs uppercase tracking-[0.5px] text-zapier-gray">
                  {offer.availability}
                </p>
              </div>
            </article>
          ))}
        </section>
      </Container>
    </div>
  );
}
