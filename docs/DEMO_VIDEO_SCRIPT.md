# CheckoutGuard – 2-3 Minute Hackathon Demo Video Script

**Target Duration:** 2 minutes 30 seconds  
**Speaker:** Lathika Kumar (SDET Candidate)  
**Tone:** Confident, structured, articulate, quality-engineering focused  
**Required Tools:** Screen recorder (OBS / Loom), browser at `http://localhost:5173`, terminal  

---

## Storyboard & Timeline

| Timestamp | Visual Action (Screen Recording) | Narration (Voiceover) |
| :---: | :--- | :--- |
| **0:00 – 0:20** | **App Header & Hero Section**<br>Display browser at `http://localhost:5173`. Cursor hovers over logo and tagline: *"Reliable checkout. Accurate totals. Automated quality assurance."* | *"Hello everyone! My name is Lathika Kumar, and this is CheckoutGuard—a smart e-commerce checkout validation and automated browser testing suite built for the FyndHacks SDET Intern Hackathon."* |
| **0:20 – 0:40** | **Problem Context & Products**<br>Scroll to the two synthetic products: Wireless Headphones (₹1,500) and Smart Watch (₹2,000). Show crisp CSS vector illustrations. | *"In real-world e-commerce, small flaws in checkout lead to lost revenue: floating-point currency drift, duplicate orders from impatient double-clicks, and frustrating form resets. CheckoutGuard was engineered from the ground up to solve these vulnerabilities with pure integer arithmetic and strict client-side reliability guards."* |
| **0:40 – 1:00** | **Product Addition & Exact Total Calculation**<br>Click `Add to Cart` on Wireless Headphones.<br>Click `+` button to increase quantity to 2.<br>Show line total updating to `₹3,000` and order total updating to `₹3,000`.<br>Click `Add to Cart` on Smart Watch.<br>Show order total updating to `₹5,000`. | *"Notice our dynamic cart calculation. When I add Wireless Headphones and increase the quantity to 2, the line total updates instantly to ₹3,000. Adding the Smart Watch immediately calculates our order total to exactly ₹5,000. All monetary math is handled strictly in integer paise—eliminating JavaScript floating-point rounding errors."* |
| **1:00 – 1:20** | **Quantity Bounds & Empty Cart Validation**<br>Click `-` on headphones down to 1 (show `-` disabled at 1).<br>Click `Remove` on both items to show empty cart.<br>Type `"Lathika"` in customer name.<br>Click `Place Order`.<br>Show red warning alert: *"Your shopping cart is empty..."* | *"Our quantity controls enforce strict bounds—the minus button disables at 1 so quantities never become zero or negative. Now, if I remove all items and attempt to check out, our guard blocks the order immediately with an accessible warning banner, while preserving my entered name in the form."* |
| **1:20 – 1:40** | **Missing Name Validation & Input Persistence**<br>Add Wireless Headphones back to the cart.<br>Clear the customer name input.<br>Click `Place Order`.<br>Show error: *"Customer name is required..."*<br>Show that headphones remain in the cart. | *"Next, let's test missing customer information. If a customer leaves their name blank and clicks Place Order, the submission is halted with a clear validation message. Crucially, the cart contents and subtotal are preserved without any data loss."* |
| **1:40 – 2:05** | **Double-Click Idempotency & Successful Checkout**<br>Type `"Lathika"` in Customer Name.<br>Rapidly double-click `Place Order`.<br>Highlight loading spinner (`Processing Order...`) and show the single order confirmation. | *"Now for one of our strongest reliability features: rapid double-click defense. When I rapidly double-click Place Order, our synchronous mutex locks the handler instantly. The button enters a loading state, and the application generates exactly one order confirmation. Here is our collision-resistant order reference, customer verification, item breakdown, and a copy-to-clipboard button."* |
| **2:05 – 2:25** | **Playwright Test Suite & HTML Report**<br>Switch window to Terminal and run `npm test`.<br>Show all 5 tests passing in ~8 seconds.<br>Open the Playwright HTML report in browser. | *"As an SDET, comprehensive automation is essential. In the terminal, running our Playwright suite executes 5 end-to-end tests covering happy paths, missing field validation, multi-item calculation, empty cart guards, and double-click race conditions. All 5 tests pass with zero flakiness in under 8 seconds."* |
| **2:25 – 2:30** | **Closing Summary**<br>Return to browser view showing CheckoutGuard logo and summary badge. | *"CheckoutGuard delivers a resilient frontend coupled with deterministic test automation. Thank you for watching, and I look forward to your feedback!"* |

---

## Recording Tips for the Candidate

1. **Resolution:** Record at standard 1080p (1920x1080) for sharp text clarity.
2. **Cursor Highlighting:** Enable mouse click rings or cursor smoothing in Loom/OBS.
3. **Pacing:** Keep speech deliberate and clear; allow 1 second pause between clicking and speaking to let the audience observe UI transitions.
4. **Clean Workspace:** Close unnecessary background tabs and terminal windows.
