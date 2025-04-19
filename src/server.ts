import express from 'express';
import meetingsRouter from './routes/meetings';
import optionsRouter from './routes/options';
import votesRouter from './routes/votes';

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON payloads
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