import { getVideoUrl } from "./youtube";

describe("getVideoUrl", () => {
  let _fetch: typeof fetch;

  beforeAll(() => {
    process.env.YOUTUBE_API_KEY = "abcdefg";
    _fetch = globalThis.fetch;
    globalThis.fetch = jest.fn().mockResolvedValue({
      async json() {
        return {
          items: [
            {
              id: {
                videoId: "1234567",
              },
            },
          ],
        };
      },
    });
  });
  it("calls fetch with the correct parameters", async () => {
    await getVideoUrl("Something");
    const lastCall = jest.mocked(fetch).mock.calls.at(-1);
    expect(lastCall).toBeDefined();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [urlString, options] = lastCall!;
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
    const url = await getVideoUrl("Something");
    expect(url).toBe("https://www.youtube.com/embed/1234567");
  });

  it("returns null if there were no results", async () => {
    jest.mocked(fetch).mockResolvedValueOnce({
      async json() {
        return {
          items: [],
        };
      },
    } as Response);
    const url = await getVideoUrl("Something");
    expect(url).toBeNull();
  });

  it("returns null if there was an error", async () => {
    jest.mocked(fetch).mockRejectedValueOnce({});
    const url = await getVideoUrl("Something");
    expect(url).toBeNull();
  });

  afterAll(() => {
    delete process.env.YOUTUBE_API_KEY;
    globalThis.fetch = _fetch;
  });
});
