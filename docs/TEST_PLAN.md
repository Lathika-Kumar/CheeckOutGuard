# CheckoutGuard – Test Plan & Strategy Document

**Project:** CheckoutGuard – Smart Checkout Validation & Browser Testing Suite  
**Role:** Senior Full-Stack Developer & Software Development Engineer in Test (SDET)  
**Hackathon:** FyndHacks SDET Intern Hackathon  
**Target Environment:** Local Browser (Chromium / WebKit / Firefox)  
**Framework:** Playwright Test (TypeScript), React 18, Vite  

---

## 1. Test Strategy & Objectives

The primary objective of this quality assurance suite is to guarantee complete end-to-end checkout reliability for the CheckoutGuard single-page application. The system operates strictly with client-side state without external API dependencies, necessitating deterministic validation of:

1. **State Consistency:** Instant, synchronous cart updates upon adding, modifying, or removing items.
2. **Mathematical Correctness:** Strict integer-based currency arithmetic (in paise) preventing floating-point rounding errors across line subtotals and overall order totals.
3. **Checkout Validation Guards:** Immediate enforcement of preconditions before order submission (non-empty cart, non-empty customer name).
4. **Idempotency & Race Protection:** Protection against double-click submissions, preventing duplicate order records and duplicate confirmation states.
5. **State Preservation:** Guaranteeing that failed validation attempts preserve customer inputs and cart contents.

---

## 2. Test Environment & Scope

| Component | Specification |
| :--- | :--- |
| **Application Runtime** | Node.js v24.17.0, React 18.3.1, TypeScript 5.6.3, Vite 6.4.6 |
| **Automation Framework** | Playwright Test v1.49.0 |
| **Execution Browser** | Chromium Headless & Headed |
| **Base URL** | `http://localhost:5173` |
| **Monetary Base** | Integer Paise ($1\text{ INR} = 100\text{ paise}$) |

---

## 3. Test Matrix Overview

| Identifier | Test Type | Category | Description | Execution Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC01** | Automated | Happy Path | Successful checkout with valid inputs generates unique order reference | **PASS** |
| **TC02** | Automated | Validation | Missing required customer name blocks checkout and preserves cart state | **PASS** |
| **TC03** | Automated | Calculation | Dynamic quantity controls calculate exact line totals and order totals | **PASS** |
| **MT01** | Manual / Automated | Boundary / Guard | Empty cart checkout attempt is blocked with clear user feedback | **PASS** |
| **MT02** | Manual / Automated | Concurrency | Rapid double-click on Place Order prevents duplicate order submissions | **PASS** |

---

## 4. Automated Test Specifications

### TC01: Successful Checkout with Valid Inputs
* **Test ID:** `TC01`
* **Test File:** `tests/checkout.spec.ts`
* **Objective:** Verify that a customer can add a product, provide valid customer information, submit the order, and receive exactly one verified order confirmation with a unique reference number.
* **Preconditions:** Fresh application instance, cart empty.
* **Steps:**
  1. Navigate to `/`.
  2. Verify clean initial state (`cart count: 0`, empty placeholder visible).
  3. Click `Add to Cart` for "Wireless Headphones" (₹1,500).
  4. Fill input `Customer Name` with `"Lathika"`.
  5. Click `Place Order`.
  6. Assert order confirmation section appears.
  7. Assert order reference format matches `CG-YYYYMMDD-XXXXX`.
  8. Assert customer name, ordered item, and final total (`₹1,500`) are rendered accurately.
  9. Assert exactly one order confirmation container is displayed.
* **Expected Result:** Order is successfully placed, a unique order reference is generated, cart is reset, and exactly one order confirmation is rendered.
* **Status:** **PASS** (Execution time: 1.2s)
* **Evidence:** `docs/screenshots/TC01_successful_checkout.png`

---

### TC02: Missing Required Customer Name
* **Test ID:** `TC02`
* **Test File:** `tests/checkout.spec.ts`
* **Objective:** Ensure checkout is blocked when the required customer name field is blank or whitespace, while preserving cart state.
* **Preconditions:** Clean application state.
* **Steps:**
  1. Navigate to `/`.
  2. Click `Add to Cart` for "Wireless Headphones".
  3. Leave `Customer Name` field empty.
  4. Click `Place Order`.
  5. Assert required-field validation error is visible with message `"Customer name is required to complete checkout."`.
  6. Assert no order confirmation is displayed.
  7. Assert the product remains in the cart with quantity `1` and line total `₹1,500`.
* **Expected Result:** Form validation prevents submission, displays clear accessible error message, cart remains intact.
* **Status:** **PASS** (Execution time: 919ms)
* **Evidence:** `docs/screenshots/TC02_missing_customer_name.png`

---

### TC03: Dynamic Quantity Controls and Exact Total Calculation
* **Test ID:** `TC03`
* **Test File:** `tests/checkout.spec.ts`
* **Objective:** Verify that increasing item quantities recalculates line totals and overall order total without floating-point errors.
* **Preconditions:** Clean application state.
* **Steps:**
  1. Navigate to `/`.
  2. Click `Add to Cart` for "Wireless Headphones" (₹1,500).
  3. Click the `+` button to increase quantity to `2`.
  4. Assert line total for Wireless Headphones displays `₹3,000`.
  5. Assert order total displays `₹3,000`.
  6. Click `Add to Cart` for "Smart Watch" (₹2,000).
  7. Assert line total for Smart Watch displays `₹2,000`.
  8. Assert order total displays `₹5,000` ($₹3,000 + ₹2,000$).
* **Expected Result:** Quantities and subtotals compute synchronously and accurately at each step.
* **Status:** **PASS** (Execution time: 954ms)
* **Evidence:** `docs/screenshots/TC03_quantity_exact_total.png`

---

## 5. Manual Test Specifications & Executed Results

### MT01: Empty Cart Checkout Guard
* **Test ID:** `MT01`
* **Objective:** Ensure that checkout cannot proceed when the shopping cart is completely empty.
* **Preconditions:** Application opened in browser, cart contains 0 items.
* **Test Steps:**
  1. Open application in browser at `http://localhost:5173`.
  2. Verify cart displays empty placeholder `"Your cart is empty"`.
  3. In the Customer Information form, enter customer name `"Lathika"`.
  4. Click the `Place Order` button.
  5. Observe the validation reaction and UI response.
* **Expected Result:**
  - Submission is blocked.
  - A prominent error banner displays: `"Your shopping cart is empty. Please add at least one product before placing an order."`.
  - Customer name `"Lathika"` is preserved in the input box.
  - No order confirmation is generated.
* **Actual Result:**
  - Checkout was blocked immediately.
  - Cart error banner appeared above the empty cart placeholder.
  - Customer name was preserved.
  - No order confirmation appeared.
* **Pass/Fail Status:** **PASS**
* **Evidence:** `docs/screenshots/MT01_empty_cart_checkout.png`

---

### MT02: Rapid Double-Click Idempotency Protection
* **Test ID:** `MT02`
* **Objective:** Verify that rapid consecutive clicks or double-clicking `Place Order` cannot trigger duplicate order submissions or generate multiple order confirmations.
* **Preconditions:** Application opened, 1 product in cart, customer name entered.
* **Test Steps:**
  1. Open application at `http://localhost:5173`.
  2. Click `Add to Cart` for "Wireless Headphones".
  3. Enter customer name `"Lathika"`.
  4. Rapidly click the `Place Order` button twice in quick succession (< 50ms interval).
  5. Inspect the rendered DOM and verify whether duplicate requests or confirmations occurred.
* **Expected Result:**
  - Submission mutex locks upon first click.
  - Button switches to loading state (`Processing Order...`).
  - Exactly one order is created.
  - Exactly one unique order reference is displayed.
  - No duplicate confirmation cards appear in the DOM.
* **Actual Result:**
  - Synchronous `isSubmittingRef` mutex locked the handler instantaneously.
  - Only one order confirmation card was rendered (`toHaveCount(1)`).
  - Exactly one unique reference code `CG-20261123-1001NM5E` was generated.
* **Pass/Fail Status:** **PASS**
* **Evidence:** `docs/screenshots/MT02_rapid_double_click.png`

---

## 6. Defect Logging Policy

All identified deviations during automation or exploratory testing must be recorded with root cause analysis and severity rating. If zero defects are detected, an explicit clean certification is issued.
