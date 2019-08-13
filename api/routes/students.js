const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const StudentController = require('../controllers/students')
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './uploads/');
	},
	filename: function(req, file, cb){
		cb(null, new Date().toISOString() + file.originalname)
	}
});

const fileFilter = (req, file, cb) => {
	//reject a file
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
		cb(null, true);
	}
	else{
		cb(null, false);
	}
};

const upload = multer({
	storage: storage, 
	limits: { 
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});

router.get('/', StudentController.students_get_all);

router.get('/:studentId', StudentController.students_get_id);

router.post('/', upload.single('studentImage'), StudentController.students_post);

router.delete('/:studentId', StudentController.students_delete);

module.exports = router;