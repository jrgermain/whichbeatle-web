import discography from "./assets/discography.json";
import { DiscographyEntry } from "./discography-entry";
import "normalize.css";
import "./styles/whichbeatle.css";

// Various elements we'll use more than once
const checkboxes = Array.from(
  document.querySelectorAll<HTMLInputElement>("input[type=checkbox]")
);
const searchSection = document.getElementById("search") as HTMLElement;
const searchBox = document.getElementById("song-name") as HTMLInputElement;
const resultsSection = document.getElementById("results") as HTMLElement;
const videosSection = document.getElementById("videos") as HTMLElement;

// Initialize events
document.getElementById("random")?.addEventListener("click", fillRandomSong);
document.getElementById("go")?.addEventListener("click", submit);
searchBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    submit();
  }
});

// Enable inputs (initally disabled until we confirm the user has js enabled)
const disabled = document.querySelectorAll("[disabled]");
for (let i = 0; i < disabled.length; i++) {
  disabled[i].removeAttribute("disabled");
}

// Get the title of a random song from the collection and use it to populate the search box
function fillRandomSong() {
  const index = Math.floor(Math.random() * discography.length);
  const name = discography[index].Song;
  searchBox.value = name;
}

// Perform validations and then run a search
function submit() {
  const searchFields = checkboxes
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.name as keyof DiscographyEntry);

  // Validate input before performing search
  if (!searchBox.value && !searchFields.length) {
    alert("Please type a song name and select which fields to display");
  } else if (!searchBox.value) {
    alert("Please type a song name");
  } else if (!searchFields.length) {
    alert("Please use the checkboxes to select which fields to display");
  } else {
    const previousSearch = searchSection.dataset.currentSearch;
    const previousFields = searchSection.dataset.currentFields;
    const currentSearch = searchBox.value;
    const currentFields = searchFields.toString();

    if (previousSearch === currentSearch && previousFields === currentFields) {
      return;
    }

    const results = discography.filter(({ Song: songName }) =>
      alike(currentSearch, songName)
    );
    buildTable(["Song", ...searchFields], results);
    if (previousSearch !== currentSearch) {
      getAllVideos(results);
    }
    searchSection.dataset.currentSearch = currentSearch;
    searchSection.dataset.currentFields = currentFields;
  }
}

// Return true if word2 is equal to or contains word1, not counting case, punctuation, or leading/trailing spaces
function alike(word1: string, word2: string) {
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

// Build an html table with our results, and then add it to the page
function buildTable(
  headers: (keyof DiscographyEntry)[],
  content: DiscographyEntry[]
) {
  // If no results were found, exit
  if (!content.length) {
    alert("No results found");
    return;
  }

  // Create an element that will hold our results table
  const table = document.createElement("table");

  // Build table header
  let innerHTML = "<thead><tr>";
  for (const header of headers) {
    innerHTML += `<th>${header}</th>`;
  }
  innerHTML += "</tr></thead><tbody>";

  // Build table content
  for (const item of content) {
    innerHTML += "<tr>";
    for (const prop of headers) {
      innerHTML += `<td>${item[prop]}</td>`;
    }
    innerHTML += "</tr>";
  }
  innerHTML += "</tbody>";

  table.innerHTML = innerHTML;

  /* If there are already results in the results section, shrink them, replace them, and then
   * grow back to regular size. If not, just add results and grow.
   */
  const oldTable = resultsSection.firstChild;
  if (oldTable) {
    // Shrink existing results (to default 0.2x scale)
    resultsSection.style.removeProperty("transform");

    // After shrink animation has finished:
    setTimeout(function () {
      oldTable.replaceWith(table);
      resultsSection.style.transform = "scale(1)";
    }, 250);
  } else {
    resultsSection.appendChild(table);
    resultsSection.style.transform = "scale(1)";
  }
}

async function getAllVideos(songs: DiscographyEntry[]) {
  const urls = await Promise.all(songs.map(getVideoUrl));
  videosSection.innerHTML = urls
    .filter((url) => url)
    .map(
      (url) => `<iframe allowfullscreen class="video" src="${url}"></iframe>`
    )
    .join("\n");
}

function getVideoUrl(searchResult: DiscographyEntry) {
  return new Promise((resolve) => {
    fetch(
      `/search?terms=${encodeURIComponent(
        "the beatles - " + searchResult.Song
      )}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((json) => {
        try {
          const id = json.items[0].id.videoId;
          resolve(id ? "https://www.youtube.com/embed/" + id : null);
        } catch (e) {
          resolve(null);
        }
      })
      .catch((e) => {
        console.error(e);
        resolve(null);
      });
  });
}
