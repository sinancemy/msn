async function getAlbumInfo(albumId) {
    const response = await fetch(`http://localhost:3001/getAlbumInfo?albumId=${albumId}`);
    const data = await response.json();
    console.log("Album Info: ", data);
}

async function getAlbumTracks(albumId) {
    const response = await fetch(`http://localhost:3001/getAlbumTracks?albumId=${albumId}`);
    const data = await response.json();
    console.log("Album Tracks: ", data);
}

async function getPlaylistInfo(playlistId) {
    const response = await fetch(`http://localhost:3001/getPlaylistInfo?playlistId=${playlistId}`);
    const data = await response.json();
    console.log("Playlist Info: ", data);
}
async function getPlaylistTracks(playlistId) {
    const response = await fetch(`http://localhost:3001/getPlaylistTracks?playlistId=${playlistId}`);
    const data = await response.json();
    console.log("Playlist Tracks: ", data);
}

async function getContentReactions(contentId) {
    const response = await fetch(`http://localhost:3001/getContentReactions?contentId=${contentId}`);
    const data = await response.json();
    console.log("Track Reactions: ", data);
}