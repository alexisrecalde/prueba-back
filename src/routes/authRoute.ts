import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import authService from '../services/authService';

const router = Router();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        
        try {
            const { email, password, name, role } = req.body;
            
            const result = await authService.register(
                email, 
                password, 
                name, 
                role || 'user'
            );
            
            if ('error' in result) {
                res.status(400).json({ message: result.error });
                return;
            }
            
            res.status(201).json({
                message: 'Usuario registrado exitosamente',
                token: result.token,
                user: result.user
            });
        } catch (error) {
            console.error('Error en registro:', error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    const result = await authService.login(email, password);
    
    if ('error' in result) {
        res.status(400).json({ message: result.error });
        return;
    }
    
    res.status(200).json({
      message: 'Login exitoso',
      token: result.token,
      user: result.user
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

export default router;