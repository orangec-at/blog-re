import { Container } from "@/components/layout/container";
import type { Principle } from "@/data/homepage-content";

type DecisionPrinciplesProps = {
  principles: Principle[];
};

export function DecisionPrinciples({ principles }: DecisionPrinciplesProps) {
  return (
    <section data-testid="decision-principles" className="py-16">
      <Container variant="narrow" className="space-y-10">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-zapier-gray">Principles</p>
          <h2 className="text-3xl font-semibold text-zapier-black">Decision Principles</h2>
        </header>
        <div className="space-y-8">
          {principles.map((principle) => (
            <article
              key={principle.id}
              className="border-l-4 border-zapier-orange pl-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-zapier-gray">
                {principle.label}
              </p>
              <h3 className="text-2xl font-semibold text-zapier-black">{principle.title}</h3>
              <p className="text-base text-zapier-charcoal">{principle.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
