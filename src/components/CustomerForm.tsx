import React from 'react';
import { User, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

interface CustomerFormProps {
  customerName: string;
  onCustomerNameChange: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  nameError?: string;
  isSubmitting: boolean;
  orderTotalInPaise: number;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  customerName,
  onCustomerNameChange,
  onSubmit,
  nameError,
  isSubmitting,
  orderTotalInPaise
}) => {
  return (
    <section className="checkout-form-section" aria-labelledby="customer-info-heading">
      <div className="section-header">
        <div className="section-title-wrap">
          <User className="section-title-icon" size={20} />
          <h2 id="customer-info-heading" className="section-title">Customer Information</h2>
        </div>
        <p className="section-subtitle">Please provide your details to complete your order verification.</p>
      </div>

      <form onSubmit={onSubmit} noValidate className="checkout-form" data-testid="checkout-form">
        <div className={`form-group ${nameError ? 'has-error' : ''}`}>
          <label htmlFor="customer-name" className="form-label">
            Customer Name <span className="required-star" aria-hidden="true">*</span>
          </label>
          
          <div className="input-wrapper">
            <input
              id="customer-name"
              type="text"
              name="customerName"
              className={`form-input ${nameError ? 'input-error' : ''}`}
              placeholder="Enter customer name (e.g. Lathika)"
              value={customerName}
              onChange={(e) => onCustomerNameChange(e.target.value)}
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={!!nameError}
              aria-describedby={nameError ? 'customer-name-error' : undefined}
              data-testid="customer-name-input"
              autoComplete="name"
            />
          </div>

          {nameError && (
            <div
              id="customer-name-error"
              className="validation-feedback error-message"
              role="alert"
              data-testid="customer-name-error"
            >
              <AlertCircle size={15} className="error-icon" />
              <span>{nameError}</span>
            </div>
          )}
        </div>

        <div className="checkout-cta-box">
          <div className="checkout-cta-info">
            <span className="cta-total-label">Payable Amount:</span>
            <span className="cta-total-amount" data-testid="checkout-payable-amount">
              {formatCurrency(orderTotalInPaise)}
            </span>
          </div>

          <button
            type="submit"
            className={`btn-place-order ${isSubmitting ? 'btn-loading' : ''}`}
            disabled={isSubmitting}
            data-testid="place-order-btn"
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="spinner-icon" />
                <span>Processing Order...</span>
              </>
            ) : (
              <>
                <Lock size={18} />
                <span>Place Order</span>
              </>
            )}
          </button>
        </div>

        <div className="security-guarantee">
          <span className="security-badge">
            <Lock size={12} /> 256-Bit SSL Encrypted Verification • Idempotent Protection
          </span>
        </div>
      </form>
    </section>
  );
};
