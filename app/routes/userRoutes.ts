import { Router } from 'express';
import { getUserTasks, updateTaskStatus } from '../controllers/userController';
import { authorizeRoles } from '../common/middleware/authMiddleware';

const router = Router();

// Only 'user' or 'admin' can access these routes
router.get('/tasks/:userId', authorizeRoles(['user', 'admin']), getUserTasks);
router.put('/task/:id', authorizeRoles(['user', 'admin']), updateTaskStatus);

export default router;
