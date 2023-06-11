
async function getAlbumInfo(albumId) {
    const response = await fetch(`http://localhost:3001/getAlbumInfo?albumId=${albumId}`);
    const data = await response.json();
    const album_data = data[0]
    var nameElem = document.getElementById("album-name");
    nameElem.innerText = album_data.name;
    var dateElem = document.getElementById("album-date");
    dateElem.innerText = formatDate(album_data.creation_date);
    var artElem = document.getElementById("album-cover-art");
    artElem.src = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, album_data.cover_art.data));
}

async function getAlbumTracks(albumId) {
    const response = await fetch(`http://localhost:3001/getAlbumTracks?albumId=${albumId}`);
    const data = await response.json();
    var table = document.getElementById("album-tracks-table")
    for (let i = 0; i < data.length; i++) {
        getPerformers(data[i].id).then((artist_data) => {
            var row = table.insertRow();
            // When row is clicked, go to the artist page with the proper id.
            row.className = "clickable-table-row"
            row.onclick = function () {getTrackReactions(data[i].id) } // reactionları yükle
    
            var nameCell = row.insertCell(0)
            nameCell.innerHTML = data[i].name;
            var lengthCell = row.insertCell(1);
            lengthCell.innerHTML = formatSeconds(data[i].length_seconds);
            var artistsCell = row.insertCell(2);
            artistsCell.innerHTML = "| "
            for(let j = 0; j < artist_data.length; j++){
                artistsCell.innerHTML += artist_data[j].full_name + " | ";
            }
        });
    }
}

function getTrackReactions(trackId){
    getContentReactions(trackId).then((data) => {
        var table = document.getElementById("track-reactions-table")
        table.innerHTML = ""
        for (let i = 0; i < data.length; i++) {
            var row = table.insertRow();
            // When row is clicked, go to the artist page with the proper id.
            row.className = "clickable-table-row"
            row.onclick = function () { } // kendi yorumuysa silebilir?

            var avatarCell = row.insertCell(0);
            var img = document.createElement("img");
            img.src = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, data[i].avatar.data));
            img.className = "panel-image"
            avatarCell.appendChild(img);

            var nameCell = row.insertCell(1)
            nameCell.innerHTML = data[i].full_name;

            var commentCell = row.insertCell(2);
            commentCell.innerHTML = data[i].txt;

            var reactionCell = row.insertCell(3);
            reactionCell.innerHTML = data[i].emoji
        }
    });
}

function getAlbumReactions(albumId) {
    getContentReactions(albumId).then((data) => {
        var table = document.getElementById("album-reactions-table")
        for (let i = 0; i < data.length; i++) {
            var row = table.insertRow();
            // When row is clicked, go to the artist page with the proper id.
            row.className = "clickable-table-row"
            row.onclick = function () { } // kendi yorumuysa silebilir?

            var avatarCell = row.insertCell(0);
            var img = document.createElement("img");
            img.src = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, data[i].avatar.data));
            img.className = "panel-image"
            avatarCell.appendChild(img);

            var nameCell = row.insertCell(1)
            nameCell.innerHTML = data[i].full_name;

            var commentCell = row.insertCell(2);
            commentCell.innerHTML = data[i].txt;

            var reactionCell = row.insertCell(3);
            reactionCell.innerHTML = data[i].emoji
        }
    });
}

async function getPlaylistInfo(playlistId) {
    const response = await fetch(`http://localhost:3001/getPlaylistInfo?playlistId=${playlistId}`);
    const data = await response.json();
    console.log(data)
    const playlist_data = data[0]
    var nameElem = document.getElementById("playlist-name");
    nameElem.innerText = playlist_data.name;
    var dateElem = document.getElementById("playlist-date");
    dateElem.innerText = formatDate(playlist_data.creation_date);
    var artElem = document.getElementById("playlist-cover-art");
    artElem.src = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, playlist_data.cover_art.data));
}

async function getPlaylistTracks(playlistId) {
    const response = await fetch(`http://localhost:3001/getPlaylistTracks?playlistId=${playlistId}`);
    const data = await response.json();
    var table = document.getElementById("playlist-tracks-table")
    for (let i = 0; i < data.length; i++) {
        getPerformers(data[i].id).then((artist_data) => {
            var row = table.insertRow();
            // When row is clicked, go to the artist page with the proper id.
            row.className = "clickable-table-row"
            row.onclick = function () { getTrackReactions(data[i].id) }
    
            var nameCell = row.insertCell(0)
            nameCell.innerHTML = data[i].name;
            var lengthCell = row.insertCell(1);
            lengthCell.innerHTML = formatSeconds(data[i].length_seconds);
            var artistsCell = row.insertCell(2);
            artistsCell.innerHTML = "| "
            for(let j = 0; j < artist_data.length; j++){
                artistsCell.innerHTML += artist_data[j].full_name + " | ";
            }
        });
    }
}

function getPlaylistReactions(playlistId) {
    getContentReactions(playlistId).then((data) => {
        var table = document.getElementById("playlist-reactions-table")
        for (let i = 0; i < data.length; i++) {
            var row = table.insertRow();
            // When row is clicked, go to the artist page with the proper id.
            row.className = "clickable-table-row"
            row.onclick = function () { } // kendi yorumuysa silebilir?

            var avatarCell = row.insertCell(0);
            var img = document.createElement("img");
            img.src = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, data[i].avatar.data));
            img.className = "panel-image"
            avatarCell.appendChild(img);

            var nameCell = row.insertCell(1)
            nameCell.innerHTML = data[i].full_name;

            var commentCell = row.insertCell(2);
            commentCell.innerHTML = data[i].txt;

            var reactionCell = row.insertCell(3);
            reactionCell.innerHTML = data[i].emoji
        }
    });
}



async function getContentReactions(contentId) {
    const response = await fetch(`http://localhost:3001/getContentReactions?contentId=${contentId}`);
    const data = await response.json();
    return data
}

async function getPerformers(trackId) {
    const response = await fetch(`http://localhost:3001/getPerformers?trackId=${trackId}`);
    const data = await response.json();
    return data
}