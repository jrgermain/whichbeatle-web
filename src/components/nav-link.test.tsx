/**
 * @jest-environment jsdom
 */

import { Router, useRouter } from "next/router";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import NavLink from "./nav-link";

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
  useRouter: jest.fn(),
}));

describe("NavLink", () => {
  it("sets aria-current if isExact and path is an exact match", () => {
    jest.mocked(useRouter).mockReturnValueOnce({
      route: "/test-nav-link",
      pathname: "/test-nav-link",
      query: {},
      asPath: "/test-nav-link",
    } as Router);
    act(() => {
      render(<NavLink href="/test-nav-link" isExact></NavLink>, container);
    });
    expect(container?.querySelector("a")).toBeTruthy();
    expect(container?.querySelector('a[aria-current="page"]')).toBeTruthy();
  });

  it("does not set aria-current if isExact and path is a non-exact match", () => {
    jest.mocked(useRouter).mockReturnValueOnce({
      route: "/test-nav-link/child",
      pathname: "/test-nav-link/child",
      query: {},
      asPath: "/test-nav-link/child",
    } as Router);
    act(() => {
      render(<NavLink href="/test-nav-link" isExact></NavLink>, container);
    });
    expect(container?.querySelector("a")).toBeTruthy();
    expect(container?.querySelector('a[aria-current="page"]')).toBeFalsy();
  });

  it("does not set aria-current if isExact and path is not a match", () => {
    jest.mocked(useRouter).mockReturnValueOnce({
      route: "/test-nav-link",
      pathname: "/test-nav-link",
      query: {},
      asPath: "/test-nav-link",
    } as Router);
    act(() => {
      render(<NavLink href="/something-else" isExact></NavLink>, container);
    });
    expect(container?.querySelector("a")).toBeTruthy();
    expect(container?.querySelector('a[aria-current="page"]')).toBeFalsy();
  });

  it("sets aria-current if !isExact and path is an exact match", () => {
    jest.mocked(useRouter).mockReturnValueOnce({
      route: "/test-nav-link",
      pathname: "/test-nav-link",
      query: {},
      asPath: "/test-nav-link",
    } as Router);
    act(() => {
      render(<NavLink href="/test-nav-link"></NavLink>, container);
    });
    expect(container?.querySelector("a")).toBeTruthy();
    expect(container?.querySelector('a[aria-current="page"]')).toBeTruthy();
  });

  it("sets aria-current if !isExact and path is a non-exact match", () => {
    jest.mocked(useRouter).mockReturnValueOnce({
      route: "/test-nav-link/child",
      pathname: "/test-nav-link/child",
      query: {},
      asPath: "/test-nav-link/child",
    } as Router);
    act(() => {
      render(<NavLink href="/test-nav-link"></NavLink>, container);
    });
    expect(container?.querySelector("a")).toBeTruthy();
    expect(container?.querySelector('a[aria-current="page"]')).toBeTruthy();
  });

  it("does not set aria-current if !isExact and path is not a match", () => {
    jest.mocked(useRouter).mockReturnValueOnce({
      route: "/test-nav-link",
      pathname: "/test-nav-link",
      query: {},
      asPath: "/test-nav-link",
    } as Router);
    act(() => {
      render(<NavLink href="/something-else"></NavLink>, container);
    });
    expect(container?.querySelector("a")).toBeTruthy();
    expect(container?.querySelector('a[aria-current="page"]')).toBeFalsy();
  });
});
