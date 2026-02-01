import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { getVideoUrl } from "./youtube";

// Mock fetch globally
global.fetch = vi.fn();

describe("getVideoUrl", () => {
  beforeAll(() => {
    process.env.YOUTUBE_API_KEY = "abcdefg";
  });
  it("calls fetch with the correct parameters", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [] }),
    } as Response);

    await getVideoUrl("Something");
    const lastCall = vi.mocked(fetch).mock.calls.at(-1);
    expect(lastCall).toBeDefined();

    const [urlString, options] = lastCall as [string, RequestInit];
    expect(urlString).toBeTruthy();
    expect(options).toBeTruthy();

    const url = new URL(urlString as string);
    expect(url.origin).toBe("https://www.googleapis.com");
    expect(url.pathname).toBe("/youtube/v3/search");
    expect(url.searchParams.getAll("q")).toEqual(["the beatles - Something"]);
    expect(url.searchParams.getAll("part")).toEqual(["snippet"]);
    expect(url.searchParams.getAll("maxResults")).toEqual(["1"]);
    expect(url.searchParams.getAll("key")).toEqual(["abcdefg"]);
    expect(options?.method).toBe("GET");
  });

  it("returns the id if there was a result", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [
          {
            id: {
              videoId: "1234567",
            },
          },
        ],
      }),
    } as Response);
    const url = await getVideoUrl("Something");
    expect(url).toBe("https://www.youtube.com/embed/1234567");
  });

  it("returns null if there were no results", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [],
      }),
    } as Response);
    const url = await getVideoUrl("Something");
    expect(url).toBeNull();
  });

  it("returns null if there was an error", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("Fetch error"));
    const url = await getVideoUrl("Something");
    expect(url).toBeNull();
  });

  afterAll(() => {
    delete process.env.YOUTUBE_API_KEY;
  });
});
