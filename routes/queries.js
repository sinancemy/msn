const express = require('express');
const router = express.Router();
const fs = require('fs');
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

router.get('/getUserType', (req, res) => {
    const { userId } = req.query;
    (function (userId, callback) {
        const q = `
            SELECT EXISTS(
                SELECT 1
                FROM User
                NATURAL JOIN Enjoyer
                WHERE Enjoyer.id = ?
            ) AS is_enjoyer,
            EXISTS(
                SELECT 1
                FROM User
                NATURAL JOIN Artist
                WHERE Artist.id = ?
            ) AS is_artist
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

router.get('/getUserPlaylists', (req, res) => {
    // Load parameters
    const { userId } = req.query;
    // Execute query
    (function (userId, callback) {
        const q = `

        SELECT Playlist.id, Content.name, Playlist.description, Playlist.cover_art
        FROM Playlist
        JOIN Content ON Content.id = Playlist.id
        WHERE Playlist.enjoyer_id = ?
      `;
        const v = [userId,];
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
    const { userId } = req.query;
    // Execute query
    (function (userId, callback) {
        const q = `
        SELECT Friend.friend_id1 AS friend_id, User.full_name, User.avatar
        FROM Friend
        JOIN User ON Friend.friend_id1 = User.id
        WHERE Friend.friend_id2 = ?

        UNION

        SELECT Friend.friend_id2 AS friend_id, User.full_name, User.avatar
        FROM Friend
        JOIN User ON Friend.friend_id2 = User.id
        WHERE Friend.friend_id1 = ?
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
        SELECT Playlist.id, Content.name, Playlist.cover_art, Playlist.description, Content.creation_date
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
        SELECT Artist.id, User.full_name, User.bio, COUNT(Follows.enjoyer_id) AS follower_count, User.avatar
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


router.get('/followArtist', (req, res) => {
    // Load parameters
    const { artistId } = req.query;
    // Execute query
    (function (artistId, callback) {
        const q = `
        INSERT INTO Follows (enjoyer_id, artist_id)
        VALUES (?, ?)
      `;
        const v = [req.session.userId, artistId];
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

router.get('/unfollowArtist', (req, res) => {
    // Load parameters
    const { artistId } = req.query;
    // Execute query
    (function (artistId, callback) {
        const q = `
        DELETE FROM Follows
        WHERE enjoyer_id = ? AND artist_id = ?
      `;
        const v = [req.session.userId, artistId];
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


router.get('/hasSaved', (req, res) => {
    // Load parameters
    const { contentId } = req.query;
    // Execute query
    (function (contentId, callback) {
        const q = `
        SELECT EXISTS (
            SELECT 1
            FROM Saved
            WHERE enjoyer_id = ? AND content_id = ?
          ) AS is_saved
      `;
        const v = [req.session.userId, contentId];
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

router.get('/isFollowing', (req, res) => {
    // Load parameters
    const { artistId } = req.query;
    // Execute query
    (function (artistId, callback) {
        const q = `
        SELECT EXISTS (
            SELECT 1
            FROM Follows
            WHERE enjoyer_id = ? AND artist_id = ?
        ) AS is_following
      `;
        const v = [req.session.userId, artistId];
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

router.get('/isFriend', (req, res) => {
    // Load parameters
    const { userId } = req.query;
    // Execute query
    (function (userId, callback) {
        const q = `
        SELECT EXISTS (
            SELECT 1
            FROM Friend
            WHERE (friend_id1 = ? AND friend_id2 = ?)
            OR (friend_id1 = ? AND friend_id2 = ?)
        ) AS is_friend
      `;
        const v = [req.session.userId, userId, userId, req.session.userId];
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

router.get('/existsUser', (req, res) => {
    // Load parameters
    const { userName } = req.query;
    // Execute query
    (function (userName, callback) {
        const q = `
        SELECT EXISTS (
            SELECT 1
            FROM User
            WHERE username= ?) AS username_exists
      `;
        const v = [userName];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(userName,
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
        INSERT IGNORE INTO Reaction (user_id, content_id, txt, emoji)
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


router.get('/removeReaction', (req, res) => {
    // Load parameters
    const { userId, contentId } = req.query;
    // Execute query
    (function (userId, contentId, callback) {
        const q = `
        DELETE FROM Reaction
        WHERE user_id = ?
        AND content_id = ?
       `;
        const v = [userId, contentId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(userId, contentId,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});

router.post('/addEnjoyer', (req, res) => {
    // Load parameters
    const { enjoyment, username, password, fullName, avatar, email, bio } = req.body;
    // Execute query
    (function (enjoyment, username, password, fullName, avatar, email, bio, callback) {
        const userQuery = `
        INSERT IGNORE INTO User (id, username, password, full_name, avatar, email, bio)
        SELECT COALESCE(MAX(id), 0) + 1, ?, ?, ?, ?, ?, ?
        FROM User;
      `;
        const userValues = [username, password, fullName, avatar, email, bio];
        const enjoyerQuery = `
        INSERT IGNORE INTO Enjoyer (id, enjoyment)
        SELECT COALESCE(MAX(id), 0) + 1, ?
        FROM Enjoyer;
      `;
        const enjoyerValues = [enjoyment];

        pool.query(userQuery, userValues, (error, userResults) => {
            if (error) throw error;

            pool.query(enjoyerQuery, enjoyerValues, (error, enjoyerResults) => {
                if (error) throw error;

                callback(error, userResults, enjoyerResults);
            });
        });
    })(enjoyment, username, password, fullName, avatar, email, bio, (error, userResults, enjoyerResults) => {
        if (error) throw error;
        res.send({ userResults, enjoyerResults });
    });
});

router.get('/removeUser', (req, res) => {
    // Load parameters
    const { userId } = req.query;
    // Execute query
    (function (userId, callback) {
        const q = `
        DELETE FROM User
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


router.post('/addArtist', (req, res) => {
    // Load parameters from the request body
    const { verified, username, password, fullName, avatar, email, bio } = req.body;

    // Execute queries
    (function (verified, username, password, fullName, avatar, email, bio, callback) {
        const userQuery = `
        INSERT IGNORE INTO User (id, username, password, full_name, avatar, email, bio)
        SELECT COALESCE(MAX(id), 0) + 1, ?, ?, ?, ?, ?, ?
        FROM User
      `;
        const userValues = [username, password, fullName, avatar, email, bio];

        const artistQuery = `
        INSERT IGNORE INTO Artist (id, verified)
        SELECT COALESCE(MAX(id), 0) + 1, ?
        FROM Artist
      `;
        const artistValues = [verified];

        pool.query(userQuery, userValues, (error, userResults) => {
            if (error) throw error;

            pool.query(artistQuery, artistValues, (error, artistResults) => {
                if (error) throw error;

                callback(error, artistResults);
            });
        });
    })(
        verified, username, password, fullName, avatar, email, bio,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        }
    );
});


router.get('/addFriend', (req, res) => {
    // Load parameters
    const { userId } = req.query;
    // Execute query
    (function (userId, callback) {
        const q = `
        INSERT IGNORE INTO Friend (friend_id1, friend_id2, since)
        VALUES (?, ?, CURRENT_DATE())
       `;
        const v = [req.session.userId, userId];
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

router.get('/removeFriend', (req, res) => {
    // Load parameters
    const { userId } = req.query;
    // Execute query
    (function (userId1, callback) {
        const q = `
        DELETE FROM Friend
        WHERE (friend_id1 = ? AND friend_id2 = ?)
        OR (friend_id1 = ? AND friend_id2 = ?)
       `;
        const v = [req.session.userId, userId, userId, req.session.userId];
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


router.get('/saveContent', (req, res) => {
    // Load parameters
    const { contentId } = req.query;
    // Execute query
    (function (contentId, callback) {
        const q = `
        INSERT INTO Saved (enjoyer_id, content_id)
        VALUES (?, ?)
       `;
        const v = [req.session.userId, contentId];
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

router.get('/unsaveContent', (req, res) => {
    // Load parameters
    const { contentId } = req.query;
    // Execute query
    (function (contentId, callback) {
        const q = `
        DELETE FROM Saved
        WHERE content_id = ?
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

router.get('/addPlaylistTrack', (req, res) => {
    // Load parameters
    const { playlistId, trackId } = req.query;
    // Execute query
    (function (playlistId, trackId, callback) {
        const q = `
        INSERT IGNORE INTO PlaylistTracks (playlist_id, track_id)
        VALUES (?, ?)
      `;
        const v = [playlistId, trackId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(playlistId, trackId,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});

router.get('/removePlaylistTrack', (req, res) => {
    // Load parameters
    const { playlistId, trackId } = req.query;
    // Execute query
    (function (playlistId, trackId, callback) {
        const q = `
        DELETE FROM PlaylistTracks
        WHERE playlist_id = ? AND track_id = ?
      `;
        const v = [playlistId, trackId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(playlistId, trackId,
        (error, results) => {
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

router.get('/updateFullName', (req, res) => {
    // Load parameters
    const { userId, full_name } = req.query;
    // Execute query
    (function (userId, full_name, callback) {
        const q = `
        UPDATE User
        SET full_name = ? 
        WHERE id = ?
      `;
        const v = [full_name, userId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(userId, full_name,
        (error, results) => {
            if (error) throw error;
            res.send(results);
        });
});

router.get('/updateAvatar', (req, res) => {
    // Load parameters
    const { userId, avatar } = req.query;
    // Execute query
    (function (userId, avatar, callback) {
        const q = `
        UPDATE User
        SET avatar = ? 
        WHERE id = ?
      `;
        const v = [avatar, userId];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(userId, avatar,
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