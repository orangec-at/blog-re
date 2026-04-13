'use client';

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v3";

const industryOptions = [
  { value: "saas", label: "SaaS" },
  { value: "fintech", label: "Fintech" },
  { value: "healthcare", label: "Healthcare" },
  { value: "marketplace", label: "Marketplace" },
] as const;

const teamSizeOptions = [
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-200", label: "51-200" },
  { value: "201+", label: "201+" },
] as const;

const useCaseOptions = [
  { value: "customer-portal", label: "Customer portal" },
  { value: "revenue-ops", label: "Revenue ops" },
  { value: "internal-ops", label: "Internal ops" },
] as const;

const integrationOptions = [
  { value: "slack", label: "Slack" },
  { value: "hubspot", label: "HubSpot" },
  { value: "salesforce", label: "Salesforce" },
] as const;

const departmentOptions = [
  { value: "sales", label: "Sales" },
  { value: "support", label: "Support" },
  { value: "success", label: "Customer success" },
  { value: "operations", label: "Operations" },
] as const;

const complianceOptions = [
  { value: "soc2", label: "SOC 2" },
  { value: "iso27001", label: "ISO 27001" },
  { value: "hipaa", label: "HIPAA" },
] as const;

const onboardingSchema = z
  .object({
    companyName: z.string().trim().min(1, "Company name is required"),
    industry: z.string().min(1, "Industry is required"),
    teamSize: z.string().min(1, "Team size is required"),
    useCase: z.string().min(1, "Select a primary use case"),
    departments: z.array(z.string()),
    seats: z
      .string()
      .trim()
      .min(1, "Invited seats is required")
      .refine((value) => Number(value) > 0, "Invited seats must be at least 1"),
    integrations: z.array(z.string()),
    slackWorkspace: z.string().optional(),
    hubspotPortalId: z.string().optional(),
    salesforceOrg: z.string().optional(),
    needsCompliance: z.boolean(),
    complianceFrameworks: z.array(z.string()),
    securityContact: z.string().optional(),
    customerSupportModel: z.string().optional(),
    internalProcessOwner: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.useCase === "customer-portal" && !value.customerSupportModel?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["customerSupportModel"],
        message: "Customer support model is required",
      });
    }

    if (value.useCase === "internal-ops" && !value.internalProcessOwner?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["internalProcessOwner"],
        message: "Internal process owner is required",
      });
    }

    if (value.integrations.includes("slack") && !value.slackWorkspace?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["slackWorkspace"],
        message: "Slack workspace URL is required",
      });
    }

    if (value.integrations.includes("hubspot") && !value.hubspotPortalId?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["hubspotPortalId"],
        message: "HubSpot portal ID is required",
      });
    }

    if (value.integrations.includes("salesforce") && !value.salesforceOrg?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["salesforceOrg"],
        message: "Salesforce org ID is required",
      });
    }

    if (value.needsCompliance) {
      if (value.complianceFrameworks.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["complianceFrameworks"],
          message: "Select at least one framework",
        });
      }

      if (!value.securityContact?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["securityContact"],
          message: "Security contact is required",
        });
      }
    }
  });

type OnboardingValues = z.infer<typeof onboardingSchema>;

const defaultValues: OnboardingValues = {
  companyName: "",
  industry: "",
  teamSize: "",
  useCase: "",
  departments: [],
  seats: "",
  integrations: [],
  slackWorkspace: "",
  hubspotPortalId: "",
  salesforceOrg: "",
  needsCompliance: false,
  complianceFrameworks: [],
  securityContact: "",
  customerSupportModel: "",
  internalProcessOwner: "",
};

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm font-medium text-red-600">{message}</p>;
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zapier-gray">{label}</p>
      <p className="text-sm text-zapier-charcoal">{value || "Not set yet"}</p>
    </div>
  );
}

function titleCase(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function WorkspaceOnboardingDemo() {
  const [submitted, setSubmitted] = useState<OnboardingValues | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues,
  });

  const values = useWatch({ control });
  const selectedIntegrations = values.integrations ?? [];
  const selectedFrameworks = values.complianceFrameworks ?? [];
  const selectedDepartments = values.departments ?? [];

  const summary = {
    useCase: values.useCase ? titleCase(values.useCase) : "",
    integrations:
      selectedIntegrations.length > 0 ? selectedIntegrations.map(titleCase).join(", ") : "",
    departments:
      selectedDepartments.length > 0 ? selectedDepartments.map(titleCase).join(", ") : "",
    frameworks:
      selectedFrameworks.length > 0 ? selectedFrameworks.map(titleCase).join(", ") : "",
  };

  if (submitted) {
    return (
      <section
        data-testid="workspace-onboarding-demo-success"
        className="grid gap-6 rounded-[32px] border border-zapier-sand bg-cream p-6 shadow-sm lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] lg:p-8"
      >
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zapier-gray">
            Review state
          </p>
          <h2 className="text-3xl font-semibold text-zapier-black sm:text-4xl">
            Launch-ready workspace plan
          </h2>
          <p className="max-w-2xl text-base text-zapier-charcoal">
            The form has validated the onboarding data and translated it into a rollout summary for
            the product team.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <SummaryItem label="Company" value={submitted.companyName} />
            <SummaryItem label="Industry" value={submitted.industry.toUpperCase()} />
            <SummaryItem label="Team size" value={submitted.teamSize} />
            <SummaryItem label="Primary use case" value={titleCase(submitted.useCase)} />
            <SummaryItem
              label="Integrations"
              value={(submitted.integrations ?? []).map(titleCase).join(", ")}
            />
            <SummaryItem label="Invited seats" value={submitted.seats} />
          </div>
        </div>

        <aside className="space-y-4 rounded-3xl border border-zapier-sand bg-offwhite p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zapier-gray">
            Handoff notes
          </p>
          <ul className="space-y-3 text-sm text-zapier-charcoal">
            <li>• Validation rules are encoded with Zod before any API integration.</li>
            <li>• Conditional fields stay hidden until the user context makes them relevant.</li>
            <li>• The summary can feed a real review or provisioning step later.</li>
          </ul>
        </aside>
      </section>
    );
  }

  return (
    <section
      data-testid="workspace-onboarding-demo"
      className="grid gap-6 rounded-[32px] border border-zapier-sand bg-cream p-6 shadow-sm lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] lg:p-8"
    >
      <form className="space-y-8" onSubmit={handleSubmit((data) => setSubmitted(data))}>
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zapier-gray">
            Product scenario
          </p>
          <h2 className="text-3xl font-semibold text-zapier-black sm:text-4xl">
            Workspace onboarding
          </h2>
          <p className="max-w-2xl text-base text-zapier-charcoal">
            A B2B onboarding flow for product teams that need conditional inputs, validation, and a
            clear implementation summary before launch.
          </p>
        </div>

        <section className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-zapier-black">Company profile</h3>
            <p className="text-sm text-zapier-charcoal">
              Capture the core context that shapes onboarding recommendations.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-zapier-charcoal">
              <span>Company name</span>
              <input
                {...register("companyName")}
                className="w-full rounded-2xl border border-zapier-sand bg-offwhite px-4 py-3"
                placeholder="Acme RevOps"
              />
              <FieldError message={errors.companyName?.message} />
            </label>

            <label className="space-y-2 text-sm font-medium text-zapier-charcoal">
              <span>Industry</span>
              <select
                {...register("industry")}
                className="w-full rounded-2xl border border-zapier-sand bg-offwhite px-4 py-3"
              >
                <option value="">Select an industry</option>
                {industryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <FieldError message={errors.industry?.message} />
            </label>

            <label className="space-y-2 text-sm font-medium text-zapier-charcoal">
              <span>Team size</span>
              <select
                {...register("teamSize")}
                className="w-full rounded-2xl border border-zapier-sand bg-offwhite px-4 py-3"
              >
                <option value="">Select team size</option>
                {teamSizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <FieldError message={errors.teamSize?.message} />
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-zapier-black">Workspace setup</h3>
            <p className="text-sm text-zapier-charcoal">
              Choose the primary rollout scenario and the teams that will own it.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-zapier-charcoal">
              <span>Primary use case</span>
              <select
                {...register("useCase")}
                className="w-full rounded-2xl border border-zapier-sand bg-offwhite px-4 py-3"
              >
                <option value="">Select a use case</option>
                {useCaseOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <FieldError message={errors.useCase?.message} />
            </label>

            <label className="space-y-2 text-sm font-medium text-zapier-charcoal">
              <span>Invited seats</span>
              <input
                {...register("seats")}
                className="w-full rounded-2xl border border-zapier-sand bg-offwhite px-4 py-3"
                inputMode="numeric"
                placeholder="24"
              />
              <FieldError message={errors.seats?.message} />
            </label>
          </div>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-zapier-charcoal">Departments</legend>
            <div className="flex flex-wrap gap-3">
              {departmentOptions.map((option) => (
                <label
                  key={option.value}
                  className="inline-flex items-center gap-2 rounded-full border border-zapier-sand bg-offwhite px-4 py-2 text-sm"
                >
                  <input type="checkbox" value={option.value} {...register("departments")} />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {values.useCase === "customer-portal" ? (
            <label className="space-y-2 text-sm font-medium text-zapier-charcoal">
              <span>Customer support model</span>
              <input
                {...register("customerSupportModel")}
                className="w-full rounded-2xl border border-zapier-sand bg-offwhite px-4 py-3"
                placeholder="Dedicated onboarding + support pod"
              />
              <FieldError message={errors.customerSupportModel?.message} />
            </label>
          ) : null}

          {values.useCase === "internal-ops" ? (
            <label className="space-y-2 text-sm font-medium text-zapier-charcoal">
              <span>Internal process owner</span>
              <input
                {...register("internalProcessOwner")}
                className="w-full rounded-2xl border border-zapier-sand bg-offwhite px-4 py-3"
                placeholder="Ops enablement lead"
              />
              <FieldError message={errors.internalProcessOwner?.message} />
            </label>
          ) : null}
        </section>

        <section className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-zapier-black">Integrations</h3>
            <p className="text-sm text-zapier-charcoal">
              Select the systems this onboarding flow has to coordinate with.
            </p>
          </div>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-zapier-charcoal">Connected tools</legend>
            <div className="flex flex-wrap gap-3">
              {integrationOptions.map((option) => (
                <label
                  key={option.value}
                  className="inline-flex items-center gap-2 rounded-full border border-zapier-sand bg-offwhite px-4 py-2 text-sm"
                >
                  <input type="checkbox" value={option.value} {...register("integrations")} />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {selectedIntegrations.includes("slack") ? (
            <label className="space-y-2 text-sm font-medium text-zapier-charcoal">
              <span>Slack workspace URL</span>
              <input
                {...register("slackWorkspace")}
                className="w-full rounded-2xl border border-zapier-sand bg-offwhite px-4 py-3"
                placeholder="https://acme.slack.com"
              />
              <FieldError message={errors.slackWorkspace?.message} />
            </label>
          ) : null}

          {selectedIntegrations.includes("hubspot") ? (
            <label className="space-y-2 text-sm font-medium text-zapier-charcoal">
              <span>HubSpot portal ID</span>
              <input
                {...register("hubspotPortalId")}
                className="w-full rounded-2xl border border-zapier-sand bg-offwhite px-4 py-3"
                placeholder="123456"
              />
              <FieldError message={errors.hubspotPortalId?.message} />
            </label>
          ) : null}

          {selectedIntegrations.includes("salesforce") ? (
            <label className="space-y-2 text-sm font-medium text-zapier-charcoal">
              <span>Salesforce org ID</span>
              <input
                {...register("salesforceOrg")}
                className="w-full rounded-2xl border border-zapier-sand bg-offwhite px-4 py-3"
                placeholder="00Dxx0000001ABC"
              />
              <FieldError message={errors.salesforceOrg?.message} />
            </label>
          ) : null}
        </section>

        <section className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-zapier-black">Compliance</h3>
            <p className="text-sm text-zapier-charcoal">
              Reveal governance details only when the rollout requires them.
            </p>
          </div>

          <label className="inline-flex items-center gap-3 rounded-2xl border border-zapier-sand bg-offwhite px-4 py-3 text-sm font-medium text-zapier-charcoal">
            <input type="checkbox" {...register("needsCompliance")} />
            <span>Security and compliance review required</span>
          </label>

          {values.needsCompliance ? (
            <div className="space-y-4 rounded-3xl border border-zapier-sand bg-offwhite p-4">
              <fieldset aria-label="Frameworks in scope" className="space-y-3">
                <legend className="text-sm font-medium text-zapier-charcoal">Frameworks in scope</legend>
                <div className="flex flex-wrap gap-3">
                  {complianceOptions.map((option) => (
                    <label
                      key={option.value}
                      className="inline-flex items-center gap-2 rounded-full border border-zapier-sand bg-cream px-4 py-2 text-sm"
                    >
                      <input type="checkbox" value={option.value} {...register("complianceFrameworks")} />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                <FieldError message={errors.complianceFrameworks?.message} />
              </fieldset>

              <label className="space-y-2 text-sm font-medium text-zapier-charcoal">
                <span>Security contact</span>
                <input
                  {...register("securityContact")}
                  className="w-full rounded-2xl border border-zapier-sand bg-cream px-4 py-3"
                  placeholder="security@acmerevops.com"
                />
                <FieldError message={errors.securityContact?.message} />
              </label>
            </div>
          ) : null}
        </section>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-full bg-zapier-orange px-5 py-3 text-sm font-semibold text-cream"
          >
            Review onboarding plan
          </button>
          <p className="text-sm text-zapier-charcoal">
            Frontend-only demo: this submits to a review state, not a backend.
          </p>
        </div>
      </form>

      <aside className="space-y-5 rounded-[28px] border border-zapier-sand bg-offwhite p-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zapier-gray">
            Live summary
          </p>
          <h3 className="text-2xl font-semibold text-zapier-black">Implementation snapshot</h3>
          <p className="text-sm text-zapier-charcoal">
            This panel updates as the form changes so stakeholders can review scope before shipping.
          </p>
        </div>

        <div className="space-y-4">
          <SummaryItem label="Company" value={values.companyName ?? ""} />
          <SummaryItem label="Industry" value={values.industry ?? ""} />
          <SummaryItem label="Team size" value={values.teamSize ?? ""} />
          <SummaryItem label="Primary use case" value={summary.useCase} />
          <SummaryItem label="Departments" value={summary.departments} />
          <SummaryItem label="Integrations" value={summary.integrations} />
          <SummaryItem label="Compliance" value={values.needsCompliance ? "Required" : "Not required"} />
          {values.needsCompliance ? (
            <SummaryItem label="Frameworks" value={summary.frameworks} />
          ) : null}
        </div>
      </aside>
    </section>
  );
}
