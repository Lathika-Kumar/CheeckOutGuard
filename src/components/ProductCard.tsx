import React from 'react';
import { Product } from '../types';
import { formatCurrency } from '../utils/currency';
import { Plus, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  disabled?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  disabled = false
}) => {
  return (
    <article
      className="product-card"
      data-testid={`product-card-${product.id}`}
      aria-label={product.name}
    >
      <div className="product-visual-wrapper">
        <div className={`product-visual-container visual-${product.id}`}>
          {product.id === 'wireless-headphones' ? (
            <div className="visual-graphic headphones-graphic" aria-hidden="true">
              <div className="headband"></div>
              <div className="earcup left-cup"></div>
              <div className="earcup right-cup"></div>
              <div className="soundwave wave-1"></div>
              <div className="soundwave wave-2"></div>
            </div>
          ) : (
            <div className="visual-graphic smartwatch-graphic" aria-hidden="true">
              <div className="watch-strap top-strap"></div>
              <div className="watch-body">
                <div className="watch-screen">
                  <div className="watch-time">10:42</div>
                  <div className="watch-heartbeat">
                    <span className="heart-dot"></span> 128 bpm
                  </div>
                </div>
              </div>
              <div className="watch-strap bottom-strap"></div>
            </div>
          )}
        </div>
        <span className="product-category-tag">{product.category}</span>
      </div>

      <div className="product-content">
        <div className="product-header-info">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-rating" aria-label={`Rated ${product.rating} out of 5 stars`}>
            <Star size={14} className="star-icon" fill="currentColor" />
            <span>{product.rating}</span>
          </div>
        </div>

        <p className="product-description">{product.description}</p>

        <ul className="product-features" aria-label="Key features">
          {product.features.map((feature, idx) => (
            <li key={idx} className="feature-item">
              <span className="feature-bullet">•</span> {feature}
            </li>
          ))}
        </ul>

        <div className="product-footer">
          <div className="product-price-block">
            <span className="price-label">Price</span>
            <span className="product-price" data-testid={`product-price-${product.id}`}>
              {formatCurrency(product.priceInPaise)}
            </span>
          </div>

          <button
            type="button"
            className="btn-add-to-cart"
            data-testid={`add-to-cart-${product.id}`}
            onClick={() => onAddToCart(product)}
            disabled={disabled}
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus size={16} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </article>
  );
};
