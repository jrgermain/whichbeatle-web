"use strict";

// Once the page has loaded, set up go button event handling
$(document).ready(function() {
    $("#go").click(function() {
        const checkBoxes = $(".option input:checked").toArray();
        const songName = $("#song-name").val();

        // Validate input before performing search
        if (checkBoxes.length && songName) {
            search(checkBoxes, songName);
        } else {
            if (!checkBoxes.length) {
                alert("Please select at least one checkbox");
            }
            if (!songName) {
                alert("Please type a song name");
            }
        }
    })
});

// Perform a search
function search(checkBoxes, songName) {
    // Get an array of search terms
    const queries = checkBoxes.map(box => box.name);
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
    buildTable(queries,results);
}

// Return true if word2 is equal to or contains word1, not counting case, punctuation, or spacing
function alike(word1, word2) {
    let w1 = word1.toLowerCase().replace(/[^a-z0-9]/g,"");
    let w2 = word2.toLowerCase().replace(/[^a-z0-9]/g,"");
    return (w2.includes(w1));
}

function buildTable(headers, content) {
    // Build table header
    let table = "<table><thead><tr>";
    for (const header of headers) {
        table += `<th>${header}</th>`;
    }
    table += "</tr></thead><tbody>";
    
    // Build table content
    for (const item of content) {
        table += "<tr>";
        for (const i in item) {
            table += `<td>${item[i]}</td>`;
        }
        table += "</tr>";
    }
    table += "</tbody></table>";

    // If there is already a table present, remove it
    const oldTable = $(".results table");
    if (oldTable.length) {
        oldTable.remove();
    }

    // Add our new table
    $(".results").append(table);
}