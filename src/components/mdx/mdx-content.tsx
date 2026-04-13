'use client';

/* eslint-disable react-hooks/static-components */
import { useMemo } from "react";
import { getMDXComponent } from "next-contentlayer/hooks";
import DemoPlaceholder from "@/components/demos/demo-placeholder";

const defaultComponents = {
  DemoPlaceholder,
};

export function MDXContentRenderer({ code }: { code: string }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component components={defaultComponents} />;
}
