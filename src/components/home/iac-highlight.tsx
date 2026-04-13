import { Container } from "@/components/layout/container";
import type { Highlight } from "@/data/homepage-content";

type HighlightProps = {
  highlight: Highlight;
};

export function IacHighlight({ highlight }: HighlightProps) {
  return (
    <section data-testid="iac-highlight" className="bg-offwhite py-16">
      <Container variant="wide">
        <HighlightCard {...highlight} accent="Terraform" />
      </Container>
    </section>
  );
}

type HighlightCardProps = Highlight & { accent: string };

function HighlightCard({ title, body, tags }: HighlightCardProps) {
  return (
    <article className="rounded-lg border border-zapier-sand bg-cream p-6 shadow-tab-hover">
      <div className="flex flex-wrap gap-2 pb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-zapier-sand px-3 py-1 text-xs font-medium text-zapier-charcoal"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-2xl font-semibold text-zapier-black">{title}</h3>
      <p className="text-base text-zapier-charcoal">{body}</p>
    </article>
  );
}
