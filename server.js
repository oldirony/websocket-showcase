const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fallback = require('express-history-api-fallback');
const events = require('./src/lib/events');


const root = __dirname;
app.use(express.static(root));
app.use('/dist', express.static(__dirname + '/dist'));

app.get('*', function(req, res,next) {
	res.sendFile('/index.html', { root });
});

io.on(events.connection, function(client) {
	console.log('Client connected...');

	client.on('get-code', function(data) {
		client.broadcast.emit('code-used', data);
	});

	client.on('code-worked', function(data) {
		client.broadcast.emit('code-worked', data);
	});

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

	client.on(events.showTeam, function(data) {
		client.broadcast.emit(events.showTeamClient, data)
	});

	client.on(events.showHome, function(data) {
		client.broadcast.emit(events.showHomeClient, data)
	});

	client.on(events.selectTeamMember, function(data) {
		client.broadcast.emit(events.selectTeamMemberClient, data)
	});
});

server.listen(8080);