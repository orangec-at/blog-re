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
          <SectionHeading>Real proof beats a vague rescue promise</SectionHeading>
          <BodyText>
            The site already has real project proof, working demo pages, and typed service content. The home route now surfaces that evidence instead of hiding it behind blog-first navigation.
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
