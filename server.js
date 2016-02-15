var PORT = process.env.PORT || 3000;

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
io.on('connection' , function(socket){
	console.log("user connected to socket io");

	socket.on('message', function (message){
		console.log(message);
		console.log('Message received ' + message.text);
		message.timestamp = moment().valueOf();
		io.emit('message' , message);
	})

	socket.emit('message',{
		text: 'welcome to the world of chat application',
		timestamp : moment().valueOf()
	});

});

app.use(express.static(__dirname +"/public"));

http.listen(PORT , function (){
	console.log("server has been started")
})
