const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/getExampleQuery', (req, res) => {
    // Load parameters
    const { parameter } = req.query;
    // Execute query
    (function (parameter, callback) {
        const q = `
        # QUERY HERE
      `;
        const v = [parameter];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(parameter,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});


router.get('/getFollowedArtists', (req, res) => {
    // Load parameters
    const userId = req.session.userId;
    // Execute query
    (function (userId, callback) {
        const q = `
        SELECT Artist.id, User.full_name, User.bio, User.avatar, Artist.verified
        FROM Artist
        JOIN Follows ON Artist.id = Follows.artist_id
        JOIN User ON Artist.id = User.id
        WHERE Follows.enjoyer_id = ?
      `;
        const v = [userId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(userId,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});

router.get('/getSavedAlbums', (req, res) => {
    // Load parameters
    const userId = req.session.userId;
    // Execute query
    (function (userId, callback) {
        const q = `
        SELECT Album.id, Content.name, Album.cover_art
        FROM Album
        JOIN Saved ON Saved.content_id = Album.id
        JOIN Content ON Content.id = Album.id
        WHERE Saved.enjoyer_id = ?
      `;
        const v = [userId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(userId,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});

router.get('/getSavedPlaylists', (req, res) => {
    // Load parameters
    const userId = req.session.userId;
    // Execute query
    (function (userId, callback) {
        const q = `
        SELECT Playlist.id, Content.name, Playlist.description, Playlist.cover_art
        FROM Playlist
        JOIN Saved ON Saved.content_id = Playlist.id
        JOIN Content ON Content.id = Playlist.id
        WHERE Saved.enjoyer_id = ?

        UNION

        SELECT Playlist.id, Content.name, Playlist.description, Playlist.cover_art
        FROM Playlist
        JOIN Content ON Content.id = Playlist.id
        WHERE Playlist.enjoyer_id = ?
      `;
        const v = [userId, userId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(userId,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});


router.get('/getFriends', (req, res) => {
    // Load parameters
    const userId = req.session.userId;
    // Execute query
    (function (userId, callback) {
        const q = `
        SELECT CASE
            WHEN f.friend_id1 = ? THEN f.friend_id2
            ELSE f.friend_id1
        END AS friend_id,
        u.full_name,
        u.avatar
        FROM Friend f
        JOIN User u ON (f.friend_id1 = u.id OR f.friend_id2 = u.id)
        WHERE f.friend_id1 = ? OR f.friend_id2 = ?
      `;
        const v = [userId, userId, userId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(userId,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});

router.get('/getCurrentUserInfo', (req, res) => {
    // Load parameters
    const userId = req.session.userId;
    // Execute query
    (function (userId, callback) {
        const q = `
        SELECT id, full_name, avatar, bio
        FROM User
        WHERE id = ?
      `;
        const v = [userId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(userId,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});


router.get('/getUserInfo', (req, res) => {
    // Load parameters
    const { userId } = req.query;
    // Execute query
    (function (userId, callback) {
        const q = `
        SELECT id, full_name, avatar, bio
        FROM User
        WHERE id = ?
      `;
        const v = [userId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(userId,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});

router.get('/getAlbumInfo', (req, res) => {
    // Load parameters
    const { albumId } = req.query;
    // Execute query
    (function (albumId, callback) {
        const q = `
        SELECT Album.id, Content.name, Album.cover_art, Content.creation_date
        FROM Album
        JOIN Content ON Album.id = Content.id
        WHERE Album.id = ?
      `;
        const v = [albumId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(albumId,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});

router.get('/getAlbumTracks', (req, res) => {
    // Load parameters
    const { albumId } = req.query;
    // Execute query
    (function (albumId, callback) {
        const q = `
        SELECT Track.id, Content.name, Track.genre, Track.length_seconds
        FROM Track
        INNER JOIN Album ON Track.album_id = Album.id
        INNER JOIN Content ON Track.id = Content.id
        WHERE Album.id = ?
      `;
        const v = [albumId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(albumId,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});

router.get('/getPlaylistInfo', (req, res) => {
    // Load parameters
    const { playlistId } = req.query;
    // Execute query
    (function (playlistId, callback) {
        const q = `
        SELECT Playlist.id, Content.name, Playlist.cover_art, Playlist.description
        FROM Playlist
        JOIN Content ON Playlist.id = Content.id
        WHERE Playlist.id = ?
      `;
        const v = [playlistId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(playlistId,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});


router.get('/getPlaylistTracks', (req, res) => {
    // Load parameters
    const { playlistId } = req.query;
    // Execute query
    (function (playlistId, callback) {
        const q = `
        SELECT Content.id, Content.name, Track.genre, Track.length_seconds
        FROM Track
        JOIN PlaylistTracks ON PlaylistTracks.track_id = Track.id
        JOIN Content ON Content.id = Track.id
        WHERE PlaylistTracks.playlist_id = ?
      `;
        const v = [playlistId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(playlistId,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});

router.get('/getArtistInfo', (req, res) => {
    // Load parameters
    const { artistId } = req.query;
    // Execute query
    (function (artistId, callback) {
        const q = `
        SELECT Artist.id, User.full_name, User.bio, COUNT(Follows.enjoyer_id) AS follower_count
        FROM Artist
        JOIN User ON Artist.id = User.id
        LEFT JOIN Follows ON Artist.id = Follows.artist_id
        WHERE Artist.id = ?
        GROUP BY Artist.id, User.full_name, User.bio
      `;
        const v = [artistId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(artistId,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});


router.get('/getArtistTracks', (req, res) => {
    // Load parameters
    const { artistId } = req.query;
    // Execute query
    (function (artistId, callback) {
        const q = `
        SELECT Track.id AS track_id, Content.name AS track_name, Track.genre, Track.length_seconds, Album.id AS album_id
        FROM Track
        JOIN Album ON Track.album_id = Album.id
        JOIN PerformsIn ON Track.id = PerformsIn.track_id
        JOIN Content ON Track.id = Content.id
        WHERE PerformsIn.artist_id = ?
      `;
        const v = [artistId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(artistId,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});

router.get('/getArtistFollowers', (req, res) => {
    // Load parameters
    const { artistId } = req.query;
    // Execute query
    (function (artistId, callback) {
        const q = `
        SELECT User.id, User.full_name, User.avatar
        FROM User
        JOIN Follows ON Follows.enjoyer_id = User.id
        WHERE Follows.artist_id = ?
       `;
        const v = [artistId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(artistId,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});

router.get('/getArtistAppearedAlbums', (req, res) => {
    // Load parameters
    const { artistId } = req.query;
    // Execute query
    (function (artistId, callback) {
        const q = `
        SELECT Album.id, Content.name, Album.cover_art
        FROM Album
        JOIN Content ON Album.id = Content.id
        WHERE Album.id IN (
            SELECT Track.album_id
            FROM Track
            JOIN PerformsIn ON Track.id = PerformsIn.track_id
            WHERE PerformsIn.artist_id = ?
            )
       `;
        const v = [artistId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(artistId,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});

router.get('/getContentReactions', (req, res) => {
    // Load parameters
    const { contentId } = req.query;
    // Execute query
    (function (contentId, callback) {
        const q = `
        SELECT User.id, User.full_name, User.avatar, Reaction.txt, Reaction.emoji
        FROM Reaction
        JOIN User ON Reaction.user_id = User.id
        WHERE Reaction.content_id = ?
       `;
        const v = [contentId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(contentId,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});

router.get('/getPerformers', (req, res) => {
    // Load parameters
    const { trackId } = req.query;
    // Execute query
    (function (trackId, callback) {
        const q = `
        SELECT Artist.id, User.full_name
        FROM Artist
        JOIN User ON Artist.id = User.id
        JOIN PerformsIn ON Artist.id = PerformsIn.artist_id
        WHERE PerformsIn.track_id = ?
       `;
        const v = [trackId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(trackId,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});

router.get('/addReaction', (req, res) => {
    // Load parameters
    const { userId, contentId, text, emoji } = req.query;
    // Execute query
    (function (userId, contentId, text, emoji, callback) {
        const q = `
        INSERT INTO Reaction (user_id, content_id, txt, emoji)
        VALUES (?, ?, ?, ?)
       `;
        const v = [userId, contentId, text, emoji];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(userId, contentId, text, emoji,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});

router.get('/addEnjoyer', (req, res) => {
    // Load parameters
    const { userId, enjoyment, username, password, fullName, avatar, email, bio } = req.query;
    // Execute query
    (function (userId, enjoyment, username, password, fullName, avatar, email, bio, callback) {
        const userQuery = `
        INSERT INTO User (id, username, password, full_name, avatar, email, bio)
        VALUES (?, ?, ?, ?, ?, ?, ?)
       `;
        const userValues = [userId, username, password, fullName, avatar, email, bio];

        const enjoyerQuery = `
         INSERT INTO Enjoyer (id, enjoyment)
         VALUES (?, ?)
       `;
        const enjoyerValues = [userId, enjoyment];


        pool.query(userQuery, userValues, (error, userResults) => {
            if (error) throw error;

            pool.query(enjoyerQuery, enjoyerValues, (error, enjoyerResults) => {
                if (error) throw error;

                callback(error, userResults, enjoyerResults);
            });
        });
    })(userId, enjoyment, username, password, fullName, avatar, email, bio, (error, userResults, enjoyerResults) => {
        if (error) throw error;
        res.send({ userResults, enjoyerResults });
    });
});

router.get('/addArtist', (req, res) => {
    // Load parameters
    const { userId, verified, username, password, fullName, avatar, email, bio } = req.query;

    // Execute queries
    (function (userId, verified, username, password, fullName, avatar, email, bio, callback) {
        const userQuery = `
        INSERT INTO User (id, username, password, full_name, avatar, email, bio)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
        const userValues = [userId, username, password, fullName, avatar, email, bio];

        const artistQuery = `
        INSERT INTO Artist (id, verified)
        VALUES (?, ?)
      `;
        const artistValues = [userId, verified];

        pool.query(userQuery, userValues, (error, userResults) => {
            if (error) throw error;

            pool.query(artistQuery, artistValues, (error, artistResults) => {
                if (error) throw error;

                callback(error, artistResults);
            });
        });
    })(userId, verified, username, password, fullName, avatar, email, bio, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

router.get('/updateBio', (req, res) => {
    // Load parameters
    const { userId, bio } = req.query;
    // Execute query
    (function (userId, bio, callback) {
        const q = `
        UPDATE User
        SET bio = ? 
        WHERE id = ?
      `;
        const v = [bio, userId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(userId, bio,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});



router.get('/searchTracks', (req, res) => {
    // Load parameters
    const { searchQuery } = req.query;
    // Execute query
    (function (searchQuery, callback) {
        const q = `
        SELECT Track.id as track_id, Content.name, Album.id as album_id, Album.cover_art
        FROM Track
        JOIN Content ON Track.id = Content.id
        JOIN Album ON Track.album_id = Album.id
        WHERE Content.name LIKE ?
      `;
        const v = ['%' + searchQuery + '%'];
        console.log(v);
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(searchQuery,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});

router.get('/searchAlbums', (req, res) => {
    // Load parameters
    const { searchQuery } = req.query;
    // Execute query
    (function (searchQuery, callback) {
        const q = `
        SELECT Album.id, Content.name AS album_name, Album.cover_art
        FROM Album
        JOIN Content ON Album.id = Content.id
        WHERE Content.name LIKE ?
      `;
        const v = ['%' + searchQuery + '%'];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(searchQuery,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});

router.get('/searchPlaylists', (req, res) => {
    // Load parameters
    const { searchQuery } = req.query;
    // Execute query
    (function (searchQuery, callback) {
        const q = `
        SELECT Playlist.id, Content.name AS playlist_name, Playlist.cover_art
        FROM Playlist
        JOIN Content ON Playlist.id = Content.id
        WHERE Content.name LIKE ?
      `;
        const v = ['%' + searchQuery + '%'];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(searchQuery,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});

router.get('/searchArtists', (req, res) => {
    // Load parameters
    const { searchQuery } = req.query;
    // Execute query
    (function (searchQuery, callback) {
        const q = `
        SELECT Artist.id, User.full_name AS artist_name, User.avatar
        FROM Artist
        JOIN User ON Artist.id = User.id
        WHERE User.full_name LIKE ?
      `;
        const v = ['%' + searchQuery + '%'];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(searchQuery,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});


router.get('/searchEnjoyers', (req, res) => {
    // Load parameters
    const { searchQuery } = req.query;
    // Execute query
    (function (searchQuery, callback) {
        const q = `
        SELECT User.id, User.full_name, User.avatar
        FROM User
        JOIN Enjoyer ON User.id = Enjoyer.id
        WHERE User.username LIKE ?
        AND User.id IN (SELECT id FROM Enjoyer)

        UNION

        SELECT User.id, User.full_name, User.avatar
        FROM User
        JOIN Enjoyer ON User.id = Enjoyer.id
        WHERE User.full_name LIKE ?
        AND User.id IN (SELECT id FROM Enjoyer)
      `;
        const v = ['%' + searchQuery + '%', '%' + searchQuery + '%'];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(searchQuery,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});

module.exports = router