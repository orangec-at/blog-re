import type { Metadata } from "next";
import { FeaturedInsightRow } from "@/components/home-redesign/featured-insight-row";
import { HomeHero } from "@/components/home-redesign/home-hero";
import { PainPointGrid } from "@/components/home-redesign/pain-point-grid";
import { ProofStatStrip } from "@/components/home-redesign/proof-stat-strip";
import { ServicesPreviewGrid } from "@/components/home-redesign/services-preview-grid";
import { Container } from "@/components/layout/container";
import { TextLink } from "@/components/ui/actions/text-link";
import { CTAGroup } from "@/components/ui/molecules/cta-group";
import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { SectionHeading } from "@/components/ui/typography/section-heading";
import { contactHero } from "@/data/contact-content";
import { homeRescueHero } from "@/data/home-redesign-content";
import { projects } from "@/data/projects";
import { founderHelpItems, resourcesIntro } from "@/data/resources-content";
import { serviceOffers, servicesIntro } from "@/data/services-content";

export const metadata: Metadata = {
  title: "Home",
  description: "Founder-friendly technical debt diagnosis and launch-readiness support for AI-built MVPs.",
  alternates: { canonical: "/" },
};


const proofMetrics = [
  {
    value: "Sample",
    label: "샘플 진단 리포트로 실제 deliverable 형태를 먼저 확인",
  },
  {
    value: String(projects.length),
    label: "프로젝트 페이지와 repo 링크로 확인 가능한 proof story",
  },
  {
    value: String(serviceOffers.length),
    label: "진단, 리모델링, 기술 파트너 지원으로 이어지는 선택지",
  },
];

export default function Home() {
  return (
    <main data-testid="home-page" className="flex flex-col">
      <HomeHero chooserNote={servicesIntro.chooserNote} data={homeRescueHero} />
      <PainPointGrid items={founderHelpItems} />
      <ProofStatStrip metrics={proofMetrics} />
      <ServicesPreviewGrid intro={servicesIntro} offers={serviceOffers} />
      <FeaturedInsightRow items={projects} />

      <section className="bg-cream py-16 sm:py-20">
        <Container variant="wide">
          <BorderedSurface as="section" className="flex flex-col gap-6" tone="offwhite">
            <div className="space-y-4">
              <Eyebrow>Next step</Eyebrow>
              <SectionHeading>가장 작은 진단부터 시작하세요</SectionHeading>
              <BodyText>{contactHero.body}</BodyText>
              <BodyText className="text-sm sm:text-base">{resourcesIntro.downloadNote}</BodyText>
            </div>

            <CTAGroup
              primaryAction={{ href: "/contact", label: "기술 부채 진단 문의하기" }}
              secondaryAction={{ href: "/posts/ai-mvp-technical-debt-audit-sample-report", label: "샘플 진단 리포트 읽어보기 →" }}
            />

            <TextLink href="/services">서비스 패키지 비교하기</TextLink>
          </BorderedSurface>
        </Container>
      </section>
    </main>
  );
}
