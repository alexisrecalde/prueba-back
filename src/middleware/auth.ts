import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { JwtPayload, AuthRequest } from '../types';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(' ')[1];
      
      if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
      }
      
      const decoded = jwt.verify(token, config.jwtSecret) as unknown as JwtPayload;
      
      if (!decoded.id || !decoded.email || !decoded.role) {
        res.status(401).json({ message: 'Invalid token format' });
        return;
      }
      
      (req as AuthRequest).user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthRequest;
    console.log(req);
        

  if (authReq.user?.role !== 'admin') {
    res.status(403).json({ message: 'Access denied: Admin role required' });
    return
  }
  
  next();
};