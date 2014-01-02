var socket = io.connect('http://localhost:8000');
socket.on('message', function (data) {
    	console.log(data);
    	// socket.emit('my other event', { my: 'data' });
});