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

module.exports = router