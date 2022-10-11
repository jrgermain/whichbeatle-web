import { findAll, findAllByTitle, getRandom } from "./search";
import discography from "../data/discography.json";

describe("findAll", () => {
  it("returns everything if no filter is given", () => {
    // Filters are omitted
    expect(findAll({})).toStrictEqual(discography);

    // Filters are empty
    expect(
      findAll({
        album: [],
        composer: [],
        singer: [],
        title: [],
      })
    ).toStrictEqual(discography);
  });

  it("combines multiple values for a given filter with an OR", () => {
    const actual = findAll({ title: ["yellow submarine", "ticket to ride"] });
    expect(actual).toContainEqual({
      title: "Ticket to Ride",
      composer: "Lennon",
      singer: "Lennon",
      album: "Help!",
    });
    expect(actual).toContainEqual({
      title: "Yellow Submarine",
      composer: "McCartney",
      singer: "Starr",
      album: "Revolver",
    });
    expect(actual).toContainEqual({
      title: "Yellow Submarine",
      composer: "McCartney",
      singer: "Starr",
      album: "Yellow Submarine",
    });
  });

  it("combines multiple filters with an AND", () => {
    const actual = findAll({ album: ["abbey road"], singer: ["starr"] });
    expect(actual).toStrictEqual([
      {
        title: "Octopus's Garden",
        composer: "Starr",
        singer: "Starr",
        album: "Abbey Road",
      },
    ]);
  });

  it("returns an empty array if no results are found", () => {
    const actual = findAll({ album: ["abbey road"], title: ["help"] });
    expect(actual).toStrictEqual([]);
  });
});

describe("findAllByTitle", () => {
  it("returns an array with one item if there is one match", () => {
    const actual = findAllByTitle("sun king");
    expect(actual).toStrictEqual([
      {
        title: "Sun King",
        composer: "Lennon",
        singer: "Lennon",
        album: "Abbey Road",
      },
    ]);
  });

  it("returns all matches when there are multiple", () => {
    const actual = findAllByTitle("here");
    expect(actual).toContainEqual({
      title: "Here, There and Everywhere",
      composer: "McCartney",
      singer: "McCartney",
      album: "Revolver",
    });
    expect(actual).toContainEqual({
      title: "Here Comes the Sun",
      composer: "Harrison",
      singer: "Harrison",
      album: "Abbey Road",
    });
  });

  it("returns an empty array when there are no matches", () => {
    const actual = findAllByTitle("this song doesn't exist");
    expect(actual).toStrictEqual([]);
  });
});

describe("getRandom", () => {
  it("returns a random item from the list", () => {
    for (let i = 0; i < 20; i++) {
      const actual = getRandom();
      expect(actual).toBeDefined();
      expect(discography).toContainEqual(actual);
    }
  });
});
