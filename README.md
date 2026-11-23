# CheckoutGuard – Smart Checkout Validation & Browser Testing Suite

[![Playwright Tests](https://img.shields.io/badge/Playwright-5%20Passed-brightgreen.svg?logo=playwright)](tests/checkout.spec.ts)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20Mode-blue.svg?logo=typescript)](tsconfig.json)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg?logo=react)](package.json)
[![Vite](https://img.shields.io/badge/Vite-6.4.6-646CFF.svg?logo=vite)](vite.config.ts)
[![Hackathon](https://img.shields.io/badge/FyndHacks-SDET%20Intern-purple.svg)]()

> **CheckoutGuard** is a robust single-page e-commerce checkout application and browser test automation suite. Built specifically for the **FyndHacks SDET Intern Hackathon**, it demonstrates resilient front-end engineering, integer-based monetary precision, idempotent checkout protection, and exhaustive end-to-end browser automation with Playwright.

---

## 1. Project Overview

E-commerce checkout flows are notoriously prone to floating-point currency inaccuracies, duplicate order creation caused by impatient double-clicks, and state desynchronization between item carts and summary totals.

**CheckoutGuard** solves these problems by pairing a production-grade React client with a deterministic test automation suite that guards every step of the customer journey.

* **Tagline:** *Reliable checkout. Accurate totals. Automated quality assurance.*

---

## 2. Problem Statement

Modern checkout funnels often face subtle but critical failures:
1. **Floating-Point Drift:** JavaScript numbers ($0.1 + 0.2 \neq 0.3$) introduce subtle fraction-of-a-rupee discrepancies in order totals.
2. **Double Submission:** Rapid button clicks create duplicate charge authorizations and duplicate order records.
3. **Form State Loss:** Form validation errors frequently wipe the user's previously filled fields or empty their shopping cart.
4. **Desynchronized State:** Deriving totals through disconnected state variables causes discrepancies between item subtotals and overall payables.

---

## 3. The CheckoutGuard Solution

* **Integer-Based Paise Currency Engine:** All monetary values are maintained and computed in whole paise ($1\text{ INR} = 100\text{ paise}$) using pure integer arithmetic, completely eliminating floating-point rounding errors.
* **Synchronous Mutex & Idempotent Submission:** Employs a synchronous `isSubmittingRef` lock alongside React state to reject concurrent clicks before the browser can process a second submission event.
* **Derived Functional State:** Total items, line subtotals, and overall order totals are strictly derived from the cart array using `useMemo`, ensuring mathematical consistency.
* **Input & Cart Preservation:** When customer name or cart validation fails, inputs and cart contents remain completely intact.
* **End-to-End Automation with Playwright:** Five automated tests verify happy-path checkouts, missing field handling, multi-item subtotal math, empty-cart barriers, and rapid double-click idempotency.

---

## 4. Key Features

- **Synthetic Product Catalog:**
  - **Wireless Headphones:** ₹1,500 – *Premium wireless audio experience.*
  - **Smart Watch:** ₹2,000 – *Smart everyday fitness companion.*
  - Self-contained, CSS-rendered vector illustrations (no external image CDNs or APIs required).
- **Interactive Shopping Cart:**
  - Real-time line item subtotals: $\text{Line Total} = \text{Unit Price} \times \text{Quantity}$.
  - Order Total: $\sum \text{Line Totals}$.
  - Quantity bounds protection: cannot drop below 1 via controls.
  - One-click item removal with instant recalculation.
- **Accessible Customer Form:**
  - Full keyboard accessibility and WCAG-compliant `aria-*` tags.
  - Clear, contextual validation messages.
- **Idempotent Order Placement:**
  - Unique order reference generator (format: `CG-YYYYMMDD-XXXXX`).
  - Single order confirmation rendering with itemized breakdown and copy-to-clipboard functionality.

---

## 5. Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 18.3.1 | Component-based client architecture |
| **Language** | TypeScript 5.6.3 | Strict static type checking |
| **Bundler / Server** | Vite 6.4.6 | Lightning-fast development & production bundling |
| **Icons** | Lucide React | Crisp, accessible UI iconography |
| **Styling** | Modern CSS | Design tokens, flexbox/grid, CSS product visuals, responsive layout |
| **Testing Suite** | Playwright Test 1.49.0 | Automated end-to-end browser automation & reporting |
| **Version Control** | Git | Semantic commits and versioning |

---

## 6. Architecture & Folder Structure

```
CheckoutGuard/
├── docs/
│   ├── screenshots/              # Visual execution evidence
│   │   ├── TC01_successful_checkout.png
│   │   ├── TC02_missing_customer_name.png
│   │   ├── TC03_quantity_exact_total.png
│   │   ├── MT01_empty_cart_checkout.png
│   │   └── MT02_rapid_double_click.png
│   ├── TEST_PLAN.md              # Test strategy and test case specifications
│   └── TEST_RESULTS.md           # Execution summary and zero-defect report
├── playwright-report/            # Generated Playwright HTML report
├── src/
│   ├── components/
│   │   ├── Cart.tsx              # Shopping cart summary and item listing
│   │   ├── CartItem.tsx          # Item row with quantity buttons and line total
│   │   ├── CustomerForm.tsx      # Name input, validation feedback, submit button
│   │   ├── Header.tsx            # App branding, QA badge, cart counter
│   │   ├── OrderConfirmation.tsx # Success view, unique order ref, receipt breakdown
│   │   ├── ProductCard.tsx       # Individual product showcase with CSS visual
│   │   └── ProductList.tsx       # Product grid container
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces for Product, Cart, Order
│   ├── utils/
│   │   ├── currency.ts           # Safe integer arithmetic in paise & currency formatting
│   │   └── order.ts              # Product dataset & unique reference generator
│   ├── App.tsx                   # Master state container and business logic
│   ├── main.tsx                  # Application entry point
│   └── styles.css                # Polished design system and responsive styles
├── tests/
│   └── checkout.spec.ts          # Mandatory automated Playwright test suite
├── index.html                    # Root HTML document
├── package.json                  # Dependencies, scripts, and project metadata
├── playwright.config.ts          # Playwright test runner configuration
├── tsconfig.json                 # TypeScript strict compiler options
└── README.md                     # Comprehensive project documentation
```

---

## 7. Installation & Quick Start

### Prerequisites
- **Node.js:** v18.0.0 or higher (Tested on v24.17.0)
- **Git**

### Step 1: Clone or Navigate to the Workspace
```bash
cd "c:\Users\Madhumitha G\Downloads\CheckoutGuard"
```

### Step 2: Install Project Dependencies
```bash
npm install
```
*(On Windows PowerShell, use `npm.cmd install` if script execution is restricted).*

### Step 3: Install Playwright Chromium Browser
```bash
npx playwright install chromium
```
*(On Windows PowerShell, use `npx.cmd playwright install chromium`).*

### Step 4: Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 8. Executing Automated Tests

### Run All Playwright Tests in Headless Mode
```bash
npm test
```
*(Direct command: `npx playwright test`)*

### Run Tests in Interactive UI Mode
```bash
npm run test:ui
```

### Open the Generated Playwright HTML Report
```bash
npm run test:report
```

---

## 9. Automated Test Case Descriptions

The test suite in [`tests/checkout.spec.ts`](tests/checkout.spec.ts) contains 5 tests:

### TC01: Successful Checkout with Valid Inputs
1. Starts from a clean state (0 cart items).
2. Adds Wireless Headphones (₹1,500).
3. Enters customer name `"Lathika"`.
4. Clicks `Place Order`.
5. Asserts the order confirmation appears.
6. Asserts the order reference is visible and properly formatted (`CG-YYYYMMDD-XXXXX`).
7. Asserts customer receives exactly 1 confirmation (`toHaveCount(1)`).

### TC02: Missing Required Customer Name
1. Starts from clean state and adds a product.
2. Leaves customer name empty.
3. Clicks `Place Order`.
4. Asserts error message `"Customer name is required to complete checkout."` is displayed.
5. Asserts no order confirmation appears (`toHaveCount(0)`).
6. Asserts item remains in cart with quantity `1` and line total `₹1,500`.

### TC03: Dynamic Quantity Controls & Exact Total Calculation
1. Adds Wireless Headphones (₹1,500).
2. Increments quantity to `2`.
3. Asserts line total displays `₹3,000`.
4. Asserts order total displays `₹3,000`.
5. Adds Smart Watch (₹2,000).
6. Asserts order total displays `₹5,000` ($₹3,000 + ₹2,000$).

### MT01: Empty Cart Checkout Guard (Automated + Manual)
1. Cart is left empty.
2. Customer name `"Lathika"` is entered.
3. Clicks `Place Order`.
4. Asserts error message `"Your shopping cart is empty. Please add at least one product before placing an order."` appears.
5. Asserts checkout is blocked and input is preserved.

### MT02: Rapid Double-Click Idempotency (Automated + Manual)
1. Adds item and enters customer name `"Lathika"`.
2. Simultaneously dispatches two rapid clicks on `Place Order`.
3. Asserts synchronous mutex activates, button shows `"Processing Order..."`, and exactly one order confirmation is generated.

---

## 10. Manual Testing Instructions

To manually verify the application:

### Scenario MT01: Empty Cart Checkout
1. Launch app with `npm run preview` or `npm run dev` at `http://localhost:5173`.
2. Verify that the cart shows `"Your cart is empty"`.
3. In the Customer Information box, enter your name (e.g., `Lathika`).
4. Click `Place Order`.
5. **Expected Outcome:** The order is blocked, a red warning banner appears above the cart, the entered name is kept in the input, and no order confirmation is displayed.

### Scenario MT02: Rapid Double-Click
1. Click `Add to Cart` on Wireless Headphones.
2. Enter your name in the Customer Name field.
3. Rapidly double-click the `Place Order` button.
4. **Expected Outcome:** The button changes to `"Processing Order..."`, only one order is placed, and exactly one order reference and confirmation screen are rendered.

---

## 11. Test Results Summary

| Identifier | Test Case Name | Status | Duration |
| :---: | :--- | :---: | :---: |
| **TC01** | Successful checkout with valid inputs generates unique order reference | **PASS** | 1.2s |
| **TC02** | Missing required customer name blocks checkout and preserves cart state | **PASS** | 0.9s |
| **TC03** | Dynamic quantity controls calculate exact line totals and order totals | **PASS** | 1.0s |
| **MT01** | Empty cart checkout is blocked with an explicit error message | **PASS** | 0.7s |
| **MT02** | Rapid double-click on Place Order prevents duplicate order submissions | **PASS** | 1.0s |
| **Total** | **5 Tests Executed** | **100% PASS** | **7.9s** |

Visual evidence captured during test execution is cataloged in the [`docs/screenshots/`](docs/screenshots/) directory. Detailed reports are available in [`docs/TEST_RESULTS.md`](docs/TEST_RESULTS.md) and [`docs/TEST_PLAN.md`](docs/TEST_PLAN.md).

---

## 12. Known Limitations & Design Considerations

1. **Local In-Memory Persistence:** Per the project specification, no external backend or database is used. Cart and order data are held in browser memory and reset upon page reload or clicking *"Place Another Order"*.
2. **Fixed Synthetic Catalog:** The catalog is deliberately fixed to the two required synthetic items (Wireless Headphones & Smart Watch) to provide a deterministic, zero-network testbed.
3. **Synthetic Payment Flow:** Checkout verification completes locally via an asynchronous simulation ($150\text{ms}$) without real payment gateway interaction.

---

## 13. Author & Hackathon Attribution

* **Project:** CheckoutGuard – Smart Checkout Validation & Browser Testing Suite
* **Candidate / Git Profile:** [Lathika-Kumar](https://github.com/Lathika-Kumar)
* **Hackathon:** FyndHacks SDET Intern Hackathon
* **Built With:** React 18, TypeScript, Vite, Playwright Test
