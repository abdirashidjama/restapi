const mongoose = require('mongoose');
const Student = require('../models/student');

exports.students_get_all = (req, res, next) => {
	Student
	.find()
	.exec()
	.then(docs =>{
		const response ={
				count: docs.length,
				students: docs.map(doc => {
					return{
						_id: doc._id,
						firstname: doc.firstName,
						lastname: doc.lastName,
						email: doc.email,
						number: doc.number,
						membershiptype: doc.memTypeInfo,
						memexpdate: doc.memExpDate,
						giHours: doc.giHours,
						noGiHours: doc.noGiHours,
						strikingHours: doc.strikingHours,
						studentImage: doc.studentImage,
						request: {
							type: 'GET',
							url: 'http://localhost:3000/students/' + doc._id
						}
					}
				})
		}
		res.status(200).json(response);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error:err
		});
	})
	
}

exports.students_get_id = (req, res, next) =>{
	const id = req.params.studentId;
	Student.findById(id)
	.exec()
	.then(doc => {
		if(doc){
			console.log(doc);
			res.status(200).json({
				foundStudent: {
					_id: doc._id,
					firstname: doc.firstName,
					lastname: doc.lastName,
					email: doc.email,
					number: doc.number,
					membershiptype: doc.memTypeInfo,
					memexpdate: doc.memExpDate,
					giHours: doc.giHours,
					noGiHours: doc.noGiHours,
					strikingHours: doc.strikingHours,
					studentImage: doc.studentImage
				}
			});
		}
		else{
			res.status(404).json({message: 'No valid entry found for provided ID'});
		}
	})
	.catch(err =>{
		console.log(err);
		res.status(500).json({error: err});
	});
	
}

exports.students_post = (req, res, next) => {
	const student = new Student({
		_id: new mongoose.Types.ObjectId(),
		firstName: req.body.firstname,
		lastName: req.body.lastname,
		email: req.body.email,
		number: req.body.number,
		memTypeInfo: req.body.memtypeinfo,
		memExpDate: req.body.memexpdate,
		giHours: req.body.giHours,
		noGiHours: req.body.noGiHours,
		strikingHours: req.body.strikingHours,
		studentImage: req.body.studentImage
	});
	student
	.save()
	.then(result => {
		console.log(result);
		res.status(201).json({
			message:'created student successfully',
			createdStudent: {
				firstName: result.firstName,
				lastName: result.lastName,
				_id: result._id,
				request: {
					type: 'GET',
					url: 'http://localhost:3000/students/' + result._id
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

exports.students_patch = (req, res, next) => {
	// create an object to hold the names and values of changed values sent via request body
	const id= req.params.studentId;
	const updateOps ={};
	for(const ops of req.body){
		updateOps[ops.propName] = ops.value;
	}
	Student.update({_id: id}, {$set: updateOps})
	.exec()
	.then(result =>{
		res.status(200).json({
			message: 'Student information',
			request: {
				type: 'GET',
				url: 'http://localhost:3001/students/' + id
			}
		});
	})
	.catch(err=>{
		console.log(err);
		res.status(500).json({error:err});
	})

}

exports.students_delete = (req, res, next) => {
	const id = req.params.studentId;
	Student.remove({_id: id}).exec()
	.then(result => {
		res.status(200).json({
			message: 'Student deleted',
			request:{
				type: 'POST',
				url: 'http://localhost:3000/students',
				body:{ firstname: 'String', lastname: 'Number'}
			}
		});
	})
	.catch(err =>{
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}
