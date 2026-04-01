

# Website Update & Enhancement Plan

This plan covers 7 distinct changes across the site.

---

## 1. Multilingual Functionality

Add a language selector dropdown to the Navbar that uses the browser's built-in translation or a lightweight i18n library.

**Approach**: Integrate `react-i18next` with a language switcher in the header. Create translation JSON files for supported languages (English, Zulu, Afrikaans, French, Portuguese, Spanish). Wrap the app in an `I18nProvider` and progressively translate key UI strings (nav labels, headings, buttons). A globe icon dropdown in the Navbar lets users switch languages.

**Files**: New `src/i18n/` directory with config and translation JSONs, edit `Navbar.tsx`, `main.tsx`, and key page components.

---

## 2. Donor Dashboard "Get Involved" Section

Add a "Get Involved" section to the Campaigns page with two clearly separated donation links.

**Changes in `src/pages/Campaigns.tsx`**:
- Add a new section after the existing donate/offline cards with heading "Get Involved"
- Two cards side by side:
  - **South African Donations** -- links to the existing Paystack page
  - **International Donations** -- links to an international payment gateway (will need the URL from you, or can use a placeholder)

---

## 3. Homepage Metrics Update

**In `src/pages/Index.tsx`**, update the `impactStats` array (line 27-32):
- `"Total Happy Families"` → `"Beneficiaries Impacted"` with value `"10,000+"`
- `"Worldwide Donors"` → `"Projects Completed"` (keep current value or specify new one)

---

## 4. Impact Statistics Adjustments

**In `src/pages/Index.tsx`**, update the `stats` array (lines 21-25):
- `"Local WCMHCO Branches"` / `"537+"` → `"Years Operating"` / `"10"`
- `"Total WCMHCO Staff"` / `"3,224+"` → `"Geographic Reach"` / `"Southern Africa"`
- `"Total Volunteers"` / `"6,882+"` → `"2,000+"`

Also update **`src/pages/About.tsx`** `impactStats` (lines 19-24) to match consistently:
- `"Local Branches"` → `"Years Operating"` / `"10"`
- `"Total Staff"` → `"Geographic Reach"` / `"Southern Africa"`
- `"Volunteers"` → `"2,000+"`

Keep "Active Volunteers" at 270+ wherever it appears.

---

## 5. Team Page — Remove Qhakazile Mathebula

**In `src/pages/Team.tsx`** (line 50): Remove the entry `{ name: "Qhakazile Mathebula", role: "HR Assistant", image: qhakazileMathebula }` from `headsOfDepartments` and remove the unused import on line 21.

---

## 6. Professionals Count — Reduce to 12

**In `src/pages/MentalHealth.tsx`**: The `professionals` array currently has 18 entries (lines 38-138). Remove 6 entries to bring the total to 12. I will keep the first 12 and remove entries 13-18 (Dr. Jessica Park, Dr. André Dupont, Dr. Zara Mahlangu, Dr. Hannah Müller, Dr. Solomon Adebayo, Dr. Carlos Rivera).

---

## 7. Gallery Update — Add New Images

**Important note on uploaded files**: 4 of the uploaded files are in HEIC format, which browsers cannot display. You will need to convert those to JPG or PNG and re-upload them. The one JPG file (`PHOTO-2021-11-07-06-47-35.jpg`) can be added immediately.

**Changes**:
- Copy the usable JPG to `src/assets/`
- Add it to the `images` array in `src/pages/Gallery.tsx`
- For the HEIC files: I will notify you that they need to be re-uploaded in JPG/PNG format

---

## Technical Summary

| # | Files Modified | Type |
|---|---------------|------|
| 1 | New `src/i18n/` dir, `main.tsx`, `Navbar.tsx`, page components | New feature |
| 2 | `src/pages/Campaigns.tsx` | UI addition |
| 3 | `src/pages/Index.tsx` | Text/value update |
| 4 | `src/pages/Index.tsx`, `src/pages/About.tsx` | Text/value update |
| 5 | `src/pages/Team.tsx` | Remove array entry |
| 6 | `src/pages/MentalHealth.tsx` | Remove 6 array entries |
| 7 | `src/pages/Gallery.tsx`, `src/assets/` | Add image |

