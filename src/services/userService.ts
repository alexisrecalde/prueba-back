import bcrypt from 'bcrypt';
import { User } from '../types';
import userDAO from '../data/userDAO';


export const getAllUsers = async (): Promise<Omit<User, 'password'>[]> => {
  try {
    const users = await userDAO.getUsers();
    return users.map(({ password, ...rest }) => rest);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw new Error('Error al obtener usuarios');
  }
};

export const getUserById = async (id: string): Promise<Omit<User, 'password'> | null> => {
  try {
    const user = await userDAO.getUserById(id);
    
    if (!user) {
      return null;
    }
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    throw new Error('Error al obtener usuario');
  }
};


export const updateUser = async (
  id: string, 
  userData: Partial<User>
): Promise<Omit<User, 'password'> | null> => {
  try {
    const existingUser = await userDAO.getUserById(id);
    if (!existingUser) {
      return null;
    }
    
    let updatedUserData = { ...userData };
    if (userData.password) {
      updatedUserData.password = await bcrypt.hash(userData.password, 10);
    }
    
    const updatedUser = await userDAO.updateUser(id, updatedUserData);
    
    if (!updatedUser) {
      return null;
    }
    
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw new Error('Error al actualizar usuario');
  }
};

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    const existingUser = await userDAO.getUserById(id);
    if (!existingUser) {
      return false;
    }
    
    return await userDAO.deleteUser(id);
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw new Error('Error al eliminar usuario');
  }
};

export default {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};