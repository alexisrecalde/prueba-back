import fs from 'fs/promises';
import path from 'path';
import { config } from '../config';

// Función para leer un archivo JSON
export const readJsonFile = async <T>(filename: string): Promise<T> => {
  try {
    const filePath = path.join(config.dbDir, `${filename}.json`);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [] as unknown as T;
    }
    console.error(`Error reading ${filename}.json:`, error);
    throw new Error(`Failed to read ${filename}.json`);
  }
};


// Función para escribir en un archivo JSON
export const writeJsonFile = async <T>(filename: string, data: T): Promise<void> => {
  try {
    const filePath = path.join(config.dbDir, `${filename}.json`);
    
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing to ${filename}.json:`, error);
    throw new Error(`Failed to write to ${filename}.json`);
  }
};

// Función para inicializar los archivos de la base de datos con datos predeterminados
export const initializeDatabase = async (): Promise<void> => {
  try {
    await fs.mkdir(config.dbDir, { recursive: true });
  } catch (error) {
    console.error('Error creating database directory:', error);
    throw error;
  }

  // Inicializar usuarios si no existe el archivo
  try {
    const userFilePath = path.join(config.dbDir, 'users.json');
    if (!await fileExists(userFilePath)) {
      const initialUsers = [
        {
          id: "1",
          email: "admin@example.com",
          // Contraseña: "admin123" hasheada con bcrypt
          password: "$2b$10$X7nS.U5mMfJ/zj5Kh.5oaeT8zw1e1G5eP.tAdiTdVrJgXiBu8x8ZK",
          name: "Admin User",
          role: "admin"
        }
      ];
      await writeJsonFile('users', initialUsers);
      console.log('Initialized users.json with default data');
    }
  } catch (error) {
    console.error('Error initializing users.json:', error);
    throw error;
  }

  try {
    const productFilePath = path.join(config.dbDir, 'products.json');
    if (!await fileExists(productFilePath)) {
      const initialProducts = [
        {
          id: "1",
          name: "Smartphone XYZ",
          price: 699.99,
          image: "https://via.placeholder.com/300",
          description: "Último modelo de smartphone con cámara de alta resolución y batería de larga duración.",
          category: "electronics"
        },
        {
          id: "2",
          name: "Laptop Pro",
          price: 1299.99,
          image: "https://via.placeholder.com/300",
          description: "Potente laptop para profesionales con procesador de última generación.",
          category: "electronics"
        },
        {
          id: "3",
          name: "Auriculares Inalámbricos",
          price: 99.99,
          image: "https://via.placeholder.com/300",
          description: "Auriculares con cancelación de ruido y gran calidad de sonido.",
          category: "accessories"
        },
        {
          id: "4",
          name: "Smart Watch",
          price: 199.99,
          image: "https://via.placeholder.com/300",
          description: "Reloj inteligente con monitor de actividad física y notificaciones.",
          category: "wearables"
        }
      ];
      await writeJsonFile('products', initialProducts);
      console.log('Initialized products.json with default data');
    }
  } catch (error) {
    console.error('Error initializing products.json:', error);
    throw error;
  }
};

// Función auxiliar para verificar si un archivo existe
const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};