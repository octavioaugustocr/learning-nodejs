const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'stock_control',
    user: 'root',
    password: '',
    connectionLimit: 10
});

module.exports = pool;