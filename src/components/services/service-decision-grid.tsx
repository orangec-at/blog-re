import { Container } from "@/components/layout/container";
import { DecisionPanel } from "@/components/ui/patterns/decision-panel";
import { SectionIntro } from "@/components/ui/patterns/section-intro";
import type { ServiceOffer } from "@/data/services-content";

type ServiceDecisionGridProps = {
  offers: ServiceOffer[];
};

export function ServiceDecisionGrid({ offers }: ServiceDecisionGridProps) {
  return (
    <section className="bg-offwhite py-16 sm:py-20" data-testid="service-decision-grid">
      <Container variant="wide" className="space-y-8">
        <SectionIntro
          aside="The first job is not choosing the biggest package. It is choosing the safest next decision."
          body="The diagnosis-first path keeps uncertain founders from overcommitting before the rescue scope is clear."
          eyebrow="Start-here chooser"
          title="Choose the rescue path that matches the current risk"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {offers.map((offer, index) => (
            <DecisionPanel
              key={offer.id}
              ctaHref={`#${offer.id}`}
              ctaLabel={offer.ctaLabel}
              outcome={offer.outcome}
              summary={offer.summary}
              title={offer.name}
              tone={index === 0 ? "accent" : "default"}
              whyItFits={offer.bestFor}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
