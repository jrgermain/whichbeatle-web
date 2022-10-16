/**
 * @jest-environment jsdom
 */

import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingSpinner from "./loading-spinner";

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

describe("LoadingSpinner", () => {
  it("renders with a title", () => {
    act(() => {
      render(<LoadingSpinner />, container);

      expect(screen.getByTitle("Loading")).toBeInTheDocument();
    });
  });
  it("accepts an extra className", () => {
    act(() => {
      render(<LoadingSpinner className="foo" />, container);

      expect(document.querySelector(".foo")).toBeInTheDocument();
    });
  });
});
