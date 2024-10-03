// server/config/db.js

const mysql = require('mysql');

// 環境変数を使用してMySQLデータベースに接続
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// MySQLデータベースへの接続を確立
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = connection;
