const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fallback = require('express-history-api-fallback');


const root = __dirname;
app.use(express.static(root));
app.use(fallback('index.html', { root }));
app.use('/dist', express.static(__dirname + '/dist'));
app.get('/', function(req, res,next) {
	res.sendFile(__dirname + '/index.html', { root });
});

io.on('connection', function(client) {
	console.log('Client connected...');

	client.on('join', function(data) {
		console.log(data);
	});

	client.on('selectProject', function(data) {
		console.log('can');
		client.broadcast.emit('selectProjectClient', data);
	});

});

server.listen(8080);