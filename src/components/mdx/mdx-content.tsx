'use client';

/* eslint-disable react-hooks/static-components */
import type { ReactNode } from "react";
import { useMemo } from "react";
import { getMDXComponent } from "next-contentlayer/hooks";
import DemoPlaceholder from "@/components/demos/demo-placeholder";
import { WorkspaceOnboardingDemo } from "@/components/demos/workspace-onboarding-demo";
import { DeviceFrame } from "@/components/demos/device-frame";
import { DemoFrame, DemoMeta, type DemoLayout, type DemoLink } from "@/components/layout/demo-frame";
import { FullWidth } from "@/components/layout/full-width";

type WrapperProps = {
  children: ReactNode;
  className?: string;
};

type DemoProps = {
  title: string;
  description?: string;
  layout?: DemoLayout;
  stack?: string[];
  links?: DemoLink[];
  children: ReactNode;
};

const createMdxComponents = (defaultDemoLayout: DemoLayout) => ({
  DemoPlaceholder,
  WorkspaceOnboardingDemo,
  DeviceFrame,
  Demo: ({ layout = defaultDemoLayout, ...props }: DemoProps) => (
    <DemoFrame layout={layout} {...props} />
  ),
  DemoMeta,
  FullWidth: ({ children, className = "" }: WrapperProps) => (
    <FullWidth className={`py-8 ${className}`.trim()}>{children}</FullWidth>
  ),
  Narrow: ({ children, className = "" }: WrapperProps) => (
    <FullWidth variant="narrow" className={`py-8 ${className}`.trim()}>
      {children}
    </FullWidth>
  ),
});

export function MDXContentRenderer({
  code,
  defaultDemoLayout = "narrow",
}: {
  code: string;
  defaultDemoLayout?: DemoLayout;
}) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const components = useMemo(() => createMdxComponents(defaultDemoLayout), [defaultDemoLayout]);

  return <Component components={components} />;
}
