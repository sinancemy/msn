
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
        console.log("LOGIN SUCCESSFUL, LOGGED IN AS USER WITH id = " + userId)
    } else {
        console.log("LOGIN FAILED FOR username = " + username)
    }
}

async function getFollowedArtists() {
    const response = await fetch(`http://localhost:3001/getFollowedArtists`);
    const data = await response.json();
    console.log("Followed Artists: ", data);
}

async function getSavedAlbums() {
    const response = await fetch(`http://localhost:3001/getSavedAlbums`);
    const data = await response.json();
    console.log("Saved Artists: ", data);
}

async function getSavedPlaylists() {
    const response = await fetch(`http://localhost:3001/getSavedPlaylists`);
    const data = await response.json();
    console.log("Saved Artists: ", data);
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
async function getUserInfo() {
    const response = await fetch(`http://localhost:3001/getUserInfo?userId=${parameter}`);
    const data = await response.json();
    console.log("User Info: ", data);
}



function showHomePanel() {
    window.location.href = "home.html";
}
function showSearchPanel() {
    window.location.href = "search.html";
}
function showFriendsPanel() {
    window.location.href = "friends.html";
}
function showProfilePanel() {
    window.location.href = "profile.html";
}
function showPlaylistPanel() {
    window.location.href = "playlists.html";
}
function showAlbumPanel() {
    window.location.href = "albums.html";
}
function showArtistPanel() {
    window.location.href = "artistProfile.html";
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

function login() {
    window.location.href = "home.html";
}





