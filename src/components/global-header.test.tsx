/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import GlobalHeader from "./global-header";
import "@testing-library/jest-dom";

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
    render(<GlobalHeader />);
    const homeLink = screen.getByTestId("home-link");
    expect(homeLink).toHaveAttribute("href", "/");
    expect(homeLink.querySelector("img")).toBeInTheDocument();
  });
  it("renders a list of nav links", () => {
    render(<GlobalHeader />);
    const nav = screen.getByRole("navigation");
    const links = nav.querySelectorAll("a");
    expect(links?.length).toBe(3);
    expect(links?.[0]).toHaveTextContent("Home");
    expect(links?.[1]).toHaveTextContent("About");
    expect(links?.[2]).toHaveTextContent("API");
  });
});
