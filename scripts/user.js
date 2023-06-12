async function getCurrentUserInfo() {
    const response = await fetch(`http://localhost:3001/getCurrentUserInfo`);
    const data = await response.json();
    console.log("Current User Info: ", data);
}
async function getUserInfo(userId) {
    const response = await fetch(`http://localhost:3001/getUserInfo?userId=${userId}`);
    const data = await response.json();
    console.log("User Info: ", data);

    var table = document.getElementById("enjoyer-info-table");
    for (let i = 0; i < data.length; i++) {
        var row = table.insertRow();
        // When row is clicked, go to the artist page with the proper id.
        row.className = "clickable-table-row"

        // Put image in cell
        var coverCell = row.insertCell(0);
        coverCell.innerHTML = data[i].full_name;

        // Put name in cell
        var nameCell = row.insertCell(1);
        nameCell.innerHTML = data[i].bio;

        var avatarElem = document.getElementById("enjoyer-avatar");
        avatarElem.src = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, data[i].avatar.data));
    }
}

async function getArtistInfo(artistId) {
    const response = await fetch(`http://localhost:3001/getArtistInfo?artistId=${artistId}`);
    const data = await response.json();
    console.log("Artist Info: ", data);

    var table = document.getElementById("artist-info-table");
    for (let i = 0; i < data.length; i++) {
        var row = table.insertRow();
        // When row is clicked, go to the artist page with the proper id.
        row.className = "clickable-table-row"

        // Put image in cell
        var coverCell = row.insertCell(0);
        coverCell.innerHTML = data[i].full_name;

        // Put name in cell
        var nameCell = row.insertCell(1);
        nameCell.innerHTML = data[i].bio;

        var avatarElem = document.getElementById("artist-avatar");
        avatarElem.src = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, data[i].avatar.data));

        // Put name in cell
        var followerCount = row.insertCell(2);
        followerCount.innerHTML = data[i].follower_count;
    }

}

async function addFriend(userId) {
    const response = await fetch(`http://localhost:3001/addFriend?userId=${userId}`);
    const data = await response.json();
    console.log("Result: ", data);
}

async function removeFriend(userId) {
    const response = await fetch(`http://localhost:3001/removeFriend?userId=${userId}`);
    const data = await response.json();
    console.log("Result: ", data);
}

async function saveContent(contentId) {
    const response = await fetch(`http://localhost:3001/saveContent?contentId=${contentId}`);
    const data = await response.json();
    console.log("Result: ", data);
}

async function unsaveContent(contentId) {
    const response = await fetch(`http://localhost:3001/unsaveContent?contentId=${contentId}`);
    const data = await response.json();
    console.log("Result: ", data);
}

async function followArtist(artistId) {
    const response = await fetch(`http://localhost:3001/followArtist?artistId=${artistId}`);
    const data = await response.json();
    console.log("Artist Tracks: ", data);
}

async function unfollowArtist(artistId) {
    const response = await fetch(`http://localhost:3001/unfollowArtist?artistId=${artistId}`);
    const data = await response.json();
    console.log("Artist Tracks: ", data);
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

    var table = document.getElementById("artist-follower-table");
    for (let i = 0; i < data.length; i++) {
        var row = table.insertRow();
        // When row is clicked, go to the artist page with the proper id.
        row.className = "clickable-table-row"
        row.onclick = function () { showEnjoyerPanel(data[i].friend_id); }

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

async function getArtistAppearedAlbums(artistId) {
    const response = await fetch(`http://localhost:3001/getArtistAppearedAlbums?artistId=${artistId}`);
    const data = await response.json();
    console.log("Artist Appeared Albums: ", data);

    var table = document.getElementById("artist-album-table");
    for (let i = 0; i < data.length; i++) {
        var row = table.insertRow();
        // When row is clicked, go to the artist page with the proper id.
        row.className = "clickable-table-row"
        row.onclick = function () { showAlbumPanel(data[i].id); }

        // Put image in cell
        // Put name in cell
        var nameCell = row.insertCell(0);
        nameCell.innerHTML = data[i].name;

        var coverCell = row.insertCell(1);
        var img = document.createElement("img");
        img.src = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, data[i].cover_art.data));
        img.className = "panel-image"
        coverCell.appendChild(img);


    }
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