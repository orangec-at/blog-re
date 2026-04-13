import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BeforeAfterBoard } from "@/components/home/before-after-board";
import { beforeAfterBoard } from "@/data/homepage-content";

describe("BeforeAfterBoard", () => {
  it("shows before and after cards", () => {
    render(<BeforeAfterBoard cards={beforeAfterBoard} />);

    const section = screen.getByTestId("before-after-board");
    expect(section).toBeInTheDocument();
    expect(section).toHaveTextContent(beforeAfterBoard[0].before.title);
    expect(section).toHaveTextContent(beforeAfterBoard[0].after.title);
  });
});
