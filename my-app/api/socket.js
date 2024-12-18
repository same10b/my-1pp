const { Server } = require('socket.io');

module.exports = (req, res) => {
  // Expressのサーバーを作成してSocket.ioを設定
  const io = new Server(res.socket.server);
  io.on('connection', (socket) => {
    console.log('User connected');
    
    // クライアントからのメッセージを受け取って全員に送信
    socket.on('inputText', (text) => {
      console.log('Received text:', text);
      io.emit('outputText', text);  // すべてのクライアントに送信
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  // レスポンスを送信
  res.send('Socket.io server is running');
};
