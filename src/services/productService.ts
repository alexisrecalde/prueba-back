import { Product } from '../types';
import productDAO from '../data/productDAO';

export const getAllProducts = async (category?: string): Promise<Product[]> => {
  if (category) {
    return await productDAO.getProductsByCategory(category);
  }
  return await productDAO.getProducts();
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  return await productDAO.getProductById(id);
};

export const createProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {

  const normalizedProductData = {
    ...productData,
    image: productData.image || 'https://via.placeholder.com/300'
  };
  
  return await productDAO.createProduct(normalizedProductData);
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product | null> => {
  const existingProduct = await productDAO.getProductById(id);
  if (!existingProduct) {
    return null;
  }
  
  return await productDAO.updateProduct(id, productData);
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const existingProduct = await productDAO.getProductById(id);
  if (!existingProduct) {
    return false;
  }
  
  return await productDAO.deleteProduct(id);
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};