import { Product } from '../types';
import { readJsonFile, writeJsonFile } from '../utils/dbUtils';

const PRODUCTS_FILE = 'products';

export const getProducts = async (): Promise<Product[]> => {
  return await readJsonFile<Product[]>(PRODUCTS_FILE);
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  const products = await getProducts();
  return products.find(product => product.id === id);
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter(product => product.category === category);
};

export const createProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
  const products = await getProducts();
  
  // Generar ID único
  const newId = products.length > 0 
    ? (Math.max(...products.map(p => parseInt(p.id))) + 1).toString()
    : "1";
  
  const newProduct: Product = {
    id: newId,
    ...productData
  };
  
  products.push(newProduct);
  await writeJsonFile(PRODUCTS_FILE, products);
  
  return newProduct;
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product | null> => {
  const products = await getProducts();
  const productIndex = products.findIndex(product => product.id === id);
  
  if (productIndex === -1) {
    return null;
  }
  
  products[productIndex] = {
    ...products[productIndex],
    ...productData,
    id
  };
  
  await writeJsonFile(PRODUCTS_FILE, products);
  return products[productIndex];
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const products = await getProducts();
  const initialLength = products.length;
  
  const newProducts = products.filter(product => product.id !== id);
  
  if (newProducts.length === initialLength) {
    return false;
  }
  
  await writeJsonFile(PRODUCTS_FILE, newProducts);
  return true;
};

export default {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct
};