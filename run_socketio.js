(function () {

  const SocketIoServer = require('./servers/SocketIoServer');

  const socketIOServer = new SocketIoServer();
  socketIOServer.init();

})();