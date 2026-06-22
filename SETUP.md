# World Changers MHCO — Setup & Development

## Quick Start

### Step 1: Clone the repository using the project's Git URL.
```bash
git clone https://github.com/heferon-spec/wcmho.git
```

### Step 2: Navigate to the project directory.
```bash
cd wcmho
```

### Step 3: Install the necessary dependencies.
```bash
npm i
```

### Step 4: Start the development server with auto-reloading and an instant preview.
```bash
npm run dev
```

The dev server will start at `http://localhost:5173` (or the next available port). Open it in your browser to see live changes.

---

## Analytics & Tracking

**GA4 Measurement ID:** `G-6LER04LYTJ`

GA4 tracking is configured in `index.html`. Verify events fire in GA4 DebugView:
- `pageview` — on any page load
- `donation_initiated` — when user clicks donate CTA
- `volunteer_lead` — when user submits volunteer form
- `call_initiated` — when user clicks call button

---

## Deployment

This project is hosted on **Vercel**. Pushes to `main` branch auto-deploy.

---

## Support

Questions? Contact **Nigel Jeche** (nigel@worldchangersmh.org) or **Heferon** (operations@heferon.tech).
