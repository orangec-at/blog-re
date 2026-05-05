import { Container } from "@/components/layout/container";
import { TextLink } from "@/components/ui/actions/text-link";
import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { SectionHeading } from "@/components/ui/typography/section-heading";
import type { Project } from "@/data/projects";

type FeaturedInsightRowProps = {
  items: Project[];
};

export function FeaturedInsightRow({ items }: FeaturedInsightRowProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container variant="wide" className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <Eyebrow>Featured proof content</Eyebrow>
          <SectionHeading>이미 있는 proof를 바로 확인하세요</SectionHeading>
          <BodyText>
            도메인 페이지, GitHub, 샘플 리포트가 흩어져 있지 않도록 홈에서 바로 연결합니다. 방문자는 실제 작업 흔적을 먼저 보고 상담 여부를 판단할 수 있습니다.
          </BodyText>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <BorderedSurface key={item.id} as="article" className="flex h-full flex-col gap-4" tone="offwhite">
              <div className="space-y-3">
                <SectionHeading as="h3" className="text-2xl leading-tight sm:text-3xl sm:leading-tight">
                  {item.name}
                </SectionHeading>
                <BodyText className="text-sm sm:text-base">{item.summary}</BodyText>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-pill border border-zapier-sand bg-cream px-3 py-1 text-xs font-medium text-zapier-charcoal"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3">
                {item.links.map((link) => (
                  <TextLink key={`${item.id}-${link.href}`} href={link.href}>
                    {link.label}
                  </TextLink>
                ))}
              </div>
            </BorderedSurface>
          ))}
        </div>
      </Container>
    </section>
  );
}
