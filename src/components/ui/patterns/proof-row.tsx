import { TextLink } from "@/components/ui/button";
import { PanelSurface } from "@/components/ui/surfaces/panel-surface";
import { BodyText, Eyebrow, SectionHeading } from "@/components/ui/typography";

type ProofRowProps = {
  ctaHref: string;
  ctaLabel: string;
  highlights: string[];
  summary: string;
  title: string;
};

export function ProofRow({ ctaHref, ctaLabel, highlights, summary, title }: ProofRowProps) {
  return (
    <PanelSurface as="article" className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.7fr)]" tone="muted">
      <div className="space-y-3">
        <Eyebrow>Proof row</Eyebrow>
        <SectionHeading as="h3" className="text-2xl sm:text-3xl sm:leading-tight">
          {title}
        </SectionHeading>
        <BodyText className="text-sm sm:text-base">{summary}</BodyText>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {highlights.map((highlight) => (
            <span
              key={highlight}
              className="rounded-pill border border-zapier-sand bg-cream px-3 py-1 text-xs font-medium text-zapier-charcoal"
            >
              {highlight}
            </span>
          ))}
        </div>
        <div className="mt-auto">
          <TextLink href={ctaHref}>{ctaLabel}</TextLink>
        </div>
      </div>
    </PanelSurface>
  );
}
