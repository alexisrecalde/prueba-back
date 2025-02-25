import { User } from '../types';
import { readJsonFile, writeJsonFile } from '../utils/dbUtils';

const USERS_FILE = 'users';

export const getUsers = async (): Promise<User[]> => {
  return await readJsonFile<User[]>(USERS_FILE);
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  const users = await getUsers();
  return users.find(user => user.id === id);
};

export const getUserByEmail = async (email: string): Promise<User | undefined> => {
  const users = await getUsers();
  return users.find(user => user.email === email);
};

export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  const users = await getUsers();
  
  // Generar ID único
  const newId = users.length > 0 
    ? (Math.max(...users.map(u => parseInt(u.id))) + 1).toString()
    : "1";
  
  const newUser: User = {
    id: newId,
    ...userData
  };
  
  users.push(newUser);
  await writeJsonFile(USERS_FILE, users);
  
  return newUser;
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<User | null> => {
  const users = await getUsers();
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return null;
  }

  users[userIndex] = {
    ...users[userIndex],
    ...userData,
    id
  };
  
  await writeJsonFile(USERS_FILE, users);
  return users[userIndex];
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const users = await getUsers();
  const initialLength = users.length;
  
  const newUsers = users.filter(user => user.id !== id);
  
  if (newUsers.length === initialLength) {
    return false; 
  }
  
  await writeJsonFile(USERS_FILE, newUsers);
  return true;
};

export default {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
};