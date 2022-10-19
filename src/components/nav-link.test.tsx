/**
 * @jest-environment jsdom
 */

import { Router, useRouter } from "next/router";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import NavLink from "./nav-link";
import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";

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
  it("sets aria-current if path is an exact match", () => {
    jest.mocked(useRouter).mockReturnValueOnce({
      route: "/test-nav-link",
      pathname: "/test-nav-link",
      query: {},
      asPath: "/test-nav-link",
    } as Router);
    act(() => {
      render(<NavLink href="/test-nav-link">Link 1</NavLink>, container);
    });
    expect(screen.getByText("Link 1")).toHaveAttribute("aria-current", "page");
  });

  it("does not set aria-current if path is a non-exact match", () => {
    jest.mocked(useRouter).mockReturnValueOnce({
      route: "/test-nav-link/child",
      pathname: "/test-nav-link/child",
      query: {},
      asPath: "/test-nav-link/child",
    } as Router);
    act(() => {
      render(<NavLink href="/test-nav-link">Link 2</NavLink>, container);
    });
    expect(screen.getByText("Link 2")).not.toHaveAttribute("aria-current");
  });

  it("does not set aria-current if path is not a match", () => {
    jest.mocked(useRouter).mockReturnValueOnce({
      route: "/test-nav-link",
      pathname: "/test-nav-link",
      query: {},
      asPath: "/test-nav-link",
    } as Router);
    act(() => {
      render(<NavLink href="/something-else">Link 3</NavLink>, container);
    });
    expect(screen.getByText("Link 3")).not.toHaveAttribute("aria-current");
  });

  it("toggles the nav closed on click (small screens, js enabled)", () => {
    jest.mocked(useRouter).mockReturnValue({
      route: "/",
      pathname: "/",
      query: {},
      asPath: "/",
    } as Router);

    act(() => {
      render(
        <>
          <input
            type="checkbox"
            id="toggle-nav"
            defaultChecked
            data-testid="toggle"
          />
          <NavLink href="/">Link 3</NavLink>
        </>,
        container
      );
    });

    // sanity check
    expect(screen.getByTestId("toggle")).toBeChecked();

    fireEvent.click(screen.getByText("Link 3"));

    return waitFor(() => {
      expect(screen.getByTestId("toggle")).not.toBeChecked();
    });
  });
});
