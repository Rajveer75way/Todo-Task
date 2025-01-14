import { Router } from 'express';
import { createTask } from '../controllers/adminController';
import { authorizeRoles } from '../common/middleware/authMiddleware';

const router = Router();

// Protect the route with the 'authorizeRoles' middleware (allowing only admins to create tasks)
router.post('/createtask', authorizeRoles(['admin']), createTask);

export default router;
