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

module.exports = router