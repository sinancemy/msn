
async function updateBio(userId, bio) {
    const response = await fetch(`http://localhost:3001/updateBio?userId=${userId}&bio=${bio}`);
    const data = await response.json();
    console.log("Result: ", data);
}

async function updateFullName(userId, full_name) {
    console.log(userId + " " + full_name)
    const response = await fetch(`http://localhost:3001/updateFullName?userId=${userId}&full_name=${full_name}`);
    const data = await response.json();
    console.log("Result: ", data);
}

async function updateAvatar(userId, avatar) {
    const response = await fetch(`http://localhost:3001/updateAvatar?userId=${userId}&avatar=${avatar}`);
    const data = await response.json();
    console.log("Result: ", data);
}


async function addEnjoyer(enjoyment, username, password, fullName, avatar, email, bio) {
    const url = 'http://localhost:3001/addEnjoyer';
    const data = {
        enjoyment: enjoyment,
        username: username,
        password: password,
        fullName: fullName,
        avatar: avatar,
        email: email,
        bio: bio
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    return result
}

async function addArtist(verified, username, password, fullName, avatar, email, bio) {
    const response = await fetch('http://localhost:3001/addArtist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            verified,
            username,
            password,
            fullName,
            avatar,
            email,
            bio
        })
    });

    const data = await response.json();
    return data
}

async function removeUser(userId) {
    const response = await fetch(`http://localhost:3001/removeUser?userId=${userId}`);
    const data = await response.json();
    console.log("Result: ", data);
}

function signUp() {
    type = document.querySelector('input[name=role]:checked').value
    username = document.getElementById('username-field').value
    password = CryptoJS.SHA256(document.getElementById('password-field').value).toString()
    full_name = document.getElementById('fullname-field').value
    avatar = null//document.getElementById('avatar-file').files[0]
    email = document.getElementById('email-field').value
    bio = document.getElementById('bio-field').value

    existsUser().then((data) => {
        const exists = data[0].exists
        if (exists != 1){
            if (type == "enjoyer") {
                enjoyment = 5
                addEnjoyer(enjoyment, username, password, full_name, avatar, email, bio).then((response) => {
                    console.log(response)
                    if (response.enjoyerResults.affectedRows == 1) {
                        showLoginPanel();
                    } else {
                        console.log("enjoyer exists")
                    }
                })
            } else if (type == "artist") {
                verified = false
                addArtist(verified, username, password, full_name, avatar, email, bio).then((response) => {
                    if (response.artistResults.affectedRows == 1) {
                        showLoginPanel();
                    } else {
                        console.log("artist exists")
                    }
                })
            }
        } else {
            alert("Username already in use, pick a different one!")
        }
    })
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

async function existsUser(userName) {
    const response = await fetch(`http://localhost:3001/existsUser?userName=${userName}`);
    const data = await response.json();
    console.log("Result: ", data);
}