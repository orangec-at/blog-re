import { MetricCard } from "@/components/ui/molecules/metric-card";

type ProofMetricCardProps = {
  label: string;
  tone?: "cream" | "offwhite";
  value: string;
};

export function ProofMetricCard({ label, tone = "cream", value }: ProofMetricCardProps) {
  return <MetricCard label={label} tone={tone} value={value} />;
}
