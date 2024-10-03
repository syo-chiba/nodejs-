// server/controllers/userController.js

// 'bcrypt' モジュールをインポートして、パスワードのハッシュ化や比較を行う
const bcrypt = require('bcrypt');

// 'User' モデルをインポートして、データベース操作を行う
const User = require('../models/userModel');

// 新しいユーザーを作成する関数をエクスポートする
exports.createUser = (req, res) => {
    const { name, email, password } = req.body;

    // パスワードをハッシュ化する
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: err });

        // ハッシュ化したパスワードを使って新しいユーザーを作成
        User.create({ name, email, password: hashedPassword }, (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ message: 'User created successfully!' });
        });
    });
};

// すべてのユーザーを取得する関数
exports.getUsers = (req, res) => {
    User.findAll((err, users) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json(users);
    });
};

// ユーザーを更新する関数
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: err });

        User.updateById(id, { name, email, password: hashedPassword }, (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(200).json({ message: 'User updated successfully!' });
        });
    });
};

// ユーザーを削除する関数
exports.deleteUser = (req, res) => {
    const { id } = req.params;

    User.deleteById(id, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({ message: 'User deleted successfully!' });
    });
};

// ユーザーのログイン処理を行う関数
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    // メールアドレスでユーザーを検索
    User.findByEmail(email, (err, user) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // パスワードの比較
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ error: 'Error comparing passwords' });
            if (!isMatch) return res.status(401).json({ error: 'Incorrect password' });

            res.status(200).json({ message: 'Login successful' });
        });
    });
};

exports.userSearch = (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).send({ error: '検索条件が必要です' });
    }

    User.userSearch(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    })
};