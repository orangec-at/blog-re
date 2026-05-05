import { Container } from "@/components/layout/container";
import { MetricCard } from "@/components/ui/molecules/metric-card";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { SectionHeading } from "@/components/ui/typography/section-heading";

type ProofMetric = {
  label: string;
  value: string;
};

type ProofStatStripProps = {
  metrics: ProofMetric[];
};

export function ProofStatStrip({ metrics }: ProofStatStripProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container variant="wide" className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <Eyebrow>Proof / results</Eyebrow>
          <SectionHeading>말보다 증거를 먼저 보여드립니다</SectionHeading>
          <BodyText>
            추상적인 “구조해드립니다”보다 실제 샘플 진단 리포트, 서비스 패키지, 프로젝트 페이지로 판단할 수 있게 연결합니다.
          </BodyText>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              tone={index % 2 === 0 ? "offwhite" : "cream"}
              value={metric.value}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
