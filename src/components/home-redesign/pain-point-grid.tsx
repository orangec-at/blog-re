import { Container } from "@/components/layout/container";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { SectionHeading } from "@/components/ui/typography/section-heading";
import { FeatureCard } from "@/components/ui/molecules/feature-card";
import type { FounderHelpItem } from "@/data/resources-content";

type PainPointGridProps = {
  items: FounderHelpItem[];
};

export function PainPointGrid({ items }: PainPointGridProps) {
  return (
    <section className="bg-offwhite py-16 sm:py-20">
      <Container variant="wide" className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <Eyebrow>Pain points</Eyebrow>
          <SectionHeading>Why AI-built MVPs stall before launch</SectionHeading>
          <BodyText>
            The problem is usually not effort. It&apos;s brittle scaffolding, unclear ownership, and no reliable way to decide what needs rescue first.
          </BodyText>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <FeatureCard
              key={item.title}
              body={item.problem}
              title={item.title}
              tone="cream"
            >
              <div className="space-y-2">
                <Eyebrow as="span">What we fix next</Eyebrow>
                <BodyText className="text-sm sm:text-base">{item.solution}</BodyText>
              </div>
            </FeatureCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
