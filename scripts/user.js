
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
