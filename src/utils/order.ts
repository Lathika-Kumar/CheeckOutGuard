import { Product } from '../types';
import { rupeesToPaise } from './currency';

export const SYNTHETIC_PRODUCTS: Product[] = [
  {
    id: 'wireless-headphones',
    name: 'Wireless Headphones',
    priceInPaise: rupeesToPaise(1500),
    description: 'Premium wireless audio experience.',
    category: 'Audio',
    rating: 4.8,
    features: ['Active Noise Cancellation', '40h Battery Life', 'Bluetooth 5.3', 'Ultra-lightweight']
  },
  {
    id: 'smart-watch',
    name: 'Smart Watch',
    priceInPaise: rupeesToPaise(2000),
    description: 'Smart everyday fitness companion.',
    category: 'Wearables',
    rating: 4.9,
    features: ['AMOLED Display', 'Heart Rate & SpO2', '7-Day Battery', '5ATM Water Resistant']
  }
];

let counter = 1000;

/**
 * Generates a collision-resistant unique order reference.
 * Format: CG-YYYYMMDD-XXXXX
 */
export function generateOrderReference(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const datePart = `${year}${month}${day}`;
  
  counter += 1;
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  const sequencePart = (counter % 10000).toString().padStart(4, '0');
  
  return `CG-${datePart}-${sequencePart}${randomSuffix}`;
}
