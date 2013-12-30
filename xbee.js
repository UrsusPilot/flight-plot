var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyUSB0", {
	baudrate: 9600
})

serialPort.on("open", function() {
	console.log("open");
	var text = '';
	serialPort.on("data", function(data) {
		text = text + data
		console.log(text)
	});
});
