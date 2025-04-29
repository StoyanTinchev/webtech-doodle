import express from 'express';
// enables the front end to "be" with the same origin as the backend server
import cors from 'cors';
import authRoutes from './routes/auth';

// Заложен дефолтен порт
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('Auth API is running');
});

// Routes - ще използвам authRoutes за аутентикация
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});