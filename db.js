const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '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',
  database: 'msn',
});

module.exports = pool;