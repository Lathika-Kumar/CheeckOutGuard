import React, { useState, useRef, useMemo } from 'react';
import { CartItem, OrderDetails, Product, ValidationError } from './types';
import { SYNTHETIC_PRODUCTS, generateOrderReference } from './utils/order';
import { formatCurrency } from './utils/currency';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { CustomerForm } from './components/CustomerForm';
import { OrderConfirmation } from './components/OrderConfirmation';

export const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<ValidationError>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  // Synchronous mutex ref to prevent race conditions and duplicate orders on rapid double-clicks
  const isSubmittingRef = useRef<boolean>(false);

  // Derived state: strictly calculated from the cart to prevent state inconsistency
  const totalQuantity = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const orderTotalInPaise = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.priceInPaise * item.quantity, 0);
  }, [cart]);

  // Business Rule 1 & 2: Adding a product must update cart, existing product increases quantity
  const handleAddToCart = (product: Product) => {
    if (isSubmitting || confirmedOrder !== null) return;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        };
        return updated;
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });

    // Clear cart error if product is added
    if (validationErrors.cart) {
      setValidationErrors((prev) => ({ ...prev, cart: undefined }));
    }
  };

  // Business Rule 4: Quantity must never become negative or zero through quantity controls
  const handleIncreaseQuantity = (productId: string) => {
    if (isSubmitting || confirmedOrder !== null) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (productId: string) => {
    if (isSubmitting || confirmedOrder !== null) return;

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId) {
          // Never drop below 1 via quantity controls
          const newQty = Math.max(1, item.quantity - 1);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  // Business Rule 3 & 5: Removing a product must update cart and total; removing last yields empty cart
  const handleRemoveItem = (productId: string) => {
    if (isSubmitting || confirmedOrder !== null) return;

    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // Customer Name change handler with error clearing
  const handleCustomerNameChange = (name: string) => {
    setCustomerName(name);
    if (validationErrors.customerName) {
      setValidationErrors((prev) => ({ ...prev, customerName: undefined }));
    }
  };

  // Business Rules 7, 8, 9, 10, 11, 12, 13, 14: Checkout Validation and Submission
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submission if already processing or already confirmed
    if (isSubmittingRef.current || isSubmitting || confirmedOrder !== null) {
      return;
    }

    const errors: ValidationError = {};

    // Business Rule 7: An empty cart must prevent checkout
    if (cart.length === 0) {
      errors.cart = 'Your shopping cart is empty. Please add at least one product before placing an order.';
    }

    // Business Rule 8: A blank or whitespace-only customer name must prevent checkout
    if (!customerName || customerName.trim().length === 0) {
      errors.customerName = 'Customer name is required to complete checkout.';
    }

    // Business Rule 9 & 10: Validation errors must be visible, and failures must preserve existing inputs
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Lock submission synchronously via mutex ref
    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setValidationErrors({});

    // Simulate safe order transaction processing (150ms for realistic UI response)
    setTimeout(() => {
      const orderRef = generateOrderReference();
      const currentOrder: OrderDetails = {
        orderReference: orderRef,
        customerName: customerName.trim(),
        items: [...cart],
        totalInPaise: orderTotalInPaise,
        totalFormatted: formatCurrency(orderTotalInPaise),
        createdAt: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      // Set confirmed order (Business Rule 11 & 13)
      setConfirmedOrder(currentOrder);
      setCart([]);
      setCustomerName('');
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }, 150);
  };

  // Reset to clean application state for a new order
  const handleResetOrder = () => {
    setCart([]);
    setCustomerName('');
    setValidationErrors({});
    setIsSubmitting(false);
    isSubmittingRef.current = false;
    setConfirmedOrder(null);
  };

  return (
    <div className="checkoutguard-app">
      <Header totalItemCount={totalQuantity} />

      <main className="app-main-content">
        <div className="main-container">
          {confirmedOrder ? (
            /* Single Order Confirmation (Business Rule 12 & 13) */
            <OrderConfirmation
              order={confirmedOrder}
              onResetOrder={handleResetOrder}
            />
          ) : (
            <div className="checkout-workflow-grid">
              <div className="catalog-and-cart-column">
                <ProductList
                  products={SYNTHETIC_PRODUCTS}
                  onAddToCart={handleAddToCart}
                  disabled={isSubmitting}
                />

                <Cart
                  items={cart}
                  orderTotalInPaise={orderTotalInPaise}
                  totalQuantity={totalQuantity}
                  onIncreaseQuantity={handleIncreaseQuantity}
                  onDecreaseQuantity={handleDecreaseQuantity}
                  onRemoveItem={handleRemoveItem}
                  cartError={validationErrors.cart}
                  disabled={isSubmitting}
                />
              </div>

              <aside className="checkout-summary-column">
                <CustomerForm
                  customerName={customerName}
                  onCustomerNameChange={handleCustomerNameChange}
                  onSubmit={handlePlaceOrder}
                  nameError={validationErrors.customerName}
                  isSubmitting={isSubmitting}
                  orderTotalInPaise={orderTotalInPaise}
                />
              </aside>
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-container">
          <p className="footer-copyright">
            © {new Date().getFullYear()} CheckoutGuard. Built for FyndHacks SDET Intern Hackathon.
          </p>
          <div className="footer-links">
            <span className="footer-chip">100% Client-Side Local State</span>
            <span className="footer-chip">Integer-Safe Paise Math</span>
            <span className="footer-chip">Playwright Automated Testing</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
