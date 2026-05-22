import { TextLink } from "@/components/ui/actions/text-link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ServiceOffer } from "@/data/services-content";

type ServicePackageCardProps = {
  offer: ServiceOffer;
  packageNumber: number;
  startHere?: boolean;
};

export function ServicePackageCard({ offer, packageNumber, startHere = false }: ServicePackageCardProps) {
  const paddedNumber = String(packageNumber).padStart(2, "0");

  return (
    <Card className="flex h-full flex-col bg-cream p-6 transition duration-200 hover:-translate-y-1 hover:border-[#b9b9f9] hover:shadow-[0_18px_45px_rgba(83,58,253,0.1)]">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <Badge variant="muted">Package {paddedNumber}</Badge>
          {startHere ? <Badge variant="label">Start here</Badge> : null}
        </div>
        <CardTitle className="text-3xl sm:text-4xl">{offer.name}</CardTitle>
        <CardDescription>{offer.summary}</CardDescription>
      </CardHeader>

      <CardContent className="pt-5">
        <Separator />
        <div className="grid gap-2 text-sm">
          <div className="grid grid-cols-[5.5rem_1fr] gap-3">
            <span className="font-semibold text-zapier-black">추천 대상</span>
            <span className="text-zapier-charcoal">{offer.bestFor}</span>
          </div>
          <div className="grid grid-cols-[5.5rem_1fr] gap-3">
            <span className="font-semibold text-zapier-black">결과물</span>
            <span className="text-zapier-charcoal">{offer.outcome}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-5">
        <Separator />
        <TextLink href={offer.ctaHref}>{offer.ctaLabel} →</TextLink>
      </CardFooter>
    </Card>
  );
}
