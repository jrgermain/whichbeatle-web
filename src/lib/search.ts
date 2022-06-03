import discography from "../assets/discography.json";

// Return true if word2 is equal to or contains word1, not counting case, punctuation, or leading/trailing spaces
export function isFuzzyMatch(word1: string, word2: string) {
  const w1 =
    " " +
    word1
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim() +
    " ";
  const w2 =
    " " +
    word2
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim() +
    " ";
  return w2.includes(w1);
}

export async function getVideoUrl(songTitle: string) {
  try {
    const response = await fetch(
      `/search?terms=${encodeURIComponent("the beatles - " + songTitle)}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    const id = json.items[0]?.id?.videoId;
    return id ? `https://www.youtube.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

export function findSongs(title: string) {
  return discography.filter(({ Song }) => isFuzzyMatch(title, Song));
}
