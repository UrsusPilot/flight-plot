$(function() {	

	var socket = io.connect('http://localhost:8000');
	var data_roll = []
	var data_pitch = []
	var data_yaw = []
	socket.on('message', function (_data) {
	    	var parse = JSON.parse(_data)
		totalPoints = 300
		var roll = parse.Roll
		var pitch = parse.Pitch
		var yaw = parse.Yaw

		function getData(set, data) {

			// create the array to fit the totalPoint length
			if(data.length < totalPoints) {
				for (var i = totalPoints - 1; i >= 0; i--) {
					data[i] = [i, 0]
				};
			} else {
				for (var i = 1; i < totalPoints; i++) {
					// console.log(data[i])
					data[i - 1] = [i, data[i][1]]
					// console.log(data[i])
				};
				data[totalPoints - 1] = [totalPoints, set]
			}

			return data
		}
		
		var plot = $.plot("#signal-plot", [{
				label: 'Roll',
				data: getData(roll, data_roll)
			},{
				label: 'Pitch',
				data: getData(pitch, data_pitch)
			},{
				label: 'Yaw',
				data: getData(yaw, data_yaw)
			}], {
			series: {
				shadowSize: 0	// Drawing is faster without shadows
			},
			yaxis: {
				min: -200,
				max: 200
			},
			xaxis: {
				show: false
			}
		});
		plot.draw();
	});

	
});