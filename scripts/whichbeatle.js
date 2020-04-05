"use strict";

(function () {
    // Save references to HTML elements we will access later
    const queryCheckboxes = Array.from(document.querySelectorAll("#composer,#singer,#album"));
    const inputs = Array.from(document.getElementsByTagName("input"));
    const songName = document.getElementById("song-name");
    const random = document.getElementById("random");
    const goButton = document.getElementById("go");
    const resultsDiv = document.querySelector("div.results");

    // Clear song input field
    songName.value = "";

    // Uncheck checkboxes
    queryCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // When Random button is clicked, call the getRandomSong function
    random.addEventListener("click", getRandomSong);

    // Submit when Go button is clicked
    goButton.addEventListener("click", submit);

    // Submit when enter is pressed inside an input
    inputs.forEach(input => {
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") submit();
        });
    });

    // This function gets a random song name and fills it in the song name field
    function getRandomSong() {
        // Get a random number between 0 and discography.length-1
        const index = Math.floor(Math.random() * discography.length);
        const name = discography[index].Song;
        songName.value = name;
    }

    // Submit the search after checking that it is valid
    function submit() {
        // Make an array holding a list of selected search queries
        const queries = queryCheckboxes.filter(checkbox => checkbox.checked);

        // Validate input before performing search
        if (!songName.value && !queries.length) { 
            alert("Please type a song name and select which fields to display");
        } else if (!songName.value) {
            alert("Please type a song name");
        } else if (!queries.length) {
            alert("Please use the checkboxes to select which fields to display");
        } else {
            search(queries, songName.value);
        }
    }

    // Perform a search, then call buildTable() with our results
    function search(checkboxes, songName) {
        // Get an array of search terms
        const queries = checkboxes.map(checkbox => checkbox.name);
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
            resultsDiv.style.removeProperty("transform");

            // After shrink animation has finished:
            setTimeout(function () {
                oldTable.replaceWith(table);
                resultsDiv.style.transform = "scale(1)";
            }, 250);
        } else {
            resultsDiv.appendChild(table);
            resultsDiv.style.transform = "scale(1)";
        }
    }
})();