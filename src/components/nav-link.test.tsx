/**
 * @jest-environment jsdom
 */

import { Router, useRouter } from "next/router";
import { render, screen } from "@testing-library/react";
import NavLink from "./nav-link";
import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("NavLink", () => {
  it("sets aria-current if path is an exact match", () => {
    jest.mocked(useRouter).mockReturnValueOnce({
      route: "/test-nav-link",
      pathname: "/test-nav-link",
      query: {},
      asPath: "/test-nav-link",
    } as Router);
    render(<NavLink href="/test-nav-link">Link 1</NavLink>);
    expect(screen.getByText("Link 1")).toHaveAttribute("aria-current", "page");
  });

  it("does not set aria-current if path is a non-exact match", () => {
    jest.mocked(useRouter).mockReturnValueOnce({
      route: "/test-nav-link/child",
      pathname: "/test-nav-link/child",
      query: {},
      asPath: "/test-nav-link/child",
    } as Router);
    render(<NavLink href="/test-nav-link">Link 2</NavLink>);
    expect(screen.getByText("Link 2")).not.toHaveAttribute("aria-current");
  });

  it("does not set aria-current if path is not a match", () => {
    jest.mocked(useRouter).mockReturnValueOnce({
      route: "/test-nav-link",
      pathname: "/test-nav-link",
      query: {},
      asPath: "/test-nav-link",
    } as Router);
    render(<NavLink href="/something-else">Link 3</NavLink>);
    expect(screen.getByText("Link 3")).not.toHaveAttribute("aria-current");
  });
});
