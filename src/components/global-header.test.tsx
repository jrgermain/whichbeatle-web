/**
 * @jest-environment jsdom
 */

import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import GlobalHeader from "./global-header";
import { screen } from "@testing-library/react";
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

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "/",
      query: {},
      asPath: "/",
    };
  },
}));

describe("GlobalHeader", () => {
  it("renders a logo that links to the homepage", () => {
    act(() => {
      render(<GlobalHeader />, container);
    });
    const homeLink = screen.getByTestId("home-link");
    expect(homeLink).toHaveAttribute("href", "/");
    expect(homeLink.querySelector("img")).toBeInTheDocument();
  });
  it("renders a list of nav links", () => {
    act(() => {
      render(<GlobalHeader />, container);
    });
    const links = container?.querySelectorAll("nav a");
    expect(links?.length).toBe(3);
    expect(links?.[0]).toHaveTextContent("Home");
    expect(links?.[1]).toHaveTextContent("About");
    expect(links?.[2]).toHaveTextContent("API");
  });
});
