import { ProofArtifactCard } from "@/components/marketing/proof-artifact-card";
import { Container } from "@/components/layout/container";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { SectionHeading } from "@/components/ui/typography/section-heading";
import type { Project } from "@/data/projects";

type FeaturedInsightRowProps = {
  items: Project[];
};

const proofMeta: Record<string, { artifact: string; proof: string }> = {
  fixmyvibe: {
    artifact: "Automation audit trail",
    proof: "MVP demo + GitHub",
  },
  drawhatha: {
    artifact: "Infrastructure notebook",
    proof: "Cutover checklist",
  },
  iac: {
    artifact: "Sprint-ready kit",
    proof: "Repo scaffold",
  },
};

function getProofMeta(item: Project) {
  return proofMeta[item.id] ?? { artifact: "Proof artifact", proof: "Domain page" };
}

export function FeaturedInsightRow({ items }: FeaturedInsightRowProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container variant="wide" className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="max-w-3xl space-y-4">
            <Eyebrow>Featured proof content</Eyebrow>
            <SectionHeading>이미 있는 proof를 바로 확인하세요</SectionHeading>
          </div>
          <BodyText>
            도메인 페이지, GitHub, 샘플 리포트가 흩어져 있지 않도록 홈에서 바로 연결합니다. 방문자는 실제 작업 흔적을 먼저 보고 상담 여부를 판단할 수 있습니다.
          </BodyText>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((item) => {
            const meta = getProofMeta(item);

            return <ProofArtifactCard key={item.id} artifact={meta.artifact} item={item} proof={meta.proof} />;
          })}
        </div>
      </Container>
    </section>
  );
}
