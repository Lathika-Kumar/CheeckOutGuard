import React from 'react';
import { CartItem as CartItemType } from '../types';
import { formatCurrency } from '../utils/currency';
import { Plus, Minus, Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
  onIncreaseQuantity: (productId: string) => void;
  onDecreaseQuantity: (productId: string) => void;
  onRemoveItem: (productId: string) => void;
  disabled?: boolean;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
  disabled = false
}) => {
  const { product, quantity } = item;
  // Calculate line total using exact integer arithmetic in paise
  const lineTotalInPaise = product.priceInPaise * quantity;

  return (
    <div
      className="cart-item-row"
      data-testid={`cart-item-${product.id}`}
      aria-label={`Cart item: ${product.name}`}
    >
      <div className="cart-item-details">
        <h4 className="cart-item-name" data-testid={`cart-item-name-${product.id}`}>
          {product.name}
        </h4>
        <span className="cart-item-unit-price" data-testid={`cart-item-unit-price-${product.id}`}>
          Unit: {formatCurrency(product.priceInPaise)}
        </span>
      </div>

      <div className="cart-item-quantity-wrapper">
        <label htmlFor={`qty-${product.id}`} className="visually-hidden">
          Quantity for {product.name}
        </label>
        <div className="quantity-controller">
          <button
            type="button"
            className="qty-btn btn-decrease"
            data-testid={`quantity-decrease-${product.id}`}
            aria-label={`Decrease quantity of ${product.name}`}
            onClick={() => onDecreaseQuantity(product.id)}
            disabled={disabled || quantity <= 1} // Quantity must never become negative or zero via controls
          >
            <Minus size={14} />
          </button>
          
          <span
            id={`qty-${product.id}`}
            className="qty-display-value"
            data-testid={`quantity-value-${product.id}`}
            aria-live="polite"
          >
            {quantity}
          </span>

          <button
            type="button"
            className="qty-btn btn-increase"
            data-testid={`quantity-increase-${product.id}`}
            aria-label={`Increase quantity of ${product.name}`}
            onClick={() => onIncreaseQuantity(product.id)}
            disabled={disabled}
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="cart-item-line-total-wrapper">
        <span className="line-total-label">Subtotal:</span>
        <span
          className="cart-item-line-total"
          data-testid={`line-total-${product.id}`}
          aria-label={`Line total for ${product.name}: ${formatCurrency(lineTotalInPaise)}`}
        >
          {formatCurrency(lineTotalInPaise)}
        </span>
      </div>

      <div className="cart-item-actions">
        <button
          type="button"
          className="btn-remove-item"
          data-testid={`remove-item-${product.id}`}
          onClick={() => onRemoveItem(product.id)}
          disabled={disabled}
          aria-label={`Remove ${product.name} from cart`}
          title={`Remove ${product.name}`}
        >
          <Trash2 size={16} />
          <span className="btn-remove-text">Remove</span>
        </button>
      </div>
    </div>
  );
};
