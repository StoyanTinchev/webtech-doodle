import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import meetingsRouter from './routes/meetings';
import optionsRouter from './routes/options';
import votesRouter from './routes/votes';

const app = express();
const PORT = process.env.PORT || 3000;

// Apply rate limiting to all requests to guard against abuse (e.g., max 100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,               // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});
app.use(limiter);

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Mount routers under /meetings
app.use('/meetings', meetingsRouter);
app.use('/meetings', optionsRouter);
app.use('/meetings', votesRouter);

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Unhandled error:', err.stack);
    res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});