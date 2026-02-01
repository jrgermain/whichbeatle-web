import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContentLayout from "./content-layout";

describe("ContentLayout", () => {
  it("renders its children inside an <article>", () => {
    render(<ContentLayout>My text content</ContentLayout>);
    expect(screen.getByRole("article")).toHaveTextContent("My text content");
  });
});
