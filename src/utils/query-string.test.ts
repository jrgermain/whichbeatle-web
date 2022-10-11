import { queryToArray } from "./query-string";

describe("queryToArray", () => {
  it("given undefined, returns an empty array", () => {
    expect(queryToArray(undefined)).toStrictEqual([]);
  });
  it("given a string, returns that string wrapped in an array", () => {
    expect(queryToArray("testing123")).toStrictEqual(["testing123"]);
  });
  it("given an array, returns that array as-is", () => {
    expect(queryToArray(["abc", "123"])).toStrictEqual(["abc", "123"]);
  });
});
