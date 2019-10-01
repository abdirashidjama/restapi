const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	firstName: {type: String, required:true},
	lastName: {type: String, required:true},
	email: {type: String, required: false},
	number: {type: String, required: false},
	memTypeInfo: {type: String, required: false},
	memExpDate: {type: Date, required: false},
	GiHours: {type: Number, required: false},
	NoGiHours: {type: Number, required: false},
	StrikingHours: {type: Number, required: false},
	MostRecentTraining: {type: Date, required: false},
	studentImage:{type: String, required: false}
});

module.exports = mongoose.model('Student', studentSchema);