"use strict";

(function () {
    // Various elements we'll use more than once
    const checkboxes = Array.from(document.querySelectorAll("input[type=checkbox]"));
    const searchBox = document.getElementById("song-name");
    const resultTable = document.getElementById("results");
    
    // Initialize events
    document.getElementById("random").addEventListener("click", fillRandomSong);
    document.getElementById("go").addEventListener("click", submit);
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
        const searchFields = checkboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.name);

        // Validate input before performing search
        if (!searchBox.value && !searchFields.length) { 
            alert("Please type a song name and select which fields to display");
        } else if (!searchBox.value) {
            alert("Please type a song name");
        } else if (!searchFields.length) {
            alert("Please use the checkboxes to select which fields to display");
        } else {
            const previousSearch = document.getElementById("search").dataset.currentSearch;
            const previousFields = document.getElementById("search").dataset.currentFields;
            if (previousSearch != searchBox.value || previousFields != searchFields) {
                const results = discography.filter(entry => alike(searchBox.value, entry.Song));
                buildTable(["Song", ...searchFields], results);
                if (previousSearch != searchBox.value) {
                    getAllVideos(results);
                }
                document.getElementById("search").dataset.currentSearch = searchBox.value;
                document.getElementById("search").dataset.currentFields = searchFields;
            }
        }
    }

    // Return true if word2 is equal to or contains word1, not counting case, punctuation, or leading/trailing spaces
    function alike(word1, word2) {
        const w1 = " " + word1.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim() + " ";
        const w2 = " " + word2.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim() + " ";
        return (w2.includes(w1));
    }

    // Build an html table with our results, and then add it to the page
    function buildTable(headers, content) {
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
        const oldTable = document.getElementById("results").firstChild;
        if (oldTable) {
            // Shrink existing results (to default 0.2x scale)
            resultTable.style.removeProperty("transform");

            // After shrink animation has finished:
            setTimeout(function () {
                oldTable.replaceWith(table);
                resultTable.style.transform = "scale(1)";
            }, 250);
        } else {
            resultTable.appendChild(table);
            resultTable.style.transform = "scale(1)";
        }
    }

    async function getAllVideos(songs) {
        const urls = await Promise.all(songs.map(getVideoUrl));
        document.getElementById("videos").innerHTML = urls.filter(url => url).map(url => `<iframe allowfullscreen class="video" src="${url}"></iframe>`).join("\n");
    }

    function getVideoUrl(searchResult) {
        const q = "the beatles - " + searchResult.Song;
        return new Promise((resolve) => {
            fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCB6fMUCluTzvbFOMS44BGB4jDGN3xnngw&part=snippet&maxResults=1&q=${encodeURIComponent(q)}`, { 
                method: 'GET'
            })
            .then(response => response.json())
            .then(json => {
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
})();