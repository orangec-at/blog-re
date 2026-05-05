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
          <SectionHeading>AI MVP가 출시 전에 멈추는 이유</SectionHeading>
          <BodyText>
            문제는 보통 노력이 부족해서가 아닙니다. 깨지기 쉬운 scaffolding, 불명확한 책임 경계, 무엇을 먼저 구조해야 하는지 판단할 기준이 없어서 멈춥니다.
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
                <Eyebrow as="span">다음에 고치는 것</Eyebrow>
                <BodyText className="text-sm sm:text-base">{item.solution}</BodyText>
              </div>
            </FeatureCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
