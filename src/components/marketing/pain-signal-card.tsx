import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";

type PainSignalCardProps = {
  index: number;
  problem: string;
  solution: string;
  title: string;
};

export function PainSignalCard({ index, problem, solution, title }: PainSignalCardProps) {
  return (
    <Card className="relative flex h-full flex-col overflow-hidden p-6">
      <span aria-hidden="true" className="absolute right-5 top-4 font-display text-5xl leading-none text-[#dfe4f3]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <CardHeader>
        <CardTitle className="text-3xl sm:text-4xl">{title}</CardTitle>
        <CardDescription>{problem}</CardDescription>
      </CardHeader>
      <Separator className="my-5" />
      <CardContent className="gap-2 p-0">
        <Eyebrow as="span">다음에 고치는 것</Eyebrow>
        <BodyText className="text-sm sm:text-base">{solution}</BodyText>
      </CardContent>
    </Card>
  );
}
