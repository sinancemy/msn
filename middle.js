
async function exampleFunction(parameter) {
    var parameter = document.getElementById("parameter").value;
    var table = document.getElementById("falan-filan-table");
    const response = await fetch(`http://localhost:3000/getExampleQuery?parameter=${parameter}`);
    const data = await response.json();
    table.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        var row = table.insertRow();
        var langCell = row.insertCell(0);
        langCell.innerHTML = data[i].Language;
    }
}

async function getCurrentUserId() {
    const response = await fetch(`http://localhost:3000/login/getUserId`);
    const data = await response.json();
    console.log(data.userId)
    return data.userId;
}

async function loginAuthorizationRequest(username, password) {
    const response = await fetch(`http://localhost:3000/login/auth`, {
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





