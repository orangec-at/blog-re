import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { BodyText } from "@/components/ui/typography/body-text";

type MetricCardProps = {
  className?: string;
  label: string;
  tone?: "cream" | "offwhite";
  value: string;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function MetricCard({ className, label, tone = "cream", value }: MetricCardProps) {
  return (
    <BorderedSurface
      as="article"
      className={joinClasses("flex flex-col gap-3", className)}
      tone={tone}
    >
      <p className="font-display text-4xl font-medium leading-none text-zapier-black sm:text-5xl">{value}</p>
      <BodyText>{label}</BodyText>
    </BorderedSurface>
  );
}
