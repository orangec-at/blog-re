import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SystemMapPanel } from "@/components/proposal/system-map-panel";

const layers = [{ name: "Browser UI" }, { name: "Database" }];
const boundaries = [
  { id: "1", between: "Auth → user data", auditQuestion: "Can one user reach another user's records?" },
];

describe("SystemMapPanel", () => {
  it("exposes the layers and boundaries as text, not only as drawing", () => {
    // The panel is the argument of the page. Rendered purely as SVG shapes it
    // would say nothing to a screen reader or to search.
    render(<SystemMapPanel layers={layers} boundaries={boundaries} argument="The risk is where the boxes meet." />);

    expect(screen.getByText("Browser UI")).toBeVisible();
    expect(screen.getByText("Database")).toBeVisible();
    expect(screen.getByText("Auth → user data")).toBeVisible();
    expect(screen.getByText(/Can one user reach another user's records\?/)).toBeVisible();
  });

  it("states the argument the drawing makes", () => {
    render(<SystemMapPanel layers={layers} boundaries={boundaries} argument="The risk is where the boxes meet." />);

    expect(screen.getByText("The risk is where the boxes meet.")).toBeVisible();
  });
});
