import { getRandomMessage, getStatusCodeDescription } from "./error-handling";

describe("getRandomMessage", () => {
  it("returns a string", () => {
    for (let i = 0; i < 20; i++) {
      expect(getRandomMessage()).toEqual(expect.any(String));
    }
  });
});

describe("getStatusCodeDescription", () => {
  it("returns the correct response for code 400", () => {
    expect(getStatusCodeDescription(400)).toBe(
      "There was an issue with your request."
    );
  });
  it("returns the correct response for code 404", () => {
    expect(getStatusCodeDescription(404)).toBe(
      "We couldn't find the page you're looking for."
    );
  });
  it("returns the correct response for code 500", () => {
    expect(getStatusCodeDescription(500)).toBe(
      "We ran into an unexpected error."
    );
  });
  it("falls back to the node error code for others", () => {
    expect(getStatusCodeDescription(403)).toBe("Error: Forbidden.");
  });
  it("falls back to the 500 response if statusCode is not valid", () => {
    expect(getStatusCodeDescription(undefined as unknown as number)).toBe(
      "We ran into an unexpected error."
    );
  });
});
