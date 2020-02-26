const 
  httpServer      = require('../services/httpServer');

class WsServer {

  constructor() {
    this.app          = null;
    this.wsServer     = null;
    this.connections  = [];
  }

  async init() {
    this.app        = await httpServer.initHttpServer(3007, 'ws');
    this.wsServer   = httpServer.getWsServer();

    // Render socket IO view
    this.app.get('/', (_, res) => {
      res.render('ws');
    });

    this.wsServer.on('connection', (socket) => {
      console.log('- Incoming connection');

      socket.on('message', (message) => {
        console.log('-- Incoming message', message);
        this.wsServer.clients.forEach((client) => {
          client.send(message);
        });
      });

    });
  }

}

module.exports = WsServer;