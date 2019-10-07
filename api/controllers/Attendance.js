const mongoose = require('mongoose');
const Student = require('../models/Attendance');

exports.attendance_get_all = (req, res, next) => {
	
}

exports.attendance_post = (req, res, next) => {
	const attendance = new Student({
		_id: new mongoose.Types.ObjectId(),
		date: req.body.date,
		gi: req.body.gi,
		noGi: req.body.noGi,
		striking: req.body.striking
	});
	
	Attendance
	.save()
	.then(result => {
		console.log(result);
		res.status(201).json({
			message:'created Attendance successfully',
			createdStudent: {
				date: result.date,
				gi: result.gi,
				noGi: result.noGi,
				striking: result.striking,
				_id: result._id,
				request: {
					type: 'GET',
					url: 'http://localhost:3000/attendance/' + result._id
				}
			}
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	
	});
}