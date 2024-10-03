// server/models/userModel.js

const db = require('../config/db');

// ユーザーデータベース操作を定義するUserオブジェクト
const User = {
    // 新しいユーザーをデータベースに作成する
    create: (data, callback) => {
        const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        db.query(query, [data.name, data.email, data.password], callback);
    },

    // メールアドレスでユーザーを検索する
    findByEmail: (email, callback) => {
        const query = `SELECT * FROM users WHERE email = ?`;
        db.query(query, [email], (err, results) => {
            if (err) return callback(err, null);
            if (results.length > 0) return callback(null, results[0]);
            return callback(null, null);
        });
    },

    // すべてのユーザーを取得する
    findAll: (callback) => {
        const query = `SELECT * FROM users`;
        db.query(query, callback);
    },

    // ユーザーをIDで更新する
    updateById: (id, data, callback) => {
        const query = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;
        db.query(query, [data.name, data.email, data.password, id], callback);
    },

    // ユーザーをIDで削除する
    deleteById: (id, callback) => {
        const query = `DELETE FROM users WHERE id = ?`;
        db.query(query, [id], callback);
    },

    userSearch: (query, callback) => {
        const sql = `SELECT * FROM users WHERE name LIKE ? OR email LIKE ?`;
        const values = [`%${query}%`, `%${query}%`];
        db.query(sql, values, callback);
    }
};

module.exports = User;