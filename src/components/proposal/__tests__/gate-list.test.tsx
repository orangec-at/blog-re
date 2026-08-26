import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GateList } from "@/components/proposal/gate-list";

const gates = [
  { name: "Supabase", failureMode: "An authenticated user can read another user's rows.", auditQuestion: "Can user A read user B's data?" },
];

describe("GateList", () => {
  it("pairs each gate with what goes wrong and what is asked", () => {
    render(<GateList gates={gates} />);

    expect(screen.getByText("Supabase")).toBeVisible();
    expect(screen.getByText(/An authenticated user can read another user's rows\./)).toBeVisible();
    expect(screen.getByText(/Can user A read user B's data\?/)).toBeVisible();
  });

  it("states no count", () => {
    const { container } = render(<GateList gates={gates} />);

    expect(container.textContent).not.toMatch(/\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|\d+)\s+gates\b/i);
  });
});
