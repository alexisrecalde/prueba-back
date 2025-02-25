import express from 'express';
import cors from 'cors';
import { config } from './config';

import authRoutes from './routes/authRoute';
import productRoutes from './routes/productRoute';
import userRoutes from './routes/userRoute';
import { isAuthenticated } from './middleware/auth';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', isAuthenticated , productRoutes);
app.use('/api/users',isAuthenticated, userRoutes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Ocurrió un error en el servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app;