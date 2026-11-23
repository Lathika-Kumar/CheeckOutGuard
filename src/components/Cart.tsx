import React from 'react';
import { CartItem as CartItemType } from '../types';
import { CartItem } from './CartItem';
import { formatCurrency } from '../utils/currency';
import { ShoppingBag, AlertTriangle } from 'lucide-react';

interface CartProps {
  items: CartItemType[];
  orderTotalInPaise: number;
  totalQuantity: number;
  onIncreaseQuantity: (productId: string) => void;
  onDecreaseQuantity: (productId: string) => void;
  onRemoveItem: (productId: string) => void;
  cartError?: string;
  disabled?: boolean;
}

export const Cart: React.FC<CartProps> = ({
  items,
  orderTotalInPaise,
  totalQuantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
  cartError,
  disabled = false
}) => {
  const isCartEmpty = items.length === 0;

  return (
    <section className="cart-section" aria-labelledby="cart-heading">
      <div className="section-header">
        <div className="section-title-wrap">
          <ShoppingBag className="section-title-icon" size={20} />
          <h2 id="cart-heading" className="section-title">Shopping Cart</h2>
          <span className="cart-count-pill" data-testid="cart-total-items-badge">
            {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {cartError && (
        <div
          className="alert alert-error"
          role="alert"
          data-testid="cart-error"
        >
          <AlertTriangle size={18} className="alert-icon" />
          <div className="alert-content">
            <p className="alert-message">{cartError}</p>
          </div>
        </div>
      )}

      {isCartEmpty ? (
        <div className="empty-cart-state" data-testid="empty-cart-placeholder">
          <div className="empty-cart-icon-wrap">
            <ShoppingBag size={48} className="empty-cart-icon" />
          </div>
          <h3 className="empty-cart-title">Your cart is empty</h3>
          <p className="empty-cart-desc">
            Explore our synthetic product catalog above and add items to your cart to begin checkout.
          </p>
        </div>
      ) : (
        <div className="cart-items-container" data-testid="cart-items-list">
          <div className="cart-items-header">
            <span>Product</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span>Action</span>
          </div>

          <div className="cart-items-body">
            {items.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onIncreaseQuantity={onIncreaseQuantity}
                onDecreaseQuantity={onDecreaseQuantity}
                onRemoveItem={onRemoveItem}
                disabled={disabled}
              />
            ))}
          </div>

          <div className="cart-summary-card">
            <div className="summary-row">
              <span className="summary-label">Items in cart</span>
              <span className="summary-value" data-testid="summary-item-count">{totalQuantity}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-total-row">
              <span className="total-title">Order Total</span>
              <span className="total-amount" data-testid="order-total">
                {formatCurrency(orderTotalInPaise)}
              </span>
            </div>
            <p className="total-disclaimer">
              * Taxes and shipping included. Calculated strictly using integer arithmetic.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
