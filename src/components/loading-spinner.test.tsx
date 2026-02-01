import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoadingSpinner from "./loading-spinner";

describe("LoadingSpinner", () => {
  it("renders with a title", () => {
    render(<LoadingSpinner />);
    expect(screen.getByTitle("Loading")).toBeInTheDocument();
  });
  it("accepts an extra className", () => {
    render(<LoadingSpinner className="foo" />);
    expect(document.querySelector(".foo")).toBeInTheDocument();
  });
});
