## Go-Live Fixes (7 changes)

Scope is strictly the items below — no design, navigation, or layout changes elsewhere.

### 1. Hide therapist profiles section
**File:** `src/pages/MentalHealth.tsx`
- Wrap the "Professionals" section (lines 378–418) with `{false && (...)}` so the code is preserved but never rendered.
- Also remove the provider selector requirement from the booking form is **out of scope** — leave it (booking flow is being replaced with mailto in step 3).

### 2. Wire all three forms to Formspree → nigel@worldchangersmh.org
Use endpoint `https://formspree.io/f/xwkgpnqb` for all three. POST as JSON with `Accept: application/json`. On success show inline confirmation + sonner toast; on failure show error toast.

- **Contact form** (`src/pages/Contact.tsx`): replace the Supabase insert in `handleSubmit` with a `fetch` to Formspree. Keep existing success-screen UI.
- **Newsletter form** (`src/pages/Contact.tsx`): replace the Supabase insert in `handleNewsletterSubmit` with a Formspree fetch (include `_subject: "Newsletter signup"`). Keep existing success UI.
- **Volunteer form** (`src/pages/Volunteers.tsx`): add controlled state (name, email, motivation), replace the stub `onSubmit` with a Formspree fetch (include `_subject: "Volunteer application"`), add loading state and error toast. Keep existing "Thank You!" success screen.

### 3. Replace booking calendar with mailto
**File:** `src/pages/MentalHealth.tsx`
- Replace the "Open Booking Calendar" button (line 229–231) with an `<a>` styled like the Button pointing to `mailto:nigel@worldchangersmh.org?subject=Booking%20Request`.
- Remove (or simply stop rendering) the modal booking section (lines 237–376) since it's no longer reachable. Keep the code but wrap in `{false && (...)}` for easy restore.

### 4. Replace event ticket button with mailto
**File:** `src/pages/Events.tsx`
- Replace the "Get Tickets" Button (lines ~131–134) with an `<a>` to `mailto:nigel@worldchangersmh.org?subject=Event%20Ticket%20Enquiry%20-%20<event title>` styled identically.
- Remove the `TicketBookingDialog` import/usage and the `selectedEvent`/`dialogOpen` state (dead after the swap).

### 5. Remove non-WCMHCO products from the shop
Products are pulled live from Shopify. Two-part approach:
- **Frontend safety net**: in `src/pages/Shop.tsx`, add a denylist filter (smartwatch, label printer, baby carrier, and any other non-branded keywords detected) applied to the products array before render, so even if a product slips through Shopify it's not displayed.
- **Source cleanup**: connect Shopify, list all products, identify the non-WCMHCO ones, and delete them from the store. (Will need `shopify--connect_shopify_account` first; then `shopify--list_products` and `shopify--delete_product` for each offending item, with your confirmation before deleting.)

### 6. Populate the Policies page
**File:** `src/pages/Policies.tsx`
- Add a new section (above existing "Governance" grid, or replacing the placeholder feel) containing three clean cards/blocks:
  - **Privacy Policy** — WCMHCO collects only the information necessary to deliver its services (e.g. contact details for enquiries, bookings, donations and volunteer applications). We do not sell, rent or share personal data with third parties for marketing. Data is stored securely and retained only as long as needed.
  - **Refund Policy** — All donations made to WCMHCO are non-refundable. For event tickets or merchandise purchases, please contact info@worldchangersmh.org within 7 days for assistance.
  - **Cookie Policy** — This site uses essential cookies to keep the site functioning and minimal analytics cookies to understand how visitors use it. No personal advertising profiles are built. You can disable cookies in your browser settings.
- Keep current styling/tokens; use existing `SectionHeading` + card pattern. No layout overhaul.

### 7. Mobile hero contrast fix
**File:** `src/pages/Index.tsx` (hero, lines 76–134)
- Strengthen the dark overlay on small screens: change `bg-primary/30` to `bg-primary/55 sm:bg-primary/30` (or add an additional `bg-foreground/40 sm:bg-foreground/0` layer behind the text) so white headline + tagline pass WCAG AA on mobile while desktop visual stays the same.
- Optionally add `drop-shadow-lg` to the H1 on `sm:drop-shadow-none` if needed for extra legibility.

### Technical notes

- Formspree endpoint: `https://formspree.io/f/xwkgpnqb` (as supplied). All three forms post the same way:
  ```ts
  await fetch("https://formspree.io/f/xwkgpnqb", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...fields, _subject: "..." }),
  });
  ```
- No DB migrations, RLS changes, edge-function changes, or design-token edits.
- Shopify deletion runs only after you confirm the product list.

### Files touched
- `src/pages/MentalHealth.tsx` (steps 1, 3)
- `src/pages/Contact.tsx` (step 2)
- `src/pages/Volunteers.tsx` (step 2)
- `src/pages/Events.tsx` (step 4)
- `src/pages/Shop.tsx` (step 5 — frontend filter)
- `src/pages/Policies.tsx` (step 6)
- `src/pages/Index.tsx` (step 7)
- Shopify store (step 5 — product deletions, with confirmation)
