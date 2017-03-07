const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fallback = require('express-history-api-fallback');
const events = require('./src/lib/events');


const root = __dirname;
app.use(express.static(root));
app.use(fallback('index.html', { root }));
app.use('/dist', express.static(__dirname + '/dist'));
app.get('/', function(req, res,next) {
	res.sendFile(__dirname + '/index.html', { root });
});

io.on(events.connection, function(client) {
	console.log('Client connected...');

	client.on(events.join, function(data) {
		console.log('Someone joined');
	});

	client.on(events.selectProject, function(data) {
		client.broadcast.emit(events.selectProjectClient, data);
	});

	client.on(events.closeProject, function(data) {
		client.emit(events.closeProjectClient, data);
		client.broadcast.emit(events.closeProjectClient, data);
	});

	client.on(events.changeSection, function(data) {
		client.broadcast.emit(events.changeSectionClient, data)
	});

	client.on(events.loading, function(data) {
		console.log(data);
		client.emit(events.loadingClient, data)
	});

	client.on(events.loadingComplete, function(data) {
		console.log(data);
		client.emit(events.loadingCompleteClient, data)
	})
});

server.listen(8080);