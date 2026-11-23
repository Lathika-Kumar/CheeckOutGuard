import React from 'react';
import { OrderDetails } from '../types';
import { CheckCircle2, ShieldCheck, ArrowRight, PackageCheck, Copy, Check } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

interface OrderConfirmationProps {
  order: OrderDetails;
  onResetOrder: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  order,
  onResetOrder
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyRef = async () => {
    try {
      await navigator.clipboard.writeText(order.orderReference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section
      className="order-confirmation-section"
      data-testid="order-confirmation"
      aria-labelledby="confirmation-heading"
    >
      <div className="confirmation-card">
        <div className="confirmation-header">
          <div className="success-icon-badge" data-testid="order-success-icon">
            <CheckCircle2 size={44} className="icon-success" />
          </div>
          <h2 id="confirmation-heading" className="confirmation-title" data-testid="order-success-message">
            Order placed successfully!
          </h2>
          <p className="confirmation-subtitle">
            Thank you for shopping with CheckoutGuard. Your purchase has been authenticated and confirmed.
          </p>
        </div>

        <div className="order-reference-box">
          <div className="order-reference-info">
            <span className="reference-label">Order Reference</span>
            <span className="reference-code" data-testid="order-reference">
              {order.orderReference}
            </span>
          </div>
          <button
            type="button"
            className="btn-copy-ref"
            onClick={handleCopyRef}
            aria-label="Copy order reference"
            title="Copy to clipboard"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className="order-details-grid">
          <div className="detail-item">
            <span className="detail-label">Customer Name</span>
            <span className="detail-value" data-testid="order-customer-name">
              {order.customerName}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Order Date</span>
            <span className="detail-value" data-testid="order-date">
              {order.createdAt}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Payment Status</span>
            <span className="detail-value status-verified">
              <ShieldCheck size={14} /> Verified (Synthetic Local)
            </span>
          </div>
        </div>

        <div className="ordered-items-summary">
          <h3 className="items-summary-title">
            <PackageCheck size={18} /> Ordered Products
          </h3>
          <div className="items-table" data-testid="order-items-list">
            <div className="items-table-header">
              <span>Item</span>
              <span>Unit Price</span>
              <span>Qty</span>
              <span>Line Total</span>
            </div>
            <div className="items-table-body">
              {order.items.map((item) => {
                const lineTotal = item.product.priceInPaise * item.quantity;
                return (
                  <div
                    key={item.product.id}
                    className="items-table-row"
                    data-testid={`confirmed-item-${item.product.id}`}
                  >
                    <span className="item-name" data-testid={`confirmed-item-name-${item.product.id}`}>
                      {item.product.name}
                    </span>
                    <span className="item-unit-price">
                      {formatCurrency(item.product.priceInPaise)}
                    </span>
                    <span className="item-qty" data-testid={`confirmed-item-qty-${item.product.id}`}>
                      {item.quantity}
                    </span>
                    <span className="item-subtotal" data-testid={`confirmed-item-total-${item.product.id}`}>
                      {formatCurrency(lineTotal)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="confirmation-total-card">
          <div className="total-breakdown-row">
            <span className="final-total-label">Final Order Total</span>
            <span className="final-total-amount" data-testid="order-final-total">
              {order.totalFormatted}
            </span>
          </div>
        </div>

        <div className="confirmation-actions">
          <button
            type="button"
            className="btn-start-new-order"
            data-testid="start-new-order-btn"
            onClick={onResetOrder}
          >
            <span>Place Another Order</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
