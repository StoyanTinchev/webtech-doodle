// This is the entry point for the backend server using Express.js
// and TypeScript. It sets up the server, middleware, and routes.
// It also includes CORS support and JSON body parsing.
// The server listens on port 5000.

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Auth API is running');
});

// Routes
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});