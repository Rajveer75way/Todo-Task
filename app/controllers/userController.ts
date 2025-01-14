import { Request, Response } from 'express';
import Task from '../models/Task';

export const getUserTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.userId;
        // Fetch tasks assigned to the given userId
        const tasks = await Task.find({ assignedTo: userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error });
    }
};

export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const taskId = req.params.id;
        const { status } = req.body;

        // Safely access req.user, it can be undefined
        const user = req.user;

        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        // Ensure that the task is assigned to the logged-in user (for security)
        const task = await Task.findById(taskId);

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        // Ensure that the task is assigned to the logged-in user (for security)
        if (task.assignedTo !== user._id.toString()) { // This line should now work without TypeScript errors
            res.status(403).json({ message: 'Forbidden: You can only update your own tasks' });
            return;
        }

        // Update task status
        const updatedTask = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task', error });
    }
};

