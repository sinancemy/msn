async function searchTracks(searchQuery) {
    const response = await fetch(`http://localhost:3001/searchTracks?searchQuery=${searchQuery}`);
    const data = await response.json();
    return data
}

async function searchAlbums(searchQuery) {
    const response = await fetch(`http://localhost:3001/searchAlbums?searchQuery=${searchQuery}`);
    const data = await response.json();
    return data
}

async function searchPlaylists(searchQuery) {
    const response = await fetch(`http://localhost:3001/searchPlaylists?searchQuery=${searchQuery}`);
    const data = await response.json();
    return data
}

async function searchArtists(searchQuery) {
    const response = await fetch(`http://localhost:3001/searchArtists?searchQuery=${searchQuery}`);
    const data = await response.json();
    return data
}

async function searchEnjoyers(searchQuery) {
    const response = await fetch(`http://localhost:3001/searchEnjoyers?searchQuery=${searchQuery}`);
    const data = await response.json();
    return data
}


function performSearch() {
    const searchQuery = document.getElementById("search-input").value;

    if (document.getElementById("search-artists").checked) {
        searchArtists(searchQuery).then((data) => {
            var table = document.getElementById("artists-search-table");
            table.innerHTML = ""
            for (let i = 0; i < data.length; i++) {
                var row = table.insertRow();
                row.className = "clickable-table-row"
                row.onclick = function () { showArtistPanel(data[i].id); }
                var avatarCell = row.insertCell(0);
                var img = document.createElement("img");
                img.src = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, data[i].avatar.data));
                img.className = "panel-image"
                avatarCell.appendChild(img);
                var nameCell = row.insertCell(1);
                nameCell.innerHTML = data[i].artist_name;
            }
        });
    }

    if (document.getElementById("search-enjoyers").checked) {
        searchArtists(searchQuery).then((data) => {
            var table = document.getElementById("enjoyers-search-table");
            table.innerHTML = ""
            for (let i = 0; i < data.length; i++) {
                var row = table.insertRow();
                row.className = "clickable-table-row"
                row.onclick = function () { showEnjoyerPanel(data[i].id); }
                var avatarCell = row.insertCell(0);
                var img = document.createElement("img");
                img.src = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, data[i].avatar.data));
                img.className = "panel-image"
                avatarCell.appendChild(img);
                var nameCell = row.insertCell(1);
                nameCell.innerHTML = data[i].enjoyer_name;
            }
        });
    }

    if (document.getElementById("search-albums").checked) {
        searchAlbums(searchQuery).then((data) => {
            var table = document.getElementById("albums-search-table");
            table.innerHTML = ""
            for (let i = 0; i < data.length; i++) {
                var row = table.insertRow();
                row.className = "clickable-table-row"
                row.onclick = function () { showAlbumPanel(data[i].id); }
                var coverCell = row.insertCell(0);
                var img = document.createElement("img");
                img.src = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, data[i].cover_art.data));
                img.className = "panel-image"
                coverCell.appendChild(img);
                var nameCell = row.insertCell(1);
                nameCell.innerHTML = data[i].album_name;
            }
        });
    }

    if (document.getElementById("search-playlists").checked){
        searchPlaylists(searchQuery).then((data) => {
            var table = document.getElementById("playlists-search-table");
            table.innerHTML = ""
            for (let i = 0; i < data.length; i++) {
                var row = table.insertRow();
                row.className = "clickable-table-row"
                row.onclick = function () { showPlaylistPanel(data[i].id); }
                var coverCell = row.insertCell(0);
                var img = document.createElement("img");
                img.src = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, data[i].cover_art.data));
                img.className = "panel-image"
                coverCell.appendChild(img);
                var nameCell = row.insertCell(1);
                nameCell.innerHTML = data[i].playlist_name;
            }
        });
    }

    if (document.getElementById("search-tracks").checked){
        searchTracks(searchQuery).then((data) => {
            var table = document.getElementById("tracks-search-table");
            table.innerHTML = ""
            for (let i = 0; i < data.length; i++) {
                var row = table.insertRow();
                row.className = "clickable-table-row"
                row.onclick = function () { showAlbumPanel(data[i].album_id); }
                var coverCell = row.insertCell(0);
                var img = document.createElement("img");
                img.src = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, data[i].cover_art.data));
                img.className = "panel-image"
                coverCell.appendChild(img);
                var nameCell = row.insertCell(1);
                nameCell.innerHTML = data[i].song_name;
            }
        });
    }
}

