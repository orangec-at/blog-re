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

const auditRows = [
  { label: "P0", name: "출시 차단", value: "auth · secrets · data loss" },
  { label: "P1", name: "파일럿 리스크", value: "failure states · QA gaps" },
  { label: "P2", name: "이후 정리", value: "naming · seams · cleanup" },
];

export function HomeHero({ chooserNote, data }: HomeHeroProps) {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#eef3ff] py-10 sm:py-16"
      data-testid="home-redesign-hero"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-32 bg-[linear-gradient(90deg,#533afd_0%,#6b5cff_44%,#ff8b61_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute right-[-14rem] top-24 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#d9d7ff] blur-3xl"
      />

      <Container
        variant="wide"
        className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.78fr)] lg:items-stretch"
      >
        <div className="flex min-h-[680px] flex-col justify-between bg-[#fbfcff] px-6 py-7 shadow-[0_36px_90px_-62px_rgba(50,50,93,0.45)] sm:px-8 sm:py-9 lg:px-10">
          <div className="space-y-7">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow className="text-[#533afd]">{data.eyebrow}</Eyebrow>
              <span className="font-sans text-sm text-[#64748d]">AI-built MVP rescue desk</span>
            </div>

            <DisplayHeading className="max-w-3xl whitespace-pre-line text-5xl leading-[0.98] sm:text-7xl sm:leading-[0.94]">
              {data.title}
            </DisplayHeading>

            <div className="grid gap-6 border-y border-[#d6d9fc] py-6 lg:grid-cols-[minmax(0,1fr)_13rem]">
              <BodyText className="text-lg sm:text-xl">{data.subtitle}</BodyText>
              <div className="space-y-2 font-sans text-sm text-[#64748d]">
                <p className="text-xs font-semibold uppercase tracking-[0.5px] text-[#533afd]">Launch gate</p>
                <p>고칠 것 / 미룰 것 / 멈출 것을 한 번에 분리합니다.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "구조 복구",
                "출시 준비도",
                "Founder-side 기술 번역",
              ].map((label) => (
                <PillTag key={label} className="rounded-[5px] border-[#c7ccff] bg-[#f4f7ff] text-[#061b31]">
                  {label}
                </PillTag>
              ))}
            </div>

            <CTAGroup
              className="pt-1"
              primaryAction={data.primaryCta}
              secondaryAction={data.secondaryCta}
            />
          </div>

          <div className="mt-10 grid gap-4 border-t border-[#d6d9fc] pt-6 sm:grid-cols-[10rem_minmax(0,1fr)]">
            <Eyebrow className="text-[#533afd]">추천 시작점</Eyebrow>
            <BodyText className="text-sm sm:text-base">{chooserNote}</BodyText>
          </div>
        </div>

        <ConsolePanel
          className="min-h-[680px] shadow-[0_42px_70px_-42px_rgba(28,30,84,0.58)]"
          aside={<PillTag className="rounded-[5px] border-[#d6d9fc] bg-white text-[#533afd]">MVP 빠른 진단</PillTag>}
          heading="진단 콘솔"
          kicker="FMV Diagnostic Console"
          summary={data.consoleSummary}
        >
          <div className="space-y-px bg-white/10">
            <div className="bg-[#23266a] p-5 sm:p-6">
              <div className="grid grid-cols-3 gap-px overflow-hidden bg-white/12 font-sans text-white">
                {auditRows.map((row) => (
                  <div key={row.label} className="bg-[#1c1e54] p-3 sm:p-4">
                    <p className="text-xs font-semibold text-[#ffb08a]">{row.label}</p>
                    <p className="mt-2 text-sm font-semibold">{row.name}</p>
                    <p className="mt-1 text-xs leading-5 text-white/68">{row.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1c1e54] p-5 sm:p-6">
              <SignalList
                className="h-full"
                headingLevel={2}
                items={data.symptomItems}
                title="먼저 보는 위험 신호"
                tone="inverse"
              />
            </div>

            <section className="bg-[#181a49] p-5 sm:p-6">
              <h2 className="font-sans text-2xl font-light tracking-[-0.04em] text-white">
                진단 범위
              </h2>
              <div className="mt-5 grid gap-4">
                {data.auditAreas.map((area, index) => (
                  <div key={area.title} className="grid gap-3 border-t border-white/12 pt-4 first:border-t-0 first:pt-0 sm:grid-cols-[2.5rem_minmax(0,1fr)]">
                    <p className="font-sans text-xs font-semibold text-[#ffb08a]">0{index + 1}</p>
                    <div>
                      <p className="font-sans text-base font-medium text-white sm:text-lg">
                        {area.title}
                      </p>
                      <BodyText className="mt-2 text-base font-light leading-7 text-white/82">
                        {area.detail}
                      </BodyText>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="bg-[#23266a] p-5 sm:p-6">
              <SignalList
                headingLevel={2}
                items={data.outcomeItems}
                title="받게 되는 결과물"
                tone="inverse"
              />
            </div>
          </div>
        </ConsolePanel>
      </Container>
    </section>
  );
}
