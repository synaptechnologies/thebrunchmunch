# Brunch Munch — Web Ordering, Tracking & Dashboard

Summary
- Brunch Munch preserves your current WhatsApp checkout flow while adding reliable order capture, business insights, and an optional admin dashboard — all with minimal setup and no new hosting required.

Why this matters (short answer)
- WhatsApp is great for conversations, but it's not a business database. Our system captures structured orders (order id, timestamp, customer contact, address/GPS, items, totals, notes) and stores them in Google Sheets so the owner can search, filter, export, and act on real data. That structured data turns day-to-day orders into immediate, actionable business intelligence.

Who benefits and how
- Owner: See sales, reconcile payments, reduce errors, and avoid losing orders hidden in chat.
- Marketing: Identify top-selling items, seasonality, and repeat customers to run targeted promos.
- Operations: Track orders reliably for delivery, staffing, and inventory planning.

Immediate value vs. long-term value
- Immediate (days): every order is captured reliably; manual reconciliation and lost orders drop immediately. You gain a simple searchable order history.
- Mid-term (6 months): begin using order trends to improve menu, plan promotions, and reward repeat customers — boosting average order value and retention.
- Long-term (12+ months): a full-year of structured sales data enables confident decisions (best-sellers, seasonal promos, price changes). This allows you to scale revenue and stay competitive—if a competitor adopts data-driven offers and you don't, you risk losing market share.

Key use-cases (examples)
- Find your top 10 items this month and promote them in a Valentine special.
- Segment loyal customers and send them discounts for birthdays or repeat-order incentives.
- Export CSV to run payroll, tax reports, or feed analytics/AI tools for deeper insights.

How we keep WhatsApp (low friction)
- Customers still confirm orders via WhatsApp (same behavior). Behind the scenes we POST the structured order to Google Sheets using an Apps Script endpoint. The owner gets a searchable, auditable record while customers keep their normal chat flow.

Deliverables
- Starter — GHC 2,500
	- Deployable Google Apps Script endpoint that accepts order POSTs and appends rows to a Google Sheet (order id, timestamp, customer info, items JSON, subtotal, fees, totals, notes).
	- Client integration: `CheckoutModal` will POST to the Apps Script and then open WhatsApp for customer confirmation; the UI shows status if saving fails.
	- Deployment and handover docs: step-by-step Apps Script deploy instructions, how to set the secret token, and how to update `APPS_SCRIPT_URL` in the code.

- Premium — GHC 3,500
	- Everything in Starter, plus a simple static Admin Dashboard (orders list, filters by date/customer/status, view order details, CSV export).
	- One week of post-launch support for minor tweaks and help with the initial data checks.

Optional add-ons (priced separately)
- Custom reporting or monthly analytics package
- Automated marketing messages (WhatsApp templates) to loyal customers

Why this is a compelling, low-risk buy
- Low up-front cost and fast delivery — no monthly hosting required for core features (Google Sheets + Apps Script).
- Immediate operational savings (fewer lost orders, less reconciliation time) and growing strategic value as data accumulates.
- Easy to hand over: the client retains ownership of the Google Sheet and Apps Script; we provide clear deploy and admin instructions.

Suggested payment terms
- 50% upfront, 50% on delivery. Offer a small discount or staged payment if needed to close.

Objection handling (short responses you can use)
- "We already use WhatsApp": Great — we keep WhatsApp exactly as-is and add a searchable record behind the scenes.
- "It’s expensive": At GHC 2,500 the system pays for itself quickly by preventing lost orders and enabling promotions that increase repeat business.
- "We don't have time to learn new tools": The admin dashboard is optional; the Google Sheet is readable and we provide a one-page handover.

Next steps (recommended)
1) Approve Starter or Premium pricing.
2) I will produce the Apps Script code and exact deploy steps so the client can deploy to their Google account (we include a secret token for security).
3) Update `APPS_SCRIPT_URL` in `src/components/cart/CheckoutModal.jsx` and test with a real order.
4) If Premium chosen, deploy the Admin Dashboard and perform a final verification.

If you want, I can make a one-page PDF from this pitch and a 2-minute demo script you can use when pitching over WhatsApp or in person.

If this looks good, I will also prepare the Apps Script code and a short deploy checklist next.
