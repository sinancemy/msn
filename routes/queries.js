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
    const userId  = req.session.userId;
    // Execute query
    (function (userId, callback) {
        const q = `
        SELECT full_name, bio, avatar, verified
        FROM Artist a
        JOIN Follows f ON a.id = f.artist_id
        JOIN User u ON a.id = u.id
        WHERE f.enjoyer_id = ?
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