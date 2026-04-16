import type { DomainShowcase } from "@/data/projects";
import { Container } from "@/components/layout/container";
import { PillTag } from "@/components/ui/feedback/pill-tag";
import { BodyText } from "@/components/ui/typography/body-text";
import { DisplayHeading } from "@/components/ui/typography/display-heading";
import { Eyebrow } from "@/components/ui/typography/eyebrow";

type DomainHeroProps = {
  domain: DomainShowcase;
};

export function DomainHero({ domain }: DomainHeroProps) {
  return (
    <section data-testid="domain-hero" className="bg-cream py-16">
      <Container variant="wide" className="space-y-6">
        <div className="space-y-3">
          <Eyebrow>{domain.eyebrow}</Eyebrow>
          <DisplayHeading>{domain.name}</DisplayHeading>
          <BodyText className="max-w-3xl text-lg sm:text-xl">{domain.headline}</BodyText>
          <BodyText className="max-w-3xl text-base sm:text-base">{domain.summary}</BodyText>
        </div>

        <div className="flex flex-wrap gap-2">
          {domain.highlights.map((highlight) => (
            <PillTag key={highlight} className="px-3 py-1">
              {highlight}
            </PillTag>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {domain.links.map((link) => (
            <a
              key={`${link.label}-${link.href}`}
              href={link.href}
              className="inline-flex items-center rounded-full border border-zapier-sand px-4 py-2 text-sm font-semibold text-zapier-charcoal transition hover:border-zapier-orange hover:text-zapier-orange"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
