var socket = io();

socket.on('connect', function() {
	console.log('client connected to server')
})

socket.on('message', function(message) {
	console.log("custom event invoked")
	console.log(message.text);
	jQuery('.messages').append('<p>' + message.text + '</p>');
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