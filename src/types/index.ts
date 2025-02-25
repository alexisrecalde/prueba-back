
export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    role: 'admin' | 'user';
  }
  
  export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
  }
  
  export interface Database {
    users: User[];
    products: Product[];
  }
  
  export interface JwtPayload {
    id: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
    [key: string]: any;
  }
  
  export interface AuthRequest extends Express.Request {
    user?: JwtPayload;
  }

