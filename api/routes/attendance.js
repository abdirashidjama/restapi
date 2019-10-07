const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AttendanceController = require('../controllers/attendance')

router.get('/', AttendanceController.attendance_get_all);


router.post('/', AttendanceController.attendance_post);

module.exports = router;