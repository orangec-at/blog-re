import { Container } from "@/components/layout/container";
import type { BeforeAfterCard } from "@/data/homepage-content";

type BeforeAfterBoardProps = {
  cards: BeforeAfterCard[];
};

export function BeforeAfterBoard({ cards }: BeforeAfterBoardProps) {
  return (
    <section data-testid="before-after-board" className="bg-offwhite py-16">
      <Container variant="wide" className="grid gap-6 md:grid-cols-2">
        {cards.map((card, index) => (
          <article
            key={`${card.before.title}-${index}`}
            className="rounded-lg border border-zapier-sand bg-cream p-6 shadow-tab-hover"
          >
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zapier-gray">Before</p>
                <h3 className="text-xl font-semibold text-zapier-black">{card.before.title}</h3>
                <p className="text-sm text-zapier-charcoal">{card.before.body}</p>
              </div>
              <div className="h-px bg-zapier-sand" aria-hidden />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zapier-gray">After</p>
                <h3 className="text-xl font-semibold text-zapier-black">{card.after.title}</h3>
                <p className="text-sm text-zapier-charcoal">{card.after.body}</p>
              </div>
            </div>
          </article>
        ))}
      </Container>
    </section>
  );
}
