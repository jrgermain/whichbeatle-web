/**
 * @jest-environment jsdom
 */

import SearchBox from "./search-box";
import fetchMock, { enableFetchMocks } from "jest-fetch-mock";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Song from "../types/song";
import "@testing-library/jest-dom";

afterEach(() => {
  // Cleanup fake timers
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

enableFetchMocks();

describe("SearchBox", () => {
  it("creates a form that points to the search page", () => {
    render(<SearchBox />);

    const form = screen.getByRole("search");
    expect(form).toHaveAttribute("method", "get");
    expect(form).toHaveAttribute("action", "/search");
  });

  it("creates an input field with the correct placeholder text", () => {
    render(<SearchBox />);

    const input = screen.getByTestId("search-box");
    expect(input).toHaveAttribute("placeholder", "Search for a Beatles song");
  });

  it("sets the default value if provided", () => {
    render(<SearchBox defaultValue="Mean Mr Mustard" />);

    const input = screen.getByTestId("search-box");
    expect(input).toHaveValue("Mean Mr Mustard");
  });

  it("calls the api when the 'random' button is clicked", () => {
    fetchMock.mockResponse(
      JSON.stringify({
        title: "Something",
        singer: "Harrison",
        composer: "Harrison",
        album: "Abbey Road",
      } as Song)
    );

    render(<SearchBox defaultValue="Mean Mr Mustard" />);

    fireEvent.click(screen.getByTestId("randomize"));
    expect(fetchMock).toHaveBeenCalled();

    const input = screen.getByTestId("search-box");
    return waitFor(() => expect(input).toHaveValue("Something"));
  });

  it("shows a spinner if result takes a long time", async () => {
    // Make fetch return a dummy promise that we can resolve at will
    let returnFromFetch: (x: string) => void = (x) => void x; // Needs to be initialized for TS to be happy
    fetchMock.mockResponse(
      () =>
        new Promise((resolve) => {
          // The resolve callback is NOT called here, but we do save a reference to call it later
          returnFromFetch = resolve;
        })
    );

    render(<SearchBox defaultValue="Mean Mr Mustard" />);

    // The randomize button should make a fetch call when it is clicked
    fireEvent.click(screen.getByTestId("randomize"));
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

    // Skip the 300ms wait for the spinner to appear
    jest.runAllTimers();

    // Make sure shuffle icon is replaced by a loading spinner and the button is disabled
    await screen.findByTitle("Loading");
    expect(screen.getByTestId("randomize")).toBeDisabled();
    expect(screen.queryByTestId("shuffle-icon")).toBeNull();

    // Make mock fetch return a result
    returnFromFetch(
      JSON.stringify({
        title: "Yellow Submarine",
        singer: "Starr",
        composer: "McCartney",
        album: "Yellow Submarine",
      } as Song)
    );

    // Wait for UI state to go back to normal
    await screen.findByTestId("shuffle-icon");
    expect(screen.getByTestId("randomize")).toBeEnabled();
    expect(screen.queryByTitle("Loading")).toBeNull();

    // Make sure text box is updated
    expect(screen.getByTestId("search-box")).toHaveValue("Yellow Submarine");
  });

  it("does not show a spinner if the results come back quickly", async () => {
    fetchMock.mockResponse(
      JSON.stringify({
        title: "Something",
        singer: "Harrison",
        composer: "Harrison",
        album: "Abbey Road",
      } as Song)
    );

    render(<SearchBox defaultValue="Mean Mr Mustard" />);

    fireEvent.click(screen.getByTestId("randomize"));
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

    // Make sure the spinner does NOT appear
    let spinnerAppeared: boolean;
    const SPINNER_APPEARED = Symbol();
    try {
      await screen.findByTitle("Loading", undefined, { timeout: 400 });
      throw SPINNER_APPEARED;
    } catch (e) {
      // e will either be an Error (loading spinner not found) or SPINNER_APPEARED (spinner found)
      spinnerAppeared = e === SPINNER_APPEARED;
    }
    expect(spinnerAppeared).toBeFalsy();

    // Make sure value is updated
    expect(screen.getByTestId("search-box")).toHaveValue("Something");
  });
});
