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


router.get('/followedArtists', (req, res) => {
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

router.get('/savedAlbums', (req, res) => {
    // Load parameters
    const userId = req.session.userId;
    // Execute query
    (function (parameter, callback) {
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

router.get('/savedPlaylists', (req, res) => {
    // Load parameters
    const userId = req.session.userId;
    // Execute query
    (function (parameter, callback) {
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


router.get('/friends', (req, res) => {
    // Load parameters
    const userId = req.session.userId;
    // Execute query
    (function (parameter, callback) {
        const q = `
        SELECT CASE
            WHEN f.friend_id1 = ? THEN f.friend_id2
            ELSE f.friend_id1
        END AS friend_id,
        u.full_name
        FROM Friend f
        JOIN User u ON (f.friend_id1 = u.id OR f.friend_id2 = u.id)
        WHERE f.friend_id1 = ? OR f.friend_id2 = ?
      `;
        const v = [userId,userId,userId];
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



module.exports = router