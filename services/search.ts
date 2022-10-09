import { Entries } from "type-fest";
import discography from "../data/discography.json";
import Song from "../types/song";

function isMatch(query: string, value: string) {
  const normalizedQuery =
    " " +
    query
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim() +
    " ";
  const normalizedValue =
    " " +
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim() +
    " ";
  return normalizedValue.includes(normalizedQuery);
}

type FindAllQuery = Partial<Record<keyof Song, string[]>>;

export function findAll(query: FindAllQuery): Song[] {
  const filters = Object.entries(query) as Entries<FindAllQuery>;
  return discography.filter((song) =>
    filters.every(
      ([field, values]) =>
        !values?.length || // Filter was not provided or has no value, so don't filter by that field
        values.some((value) => value && isMatch(value, song[field]))
    )
  );
}

export function findAllByTitle(query: string): Song[] {
  return findAll({ title: [query] });
}

export function getRandom(): Song {
  const i = Math.floor(Math.random() * discography.length);
  return discography[i];
}
