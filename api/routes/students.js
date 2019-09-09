const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const StudentController = require('../controllers/students')


router.get('/', StudentController.students_get_all);

router.get('/:studentId', StudentController.students_get_id);

router.post('/', StudentController.students_post);

router.delete('/:studentId', StudentController.students_delete);

router.patch('/:studentId', StudentController.students_patch);

module.exports = router;