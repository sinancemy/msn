
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
function showPlaylistsPanel() {
    window.location.href = "playlists.html";
}
function showAlbumsPanel() {
    window.location.href = "albums.html";
}



