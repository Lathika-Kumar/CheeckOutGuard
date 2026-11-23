import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  disabled?: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddToCart,
  disabled = false
}) => {
  return (
    <section className="products-section" aria-labelledby="products-heading">
      <div className="section-header">
        <div className="section-title-wrap">
          <Sparkles className="section-title-icon" size={20} />
          <h2 id="products-heading" className="section-title">Available Products</h2>
        </div>
        <p className="section-subtitle">Select quality gear with guaranteed pricing and instant cart validation.</p>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            disabled={disabled}
          />
        ))}
      </div>
    </section>
  );
};
