const 
	httpServer      = require('../services/httpServer');

class WebSocketServer {

	constructor() {
		this.app 					= null;
		this.websocket 		= null;
		this.connections 	= [];
	}

	async init() {
		this.app 				= await httpServer.initHttpServer(3006, 'websocket');
		this.websocket 	= httpServer.getWebsocketServer();

		// Render socket IO view
		this.app.get('/', (_, res) => {
      res.render('websocket');
    });

    this.websocket.on('request', (request) => {
    	console.log('- Incoming socket request');
	    const connection = request.accept('echo-protocol', request.origin);
    	console.log('-- Connection accepted.');

    	this.connections.push(connection);

    	connection.on('message', (message) => {
    		if (message.type === 'utf8') {
    			console.log('-- Received Message:', message.utf8Data);
    			this.connections.forEach(function(destination) {
						destination.sendUTF(message.utf8Data);
          });
    		}
    	});

    	connection.on('close', (reasonCode, description) => {
    		console.log('- Peer ' + connection.remoteAddress + ' disconnected.');

    		const index = this.connections.indexOf(connection);
        if (index !== -1) {
          // remove the connection from the pool
          this.connections.splice(index, 1);
        }
    	});
    });

	}

}

module.exports = WebSocketServer;