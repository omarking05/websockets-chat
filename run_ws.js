(function () {

  const WsServer = require('./servers/WsServer');

  const wsServer = new WsServer();
  wsServer.init();

})();