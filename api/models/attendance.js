const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	date: {type: Date, required: false},
	gi: [{ type: ObjectId, ref: 'Attendance'}],
	noGi:[{ type: ObjectId, ref: 'Attendance'}],
	striking: [{type: ObjectId, ref: 'Attendance'}]
});

module.exports = mongoose.model('Attendance', attendanceSchema);