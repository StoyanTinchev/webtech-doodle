import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import authRouter from './routes/auth';
import meetingsRouter from './routes/meetings';
import optionsRouter from './routes/options';
import votesRouter from './routes/votes';
import {connectDB, disconnectDB} from './db';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.mongoUri;

// Rate limiting: max 100 requests per 15 minutes per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: {error: 'Too many requests, please try again later.'}
});
app.use(limiter);

// CORS + JSON parsing
app.use(cors({
    credentials: true,
}));
app.use(express.json());

// Mount routers
app.use('/api/auth', authRouter);
app.use('/api/meetings', meetingsRouter);
app.use('/api/meetings', optionsRouter);
app.use('/api/meetings', votesRouter);

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Unhandled error:', err.stack);
    res.status(500).json({error: err.message});
});

// Connect to Mongo, then start server
connectDB(mongoUri)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('Failed to connect to DB, exiting.', err);
        process.exit(1);
    });

process.on('SIGINT', () => {
    disconnectDB().then(() => process.exit(0));
});
