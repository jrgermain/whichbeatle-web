import { getVideoUrl } from "./youtube";
import fetchMock, { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

describe("getVideoUrl", () => {
  beforeAll(() => {
    process.env.YOUTUBE_API_KEY = "abcdefg";
  });
  it("calls fetch with the correct parameters", async () => {
    await getVideoUrl("Something");
    const lastCall = fetchMock.mock.calls.at(-1);
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
    fetchMock.mockResponseOnce(
      JSON.stringify({
        items: [
          {
            id: {
              videoId: "1234567",
            },
          },
        ],
      })
    );
    const url = await getVideoUrl("Something");
    expect(url).toBe("https://www.youtube.com/embed/1234567");
  });

  it("returns null if there were no results", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        items: [],
      })
    );
    const url = await getVideoUrl("Something");
    expect(url).toBeNull();
  });

  it("returns null if there was an error", async () => {
    fetchMock.mockRejectedValueOnce({});
    const url = await getVideoUrl("Something");
    expect(url).toBeNull();
  });

  afterAll(() => {
    delete process.env.YOUTUBE_API_KEY;
  });
});
