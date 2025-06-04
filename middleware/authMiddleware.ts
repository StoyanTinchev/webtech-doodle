import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development';

export function requireAuth(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).json({error: 'No token provided'});
        return;
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        (req as any).userId = decoded.id;
        next();
    } catch {
        res.status(401).json({error: 'Invalid token'});
        return;
    }
}
