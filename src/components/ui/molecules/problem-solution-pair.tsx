import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";

type ProblemSolutionPairProps = {
  className?: string;
  problem: string;
  problemLabel?: string;
  solution: string;
  solutionLabel?: string;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function PairSide({ copy, label }: { copy: string; label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Eyebrow>{label}</Eyebrow>
      <BodyText>{copy}</BodyText>
    </div>
  );
}

export function ProblemSolutionPair({
  className,
  problem,
  problemLabel = "Problem",
  solution,
  solutionLabel = "Solution",
}: ProblemSolutionPairProps) {
  return (
    <BorderedSurface
      as="article"
      className={joinClasses("grid gap-6 md:grid-cols-2", className)}
      tone="offwhite"
    >
      <PairSide copy={problem} label={problemLabel} />
      <PairSide copy={solution} label={solutionLabel} />
    </BorderedSurface>
  );
}
