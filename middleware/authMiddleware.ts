import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development';

/**
 *  Express middleware that enforces JWT-based authentication.
 *         Reads token from `x-auth-token` header, verifies it,
 *         and attaches `userId` to `req`.
 *
 * @param[in]  req   Express request object.
 * @param[in]  res   Express response object.
 * @param[in]  next  Next‐function callback.
 *
 * @returns void
 *
 * @throws Sends 401 if no token or invalid token.
 */
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
