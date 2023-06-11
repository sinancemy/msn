
async function exampleFunction(parameter) {
    var parameter = document.getElementById("parameter").value;
    var table = document.getElementById("falan-filan-table");
    const response = await fetch(`http://localhost:3001/getExampleQuery?parameter=${parameter}`);
    const data = await response.json();
    table.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        var row = table.insertRow();
        var langCell = row.insertCell(0);
        langCell.innerHTML = data[i].Language;
    }
}

async function getCurrentUserId() {
    const response = await fetch(`http://localhost:3001/login/getUserId`);
    const data = await response.json();
    console.log(data.userId)
    return data.userId;
}

async function loginAuthorizationRequest(username, password) {
    const response = await fetch(`http://localhost:3001/login/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    const data = await response.json();
    const userId = data.userId
    if (userId != null) {
        showHomePanel()
        console.log("LOGIN SUCCESSFUL, LOGGED IN AS USER WITH id = " + userId)
    } else {
        // TODO : Display something on page, incorrect username/password.
        console.log("LOGIN FAILED FOR username = " + username)
    }
}

async function getFollowedArtists() {
    const response = await fetch(`http://localhost:3001/getFollowedArtists`);
    const data = await response.json();
    var table = document.getElementById("artists-table");
    for (let i = 0; i < data.length; i++) {
        var row = table.insertRow();
        // When row is clicked, go to the artist page with the proper id.
        row.className = "clickable-table-row"
        row.onclick = function () { showArtistPanel(data[i].id); }
        // Put image in cell
        var avatarCell = row.insertCell(0);
        var img = document.createElement("img");
        img.src = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, data[i].avatar.data));
        img.className = "panel-image"
        avatarCell.appendChild(img);
        // Put name in cell
        var nameCell = row.insertCell(1);
        nameCell.innerHTML = data[i].full_name;
    }
}

async function getSavedAlbums() {
    const response = await fetch(`http://localhost:3001/getSavedAlbums`);
    const data = await response.json();
    var table = document.getElementById("albums-table");
    for (let i = 0; i < data.length; i++) {
        var row = table.insertRow();
        // When row is clicked, go to the artist page with the proper id.
        row.className = "clickable-table-row"
        row.onclick = function () { showAlbumPanel(data[i].id); }
        // Put image in cell
        var coverCell = row.insertCell(0);
        var img = document.createElement("img");
        img.src = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, data[i].cover_art.data));
        img.className = "small-image"
        coverCell.appendChild(img);
        // Put name in cell
        var nameCell = row.insertCell(1);
        nameCell.innerHTML = data[i].name;
    }
}

async function getSavedPlaylists() {
    const response = await fetch(`http://localhost:3001/getSavedPlaylists`);
    const data = await response.json();
    var table = document.getElementById("playlists-table");
    for (let i = 0; i < data.length; i++) {
        var row = table.insertRow();
        // When row is clicked, go to the artist page with the proper id.
        row.className = "clickable-table-row"
        row.onclick = function () { showPlaylistPanel(data[i].id); }
        // Put image in cell
        var coverCell = row.insertCell(0);
        var img = document.createElement("img");
        img.src = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, data[i].cover_art.data));
        img.className = "small-image"
        coverCell.appendChild(img);
        // Put name in cell
        var nameCell = row.insertCell(1);
        nameCell.innerHTML = data[i].name;
    }
}

async function getFriends() {
    const response = await fetch(`http://localhost:3001/getFriends`);
    const data = await response.json();
    console.log("Friends: ", data);
}

async function getCurrentUserInfo() {
    const response = await fetch(`http://localhost:3001/getCurrentUserInfo`);
    const data = await response.json();
    console.log("Current User Info: ", data);
}
async function getUserInfo(parameter) {
    const response = await fetch(`http://localhost:3001/getUserInfo?userId=${parameter}`);
    const data = await response.json();
    console.log("User Info: ", data);
}

async function getAlbumInfo(parameter) {
    const response = await fetch(`http://localhost:3001/getAlbumInfo?albumID=${parameter}`);
    const data = await response.json();
    console.log("Album Info: ", data);
}

async function searchTracks(parameter) {
    console.log("help")
    const response = await fetch(`http://localhost:3001/searchTracks?searchQuery=${parameter}`);
    const data = await response.json();
    console.log("Matched Tracks: ", data);
}

async function searchAlbums(parameter) {
    const response = await fetch(`http://localhost:3001/searchAlbums?searchQuery=${parameter}`);
    const data = await response.json();
    console.log("Matched Albums: ", data);
}

async function searchPlaylists(parameter) {
    const response = await fetch(`http://localhost:3001/searchPlaylists?searchQuery=${parameter}`);
    const data = await response.json();
    console.log("Matched Playlists: ", data);
}

async function searchArtists(parameter) {
    const response = await fetch(`http://localhost:3001/searchArtists?searchQuery=${parameter}`);
    const data = await response.json();
    console.log("Matched Artists: ", data);
}

async function searchEnjoyers(parameter) {
    const response = await fetch(`http://localhost:3001/searchEnjoyers?searchQuery=${parameter}`);
    const data = await response.json();
    console.log("Matched Enjoyers: ", data);
}


function showHomePanel() {
    window.location.href = "../pages/home.html";
}
function showSearchPanel() {
    window.location.href = "../pages/search.html";
}
function showFriendsPanel() {
    window.location.href = "../pages/friends.html";
}
function showProfilePanel() {
    window.location.href = "../pages/profile.html";
}
function showPlaylistPanel(playlist_id) {
    window.location.href = `../pages/playlist.html?id=${playlist_id}`;
}
function showAlbumPanel(album_id) {
    window.location.href = `../pages/album.html?id=${album_id}`;
}
function showArtistPanel(artist_id) {
    window.location.href = `../pages/artistProfile.html?id=${artist_id}`;
}

function performSearch() {
    var selectedPanels = [];

    // Check if the Artists checkbox is checked
    if (document.getElementById("search-artists").checked) {
        selectedPanels.push("Artists");
    }

    // Check if the Albums checkbox is checked
    if (document.getElementById("search-albums").checked) {
        selectedPanels.push("Albums");
    }

    // Check if the Playlists checkbox is checked
    if (document.getElementById("search-playlists").checked) {
        selectedPanels.push("Playlists");
    }

    // Check if the Songs checkbox is checked
    if (document.getElementById("search-songs").checked) {
        selectedPanels.push("Songs");
    }

    // Display the selected panels (console.log is used as an example)
    console.log("Selected Panels: ", selectedPanels);
}

