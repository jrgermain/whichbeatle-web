"use strict";

const queryCheckboxes = ["composer", "singer", "album"];

// Clear song input field
document.getElementById("song-name").value = "";

// Uncheck checkboxes
queryCheckboxes.forEach(checkbox => {
    document.getElementById(checkbox).checked = false;
});

// Set up event handling for Go button
document.getElementById("go").addEventListener("click", submit);

// Set up event handling for pressing enter in search field
document.getElementById("song-name").addEventListener("keypress", function (event) {
    if (event.key === "Enter") submit();
});

// Submit the search after checking that it is valid
function submit() {
    // Make an array holding a list of selected search queries
    const queries = [];
    queryCheckboxes.forEach(checkbox => {
        if (document.getElementById(checkbox).checked) {
            queries.push(document.getElementById(checkbox));
        }
    });
    
    // Get the name of the song we're searching for
    const songName = document.getElementById("song-name").value;

    // Validate input before performing search
    if (!songName && !queries.length) {
        alert("Please type a song name and select which fields to display");
    } else if (!songName) {
        alert("Please type a song name");
    } else if (!queries.length) {
        alert("Please use the checkboxes to select which fields to display");
    } else {
        search(queries, songName);
    }
}

// Perform a search, then call buildTable() with our results
function search(checkboxes, songName) {
    // Get an array of search terms
    const queries = checkboxes.map(box => box.name);
    queries.unshift("Song"); // Add song to beginning of search criteria

    // Get an array of songs that match our search
    const songs = discography.filter(song => alike(songName, song.Song));

    // Make an array to store results
    const results = [];
    for (const song of songs) {
        const result = {};
        // Copy over the properties that match our search
        for (const query of queries) {
            result[query] = song[query];
        }
        results.push(result);
    }
    // Generate results table and add to page
    buildTable(queries, results);
}

// Return true if word2 is equal to or contains word1, not counting case, punctuation, or spacing
function alike(word1, word2) {
    const w1 = " " + word1.toLowerCase().replace(/[^a-z0-9\s]/g, "") + " ";
    const w2 = " " + word2.toLowerCase().replace(/[^a-z0-9\s]/g, "") + " ";
    return (w2.includes(w1));
}

// Build an html table with our results, and then add it to the page
function buildTable(headers, content) {
    // If no results were found, exit
    if (!content.length) {
        alert("No results found");
        return;
    }

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
        for (const i in item) {
            innerHTML += `<td>${item[i]}</td>`;
        }
        innerHTML += "</tr>";
    }
    innerHTML += "</tbody>";

    table.innerHTML = innerHTML;

    /* If there are already results in the results section, shrink them, replace them, and then 
     * grow back to regular size. If not, just add results and grow.
     */
    const oldTable = document.querySelector(".results table");
    if (oldTable) {
        // Shrink existing results (to default 0.2x scale)
        document.querySelector(".results").style.removeProperty("transform");

        // After shrink animation has finished:
        setTimeout(function () {
            oldTable.replaceWith(table);
            document.querySelector(".results").style.transform = "scale(1)";
        }, 250);
    } else {
        document.querySelector(".results").appendChild(table);
        document.querySelector(".results").style.transform = "scale(1)";
    }
}