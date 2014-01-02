$(function() {	

	var socket = io.connect('http://localhost:8000');
	var data = []
	socket.on('message', function (_data) {
	    	var parse = JSON.parse(_data)
		totalPoints = 300
		var roll = parse.Roll
		console.log(roll)


		function getData(roll) {

			if (data.length > 0)
				data = data.slice(1);

			while (data.length < totalPoints) {

				var prev = data.length > 0 ? data[data.length - 1] : 50
				data.push(roll);
			}

			var res = [];
			for (var i = 0; i < data.length; ++i) {
				res.push([i, data[i]])
			}
			console.log(res)
			return res;
		}

		var plot = $.plot("#signal-plot", [getData(roll)], {
			series: {
				shadowSize: 0	// Drawing is faster without shadows
			},
			yaxis: {
				min: 0,
				max: 100
			},
			xaxis: {
				show: false
			}
		});

		plot.setData([getData(roll)]);
		plot.draw();
	});

	
});