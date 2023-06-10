
async function getExampleQuery(parameter) {
    const response = await fetch(`http://localhost:3000/getExampleQuery?parameter=${parameter}`);
    const jsonData = await response.json();
    return jsonData;
}

function exampleQuery() {
    var parameter = document.getElementById("parameter").value;
    var table = document.getElementById("falan-filan-table");
    getExampleQuery(parameter).then((jsonData) => {
        table.innerHTML = "";
        for (var i = 0; i < jsonData.length; i++) {
            var row = table.insertRow();
            var langCell = row.insertCell(0);
            langCell.innerHTML = jsonData[i].Language;
        }
    });
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





