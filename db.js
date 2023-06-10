const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Busra2002',
    database: 'msn',
  });

module.exports = pool;