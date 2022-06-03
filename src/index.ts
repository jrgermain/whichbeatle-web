import discography from "./assets/discography.json";
import "normalize.css";
import "./styles/whichbeatle.css";
import "./styles/search-box.css";
import "./styles/result.css";
import { buildResultElement } from "./lib/html";
import { findSongs } from "./lib/search";

const searchForm = document.getElementById("search") as HTMLFormElement;
const searchBox = document.getElementById("song-name") as HTMLInputElement;
const resultsSection = document.getElementById("results") as HTMLElement;

// Enable search field and buttons since the user has js enabled
document
  .querySelectorAll(":disabled")
  .forEach((element) => element.removeAttribute("disabled"));

// Initialize events
document
  .getElementById("random")!
  .addEventListener("click", function fillRandomSong() {
    const index = Math.floor(Math.random() * discography.length);
    const name = discography[index].Song;
    searchBox.value = name;
  });

searchForm.addEventListener(
  "submit",
  async function submit(event: SubmitEvent) {
    event.preventDefault();

    const previousSearch = this.dataset.lastSearch ?? "";
    const currentSearch = searchBox.value;
    if (previousSearch === currentSearch) {
      return;
    }

    const results = await Promise.all(
      findSongs(currentSearch).map(buildResultElement)
    );
    resultsSection.replaceChildren(...results);
    this.dataset.lastSearch = currentSearch;
  }
);
