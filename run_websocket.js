(function () {

  const WebSocketServer = require('./servers/WebSocketServer');

  const webSocketServer = new WebSocketServer();
  webSocketServer.init();

})();