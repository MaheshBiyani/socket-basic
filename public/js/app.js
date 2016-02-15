var socket = io();

socket.on('connect', function(){
	console.log('client connected to server')
})

socket.on('message', function (message){
	console.log("custom event invoked")
	console.log(message.text);
})