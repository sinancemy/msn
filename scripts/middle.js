
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

async function getUserType(userId){
    const response = await fetch(`http://localhost:3001/getUserType?userId=${userId}`);
    const data = await response.json();
    return data[0];
}

async function getCurrentUserType() {
    const userId = await getCurrentUserId()
    const data = await getUserType(userId)
    return data;
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
        img.className = "panel-image"
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
        img.className = "panel-image"
        coverCell.appendChild(img);
        // Put name in cell
        var nameCell = row.insertCell(1);
        nameCell.innerHTML = data[i].name;
    }
}

async function updateBio(userId, bio) {
    const response = await fetch(`http://localhost:3001/updateBio?userId=${userId}&bio=${bio}`);
    const data = await response.json();
    console.log("Result: ", data);
}

async function updateUsername(userId, username) {
    const response = await fetch(`http://localhost:3001/updateUsername?userId=${userId}&username=${username}`);
    const data = await response.json();
    console.log("Result: ", data);
}

async function updateAvatar(userId, avatar) {
    const response = await fetch(`http://localhost:3001/updateAvatar?userId=${userId}&avatar=${avatar}`);
    const data = await response.json();
    console.log("Result: ", data);
}

async function addPlaylistTrack(playlistId, trackId) {
    const response = await fetch(`http://localhost:3001/addPlaylistTrack?playlistId=${playlistId}&trackId=${trackId}`);
    const data = await response.json();
    console.log("Result: ", data);
}

async function addFriend(userId1, userId2) {
    const response = await fetch(`http://localhost:3001/addFriend?userId1=${userId1}&userId2=${userId2}`);
    const data = await response.json();
    console.log("Result: ", data);
  }


function showHomePanel() {
    window.location.href = `../pages/home.html`;
}
function showSearchPanel() {
    window.location.href = `../pages/search.html`;
}
function showFriendsPanel() {
    window.location.href = `../pages/friends.html`;
}

function showCurrentProfilePanel() {
    getCurrentUserType().then((data) => {
        if (data.is_enjoyer == 1){
            getCurrentUserId().then((id) => {
                showEnjoyerPanel(id);
            })
        } else if (data.is_artist == 1){
            getCurrentUserId().then((id) => {
                showArtistPanel(id);
            })
        }  else {
            console.log("user doesnt exist")
        }
    });
}

function showUserPanel(user_id) {
    getUserType(user_id).then((data) => {
        if (data.is_enjoyer == 1){
                showEnjoyerPanel(user_id);
        } else if (data.is_artist == 1){
                showArtistPanel(user_id);
        }  else {
            console.log("user doesnt exist")
        }
    })
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
function showEnjoyerPanel(enjoyer_id) {
    window.location.href = `../pages/enjoyerProfile.html?id=${enjoyer_id}`;
}

function formatSeconds(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    
    var formattedMinutes = ("0" + minutes).slice(-2);
    var formattedSeconds = ("0" + remainingSeconds).slice(-2);
    
    return formattedMinutes + ":" + formattedSeconds;
  }

function formatDate(dateString) {
    var date = new Date(dateString);

    var day = date.getUTCDate();
    var month = date.getUTCMonth() + 1;
    var year = date.getUTCFullYear();

    var formattedDate = ("0" + day).slice(-2) + "-" + ("0" + month).slice(-2) + "-" + year;

    return formattedDate;
}