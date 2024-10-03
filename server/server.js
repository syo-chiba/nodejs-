// server/server.js

require('dotenv').config();
const express = require('express');
const session = require('express-session');  // セッション管理用ミドルウェア
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');  // ルートをインポート

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());  // JSONのリクエストボディをパース

// セッション設定
app.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: true
}));

app.use('/api', userRoutes);  // ルートを/apiエンドポイントに設定

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});