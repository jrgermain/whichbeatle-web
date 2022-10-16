/**
 * @jest-environment jsdom
 */

import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import ContentLayout from "./content-layout";
import "@testing-library/jest-dom";

let container: Element | null = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  if (!container) {
    return;
  }
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("ContentLayout", () => {
  it("renders its children inside an <article>", () => {
    act(() => {
      render(<ContentLayout>My text content</ContentLayout>, container);
    });
    expect(container?.querySelector("article")).toBeInTheDocument();
    expect(container?.querySelector("article")).toHaveTextContent(
      "My text content"
    );
  });
});
