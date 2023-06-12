
async function getCurrentUserId() {
    const response = await fetch(`http://localhost:3001/login/getUserId`);
    const data = await response.json();
    console.log(data.userId)
    return data.userId;
}

async function getUserType(userId) {
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

async function signOff(){
    const response = await fetch(`http://localhost:3001/login/signoff`);
    showLoginPanel()
}

function refreshPage(){
    location.reload();
}
function showHomePanel() {
    window.location.href = `../pages/home.html`;
}
function showLoginPanel() {
    window.location.href = `../pages/login.html`;
}
function showSignupPanel() {
    window.location.href = `../pages/signup.html`;
}
function showSearchPanel() {
    window.location.href = `../pages/search.html`;
}
function showSettingsPanel() {
    window.location.href = `../pages/settings.html`;
}

function showCurrentProfilePanel() {
    getCurrentUserType().then((data) => {
        if (data.is_enjoyer == 1) {
            getCurrentUserId().then((id) => {
                showEnjoyerPanel(id);
            })
        } else if (data.is_artist == 1) {
            getCurrentUserId().then((id) => {
                showArtistPanel(id);
            })
        } else {
            console.log("user doesnt exist")
        }
    });
}

function showUserPanel(user_id) {
    getUserType(user_id).then((data) => {
        if (data.is_enjoyer == 1) {
            showEnjoyerPanel(user_id);
        } else if (data.is_artist == 1) {
            showArtistPanel(user_id);
        } else {
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

function decodeEmoji(emojiBytes) {
    if (emojiBytes != null) {
        const uint8Array = new Uint8Array(emojiBytes.data);
        const decoder = new TextDecoder('utf-8');
        const emojiString = decoder.decode(uint8Array);
        return emojiString;
    }
    return "-"
}

