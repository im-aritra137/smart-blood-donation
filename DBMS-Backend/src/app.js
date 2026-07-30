import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import emergencyRoutes from './routes/emergencyRoutes.js';
import donationRoutes from './routes/donationRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/donations', donationRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Smart Blood Donation API Running 🚀',
  });
});

// handle not found routes
app.use((req, res, next) => {
  res.status(404).json({
    status: 'Not Found',
    message: 'The requested resource was not found',
  });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'Error',
    message: 'Something went wrong!',
  });
});

export default app;
// zod library for validation can be added later as needed
// node --watch index.js to auto-restart server on changes
// Instead of try catch we can use safe parser