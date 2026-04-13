'use client';

import dynamic from "next/dynamic";
import type { DemoLayout } from "@/components/layout/demo-frame";

const MDXContentRenderer = dynamic(
  () => import("./mdx-content").then((module) => module.MDXContentRenderer),
  {
    ssr: false,
    loading: () => <p className="text-sm text-zapier-gray">Loading walkthrough…</p>,
  },
);

export function ClientPostContent({
  code,
  defaultDemoLayout = "narrow",
}: {
  code: string;
  defaultDemoLayout?: DemoLayout;
}) {
  return <MDXContentRenderer code={code} defaultDemoLayout={defaultDemoLayout} />;
}
