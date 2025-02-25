import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  dbDir: path.join(__dirname, '../../db'), 
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000'
};