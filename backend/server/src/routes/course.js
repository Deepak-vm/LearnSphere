const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authorize = require('../middlewares/authMiddleware');

router.post('/', authorize(['admin']), courseController.createCourse);
router.get('/', authorize(['admin', 'teacher', 'student']), courseController.getCourses);
router.get('/:id', authorize(['admin', 'teacher', 'student']), courseController.getCourseById);
router.put('/:id', authorize(['admin', 'teacher']), courseController.updateCourse);
router.delete('/:id', authorize(['admin']), courseController.deleteCourse);
router.post('/:course_id/enroll', authorize(['student']), courseController.enrollStudent);

module.exports = router;