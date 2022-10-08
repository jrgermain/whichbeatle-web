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
  const entries = Object.entries(query) as Entries<FindAllQuery>;
  return discography.filter((song) =>
    entries.every(
      ([field, values]) =>
        !values || values.some((value) => value && isMatch(value, song[field]))
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
