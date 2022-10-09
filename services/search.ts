import { Entries } from "type-fest";
import discography from "../data/discography.json";
import Song from "../types/song";

/**
 * Before we compare a result and a query, we "normalize" both sides to allow
 * more flexible matching.
 *
 * We make the following transformations:
 * - text is converted to lowercase so matches are case-insensitive
 * - characters other than letters, numbers, and whitespace are removed
 * - whitespace characters other than ' ' are replaced with spaces
 * - consecutive spaces are collapsed into single spaces
 * - the text is padded with spaces to prevent matching the middle of a word
 *
 * @param text A string to be normalized
 * @returns The result of performing the transformations described above
 */
const normalize = (text: string) =>
  ` ${text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim()} `;

/** Fields within a Song object where the value is actually a collection of many slash-delimited values */
const MULTIPLE_VALUE_FIELDS = new Set<keyof Song>(["composer", "singer"]);

/**
 * Test if a given field within a song matches a query provided by the user
 *
 * @param query A query that was provided by the user
 * @param song The song object currently being tested
 * @param field The name of the property within the song to perform the query against
 * @returns
 */
function isMatch(query: string, song: Song, field: keyof Song) {
  const normalizedQuery = normalize(query);
  const normalizedValues = (
    MULTIPLE_VALUE_FIELDS.has(field) ? song[field].split("/") : [song[field]]
  ).map(normalize);

  return normalizedValues.some((normalizedValue) =>
    normalizedValue.includes(normalizedQuery)
  );
}

type FindAllInput = Partial<Record<keyof Song, string[]>>;

/**
 * Find all songs matching the given criteria.
 *
 * The criteria (singer, title, album, or composer) are all combined with an AND.
 * The values of those criteria are all combined with an OR.
 *
 * For example, if we provide 2 singers and 3 composers, we will receive all
 * songs where at least one of the singers matched AND at least one of the
 * composers matched.
 *
 * @param queries An object where the keys are fields of a Song (with every
 * property optional) and the values are an array of strings representing
 * allowed values for those fields
 * @returns An array containing the matching songs
 */
export function findAll(queries: FindAllInput): Song[] {
  const filters = Object.entries(queries) as Entries<FindAllInput>;
  return discography.filter((song) =>
    filters.every(
      ([field, values]) =>
        !values?.length || // Filter was not provided or has no value, so don't filter by that field
        values.some((value) => value && isMatch(value, song, field))
    )
  );
}

/**
 * Find the songs whose titles contain the given string.
 *
 * @param query A string containing the text to search by
 * @returns An array containing the matching songs
 */
export function findAllByTitle(query: string): Song[] {
  return findAll({ title: [query] });
}

/**
 * Get a random song.
 *
 * @returns A random song from the discography
 */
export function getRandom(): Song {
  const i = Math.floor(Math.random() * discography.length);
  return discography[i];
}
