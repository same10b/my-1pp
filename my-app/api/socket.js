const { Server } = require("socket.io");

module.exports = (req, res) => {
  const io = new Server(res.socket.server);
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('inputText', (text) => {
      console.log('Accumulated Text:', text); // デバッグ用
      io.emit('inputText', text);  // 出力ページに送信
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  res.socket.server.io = io;
  res.status(200).send("Socket.IO server is running");
};
