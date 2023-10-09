/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import SearchResult from "./search-result";
import "@testing-library/jest-dom";

describe("SearchResult", () => {
  it("renders an iframe if video is truthy", () => {
    render(
      <SearchResult
        title="You Never Give Me Your Money"
        album="Abbey Road"
        singer="McCartney"
        composer="McCartney"
        videoUrl="https://example.com/12345"
      />
    );

    expect(
      document.querySelector('iframe[src="https://example.com/12345"]')
    ).toBeInTheDocument();
  });
  it("does not render an iframe if video is falsy", () => {
    render(
      <SearchResult
        title="You Never Give Me Your Money"
        album="Abbey Road"
        singer="McCartney"
        composer="McCartney"
        videoUrl={undefined}
      />
    );

    expect(document?.querySelector("iframe")).not.toBeInTheDocument();
  });
  it("renders the album name", () => {
    render(
      <SearchResult
        title="You Never Give Me Your Money"
        album="Abbey Road"
        singer="McCartney"
        composer="McCartney"
        videoUrl="https://example.com/12345"
      />
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
      />
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
      />
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
      />
    );

    expect(screen.getByTestId("song-title")).toHaveTextContent(
      "You Never Give Me Your Money"
    );
  });
});
