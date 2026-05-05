import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { PostConversionRail, PostMobileConversionRail, type ConversionRailConfig } from "@/components/content/post-conversion-rail";
import { Container } from "@/components/layout/container";
import { FullWidth } from "@/components/layout/full-width";
import { NarrowPage } from "@/components/layout/narrow-page";
import { ClientPostContent } from "@/components/mdx/client-post-content";
import { PrimaryButton } from "@/components/ui/actions/primary-button";
import { SecondaryButton } from "@/components/ui/actions/secondary-button";

const checklistRail: ConversionRailConfig = {
  ctaLabel: "진단 문의",
  description: "글을 읽는 것에서 끝내지 않고, 실제 출시 리스크를 산출물로 정리합니다.",
  navLabel: "AI MVP checklist sections",
  railTitle: "진단 산출물",
  sections: [
    { href: "#auth-session", label: "Auth & Session" },
    { href: "#data-ownership", label: "Data Ownership" },
    { href: "#secrets", label: "Secrets" },
    { href: "#failure-states", label: "Failure States" },
    { href: "#validation", label: "Validation" },
    { href: "#deploy-path", label: "Deploy Path" },
    { href: "#handoff", label: "Handoff" },
  ],
  secondaryHref: "/posts/ai-mvp-technical-debt-audit-sample-report",
  secondaryLabel: "샘플 리포트",
  title: "Risk table · System map · 2주 stabilization plan",
};

const sampleReportRail: ConversionRailConfig = {
  ctaLabel: "진단 문의",
  description: "샘플을 읽은 뒤 우리 MVP의 리포트가 어떻게 생길지 바로 상담으로 연결합니다.",
  navLabel: "Sample audit report sections",
  railTitle: "샘플 리포트 구성",
  sections: [
    { href: "#executive-summary", label: "Executive Summary" },
    { href: "#system-map", label: "System Map" },
    { href: "#risk-table", label: "Risk Table" },
    { href: "#security-data", label: "Security & Data" },
    { href: "#stabilization-plan", label: "2주 Plan" },
    { href: "#go-no-go", label: "Go / No-Go" },
  ],
  secondaryHref: "/posts/ai-mvp-launch-checklist",
  secondaryLabel: "체크리스트로 돌아가기",
  title: "Executive summary · Risk table · Go / No-Go",
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  if (post.layout === "full") {
    return (
      <>
        <FullWidth
          className="border-y border-zapier-sand bg-offwhite py-16"
          contentClassName="space-y-6"
        >
          <div data-testid="post-full-layout" className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.25em] text-zapier-gray">{post.domain}</p>
              <h1 className="text-4xl font-semibold text-zapier-black sm:text-5xl">{post.title}</h1>
              <p className="max-w-3xl text-lg text-zapier-charcoal">{post.summary}</p>
            </div>
            <div className="space-y-3 rounded-2xl border border-zapier-sand bg-cream p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zapier-gray">
                Layout sample
              </p>
              <p className="text-sm text-zapier-charcoal">
                This post uses the full-width shell so demos can break out of the reading column and feel
                closer to a product walkthrough.
              </p>
            </div>
          </div>
        </FullWidth>

        <Container variant="narrow" className="space-y-8 py-12">
          <article className="prose prose-neutral max-w-none prose-a:text-zapier-orange">
            <div data-testid="post-full-body">
              <ClientPostContent code={post.body.code} defaultDemoLayout={post.layout} />
            </div>
          </article>
        </Container>
      </>
    );
  }

  const railConfig = post.slug === "ai-mvp-launch-checklist"
    ? checklistRail
    : post.slug === "ai-mvp-technical-debt-audit-sample-report"
      ? sampleReportRail
      : null;

  if (railConfig) {
    return (
      <Container className="py-12">
        <div data-testid="post-narrow-layout" className="mx-auto max-w-4xl space-y-5 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-zapier-orange">FixMyVibe by wakeymoment</p>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.055em] text-zapier-black sm:text-6xl">{post.title}</h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-zapier-charcoal sm:text-lg">{post.summary}</p>
          <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
            <PrimaryButton href="/contact">기술 부채 진단 문의하기</PrimaryButton>
            <SecondaryButton href={post.slug === "ai-mvp-launch-checklist" ? "/posts/ai-mvp-technical-debt-audit-sample-report" : "/posts/ai-mvp-launch-checklist"}>
              {post.slug === "ai-mvp-launch-checklist" ? "샘플 리포트 보기" : "체크리스트 보기"}
            </SecondaryButton>
          </div>
        </div>
        <PostMobileConversionRail config={railConfig} />
        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <article className="prose prose-neutral max-w-none prose-a:text-zapier-orange">
            <ClientPostContent code={post.body.code} defaultDemoLayout={post.layout} />
          </article>
          <PostConversionRail config={railConfig} />
        </div>
      </Container>
    );
  }

  return (
    <NarrowPage>
      <div data-testid="post-narrow-layout" className="mx-auto max-w-3xl space-y-5 text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-zapier-orange">{post.domain}</p>
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.055em] text-zapier-black sm:text-6xl">{post.title}</h1>
        <p className="mx-auto max-w-2xl text-base leading-7 text-zapier-charcoal sm:text-lg">{post.summary}</p>
      </div>
      <article className="prose prose-neutral max-w-none prose-a:text-zapier-orange">
        <ClientPostContent code={post.body.code} defaultDemoLayout={post.layout} />
      </article>
    </NarrowPage>
  );
}
