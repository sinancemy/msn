async function getCurrentUserInfo() {
    const response = await fetch(`http://localhost:3001/getCurrentUserInfo`);
    const data = await response.json();
    console.log("Current User Info: ", data);
}
async function getUserInfo(userId) {
    const response = await fetch(`http://localhost:3001/getUserInfo?userId=${userId}`);
    const data = await response.json();
    console.log("User Info: ", data);
}

async function getArtistInfo(artistId) {
    const response = await fetch(`http://localhost:3001/getArtistInfo?artistId=${artistId}`);
    const data = await response.json();
    console.log("Artist Info: ", data);
}

async function getArtistTracks(artistId) {
    const response = await fetch(`http://localhost:3001/getArtistTracks?artistId=${artistId}`);
    const data = await response.json();
    console.log("Artist Tracks: ", data);
}

async function getArtistFollowers(artistId) {
    const response = await fetch(`http://localhost:3001/getArtistFollowers?artistId=${artistId}`);
    const data = await response.json();
    console.log("Artist Followers: ", data);
}

async function getArtistAppearedAlbums(artistId) {
    const response = await fetch(`http://localhost:3001/getArtistAppearedAlbums?artistId=${artistId}`);
    const data = await response.json();
    console.log("Artist Appeared Albums: ", data);
}

async function getFriends(userId) {
    const response = await fetch(`http://localhost:3001/getFriends?userId=${userId}`);
    const data = await response.json();

    console.log(data)
    var table = document.getElementById("friends-table");
    for (let i = 0; i < data.length; i++) {
        var row = table.insertRow();
        // When row is clicked, go to the artist page with the proper id.
        row.className = "clickable-table-row"
        row.onclick = function () { showUserPanel(data[i].friend_id); }
        // Put image in cell
        var coverCell = row.insertCell(0);
        var img = document.createElement("img");
        img.src = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, data[i].avatar.data));
        img.className = "panel-image"
        coverCell.appendChild(img);
        // Put name in cell
        var nameCell = row.insertCell(1);
        nameCell.innerHTML = data[i].full_name;
    }
}
