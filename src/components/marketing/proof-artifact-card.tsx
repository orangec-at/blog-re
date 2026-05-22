import { TextLink } from "@/components/ui/actions/text-link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Project } from "@/data/projects";

type ProofArtifactCardProps = {
  artifact: string;
  item: Project;
  proof: string;
};

export function ProofArtifactCard({ artifact, item, proof }: ProofArtifactCardProps) {
  return (
    <Card className="flex h-full flex-col bg-offwhite p-6 transition duration-200 hover:-translate-y-1 hover:border-[#b9b9f9] hover:bg-cream hover:shadow-[0_16px_36px_rgba(6,27,49,0.08)]">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <Badge variant="muted">{artifact}</Badge>
          <Badge variant="label">Proof</Badge>
        </div>
        <CardTitle className="text-3xl sm:text-4xl">{item.name}</CardTitle>
        <CardDescription>{item.summary}</CardDescription>
      </CardHeader>

      <CardContent className="pt-5">
        <Separator />
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium text-zapier-charcoal">
          {item.highlights.map((highlight) => (
            <span key={highlight} className="before:mr-1 before:text-zapier-orange before:content-['•']">
              {highlight}
            </span>
          ))}
        </div>
        <div className="border-t border-dashed border-[#b9b9f9] pt-3 text-sm text-zapier-charcoal">
          <span className="font-semibold text-zapier-black">검증 포인트:</span> {proof}
        </div>
      </CardContent>

      <CardFooter className="pt-5">
        <Separator />
        {item.links.slice(0, 2).map((link) => (
          <TextLink key={`${item.id}-${link.href}`} href={link.href}>
            {link.label} →
          </TextLink>
        ))}
      </CardFooter>
    </Card>
  );
}
