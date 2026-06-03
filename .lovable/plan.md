## Navigation & Homepage Wiring Overhaul

Strictly nav structure, routing, and CTA destinations — no visual, copy, or content changes.

### 1. `src/components/Navbar.tsx` — new nav structure

Replace `navLinks` with:

```
Home              → /
About             → /about
Our Work ▾
  Mental Health Services → /mental-health
  Programmes & Impact    → /philanthropy
  Events                 → /events
Get Involved ▾
  Become a Volunteer → /become-volunteer
  Donate             → https://paystack.shop/pay/87qgnu5n8o (target _blank)
Contact           → /contact
```

- Dropdown items support either internal `path` or external `href` (open in new tab). Update the desktop dropdown render and mobile Sheet render to handle both (use `<a target="_blank" rel="noopener noreferrer">` when `href` is set).
- Remove the Shop cart icon link (`/shop`) from the top-right icon cluster.
- Remove the Login/User icon link from the top-right icon cluster.
- Keep the Language selector.
- Replace the single "Donate Now" right-side button with two right-side CTAs (desktop + mobile sheet footer):
  - **Donate Now** → `https://paystack.shop/pay/87qgnu5n8o` (new tab) — `bg-accent text-accent-foreground hover:bg-accent/90` (accent, high contrast)
  - **Get Help** → `/mental-health` — outlined primary (`variant="outline"` with `border-primary text-primary hover:bg-primary hover:text-primary-foreground`)
- Remove "Pages" dropdown entirely (Portfolio, Gallery, FAQ, Shop, News, Team, Become Volunteer, Events all gone or relocated as above). Team/Portfolio/Gallery/FAQ/Shop/News pages remain reachable by URL but not from the menu.

### 2. `src/components/Footer.tsx` — new column structure

Replace the Quick Links + Programs columns with four columns. Keep the first column (org info + reg numbers) and the fourth column (Contact Info block with VoiceAgent/email/address). Update to:

- **Organisation**: Home (/), About Us (/about), Contact (/contact)
- **Our Work**: Mental Health Services (/mental-health), Programmes & Impact (/philanthropy), Events (/events)
- **Get Involved**: Become a Volunteer (/become-volunteer), Donate Now (Paystack, new tab)
- **Legal**: Privacy Policy (/policies), and plain text "NPO 238-677 · PBO 930084594"

Keep the existing Contact info block by merging it into the org column or as a fifth block — to stay minimal and within the existing grid, fold contact email/address/voice into the **Organisation** column (under the existing reg numbers). Use `lg:grid-cols-4` with the four columns above. Remove Programs column.

Remove from footer: Shop, Portfolio, Login, Donor Dashboard (/campaigns) link.

### 3. `src/pages/Index.tsx` — CTA wiring

- Hero **Explore More** button: change `<Link to="/about">` → `<Link to="/mental-health">`. Keep label/translation key.
- Hero **Donate Now** button: already Paystack — leave.
- **Portfolio CTA section** (lines 308–316, the `<section>` containing `SectionHeading` portfolioLabel/Title/Desc and "View All Projects" button): delete the entire section.
- Scan the rest of Index.tsx for any other "Donate"/CTA bottom section pointing to `/contact`; if present, repoint to Paystack (new tab). Plan view shows lines 1–332; will read 333–367 during implementation to confirm and fix the bottom CTA referenced by user.

### 4. `src/App.tsx` — keep all routes

No route deletions. `/shop`, `/portfolio`, `/login`, `/campaigns`, `/team`, `/gallery`, `/faq`, `/news`, `/product/:handle`, `/profile-settings`, `/mood-tracker` all remain so existing URLs/SEO don't 404.

### 5. Out of scope (untouched)

- All page content, copy, images, styling, brand tokens
- `/team`, `/mental-health` content, `/campaigns` Paystack/bank details
- `VoiceAgent` component, i18n keys, SEO meta

### Files touched

- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/pages/Index.tsx`

### Technical notes

- Donate URL constant: `https://paystack.shop/pay/87qgnu5n8o`, always `target="_blank" rel="noopener noreferrer"`.
- Dropdown item type extended: `{ label: string; path?: string; href?: string; external?: boolean }`.
- "Get Help" button uses outlined primary variant; "Donate Now" uses accent fill — both visible on desktop top bar and inside the mobile Sheet footer.
- i18n: reuse existing translation keys where they already exist (`nav.donateNow`, `nav.about`, `nav.mentalHealth`, `nav.philanthropy`, `nav.events`, `nav.becomeVolunteer`, `nav.contact`, `nav.home`). For new labels ("Our Work", "Get Involved", "Get Help", "Donate", "Programmes & Impact", "Mental Health Services", "Organisation", "Our Work", "Get Involved", "Legal", "Privacy Policy") use plain English strings inline — translation file edits are out of scope per Part 6.
