"use strict";

// Once the page has loaded:
$(document).ready(function() {
    // Reset page elements
    $(".results").hide();
    $("#song-name").val("");
    $(":checkbox").prop("checked", false);

    // Set up event handling for Go button
    $("#go").click(function() {
        submit();
    })

    // Set up event handling for pressing enter in search field
    $('#song-name').on("keydown", function(event) {
        if (event.key === "Enter") submit();
    });

});

function submit() {
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
}

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
    let w1 = word1.toLowerCase().replace(/[^a-z0-9\s]/g,"");
    let w2 = word2.toLowerCase().replace(/[^a-z0-9\s]/g,"");
    return (w2.includes(w1));
}

function buildTable(headers, content) {
    // If no results were found, exit
    if (!content.length) {
        alert("No results found");
        return;
    }
    
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

    /* If there are already results in the results section, shrink them, replace them, and then 
     * grow back to regular size. If not, just add results and grow.
     */
    const oldTable = $(".results table");
    if (oldTable.length) {
        // Shrink existing results (to default 0.2x scale)
        $(".results").css("transform", "");
        
        // After shrink animation has finished:
        setTimeout(function() {
            oldTable.replaceWith(table);
            $(".results").css("transform", "scale(1)"); // Grow back to 1x scale
        }, 250);
    } else {
        $(".results").append(table);
        $(".results").show();
        $(".results").css("transform", "scale(1)"); // Grow to 1x scale
    }
}