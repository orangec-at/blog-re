import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RefactoringLog } from "@/components/home/refactoring-log";
import { refactoringLog } from "@/data/homepage-content";

describe("RefactoringLog", () => {
  it("shows refactoring entries", () => {
    render(<RefactoringLog entries={refactoringLog} />);

    const section = screen.getByTestId("refactoring-log");
    expect(section).toBeInTheDocument();
    expect(section).toHaveTextContent(refactoringLog[0].title);
  });
});
