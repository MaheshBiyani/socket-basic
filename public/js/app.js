var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

console.log(name +" wants to join " + room);
jQuery('.room-title').text(room);

var socket = io();

socket.on('connect', function() {
	console.log('client connected to server')
	socket.emit('joinRoom',{
		name : name ,
		room : room
	})
})

socket.on('message', function(message) {
	var momentTimestamp = moment.utc(message.timestamp);
	var $message =jQuery('.messages');
	console.log("custom event invoked")
	console.log(message.text);

	$message.append('<p> <strong>' + message.name +" " +momentTimestamp.format('h:mma') + "<strong></p>" );

	$message.append('<p>' + message.text + '</p>');

	
})


var $form = jQuery('#message-form');
$form.on('submit', function(event) {
	var $message = $form.find('input[name=message]')
	event.preventDefault();
	socket.emit('message', {
		name : name,
		text: $message.val()
	});
	$message.val('');
});