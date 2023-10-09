/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import ContentLayout from "./content-layout";
import "@testing-library/jest-dom";

describe("ContentLayout", () => {
  it("renders its children inside an <article>", () => {
    render(<ContentLayout>My text content</ContentLayout>);
    expect(screen.getByRole("article")).toHaveTextContent("My text content");
  });
});
