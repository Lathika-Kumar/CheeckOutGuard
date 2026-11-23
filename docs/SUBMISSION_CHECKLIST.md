# FyndHacks Hackathon Submission Checklist & Overview

**Project Name:** CheckoutGuard – Smart Checkout Validation & Browser Testing Suite  
**Tagline:** Reliable checkout. Accurate totals. Automated quality assurance.  
**Track:** FyndHacks SDET Intern Hackathon  
**Candidate / Git Profile:** [Lathika-Kumar](https://github.com/Lathika-Kumar)  
**Submission Date:** 2026-11-23  

---

## 1. Project Overview

**CheckoutGuard** is an e-commerce checkout application and browser test automation suite engineered with strict client-side reliability guards. Designed to eliminate floating-point currency drift, duplicate orders, and validation data loss, CheckoutGuard demonstrates end-to-end SDET principles from frontend architecture to Playwright test automation.

---

## 2. Problem Statement

Commercial checkout workflows frequently suffer from severe revenue-impacting defects:
1. **Floating-point rounding anomalies:** JavaScript IEEE 754 precision issues ($0.1 + 0.2 \neq 0.3$) introduce fractional currency errors.
2. **Duplicate order placement:** Double-clicking "Place Order" or rapid tap events trigger concurrent requests resulting in duplicate charges and orders.
3. **Validation input loss:** Ill-designed checkout forms clear the customer's inputs or empty their shopping cart when a single validation check fails.
4. **Desynchronized totals:** Disconnected state variables create discrepancies between individual item subtotals and overall order amounts.

---

## 3. The Solution

CheckoutGuard addresses these issues at both the architecture and test automation layers:
* **Paise Currency Engine:** Maintains monetary amounts in integer paise ($1\text{ INR} = 100\text{ paise}$), completely avoiding floating-point drift.
* **Synchronous Mutex Lock:** Employs an instant `isSubmittingRef` lock alongside React state to reject concurrent clicks prior to DOM rerenders.
* **Functional Derived State:** Cart counts, line totals, and order totals are derived from the cart array using `useMemo`, making state desynchronization impossible.
* **Persistent Form State:** Validation errors preserve both cart contents and user input for immediate correction.
* **Automated Quality Gates:** Comprehensive Playwright test suite validating happy path, missing fields, dynamic subtotal calculations, empty cart guards, and rapid click idempotency.

---

## 4. Implemented Features

- **Synthetic Product Catalog:**
  - Wireless Headphones (₹1,500) – *Premium wireless audio experience.*
  - Smart Watch (₹2,000) – *Smart everyday fitness companion.*
  - Self-contained CSS vector illustrations (no external image CDN or API dependencies).
- **Cart Management:**
  - Add to cart increments quantity for existing items.
  - Quantity controls with lower bound enforcement (minimum 1; cannot drop to 0 or negative via controls).
  - Individual item removal with immediate recalculation.
  - Real-time line item total display ($\text{Unit Price} \times \text{Quantity}$).
  - Live order total display ($\sum \text{Line Totals}$).
- **Customer Form & Validation:**
  - Accessible name field with semantic HTML and `aria-*` tags.
  - Real-time error dismissal upon typing.
  - Contextual error alerts for empty cart or blank customer name.
- **Idempotent Order Placement:**
  - Unique collision-resistant order reference generation (`CG-YYYYMMDD-XXXXX`).
  - Itemized receipt confirmation view with copy-to-clipboard functionality.
  - "Place Another Order" action that resets the application cleanly.

---

## 5. Technology Stack

- **Frontend:** React 18.3.1, TypeScript 5.6.3, Vite 6.4.6
- **Styling:** Modern CSS with custom design tokens & CSS product visuals
- **Icons:** Lucide React
- **Test Automation:** Playwright Test 1.49.0
- **Version Control:** Git
- **Hosting Target:** Vercel

---

## 6. Project Links & Placeholders

| Asset | Target Location |
| :--- | :--- |
| **GitHub Repository** | `https://github.com/Lathika-Kumar/CheckoutGuard` |
| **Live Demo URL** | `https://checkoutguard.vercel.app` *(Pending Vercel deployment link)* |
| **Demo Video URL** | `https://youtu.be/placeholder-demo-video` *(Pending 2–3 min Loom/YouTube link)* |

---

## 7. Automated Test Summary

The automated test suite is located in [`tests/checkout.spec.ts`](../tests/checkout.spec.ts) and verified across **Chromium**, **Firefox**, and **WebKit** (15/15 Passed):

| Test Case | Objective | Chromium | Firefox | WebKit |
| :--- | :--- | :---: | :---: | :---: |
| **TC01** | Successful checkout with valid inputs generates unique order reference | **PASS** (4.2s) | **PASS** (5.9s) | **PASS** (2.9s) |
| **TC02** | Missing required customer name blocks checkout and preserves cart state | **PASS** (1.1s) | **PASS** (3.6s) | **PASS** (4.1s) |
| **TC03** | Dynamic quantity controls calculate exact line totals and order totals | **PASS** (1.0s) | **PASS** (6.7s) | **PASS** (4.2s) |
| **MT01** | Empty cart checkout is blocked with an explicit error message | **PASS** (4.4s) | **PASS** (3.5s) | **PASS** (3.6s) |
| **MT02** | Rapid double-click on Place Order prevents duplicate order submissions | **PASS** (1.2s) | **PASS** (5.6s) | **PASS** (4.1s) |
| **Overall** | **15 Tests Executed Across 3 Browsers** | **100% PASS** | **100% PASS** | **100% PASS** |

* **Playwright HTML Report:** `playwright-report/index.html` (viewable via `npm run test:report`).
* **Visual Screenshots:** Cataloged in `docs/screenshots/`.

---

## 8. Manual Test Summary

* **MT01 (Empty Cart Guard):** Attempting to check out with 0 items displays a clear warning banner and blocks submission while preserving customer input. (Status: **PASS**)
* **MT02 (Rapid Double-Click Idempotency):** Firing consecutive clicks within 10ms engages the mutex lock, enters loading state, and generates exactly 1 order confirmation. (Status: **PASS**)

---

## 9. Known Limitations & Scope Boundaries

1. **Client-Side State:** By design, state is maintained in-memory without a backend database or persistent session cookies.
2. **Fixed Synthetic Dataset:** Exactly two synthetic items are provided to maintain deterministic testing conditions.
3. **Simulated Transaction:** Order processing uses a realistic 150ms client simulation rather than external payment gateways.

---

## 10. Final Submission Checklist

- [x] Application functional and runs locally without console errors
- [x] Pure integer paise arithmetic implemented
- [x] Input and cart contents preserved during validation failures
- [x] Double-click protection active with synchronous mutex
- [x] Exactly one order confirmation rendered per checkout
- [x] Playwright test suite passes completely
- [x] Playwright HTML report generated
- [x] Visual evidence screenshots captured
- [x] Comprehensive `README.md` complete with runnable commands
- [x] `docs/TEST_PLAN.md` documented
- [x] `docs/TEST_RESULTS.md` documented
- [x] `vercel.json` configured for production SPA deployment
- [x] `docs/DEMO_VIDEO_SCRIPT.md` prepared
- [x] `docs/FINAL_RELEASE_REPORT.md` prepared
- [ ] Push repository to GitHub (`git push -u origin master`)
- [ ] Connect repository to Vercel and paste live URL
- [ ] Record 2-3 minute demo video following the script and paste video link
