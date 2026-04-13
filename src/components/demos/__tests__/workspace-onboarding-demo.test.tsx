import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { WorkspaceOnboardingDemo } from "@/components/demos/workspace-onboarding-demo";

describe("WorkspaceOnboardingDemo", () => {
  it("renders the core onboarding fields", () => {
    render(<WorkspaceOnboardingDemo />);

    expect(
      screen.getByRole("heading", { name: /workspace onboarding/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/industry/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/team size/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/primary use case/i)).toBeInTheDocument();
  });

  it("reveals contextual fields when the use case changes", async () => {
    const user = userEvent.setup();

    render(<WorkspaceOnboardingDemo />);

    await user.selectOptions(screen.getByLabelText(/primary use case/i), "customer-portal");

    expect(screen.getByLabelText(/customer support model/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/internal process owner/i)).not.toBeInTheDocument();
  });

  it("reveals integration-specific fields only when integrations are selected", async () => {
    const user = userEvent.setup();

    render(<WorkspaceOnboardingDemo />);

    await user.click(screen.getByLabelText(/slack/i));
    await user.click(screen.getByLabelText(/hubspot/i));

    expect(screen.getByLabelText(/slack workspace url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hubspot portal id/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/salesforce org id/i)).not.toBeInTheDocument();
  });

  it("reveals compliance inputs when advanced requirements are enabled", async () => {
    const user = userEvent.setup();

    render(<WorkspaceOnboardingDemo />);

    await user.click(screen.getByLabelText(/security and compliance review required/i));

    expect(screen.getByLabelText(/frameworks in scope/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/security contact/i)).toBeInTheDocument();
  });

  it("shows validation errors on invalid submit", async () => {
    const user = userEvent.setup();

    render(<WorkspaceOnboardingDemo />);

    await user.click(screen.getByRole("button", { name: /review onboarding plan/i }));

    expect(screen.getByText(/company name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/industry is required/i)).toBeInTheDocument();
    expect(screen.getByText(/select a primary use case/i)).toBeInTheDocument();
  });

  it("shows a review state after a valid submit", async () => {
    const user = userEvent.setup();

    render(<WorkspaceOnboardingDemo />);

    await user.type(screen.getByLabelText(/company name/i), "Acme RevOps");
    await user.selectOptions(screen.getByLabelText(/industry/i), "saas");
    await user.selectOptions(screen.getByLabelText(/team size/i), "51-200");
    await user.selectOptions(screen.getByLabelText(/primary use case/i), "revenue-ops");
    await user.click(screen.getByLabelText(/salesforce/i));
    await user.type(screen.getByLabelText(/salesforce org id/i), "00Dxx0000001ABC");
    await user.type(screen.getByLabelText(/invited seats/i), "24");
    await user.click(screen.getByRole("button", { name: /review onboarding plan/i }));

    expect(screen.getByRole("heading", { name: /launch-ready workspace plan/i })).toBeInTheDocument();
    expect(screen.getByText(/acme revops/i)).toBeInTheDocument();
    expect(screen.getByText(/revenue ops/i)).toBeInTheDocument();
  });
});
