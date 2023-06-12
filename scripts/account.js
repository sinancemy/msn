
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

async function removePlaylistTrack(playlistId, trackId) {
    const response = await fetch(`http://localhost:3001/removePlaylistTrack?playlistId=${playlistId}&trackId=${trackId}`);
    const data = await response.json();
    console.log("Result: ", data);
}

async function addFriend(userId1, userId2) {
    const response = await fetch(`http://localhost:3001/addFriend?userId1=${userId1}&userId2=${userId2}`);
    const data = await response.json();
    console.log("Result: ", data);
}

async function removeFriend(userId1, userId2) {
    const response = await fetch(`http://localhost:3001/removeFriend?userId1=${userId1}&userId2=${userId2}`);
    const data = await response.json();
    console.log("Result: ", data);
}

async function addEnjoyer(enjoyment, username, password, fullName, avatar, email, bio) {
    const response = await fetch(`http://localhost:3001/addEnjoyer?enjoyment=${enjoyment}&username=${username}&password=${password}&fullName=${fullName}&avatar=${avatar}&email=${email}&bio=${bio}`);
    const data = await response.json();
    return data
}

async function removeEnjoyer(enjoyerId) {
    const response = await fetch(`http://localhost:3001/removeEnjoyer?enjoyerId=${enjoyerId}`);
    const data = await response.json();
    console.log("Result: ", data);
}

async function addArtist(verified, username, password, fullName, avatar, email, bio) {
    const response = await fetch(`http://localhost:3001/addArtist?verified=${verified}&username=${username}&password=${password}&fullName=${fullName}&avatar=${avatar}&email=${email}&bio=${bio}`);
    const data = await response.json();
    console.log("Result: ", data);
}

async function removeArtist(artistId) {
    const response = await fetch(`http://localhost:3001/removeArtist?artistId=${artistId}`);
    const data = await response.json();
    console.log("Result: ", data);
}

// enjoyment, username, password, fullName, avatar, email, bio
function signUp(){
    type = document.querySelector('input[name=role]:checked').value

    username = document.getElementById('username-field').value,
    password = CryptoJS.SHA256(document.getElementById('password-field').value).toString(),
    full_name = document.getElementById('fullname-field').value,
    avatar = processAvatar(document.getElementById('avatar-file').files[0]),
    email = document.getElementById('email-field').value,
    bio = document.getElementById('bio-field').value
    console.log(avatar)
    if (type == "enjoyer"){
        enjoyment = 5
        addEnjoyer(enjoyment, username, password, full_name, avatar, email, bio).then((response) => {
                if (response == "ok"){
                    showLoginPanel();
                } else {
                    console.log("enjoyer exists")
                }
            })
    } else if (type == "artist"){
        verified = false
        addArtist(verified, username, password, full_name, avatar, email, bio).then((response) => {
            if (response == "ok"){
                showLoginPanel();
            } else {
                console.log("artist exists")
            }
        })
    }

}


function processAvatar(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = 256;
          canvas.height = 256;
          ctx.drawImage(img, 0, 0, 256, 256);
          canvas.toBlob(function (blob) {
            const reader = new FileReader();
            reader.onloadend = function () {
              resolve(reader.result);
            };
            reader.readAsArrayBuffer(blob);
          }, 'image/jpeg', 1);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
}