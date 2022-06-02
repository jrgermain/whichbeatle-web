import discography from "./assets/discography.json";
import type { DiscographyEntry } from "./discography-entry";
import "normalize.css";
import "./styles/whichbeatle.css";
import "./styles/search-box.css";
import "./styles/result.css";

// Various elements we'll use more than once
const searchForm = document.getElementById("search") as HTMLFormElement;
const searchBox = document.getElementById("song-name") as HTMLInputElement;
const resultsSection = document.getElementById("results") as HTMLElement;

// Enable inputs (initally disabled until we confirm the user has js enabled)
const disabled = document.querySelectorAll("[disabled]");
for (let i = 0; i < disabled.length; i++) {
  disabled[i].removeAttribute("disabled");
}

// Initialize events
document.getElementById("random")?.addEventListener("click", fillRandomSong);
searchForm.addEventListener("submit", submit);

// Get the title of a random song from the collection and use it to populate the search box
function fillRandomSong() {
  const index = Math.floor(Math.random() * discography.length);
  const name = discography[index].Song;
  searchBox.value = name;
}

// Perform validations and then run a search
async function submit(event: SubmitEvent) {
  event.preventDefault();

  if (!searchBox.value) {
    return;
  }

  const previousSearch = searchForm.dataset.lastSearch;
  const currentSearch = searchBox.value;

  if (previousSearch === currentSearch) {
    return;
  }

  const results = discography.filter(({ Song: songName }) =>
    isFuzzyMatch(currentSearch, songName)
  );

  resultsSection.replaceChildren(
    ...(await Promise.all(results.map(buildResult)))
  );

  searchForm.dataset.lastSearch = currentSearch;
}

// Return true if word2 is equal to or contains word1, not counting case, punctuation, or leading/trailing spaces
function isFuzzyMatch(word1: string, word2: string) {
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

async function buildResult({
  Song: song,
  Album: album,
  Composer: composer,
  Singer: singer,
}: DiscographyEntry): Promise<HTMLElement> {
  const resultElement = document.createElement("article");
  resultElement.className = "result";

  const videoUrl = await getVideoUrl(song);
  if (videoUrl) {
    const videoElement = document.createElement("iframe");
    videoElement.setAttribute("allowfullscreen", "");
    videoElement.setAttribute("src", videoUrl);
    resultElement.appendChild(videoElement);
  }

  const detailsElement = document.createElement("div");
  detailsElement.className = "details";
  const songElement = document.createElement("span");
  songElement.className = "song";
  songElement.textContent = song;
  detailsElement.appendChild(songElement);
  const albumElement = document.createElement("span");
  albumElement.className = "album";
  albumElement.textContent = album;
  detailsElement.appendChild(albumElement);
  const composerElement = document.createElement("span");
  composerElement.className = "composer";
  composerElement.textContent = composer;
  detailsElement.appendChild(composerElement);
  const singerElement = document.createElement("span");
  singerElement.className = "singer";
  singerElement.textContent = singer;
  detailsElement.appendChild(singerElement);
  resultElement.appendChild(detailsElement);

  return resultElement;
}

async function getVideoUrl(songTitle: string) {
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
