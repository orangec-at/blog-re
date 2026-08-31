import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ScopeTable } from "@/components/proposal/scope-table";

describe("ScopeTable", () => {
  it("labels both lists, so the exclusions cannot be mistaken for inclusions", () => {
    render(<ScopeTable included={["Risk table"]} excluded={["Full rewrite"]} />);

    expect(screen.getByRole("heading", { name: /what this includes/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /what this does not include/i })).toBeVisible();
    expect(screen.getByText("Risk table")).toBeVisible();
    expect(screen.getByText("Full rewrite")).toBeVisible();
  });
});
