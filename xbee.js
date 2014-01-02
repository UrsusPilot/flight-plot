var app = require('http').createServer(handler)
var io = require('socket.io').listen(app)
var fs = require('fs')
var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyUSB0", {
	baudrate: 9600
})

app.listen(80);

function handler (req, res) {
	fs.readFile(__dirname + '/index.html',
		function(err, data) {
			if(err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
			}
			res.writeHead(200);
			res.end(data);
		})
	}

io.sockets.on('connection', function (socket) {

	serialPort.on("open", function() {
		console.log("open");
		var text = '';
		serialPort.on("data", function(data) {
			text = text + data
			var index = text.lastIndexOf("/r/n");
			if(index != -1) {
				var chop = text.substring(0, text.lastIndexOf("/r/n"))
				var parse = JSON.parse(chop)
				console.log(parse)
				socket.emit('data', parse);
				text = ''
			}
		});
	});


});

	