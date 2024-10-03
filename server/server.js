// server/server.js

require('dotenv').config();
const express = require('express');
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

// ルートを/apiエンドポイントに設定
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
