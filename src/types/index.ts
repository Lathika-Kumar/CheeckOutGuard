export interface Product {
  id: string;
  name: string;
  priceInPaise: number; // Stored in paise (integer) to avoid floating point issues
  description: string;
  category: string;
  rating: number;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderDetails {
  orderReference: string;
  customerName: string;
  items: CartItem[];
  totalInPaise: number;
  totalFormatted: string;
  createdAt: string;
}

export interface ValidationError {
  customerName?: string;
  cart?: string;
}
