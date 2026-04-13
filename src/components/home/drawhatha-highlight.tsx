import { Container } from "@/components/layout/container";
import type { Highlight } from "@/data/homepage-content";

type DrawhathaHighlightProps = {
  highlight: Highlight;
};

export function DrawhathaHighlight({ highlight }: DrawhathaHighlightProps) {
  return (
    <section data-testid="drawhatha-highlight" className="py-16">
      <Container variant="wide">
        <article className="rounded-lg border border-zapier-sand bg-offwhite p-6">
          <div className="flex flex-wrap gap-2 pb-4">
            {highlight.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zapier-sand px-3 py-1 text-xs font-medium text-zapier-charcoal"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-semibold text-zapier-black">{highlight.title}</h3>
          <p className="text-base text-zapier-charcoal">{highlight.body}</p>
        </article>
      </Container>
    </section>
  );
}
