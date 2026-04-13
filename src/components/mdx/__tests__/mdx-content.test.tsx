import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MDXContentRenderer } from "@/components/mdx/mdx-content";

vi.mock("next-contentlayer/hooks", () => ({
  getMDXComponent: () => {
    return ({ components }: { components: Record<string, React.ComponentType> }) => {
      const WorkspaceDemo = components.WorkspaceOnboardingDemo;

      return WorkspaceDemo ? (
        <WorkspaceDemo />
      ) : (
        <div data-testid="missing-workspace-demo">Missing workspace demo mapping</div>
      );
    };
  },
}));

vi.mock("@/components/demos/workspace-onboarding-demo", () => ({
  WorkspaceOnboardingDemo: () => (
    <div data-testid="workspace-demo-marker">Workspace onboarding demo is available in MDX</div>
  ),
}));

describe("MDXContentRenderer", () => {
  it("exposes the workspace onboarding demo to MDX content", () => {
    render(<MDXContentRenderer code="ignored" defaultDemoLayout="full" />);

    expect(screen.getByTestId("workspace-demo-marker")).toBeInTheDocument();
  });
});
