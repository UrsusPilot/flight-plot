$(function() {	

	var socket = io.connect('http://localhost:8000');
	var data_roll = []
		, data_pitch = []
		, data_yaw = []
	var data_acc_x = []
		, data_acc_y = []
		, data_acc_z = []
	var data_gyro_x = []
		, data_gyro_y = [] 
		, data_gyro_z = []

	socket.on('message', function (_data) {
	    	var parse = JSON.parse(_data)
		totalPoints = 300
		var roll = parse.Roll
			, pitch = parse.Pitch
			, yaw = parse.Yaw
		var acc_param = 0.0001220703
		var gyro_param = 0.060975609756
		var acc_x = parse.Acc_x * acc_param
			, acc_y = parse.Acc_y * acc_param
			, acc_z = parse.Acc_z * acc_param
		var gyro_x = parse.Gyro_x * gyro_param
			, gyro_y = parse.Gyro_y * gyro_param
			, gyro_z = parse.Gyro_z * gyro_param


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

		var att_plot = $.plot("#attitude-plot", [{
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
				min: -90,
				max: 90
			},
			xaxis: {
				show: false
			}
		});
		att_plot.draw();


		var acc_plot = $.plot("#acc-plot", [{
				label: 'x',
				data: getData(acc_x, data_acc_x)
			},{
				label: 'y',
				data: getData(acc_y, data_acc_y)
			},{
				label: 'z',
				data: getData(acc_z, data_acc_z)
			}], {
			series: {
				shadowSize: 0	// Drawing is faster without shadows
			},
			yaxis: {
				min: -4,
				max: 4
			},
			xaxis: {
				show: false
			}
		});

		acc_plot.draw();

		var gyro_plot = $.plot("#gyro-plot", [{
				label: 'x',
				data: getData(gyro_x, data_gyro_x)
			},{
				label: 'y',
				data: getData(gyro_y, data_gyro_y)
			},{
				label: 'z',
				data: getData(gyro_z, data_gyro_z)
			}], {
			series: {
				shadowSize: 0	// Drawing is faster without shadows
			},
			yaxis: {
				min: -1000,
				max: 1000
			},
			xaxis: {
				show: false
			}
		});

		gyro_plot.draw();
	});

	
});