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
    console.log("Result: ", data);
}

async function unfollowArtist(artistId) {
    const response = await fetch(`http://localhost:3001/unfollowArtist?artistId=${artistId}`);
    const data = await response.json();
    console.log("Result: ", data);
}


async function getArtistTracks(artistId) {
    const response = await fetch(`http://localhost:3001/getArtistTracks?artistId=${artistId}`);
    const data = await response.json();
    return data
}

async function hasSaved(contentId) {
    const response = await fetch(`http://localhost:3001/hasSaved?contentId=${contentId}`);
    const data = await response.json();
    return data
}

async function isFollowing(artistId) {
    const response = await fetch(`http://localhost:3001/isFollowing?artistId=${artistId}`);
    const data = await response.json();
    return data
}

async function isFriend(userId) {
    const response = await fetch(`http://localhost:3001/isFriend?userId=${userId}`);
    const data = await response.json();
    return data
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

function loadSaveButton(contentId){
    const button = document.getElementById("save-content-button");

    hasSaved(contentId).then((data) => {
        const hasSaved = data[0].is_saved
        if (hasSaved == 1){
            button.textContent = "Unsave"
            button.onclick = function () { 
                unsaveContent(contentId)
                refreshPage()    
            }
        } else {
            button.textContent = "Save"
            button.onclick = function () { 
                saveContent(contentId)
                refreshPage()
             }
        }
    })
}

function loadFollowButton(artistId){
    getCurrentUserId().then((userId)=>{
        if(userId!=artistId){
            const button = document.getElementById("follow-artist-button")
            button.style.display = "block";
            isFollowing(artistId).then((data)=>{
                const isFollowing = data[0].is_following
                console.log("jeje" + isFollowing)
                if (isFollowing == 1){
                    button.textContent = "Unfollow"
                    button.onclick = function () { 
                        unfollowArtist(artistId)
                        refreshPage()    
                    }
                } else {
                    button.textContent = "Follow"
                    button.onclick = function () { followArtist(artistId) 
                        refreshPage()   }
                }
            })
        }
    })
}

function loadFriendButton(enjoyerId){
    getCurrentUserId().then((userId)=>{
        if(userId!=enjoyerId){
            const button = document.getElementById("friend-enjoyer-button")
            button.style.display = "block";
            isFriend(enjoyerId).then((data)=>{
                const isFriend = data[0].is_friend
                if (isFriend == 1){
                    button.textContent = "Unfriend"
                    button.onclick = function () { removeFriend(enjoyerId) 
                        refreshPage()   }
                } else {
                    button.textContent = "Friend"
                    button.onclick = function () { addFriend(enjoyerId) 
                        refreshPage()  
                     }
                }
            })
        }
    })
}