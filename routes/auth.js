const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/login/getUserId', (req, res) => {
    res.send({ userId: req.session.userId });
});

router.post('/login/auth', (req, res) => {
    const { username, password } = req.body;
    (function (username, password, callback) {
        const q = `
            SELECT id
            FROM User
            WHERE username = ? AND password = ? 
        `;
        const v = [username, password];
        pool.query(q, v, (error, results) => {
            if (error) throw error;
            callback(error, results);
        });
    })(username, password,
        (error, results) => {
            if (error) throw error;
            var userId = null
            if (results.length == 1)
                userId = results[0].id;
            req.session.userId = userId;
            res.send({ userId: userId });
        });
});

router.get('/login/signoff', (req, res) => {
    req.session.userId = -1
    res.send({userId : -1})
});

module.exports = router