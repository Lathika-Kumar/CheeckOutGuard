import { test, expect } from '@playwright/test';

test.describe('CheckoutGuard – Smart Checkout Validation Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Ensure every test starts with clean application state
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  /**
   * TEST CASE 1: Successful checkout
   * 
   * Steps:
   * 1. Navigate to the checkout application.
   * 2. Start with a clean application state.
   * 3. Add Wireless Headphones.
   * 4. Enter customer name: Lathika.
   * 5. Click Place Order.
   * 6. Verify that the success confirmation appears.
   * 7. Verify that an order reference is visible.
   * 8. Verify that the customer receives exactly one confirmation.
   */
  test('TEST CASE 1: Successful checkout with valid inputs generates unique order reference', async ({ page }) => {
    // 1 & 2: Start with clean application state
    await expect(page.getByTestId('empty-cart-placeholder')).toBeVisible();
    await expect(page.getByTestId('header-cart-count')).toContainText('0');

    // 3: Add Wireless Headphones
    const addHeadphonesBtn = page.getByTestId('add-to-cart-wireless-headphones');
    await expect(addHeadphonesBtn).toBeVisible();
    await addHeadphonesBtn.click();

    // Verify item is added to cart
    await expect(page.getByTestId('cart-item-wireless-headphones')).toBeVisible();
    await expect(page.getByTestId('header-cart-count')).toContainText('1');

    // 4: Enter customer name: Lathika
    const customerNameInput = page.getByLabel(/Customer Name/i);
    await customerNameInput.fill('Lathika');
    await expect(customerNameInput).toHaveValue('Lathika');

    // 5: Click Place Order
    const placeOrderBtn = page.getByRole('button', { name: /Place Order/i });
    await expect(placeOrderBtn).toBeEnabled();
    await placeOrderBtn.click();

    // 6: Verify that the success confirmation appears
    const confirmationSection = page.getByTestId('order-confirmation');
    await expect(confirmationSection).toBeVisible();
    await expect(page.getByTestId('order-success-message')).toHaveText('Order placed successfully!');

    // 7: Verify that an order reference is visible
    const orderReference = page.getByTestId('order-reference');
    await expect(orderReference).toBeVisible();
    await expect(orderReference).toContainText('CG-');

    // Additional customer-facing assertions
    await expect(page.getByTestId('order-customer-name')).toHaveText('Lathika');
    await expect(page.getByTestId('confirmed-item-name-wireless-headphones')).toHaveText('Wireless Headphones');
    await expect(page.getByTestId('order-final-total')).toHaveText('₹1,500');

    // 8: Verify that the customer receives exactly one confirmation
    await expect(page.getByTestId('order-confirmation')).toHaveCount(1);
    await expect(page.getByTestId('order-success-message')).toHaveCount(1);

    // Capture visual proof for documentation evidence
    await page.screenshot({ path: 'docs/screenshots/TC01_successful_checkout.png', fullPage: true });
  });

  /**
   * TEST CASE 2: Missing required customer name
   * 
   * Steps:
   * 1. Navigate to the application with a clean state.
   * 2. Add at least one product.
   * 3. Leave the customer name blank.
   * 4. Click Place Order.
   * 5. Verify that the required-field validation message appears.
   * 6. Verify that no order confirmation appears.
   * 7. Verify that the product remains in the cart.
   */
  test('TEST CASE 2: Missing required customer name blocks checkout and preserves cart state', async ({ page }) => {
    // 1: Verify clean state
    await expect(page.getByTestId('empty-cart-placeholder')).toBeVisible();

    // 2: Add at least one product (Wireless Headphones)
    await page.getByTestId('add-to-cart-wireless-headphones').click();
    await expect(page.getByTestId('cart-item-wireless-headphones')).toBeVisible();

    // 3: Leave customer name blank
    const customerNameInput = page.getByLabel(/Customer Name/i);
    await expect(customerNameInput).toHaveValue('');

    // 4: Click Place Order
    const placeOrderBtn = page.getByRole('button', { name: /Place Order/i });
    await placeOrderBtn.click();

    // 5: Verify that the required-field validation message appears
    const nameError = page.getByTestId('customer-name-error');
    await expect(nameError).toBeVisible();
    await expect(nameError).toContainText('Customer name is required');

    // 6: Verify that no order confirmation appears
    await expect(page.getByTestId('order-confirmation')).toHaveCount(0);
    await expect(page.getByTestId('order-confirmation')).not.toBeVisible();

    // 7: Verify that the product remains in the cart
    await expect(page.getByTestId('cart-item-wireless-headphones')).toBeVisible();
    await expect(page.getByTestId('quantity-value-wireless-headphones')).toHaveText('1');
    await expect(page.getByTestId('order-total')).toHaveText('₹1,500');

    // Capture visual proof for documentation evidence
    await page.screenshot({ path: 'docs/screenshots/TC02_missing_customer_name.png', fullPage: true });
  });

  /**
   * TEST CASE 3: Quantity and exact total calculation
   * 
   * Steps:
   * 1. Navigate to the application with a clean state.
   * 2. Add Wireless Headphones.
   * 3. Increase the quantity to 2.
   * 4. Verify that the line total displays ₹3,000.
   * 5. Verify that the order total displays ₹3,000.
   * 6. Add Smart Watch.
   * 7. Verify that the order total displays ₹5,000.
   */
  test('TEST CASE 3: Dynamic quantity controls calculate exact line totals and order totals', async ({ page }) => {
    // 1: Start with clean application state
    await expect(page.getByTestId('empty-cart-placeholder')).toBeVisible();

    // 2: Add Wireless Headphones (₹1,500)
    await page.getByTestId('add-to-cart-wireless-headphones').click();
    await expect(page.getByTestId('cart-item-wireless-headphones')).toBeVisible();
    await expect(page.getByTestId('quantity-value-wireless-headphones')).toHaveText('1');
    await expect(page.getByTestId('line-total-wireless-headphones')).toHaveText('₹1,500');

    // 3: Increase the quantity to 2
    const increaseBtn = page.getByTestId('quantity-increase-wireless-headphones');
    await increaseBtn.click();
    await expect(page.getByTestId('quantity-value-wireless-headphones')).toHaveText('2');

    // 4: Verify that the line total displays ₹3,000
    await expect(page.getByTestId('line-total-wireless-headphones')).toHaveText('₹3,000');

    // 5: Verify that the order total displays ₹3,000
    await expect(page.getByTestId('order-total')).toHaveText('₹3,000');

    // 6: Add Smart Watch (₹2,000)
    await page.getByTestId('add-to-cart-smart-watch').click();
    await expect(page.getByTestId('cart-item-smart-watch')).toBeVisible();
    await expect(page.getByTestId('line-total-smart-watch')).toHaveText('₹2,000');

    // 7: Verify that the order total displays ₹5,000 (₹3,000 + ₹2,000)
    await expect(page.getByTestId('order-total')).toHaveText('₹5,000');

    // Capture visual proof for documentation evidence
    await page.screenshot({ path: 'docs/screenshots/TC03_quantity_exact_total.png', fullPage: true });
  });

  /**
   * AUTOMATED VERIFICATION OF MANUAL SCENARIOS:
   * MT01: Empty cart checkout blocked
   */
  test('MT01: Empty cart checkout is blocked with an explicit error message', async ({ page }) => {
    // 1 & 2: Cart is empty
    await expect(page.getByTestId('empty-cart-placeholder')).toBeVisible();
    await page.getByLabel(/Customer Name/i).fill('Lathika');

    // 3: Click Place Order
    await page.getByRole('button', { name: /Place Order/i }).click();

    // 4 & 5: Verify checkout blocked, cart error displayed, no confirmation
    const cartError = page.getByTestId('cart-error');
    await expect(cartError).toBeVisible();
    await expect(cartError).toContainText('Your shopping cart is empty');
    await expect(page.getByTestId('order-confirmation')).toHaveCount(0);

    // Capture visual evidence
    await page.screenshot({ path: 'docs/screenshots/MT01_empty_cart_checkout.png', fullPage: true });
  });

  /**
   * AUTOMATED VERIFICATION OF MANUAL SCENARIOS:
   * MT02: Rapid double-click prevents duplicate submission
   */
  test('MT02: Rapid double-click on Place Order prevents duplicate order submissions', async ({ page }) => {
    // 1 & 2: Add product and enter name
    await page.getByTestId('add-to-cart-wireless-headphones').click();
    await page.getByLabel(/Customer Name/i).fill('Lathika');

    const placeOrderBtn = page.getByRole('button', { name: /Place Order/i });

    // 3: Rapidly dispatch repeated click events
    await Promise.all([
      placeOrderBtn.click(),
      placeOrderBtn.click({ delay: 10 }).catch(() => {})
    ]);

    // 4 & 5: Verify only one order is processed with exactly one confirmation
    await expect(page.getByTestId('order-confirmation')).toBeVisible();
    await expect(page.getByTestId('order-confirmation')).toHaveCount(1);
    await expect(page.getByTestId('order-reference')).toHaveCount(1);
    await expect(page.getByTestId('order-success-message')).toHaveCount(1);

    // Capture visual evidence
    await page.screenshot({ path: 'docs/screenshots/MT02_rapid_double_click.png', fullPage: true });
  });

});
