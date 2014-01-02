var connect = require('connect')
var io = require('socket.io').listen(8000)
var fs = require('fs')


var app = connect().use(connect.static(__dirname))

connect.createServer(app).listen(8080);

console.log('port is listening to 8080 port')

io.sockets.on('connection', function (socket) {
	console.log("connect to socket.io")
	var SerialPort = require("serialport").SerialPort
	var serialPort = new SerialPort("/dev/ttyUSB0", {
		baudrate: 9600
	})
	serialPort.on("open", function() {
		console.log("open");
		var count = 0
		var text = '';
		serialPort.on("data", function(data) {
			text = text + data
			var index = text.lastIndexOf("/r/n");
			if(index != -1) {
				var chop = text.substring(0, text.lastIndexOf("/r/n"))
				var re_chop = chop.replace(/'/g, '"');
				count ++;
				if(count > 2) {
					socket.emit('message', re_chop);	
				}
				text = ''
			}
		});
	});


});