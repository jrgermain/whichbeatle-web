import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type Song from "../types/song";
import SearchBox from "./search-box";

// Mock fetch globally
global.fetch = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  // Cleanup fake timers
  if (vi.isFakeTimers()) {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  }
});

describe("SearchBox", () => {
  it("creates a form that points to the search page", () => {
    render(<SearchBox />);

    const form = screen.getByTestId("search-form");
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
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () =>
        ({
          title: "Something",
          singer: "Harrison",
          composer: "Harrison",
          album: "Abbey Road",
        }) satisfies Song,
    } as Response);

    render(<SearchBox defaultValue="Mean Mr Mustard" />);

    fireEvent.click(screen.getByTestId("randomize"));
    expect(fetch).toHaveBeenCalled();

    const input = screen.getByTestId("search-box");
    return waitFor(() => expect(input).toHaveValue("Something"));
  });

  it("shows a spinner if result takes a long time", async () => {
    vi.useFakeTimers();

    // Make fetch return a dummy promise that we can resolve at will
    let returnFromFetch: (value: Response) => void;
    vi.mocked(fetch).mockReturnValue(
      new Promise((resolve) => {
        // The resolve callback is NOT called here, but we do save a reference to call it later
        returnFromFetch = resolve;
      }),
    );

    render(<SearchBox defaultValue="Mean Mr Mustard" />);

    // The randomize button should make a fetch call when it is clicked
    await act(async () => {
      fireEvent.click(screen.getByTestId("randomize"));
    });
    expect(fetch).toHaveBeenCalled();

    // Skip the 300ms wait for the spinner to appear
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });

    // Make sure shuffle icon is replaced by a loading spinner and the button is disabled
    expect(screen.queryByTitle("Loading")).toBeInTheDocument();
    expect(screen.getByTestId("randomize")).toBeDisabled();
    expect(screen.queryByTestId("shuffle-icon")).toBeNull();

    // Make mock fetch return a result
    await act(async () => {
      returnFromFetch({
        ok: true,
        json: async () =>
          ({
            title: "Yellow Submarine",
            singer: "Starr",
            composer: "McCartney",
            album: "Yellow Submarine",
          }) as Song,
      } as Response);
    });

    // Wait for UI state to go back to normal
    expect(screen.queryByTestId("shuffle-icon")).toBeInTheDocument();
    expect(screen.getByTestId("randomize")).toBeEnabled();
    expect(screen.queryByTitle("Loading")).not.toBeInTheDocument();

    // Make sure text box is updated
    expect(screen.getByTestId("search-box")).toHaveValue("Yellow Submarine");
  });

  it("does not show a spinner if the results come back quickly", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () =>
        ({
          title: "Something",
          singer: "Harrison",
          composer: "Harrison",
          album: "Abbey Road",
        }) satisfies Song,
    } as Response);

    render(<SearchBox defaultValue="Mean Mr Mustard" />);

    fireEvent.click(screen.getByTestId("randomize"));
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
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
