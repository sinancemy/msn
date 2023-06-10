const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'phanchi99',
    database: 'msn',
  });

module.exports = pool;