import express, {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {findUserByEmail, findUserById, createUser} from '../models/user';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development';

// -----------------------------
// Register
// -----------------------------
router.post('/register', async (req: Request, res: Response): Promise<void> => {
    try {
        const {name, email, password} = req.body;

        // Basic validation
        if (!name || !email || !password) {
            res.status(400).json({error: 'All fields are required'});
            return;
        }

        // Check if user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            res.status(400).json({error: 'User already exists'});
            return;
        }

        // Create user (hashed internally)
        const newUser = await createUser(name, email, password);

        // Create JWT token
        const token = jwt.sign({id: newUser.id}, JWT_SECRET, {expiresIn: '1h'});

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error: any) {
        console.error('Register error:', error);

        // Duplicate‐email error code from Mongo
        if (error.code === 11000) {
            res.status(400).json({error: 'User already exists'});
            return;
        }

        res.status(500).json({error: 'Server error'});
    }
});

// -----------------------------
// Login
// -----------------------------
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            res.status(400).json({error: 'All fields are required'});
            return;
        }

        const user = await findUserByEmail(email);
        if (!user) {
            res.status(400).json({error: 'Invalid credentials'});
            return;
        }

        // Compare plaintext password with stored hash
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            res.status(400).json({error: 'Invalid credentials'});
            return;
        }

        // Issue JWT
        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '1h'});

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error: any) {
        console.error('Login error:', error);
        res.status(500).json({error: 'Server error'});
    }
});

// -----------------------------
// Get current user (requires x-auth-token header)
// -----------------------------
router.get('/me', async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            res.status(401).json({error: 'No token provided'});
            return;
        }

        let decoded: any;
        try {
            decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        } catch {
            res.status(401).json({error: 'Invalid token'});
            return;
        }

        const user = await findUserById(decoded.id);
        if (!user) {
            res.status(404).json({error: 'User not found'});
            return;
        }

        res.json({
            id: user.id,
            name: user.name,
            email: user.email
        });
    } catch (error: any) {
        console.error('Get user error:', error);
        res.status(500).json({error: 'Server error'});
    }
});

export default router;
