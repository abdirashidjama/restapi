const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	date: {type: Date, required: false},
	giAttendance: [{ type: ObjectId, ref: 'Student'}],
	noGiAttendance:[{ type: ObjectId, ref: 'Student'}],
	strikingAttendance: [{type: ObjectId, ref: 'Student'}]
});

module.exports = mongoose.model('Attendance', studentSchema);