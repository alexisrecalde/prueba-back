import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import userDAO from '../data/userDAO';
import { User } from '../types';

export interface AuthResult {
  token: string;
  user: Omit<User, 'password'>;
}

export const register = async (
  email: string,
  password: string,
  name: string,
  role: 'user' | 'admin' = 'user'
): Promise<AuthResult | { error: string }> => {
  try {
    const existingUser = await userDAO.getUserByEmail(email);
    if (existingUser) {
      return { error: 'El email ya está registrado' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await userDAO.createUser({
      email,
      password: hashedPassword,
      name,
      role: role
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    const { password: _, ...userWithoutPassword } = newUser;

    return {
      token,
      user: userWithoutPassword
    };
  } catch (error) {
    console.error('Error en servicio de registro:', error);
    return { error: 'Error en el servidor' };
  }
};

export const login = async (
  email: string,
  password: string
): Promise<AuthResult | { error: string }> => {
  try {
    const user = await userDAO.getUserByEmail(email);
    if (!user) {
      return { error: 'Credenciales inválidas' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { error: 'Credenciales inválidas' };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    const { password: _, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword
    };
  } catch (error) {
    console.error('Error en servicio de login:', error);
    return { error: 'Error en el servidor' };
  }
};

export default {
  register,
  login
};