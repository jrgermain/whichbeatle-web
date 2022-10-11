export const queryToArray = (query: string[] | string | undefined): string[] =>
  Array.isArray(query) ? query : typeof query === "string" ? [query] : [];
