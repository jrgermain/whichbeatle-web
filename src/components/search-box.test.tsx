/**
 * @jest-environment jsdom
 */

import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import SearchBox from "./search-box";
import fetchMock, { enableFetchMocks } from "jest-fetch-mock";
import { screen, fireEvent, waitFor } from "@testing-library/react";
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

enableFetchMocks();

describe("SearchBox", () => {
  it("creates a form that points to the search page", () => {
    act(() => {
      render(<SearchBox />, container);
    });

    const form = container?.querySelector("form");
    expect(form).toBeTruthy();
    expect(form?.getAttribute("method")).toBe("get");
    expect(form?.getAttribute("action")).toBe("/search");
  });

  it("creates an input field with the correct placeholder text", () => {
    act(() => {
      render(<SearchBox />, container);
    });

    const input = screen.getByTestId("search-box");
    expect(input).toHaveAttribute("placeholder", "Search for a Beatles song");
  });

  it("sets the default value if provided", () => {
    act(() => {
      render(<SearchBox defaultValue="Mean Mr Mustard" />, container);
    });

    const input = screen.getByTestId("search-box");
    expect(input).toHaveValue("Mean Mr Mustard");
  });

  it("calls the api when the 'random' button is clicked", () => {
    fetchMock.mockResponse("Something");

    act(() => {
      render(<SearchBox defaultValue="Mean Mr Mustard" />, container);
    });

    fireEvent.click(screen.getByTestId("randomize"));
    expect(fetchMock).toHaveBeenCalled();

    const input = screen.getByTestId("search-box");
    waitFor(() => expect(input).toHaveValue("Something"));
  });

  it.todo("shows a spinner if result takes a long time");
});
