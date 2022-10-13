/**
 * @jest-environment jsdom
 */

import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchResult from "./search-result";

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

describe("SearchResult", () => {
  it("renders an iframe if video is truthy", () => {
    act(() => {
      render(
        <SearchResult
          title="You Never Give Me Your Money"
          album="Abbey Road"
          singer="McCartney"
          composer="McCartney"
          videoUrl="https://example.com/12345"
        />,
        container
      );

      expect(
        container?.querySelector('iframe[src="https://example.com/12345"]')
      ).toBeTruthy();
    });
  });
  it("does not render an iframe if video is falsy", () => {
    act(() => {
      render(
        <SearchResult
          title="You Never Give Me Your Money"
          album="Abbey Road"
          singer="McCartney"
          composer="McCartney"
          videoUrl={undefined}
        />,
        container
      );

      expect(container?.querySelector("iframe")).toBeFalsy();
    });
  });
  it("renders the album name", () => {
    render(
      <SearchResult
        title="You Never Give Me Your Money"
        album="Abbey Road"
        singer="McCartney"
        composer="McCartney"
        videoUrl="https://example.com/12345"
      />,
      container
    );

    expect(screen.getByTestId("album-name")).toHaveTextContent("Abbey Road");
  });
  it("renders the singer name", () => {
    render(
      <SearchResult
        title="You Never Give Me Your Money"
        album="Abbey Road"
        singer="McCartney"
        composer="McCartney"
        videoUrl="https://example.com/12345"
      />,
      container
    );

    expect(screen.getByTestId("singer-name")).toHaveTextContent("McCartney");
  });
  it("renders the composer name", () => {
    render(
      <SearchResult
        title="You Never Give Me Your Money"
        album="Abbey Road"
        singer="McCartney"
        composer="McCartney"
        videoUrl="https://example.com/12345"
      />,
      container
    );

    expect(screen.getByTestId("composer-name")).toHaveTextContent("McCartney");
  });
  it("renders the song title", () => {
    render(
      <SearchResult
        title="You Never Give Me Your Money"
        album="Abbey Road"
        singer="McCartney"
        composer="McCartney"
        videoUrl="https://example.com/12345"
      />,
      container
    );

    expect(screen.getByTestId("song-title")).toHaveTextContent(
      "You Never Give Me Your Money"
    );
  });
});
