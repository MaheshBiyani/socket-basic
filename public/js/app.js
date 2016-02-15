var socket = io();

socket.on('connect', function() {
	console.log('client connected to server')
})

socket.on('message', function(message) {
	var momentTimestamp = moment.utc(message.timestamp);
	console.log("custom event invoked")
	console.log(message.text);
	jQuery('.messages').append('<p> <strong>' + momentTimestamp.format('hmma') + ' : </strong>   ' + message.text + '</p>');
})


var $form = jQuery('#message-form');
$form.on('submit', function(event) {
	var $message = $form.find('input[name=message]')
	event.preventDefault();
	socket.emit('message', {
		text: $message.val()
	});
	$message.val('');
});