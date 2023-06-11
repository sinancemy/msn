async function searchTracks(searchQuery) {
    console.log("help")
    const response = await fetch(`http://localhost:3001/searchTracks?searchQuery=${searchQuery}`);
    const data = await response.json();
    console.log("Matched Tracks: ", data);
}

async function searchAlbums(searchQuery) {
    const response = await fetch(`http://localhost:3001/searchAlbums?searchQuery=${searchQuery}`);
    const data = await response.json();
    console.log("Matched Albums: ", data);
}

async function searchPlaylists(searchQuery) {
    const response = await fetch(`http://localhost:3001/searchPlaylists?searchQuery=${searchQuery}`);
    const data = await response.json();
    console.log("Matched Playlists: ", data);
}

async function searchArtists(searchQuery) {
    const response = await fetch(`http://localhost:3001/searchArtists?searchQuery=${searchQuery}`);
    const data = await response.json();
    console.log("Matched Artists: ", data);
}

async function searchEnjoyers(searchQuery) {
    const response = await fetch(`http://localhost:3001/searchEnjoyers?searchQuery=${searchQuery}`);
    const data = await response.json();
    console.log("Matched Enjoyers: ", data);
}


function performSearch() {
    document.getElementById
    if (document.getElementById("search-artists").checked) 
        searchArtists()

    if (document.getElementById("search-albums").checked)
        selectedPanels.push("Albums");
    if (document.getElementById("search-playlists").checked)
        selectedPanels.push("Playlists");
    if (document.getElementById("search-songs").checked)
        selectedPanels.push("Songs");
}

