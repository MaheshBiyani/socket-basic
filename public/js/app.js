var socket = io();

socket.on('connect', function(){
	console.log('client connected to server')
})