import discography from "./assets/discography.json";
import "normalize.css";
import "./styles/base.css";
import "./styles/search-box.css";
import "./styles/search-result.css";
import "./styles/colors.css";
import { buildResultElement, NO_RESULTS_TEXT } from "./lib/html";
import { findSongs } from "./lib/search";

const searchBox = document.getElementById("song-name") as HTMLInputElement;

// Enable search field and buttons since the user has js enabled
document
  .querySelectorAll(":disabled")
  .forEach((element) => element.removeAttribute("disabled"));

// Allow the user to fill in a random song by clicking the randomize button
document
  .getElementById("random")!
  .addEventListener("click", function fillRandomSong() {
    const index = Math.floor(Math.random() * discography.length);
    const name = discography[index].Song;
    searchBox.value = name;
  });

// Show search results
(async () => {
  const search = new URLSearchParams(window.location.search).get("song");
  if (search) {
    searchBox.value = search;

    const results = await Promise.all(
      findSongs(search).map(buildResultElement)
    );
    if (!results.length) {
      results.push(NO_RESULTS_TEXT);
    }
    document.getElementById("results")!.replaceChildren(...results);
  }
})();
