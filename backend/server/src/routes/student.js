const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authorize = require('../middlewares/authMiddleware');

router.post('/', authorize(['admin']), studentController.createStudent);
router.get('/', authorize(['admin', 'teacher', 'student']), studentController.getStudents);
router.get('/:id', authorize(['admin', 'teacher', 'student']), studentController.getStudentsById);
router.put('/:id', authorize(['admin', 'teacher']), studentController.updateStudent);
router.delete('/:id', authorize(['admin']), studentController.deleteStudent);
// router.post('/:course_id/enroll', authorize(['student']), studentController.enrollStudent);

module.exports = router;