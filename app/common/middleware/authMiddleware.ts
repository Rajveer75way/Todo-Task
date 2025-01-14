import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Explicitly type the return value of the inner function as void
export const authorizeRoles = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const authHeader = req.headers.authorization;

        // If no authorization header or incorrect Bearer token format
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Unauthorized' });
            return;  // Do not return a response object, just stop further processing
        }

        const token = authHeader.split(' ')[1];
        try {
            // Verify token and decode
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { _id: string, role: string };

            // Check if the user's role is allowed
            if (!roles.includes(decoded.role)) {
                res.status(403).json({ message: 'Forbidden' });
                return;  // Return here to prevent calling next()
            }
            console.log(req.user);
            // Assign the decoded user data to req.user, including _id and role
            req.user = decoded;

            // If everything is fine, pass control to the next middleware
            next(); // User has the appropriate role, continue to the next handler
        } catch (error) {
            res.status(401).json({ message: 'Unauthorized', error });
            return;  // Return here to stop further processing
        }
    };
};
