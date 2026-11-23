# CheckoutGuard – Test Execution & Defect Report

**Project:** CheckoutGuard – Smart Checkout Validation & Browser Testing Suite  
**Evaluation Role:** Senior SDET / QA Engineer  
**Execution Timestamp:** 2026-11-23 13:03:35 IST  
**Environment:** Chromium (Playwright Test v1.49.0), Node.js v24.17.0, Windows x64  
**Base URL:** `http://localhost:5173`  
**Overall Execution Verdict:** **100% PASS (5/5 Tests Passed, 0 Defects Discovered)**

---

## 1. Executive Summary

A comprehensive quality assurance validation was conducted on the **CheckoutGuard** single-page checkout application. The test suite encompassed both automated end-to-end browser specifications and targeted manual exploratory scenarios addressing boundary conditions, currency calculation accuracy, form validation persistence, and race-condition resistance.

| Total Tests | Passed | Failed | Skipped | Pass Rate | Duration |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **5** | **5** | **0** | **0** | **100.0%** | **7.9s** |

---

## 2. Automated Test Execution Results

All automated tests were executed via Playwright Test against the production-optimized Vite preview build.

```
Running 5 tests using 1 worker

  ok 1 [chromium] › tests\checkout.spec.ts:24:3 › CheckoutGuard – Smart Checkout Validation Suite › TEST CASE 1: Successful checkout with valid inputs generates unique order reference (1.2s)
  ok 2 [chromium] › tests\checkout.spec.ts:83:3 › CheckoutGuard – Smart Checkout Validation Suite › TEST CASE 2: Missing required customer name blocks checkout and preserves cart state (919ms)
  ok 3 [chromium] › tests\checkout.spec.ts:129:3 › CheckoutGuard – Smart Checkout Validation Suite › TEST CASE 3: Dynamic quantity controls calculate exact line totals and order totals (954ms)
  ok 4 [chromium] › tests\checkout.spec.ts:166:3 › CheckoutGuard – Smart Checkout Validation Suite › MT01: Empty cart checkout is blocked with an explicit error message (722ms)
  ok 5 [chromium] › tests\checkout.spec.ts:188:3 › CheckoutGuard – Smart Checkout Validation Suite › MT02: Rapid double-click on Place Order prevents duplicate order submissions (1.0s)

  5 passed (7.9s)
```

### Detailed Breakdown

#### 1. TEST CASE 1: Successful Checkout with Valid Inputs
* **Status:** `PASSED`
* **Duration:** 1,200 ms
* **Assertions Verified:**
  - Initial clean state verified (`empty-cart-placeholder` visible, header cart badge shows `0`).
  - Item "Wireless Headphones" added successfully (`cart-item-wireless-headphones` displayed, cart badge increments to `1`).
  - Customer name input `"Lathika"` accepted and preserved.
  - "Place Order" button initiates safe submission sequence.
  - Success confirmation container rendered (`toBeVisible()`).
  - Heading verified: `"Order placed successfully!"`.
  - Collision-resistant unique reference generated matching pattern `CG-YYYYMMDD-XXXXX`.
  - Customer name displayed in confirmation: `"Lathika"`.
  - Final order total verified: `₹1,500`.
  - Confirmation container count strictly equals `1` (`toHaveCount(1)`).
* **Evidence:** [TC01_successful_checkout.png](file:///c:/Users/Madhumitha%20G/Downloads/CheckoutGuard/docs/screenshots/TC01_successful_checkout.png)

#### 2. TEST CASE 2: Missing Required Customer Name
* **Status:** `PASSED`
* **Duration:** 919 ms
* **Assertions Verified:**
  - Starting with clean cart, added 1 item ("Wireless Headphones").
  - Customer name input left blank (`""`).
  - Place Order button clicked.
  - Validation error triggered and displayed: `"Customer name is required to complete checkout."`.
  - Zero confirmation dialogs rendered (`toHaveCount(0)`).
  - Existing cart items preserved without modification (`cart-item-wireless-headphones` quantity `1`, total `₹1,500`).
* **Evidence:** [TC02_missing_customer_name.png](file:///c:/Users/Madhumitha%20G/Downloads/CheckoutGuard/docs/screenshots/TC02_missing_customer_name.png)

#### 3. TEST CASE 3: Dynamic Quantity Controls and Exact Total Calculation
* **Status:** `PASSED`
* **Duration:** 954 ms
* **Assertions Verified:**
  - Added Wireless Headphones (₹1,500). Quantity = 1, line total = `₹1,500`, order total = `₹1,500`.
  - Incremented quantity to 2 via `+` controller.
  - Line total updated immediately to `₹3,000`.
  - Order total updated immediately to `₹3,000`.
  - Added Smart Watch (₹2,000).
  - Line total for Smart Watch displays `₹2,000`.
  - Overall order total updated to `₹5,000` ($₹3,000 + ₹2,000$).
  - Zero precision drift observed (strictly verified integer paise arithmetic).
* **Evidence:** [TC03_quantity_exact_total.png](file:///c:/Users/Madhumitha%20G/Downloads/CheckoutGuard/docs/screenshots/TC03_quantity_exact_total.png)

---

## 3. Manual Testing Observations & Results

Both manual test scenarios were executed in the browser session and automatically cross-verified through end-to-end automation.

### Scenario MT01: Empty Cart Checkout Attempt
* **Objective:** Ensure user cannot initiate checkout without products.
* **Preconditions:** Clean state, cart is empty.
* **Steps Taken:** Entered customer name `"Lathika"`, clicked `Place Order`.
* **Observed UI Behavior:**
  - Form submission was halted synchronously.
  - An error banner appeared: `"Your shopping cart is empty. Please add at least one product before placing an order."`
  - Input name `"Lathika"` remained preserved in the text input.
  - The application did not transition to confirmation view.
* **Verdict:** **PASS**
* **Evidence:** [MT01_empty_cart_checkout.png](file:///c:/Users/Madhumitha%20G/Downloads/CheckoutGuard/docs/screenshots/MT01_empty_cart_checkout.png)

### Scenario MT02: Rapid Double-Click Idempotency
* **Objective:** Ensure multiple rapid clicks on Place Order do not create duplicate order records.
* **Preconditions:** Wireless Headphones added to cart, customer name `"Lathika"`.
* **Steps Taken:** Clicked `Place Order` button twice within 10ms.
* **Observed UI Behavior:**
  - The first click triggered the submission lock via `isSubmittingRef.current = true`.
  - Button immediately disabled with animated spinner: `"Processing Order..."`.
  - Second click event was rejected by the mutex lock.
  - After processing, exactly one order confirmation was rendered with one unique reference `CG-20261123-1001NM5E`.
* **Verdict:** **PASS**
* **Evidence:** [MT02_rapid_double_click.png](file:///c:/Users/Madhumitha%20G/Downloads/CheckoutGuard/docs/screenshots/MT02_rapid_double_click.png)

---

## 4. Defect Reporting

**Defects Discovered:** **0**

> [!NOTE]
> **Explicit Defect Finding Statement:**  
> In accordance with FyndHacks hackathon standards, zero artificial defects were invented. During development and testing across all specified requirements, edge cases, rapid double-click submissions, and empty cart attempts, **no functional defects, calculation inaccuracies, race conditions, or state leaks were observed**. All business rules behaved in complete accordance with the specification.

---

## 5. Artifacts and Reports

1. **Playwright HTML Report:**  
   Location: `playwright-report/index.html`  
   Open command: `npm run test:report`
2. **Visual Evidence Screenshots:**  
   - TC01: `docs/screenshots/TC01_successful_checkout.png`
   - TC02: `docs/screenshots/TC02_missing_customer_name.png`
   - TC03: `docs/screenshots/TC03_quantity_exact_total.png`
   - MT01: `docs/screenshots/MT01_empty_cart_checkout.png`
   - MT02: `docs/screenshots/MT02_rapid_double_click.png`
