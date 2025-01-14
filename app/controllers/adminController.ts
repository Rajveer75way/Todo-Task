import { Request, Response } from 'express';
import Task from '../models/Task';

// Controller to create a task
export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description, assignedTo } = req.body;
        console.log(req.body);

        // You can use req.user (set in the middleware) to get information about the logged-in user
        // For example, you could log the user or assign tasks to them in a different way:
        // console.log('User creating task:', req.user);

        // Create the new task with the provided details
        const task = await Task.create({ title, description, assignedTo });

        // Return the created task
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create task', error });
    }
};
