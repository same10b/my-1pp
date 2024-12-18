const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let accumulatedText = ""; // 蓄積されたテキスト

app.use(express.static('public'));  // 静的ファイルの提供

app.get('/input', (req, res) => {
  res.sendFile(__dirname + '/public/input.html');  // 入力ページ
});

app.get('/output', (req, res) => {
  res.sendFile(__dirname + '/public/output.html');  // 出力ページ
});

// クライアントからの接続
io.on('connection', (socket) => {
  console.log('a user connected'); // クライアントが接続した際に表示
  console.log('Socket ID:', socket.id); // 接続されたSocketのIDを表示

  // 入力されたテキストを受け取り、蓄積して出力ページに送信
  socket.on('inputText', (text) => {
    accumulatedText += text;
    console.log('Accumulated Text:', accumulatedText); // デバッグ用に蓄積テキストを表示
    io.emit('inputText', accumulatedText);  // 出力ページに送信
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// サーバー起動
server.listen(3000, () => {
  console.log('listening on *:3000');
});
