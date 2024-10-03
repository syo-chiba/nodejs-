// server/server.js

require('dotenv').config();
const express = require('express');
const session = require('express-session');  // セッション管理用ミドルウェア
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');  // ルートをインポート

const app = express();
const PORT = process.env.PORT || 3000;

// CORS設定を調整し、クッキー情報をやり取りできるようにする
app.use(cors({
  origin: 'http://127.0.0.1:5500',  // フロントエンドのURLを指定
  credentials: true  // クライアントがクッキーを送信できるように設定
}));

app.use(express.json());  // JSONのリクエストボディをパース

// セッション設定
app.use(session({
  secret: "your_secret_key",  // セッションの秘密鍵
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,  // HTTPSの場合はtrueに設定
    httpOnly: true,  // クライアント側からクッキーを操作できないようにする
    sameSite: 'lax'  // クッキーの共有範囲を制限
  }
}));

// ルートを/apiエンドポイントに設定
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
