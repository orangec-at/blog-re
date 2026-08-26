import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SystemMapPanel } from "@/components/proposal/system-map-panel";

const layers = [{ name: "Browser UI" }];
const boundaries = [
  { id: "1", between: "Auth → user data", auditQuestion: "Can one user reach another user's records?" },
];

describe("SystemMapPanel motion", () => {
  it("renders every boundary even when IntersectionObserver never fires", () => {
    // jsdom has no IntersectionObserver. If the component hid its boundaries
    // until an observer callback ran, they would be invisible to every reader
    // whose browser blocked the script — and to search.
    vi.stubGlobal("IntersectionObserver", undefined);

    render(<SystemMapPanel layers={layers} boundaries={boundaries} argument="The risk is where the boxes meet." />);

    expect(screen.getByText("Auth → user data")).toBeVisible();

    vi.unstubAllGlobals();
  });
});
