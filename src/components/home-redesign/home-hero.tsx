import { Container } from "@/components/layout/container";
import { CTAGroup } from "@/components/ui/molecules/cta-group";
import { PillTag } from "@/components/ui/feedback/pill-tag";
import { SignalList } from "@/components/ui/patterns/signal-list";
import { ConsolePanel } from "@/components/ui/surfaces/console-panel";
import { BodyText, DisplayHeading, Eyebrow } from "@/components/ui/typography";
import type { HomeRescueHero } from "@/data/home-redesign-content";

type HomeHeroProps = {
  chooserNote: string;
  data: HomeRescueHero;
};

export function HomeHero({ chooserNote, data }: HomeHeroProps) {
  return (
    <section className="bg-cream py-16 sm:py-24" data-testid="home-redesign-hero">
      <Container
        variant="wide"
        className="grid gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-stretch"
      >
        <div className="flex flex-col justify-between gap-8">
          <div className="space-y-6">
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <DisplayHeading className="max-w-3xl whitespace-pre-line text-4xl leading-[1.05] sm:text-6xl sm:leading-[0.98]">
              {data.title}
            </DisplayHeading>
            <BodyText className="max-w-2xl text-lg sm:text-xl">{data.subtitle}</BodyText>

            <div className="flex flex-wrap gap-3">
              <PillTag className="border-zapier-orange/30 bg-[#fff4ec] text-zapier-black">
                구조 복구
              </PillTag>
              <PillTag className="border-zapier-orange/30 bg-[#fff4ec] text-zapier-black">
                출시 준비도
              </PillTag>
              <PillTag className="border-zapier-orange/30 bg-[#fff4ec] text-zapier-black">
                Founder-side 기술 번역
              </PillTag>
            </div>

            <CTAGroup
              className="pt-2"
              primaryAction={data.primaryCta}
              secondaryAction={data.secondaryCta}
            />
          </div>

          <div className="max-w-2xl space-y-3 border-l-4 border-zapier-orange pl-4">
            <Eyebrow className="text-zapier-orange">추천 시작점</Eyebrow>
            <BodyText className="text-sm sm:text-base">{chooserNote}</BodyText>
          </div>
        </div>

        <ConsolePanel
          aside={<PillTag className="border-zapier-sand bg-cream text-zapier-black">MVP 빠른 진단</PillTag>}
          heading="진단 콘솔"
          kicker="FMV Diagnostic Console"
          summary={data.consoleSummary}
        >
          <div className="grid gap-px bg-[#6f6258]">
            <div className="bg-[#2b211e] p-5 sm:p-6">
              <SignalList
                className="h-full"
                headingLevel={2}
                items={data.symptomItems}
                title="먼저 보는 위험 신호"
                tone="inverse"
              />
            </div>

            <div className="bg-[#221a18]">
              <section className="p-5 sm:p-6">
                <h2 className="font-sans text-2xl font-semibold tracking-[-0.02em] text-[#fffaf6]">
                  진단 범위
                </h2>
                <div className="mt-5 grid gap-3">
                  {data.auditAreas.map((area) => (
                    <div
                      key={area.title}
                      className="rounded-2xl border border-[#6f6258] bg-white/[0.04] p-4"
                    >
                      <p className="font-sans text-base font-semibold text-[#fffaf6] sm:text-lg">
                        {area.title}
                      </p>
                      <BodyText className="mt-2 text-base font-medium leading-7 text-[#fff4ed]">
                        {area.detail}
                      </BodyText>
                    </div>
                  ))}
                </div>
              </section>

              <div className="border-t border-[#6f6258] p-5 sm:p-6">
                <SignalList
                  headingLevel={2}
                  items={data.outcomeItems}
                  title="받게 되는 결과물"
                  tone="inverse"
                />
              </div>
            </div>
          </div>
        </ConsolePanel>
      </Container>
    </section>
  );
}
