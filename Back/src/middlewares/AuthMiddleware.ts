import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.body.user = decoded as { username: string, email: string };
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};
