var PORT = process.env.PORT || 3000;

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection' , function(socket){
	console.log("user connected to socket io");

	socket.on('message', function (message){
		console.log(message);
		console.log('Message received ' + message.text);

		socket.broadcast.emit('message' , message);
	})

	socket.emit('message',{
		text: 'welcome to the world of chat application'
	});

});

app.use(express.static(__dirname +"/public"));

http.listen(PORT , function (){
	console.log("server has been started")
})
