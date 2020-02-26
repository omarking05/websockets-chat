const 
	httpServer = require('../services/httpServer');

class SocketIoServer {

	constructor() {
		this.app 	= null;
		this.io 	= null;
	}

	async init() {
		this.app 	= await httpServer.initHttpServer(3005, 'io');
		this.io 	= httpServer.getSocketIo();

		// Render socket IO view
		this.app.get('/', (_, res) => {
      res.render('socketio');
    });

    this.io.on('connection', (socket) => {
    	console.log('-- Incoming socket connection');

    	socket.on('disconnect', () => {
		    console.log('-- User disconnected');
		  });

    	socket.on('chat_message', (message) => {
    		console.log('--- Incoming chat message from user:', message);
    		// Send message to all subscribers
    		io.emit('incoming_message', message);
    	});

    });
	}

}

module.exports = SocketIoServer;