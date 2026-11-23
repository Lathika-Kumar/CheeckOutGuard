import React from 'react';
import { ShieldCheck, ShoppingCart, CheckCircle } from 'lucide-react';

interface HeaderProps {
  totalItemCount: number;
}

export const Header: React.FC<HeaderProps> = ({ totalItemCount }) => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-brand">
          <div className="brand-logo-wrapper">
            <ShieldCheck className="brand-icon" size={28} />
          </div>
          <div className="brand-text">
            <div className="brand-title-row">
              <h1 className="brand-name">CheckoutGuard</h1>
              <span className="badge-sdet" title="Automated Quality Assurance Suite Active">
                <CheckCircle size={13} /> QA Guarded
              </span>
            </div>
            <p className="brand-subtitle">Secure & Reliable Checkout</p>
          </div>
        </div>

        <div className="header-status-area">
          <div className="header-cart-badge" data-testid="header-cart-count" aria-label={`Shopping cart with ${totalItemCount} items`}>
            <ShoppingCart size={20} />
            <span className="cart-badge-text">Cart</span>
            <span className="cart-badge-count">{totalItemCount}</span>
          </div>
        </div>
      </div>
      <div className="header-tagline-bar">
        <span>Reliable checkout. Accurate totals. Automated quality assurance.</span>
      </div>
    </header>
  );
};
