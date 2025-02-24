const router = require('express').Router();
const authorize = require('../middlewares/authMiddleware');
const batchController = require('../controllers/batchController');

router.post('/', authorize(['admission_admin', 'super_admin']), batchController.createBatch);
router.get('/', authorize(['admission_admin', 'super_admin', 'teacher']), batchController.getAllBatches);
router.get('/:id', authorize(['admission_admin', 'super_admin', 'teacher']), batchController.getBatchById);
router.put('/:id', authorize(['admission_admin', 'super_admin']), batchController.updateBatch);
router.delete('/:id', authorize(['admission_admin', 'super_admin']), batchController.deleteBatch);
router.post('/:id/students', authorize(['admission_admin', 'super_admin']), batchController.assignStudentsToBatch);
router.get('/:id/students', authorize(['admission_admin', 'super_admin', 'teacher']), batchController.getBatchStudents);

module.exports = router;