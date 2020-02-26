const
  WebSocketServer = require('websocket').server,
  WsServer        = require('ws'),
  socketIo        = require('socket.io'),
  bodyParser      = require('body-parser'),
  express         = require('express'),
  httpServer      = require('http'),
  app             = express(),
  Server          = httpServer.Server(app);

function _initWebSocketServer() {
  return new WebSocketServer({
    httpServer: Server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
  });
}

function _initWsServer() {
  return new WsServer.Server({ server: Server });
}


module.exports = {
  _io : null,
  _websocketServer: null,
  _ws: null,
  app,
  Server,
  initHttpServer: async (port = 3000, defaultSocket = 'io') => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.set('view engine', 'ejs');
    Server.listen(port, () => {
      console.log(`- Server is working on http://localhost:${port}`);
    });

    switch(defaultSocket) {
      case 'io':
        this._io = socketIo(Server);
        break;
      case 'websocket':
        this._websocketServer = _initWebSocketServer();
        break;
      case 'ws':
        this._ws = _initWsServer();
        break;
      default:
        throw new Error('Unknown socket type.');
        break;
    }

    return app;
  },
  getSocketIo: () => {
    return this._io;
  },
  getWebsocketServer: () => {
    return this._websocketServer;
  },
  getWsServer: () => {
    return this._ws;
  }
};