var PORT = process.env.PORT || 3000;

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

var clientInfo = {};
io.on('connection' , function(socket){
	console.log("user connected to socket io");

	socket.on('joinRoom' , function (req){
		clientInfo[socket.id]= req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message' , {
			name : 'System Admin' ,
			text : req.name + ' has joined',
			timestamp : moment().valueOf()
		})
	});

	socket.on('message', function (message){
		console.log(message);
		console.log('Message received ' + message.text);
		message.timestamp = moment().valueOf();
		io.to(clientInfo[socket.id].room).emit('message' , message);
	})

	socket.emit('message',{
		name : 'System',
		text: 'welcome to the world of chat application',
		timestamp : moment().valueOf()
	});

});

app.use(express.static(__dirname +"/public"));

http.listen(PORT , function (){
	console.log("server has been started")
})
