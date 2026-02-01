import { render, screen } from "@testing-library/react";
import { type Router, useRouter } from "next/router";
import { describe, expect, it, vi } from "vitest";
import NavLink from "./nav-link";

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

describe("NavLink", () => {
  it("sets aria-current if path is an exact match", () => {
    vi.mocked(useRouter).mockReturnValueOnce({
      route: "/test-nav-link",
      pathname: "/test-nav-link",
      query: {},
      asPath: "/test-nav-link",
    } as Router);
    render(<NavLink href="/test-nav-link">Link 1</NavLink>);
    expect(screen.getByText("Link 1")).toHaveAttribute("aria-current", "page");
  });

  it("does not set aria-current if path is a non-exact match", () => {
    vi.mocked(useRouter).mockReturnValueOnce({
      route: "/test-nav-link/child",
      pathname: "/test-nav-link/child",
      query: {},
      asPath: "/test-nav-link/child",
    } as Router);
    render(<NavLink href="/test-nav-link">Link 2</NavLink>);
    expect(screen.getByText("Link 2")).not.toHaveAttribute("aria-current");
  });

  it("does not set aria-current if path is not a match", () => {
    vi.mocked(useRouter).mockReturnValueOnce({
      route: "/test-nav-link",
      pathname: "/test-nav-link",
      query: {},
      asPath: "/test-nav-link",
    } as Router);
    render(<NavLink href="/something-else">Link 3</NavLink>);
    expect(screen.getByText("Link 3")).not.toHaveAttribute("aria-current");
  });
});
