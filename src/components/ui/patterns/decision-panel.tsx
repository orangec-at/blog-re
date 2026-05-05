import { TextLink } from "@/components/ui/button";
import { PanelSurface } from "@/components/ui/surfaces/panel-surface";
import { BodyText, Eyebrow, SectionHeading } from "@/components/ui/typography";

type DecisionPanelProps = {
  ctaHref: string;
  ctaLabel: string;
  className?: string;
  outcome: string;
  summary: string;
  title: string;
  tone?: "default" | "muted" | "accent";
  whyItFits: string;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function DecisionPanel({
  ctaHref,
  ctaLabel,
  className,
  outcome,
  summary,
  title,
  tone = "default",
  whyItFits,
}: DecisionPanelProps) {
  return (
    <PanelSurface as="article" className={joinClasses("flex h-full flex-col gap-5", className)} tone={tone}>
      <div className="space-y-3">
        <SectionHeading as="h3" className="text-2xl sm:text-3xl sm:leading-tight">
          {title}
        </SectionHeading>
        <BodyText className="text-sm sm:text-base">{summary}</BodyText>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Eyebrow as="span">Why it fits</Eyebrow>
          <BodyText className="text-sm sm:text-base">{whyItFits}</BodyText>
        </div>
        <div className="space-y-2">
          <Eyebrow as="span">What you leave with</Eyebrow>
          <BodyText className="text-sm sm:text-base">{outcome}</BodyText>
        </div>
      </div>

      <div className="mt-auto pt-2">
        <TextLink href={ctaHref}>{ctaLabel}</TextLink>
      </div>
    </PanelSurface>
  );
}
