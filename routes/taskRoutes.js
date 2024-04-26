import { Router } from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} from '../controllers/taskController.js';
import authenticateToken from '../middlewares/auth.js';

const router = Router();

router.post('/', authenticateToken, createTask);
router.get('/', authenticateToken, getAllTasks);
router.get('/:id', authenticateToken, getTaskById);
router.put('/:id', authenticateToken, updateTaskById);
router.delete('/:id', authenticateToken, deleteTaskById);

export default router;
