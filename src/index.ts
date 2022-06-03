import discography from "./assets/discography.json";
import "normalize.css";
import "./styles/whichbeatle.css";
import "./styles/search-box.css";
import "./styles/result.css";
import { buildResultElement } from "./lib/html";
import { findSongs } from "./lib/search";

const searchBox = document.getElementById("song-name") as HTMLInputElement;

// Enable search field and buttons since the user has js enabled
document
  .querySelectorAll(":disabled")
  .forEach((element) => element.removeAttribute("disabled"));

// Enable the user to fill in a random song
document
  .getElementById("random")!
  .addEventListener("click", function fillRandomSong() {
    const index = Math.floor(Math.random() * discography.length);
    const name = discography[index].Song;
    searchBox.value = name;
  });

// Show search results
const search = new URLSearchParams(window.location.search).get("song");
if (search) {
  searchBox.value = search;
  const results = await Promise.all(findSongs(search).map(buildResultElement));
  document.getElementById("results")!.replaceChildren(...results);
}
