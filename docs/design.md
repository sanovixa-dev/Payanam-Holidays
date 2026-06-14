# Payanam Holidays — Design Document

**Status:** Draft v0.1
**Last updated:** 2026-06-01
**Owner:** Kizhore

---

## 3a. System Architecture (HLD)

### Overview

Payanam is "mostly static with one dynamic action." Browsing the site (about 95% of
what users do — viewing packages, filtering, reading details) happens entirely in the
frontend and needs no backend. Only submitting an enquiry touches the backend.business owners personal login with enquiry list touches the backend. This
keeps the site fast, cheap, and simple.

### Component Diagram

### Updated Component Diagram (revised in 3c — owner auth added)

````
User (phone browser)                    Owner (browser)
   │ HTTPS                                  │ HTTPS
   │ browse + submit enquiry                │ log in + view enquiries
   ▼                                        ▼
Frontend (Vercel) — React + TypeScript
   • Public: homepage, packages, detail pages, enquiry form, about/contact
   • Owner-only: login page, read-only enquiry dashboard
   • Packages from config file; loads Google Analytics; Geo-IP for ordering
   │
   │  HTTPS — API calls
   ▼
Backend (Railway) — Node + Express
   • POST /api/enquiries  (public)  — validate, rate-limit, store-then-send
   • POST /api/login      (public)  — owner login, returns JWT
   • GET  /api/enquiries  (owner)   — returns all enquiries (JWT required)
   • GET  /api/health     (public)  — monitoring
   • STORE-THEN-SEND with email RETRY before marking failed
   │
   ├─► Database (Railway PostgreSQL)
   │     • enquiries table (with delivery_status)
   │     • owner credentials (single owner login)
   │
   └─► Delivery (Resend email + tap-to-WhatsApp link)
         • Retries a few times before delivery_status = 'failed'
         • Attempted only AFTER the enquiry is safely stored
         • On success → delivery_status set to 'sent'
         • On failure → delivery_status set to 'failed' (enquiry is never lost)

### Key Decisions (v1)

- **Packages live in a config file, not the database.** Because browsing needs no
  backend, the site stays fast, cheap, and simple. Packages migrate to the database
  in v2 (with the admin panel), enabled by the FR-8.1 architecture seam.
- **The backend exists only to handle enquiries.** One focused responsibility.
- **Store-then-send** guarantees no enquiry is ever lost (FR-6.5).
- **delivery_status column** ('pending' | 'sent' | 'failed') lets us detect and retry
  failed deliveries — this answers "did the enquiry actually reach the owner?"
- **Delivery in v1 = email (via Resend) + a pre-filled tap-to-WhatsApp link** inside
  that email. The owner gets the enquiry by email and can tap one link to open
  WhatsApp with the customer's number ready. Full WhatsApp Business API is deferred
  to v2.

### What Each External Service Does

- **Vercel** — hosts the frontend (static files, fast, free tier)
- **Railway** — hosts the backend server and the PostgreSQL database
- **Resend** — sends enquiry emails to the owner
- **Google Analytics** — tracks frontend visitors (page views, top packages, sources)
- **Geo-IP service** — detects the visitor's rough region for package ordering

### Deferred to v2

- Packages stored in the database, plus an admin panel for the owner to manage them
- Full WhatsApp Business API delivery
- Customer accounts and enquiry pre-fill

---

## 3b. Data Model (LLD)

Two things are modeled: the **Package** (config file structure) and the
**Enquiry** (database table).

### Part 1 — Package (config file structure, v1)

Packages live in a bundled config file in v1 (not the database). Each package
follows this shape:

```typescript
{
  id: "kerala-backwaters-5d",            // unique, URL-friendly slug → /packages/<id>
  title: "Kerala Backwaters Getaway",
  category: "Family",                     // drives category filtering
  region: "Kerala",                       // drives "show local first" ordering
  durationDays: 5,
  price: 24999,                           // plain INR number (format at display time)
  priceNote: "per couple",                // clarifies what the price covers
  summary: "Short text for the card",     // shown on the package card in the list
  description: "Full text for detail page", // shown on the detail page
  inclusions: {
    transport: "AC car + houseboat",
    accommodation: "3 nights hotel, 1 night houseboat",
    food: "Daily breakfast + 2 dinners",
    sightseeing: "Alleppey, Munnar tea estates",
    other: "Airport pickup, guide"
  },
  photos: [
    "/images/kerala-1.jpg",
    "/images/kerala-2.jpg"
  ],
  heroPhoto: "/images/kerala-hero.jpg"    // main image: card + share preview
}
````

**Key field reasoning:**

- `id` is the URL slug (FR-3.1, FR-4.1) and the package's identity everywhere.
- `price` is a raw number, not a formatted string — store raw, add ₹/commas at display.
- `priceNote` kills hidden-cost ambiguity (FR-3.4, NFR-4.2 transparency).
- `summary` (card) vs `description` (detail page) — the two-level UI split.
- `inclusions` is a structured object, not a text blob, so the detail page can
  display each part cleanly (FR-3.2).
- `heroPhoto` is used on the card and for the WhatsApp/social share preview (FR-4.2).
- This shape is the seam (FR-8.1): the v2 admin panel and future DB table will use
  the same structure. The shape is the contract.

### Part 2 — Enquiry (database table)

The only database table in v1. Each enquiry is one row.

Table: enquiries
Column Type Notes
─────────────────────────────────────────────────────────────────────
id SERIAL auto-incrementing primary key
name TEXT customer's name
phone TEXT customer's phone (TEXT — it's an identifier,
not a number; preserves +91, leading zeros)
package_id TEXT which package (matches the package slug)
travel_dates TEXT customer's INTENDED travel date (free text)
num_people INTEGER how many travelers (a count → numeric)
message TEXT optional free-text note; nullable.
Placeholder prompts preferences (food, budget,
rooms, special requirements)
delivery_status TEXT 'pending' | 'sent' | 'failed'
created_at TIMESTAMPTZ when submitted (UTC) — set automatically
delivered_at TIMESTAMPTZ when delivery succeeded (UTC); nullable

**Key column reasoning:**

- `id` (SERIAL) is the primary key — the database auto-generates it (1, 2, 3...).
- `phone` is TEXT because phone numbers are identifiers, not numbers — storing as a
  number would break leading zeros and country codes. Rule: if you won't do math on
  it, it's text.
- `package_id` stores the package slug. (In v2, when packages move to the DB, this
  becomes a proper foreign key.)
- `travel_dates` is the customer's INTENDED date (free text, e.g. "mid-July"),
  NOT the submission date. Loose text on purpose — owner nails exact dates on the call.
- `message` is one optional free-text box. Its placeholder gently prompts the
  customer to mention preferences they might otherwise forget or feel awkward saying
  on a call. No structured fields — the placeholder does the guiding.
- `delivery_status` tracks delivery state. Querying for 'pending'/'failed' reveals
  any enquiry that didn't reach the owner (answers "did it get through?").
- `created_at` / `delivered_at` are stored in UTC (TIMESTAMPTZ), formatted to local
  time at display — same store-raw principle as price and dates.

### Three date-like fields (to avoid confusion)

| Field        | Meaning                            | Set by              |
| ------------ | ---------------------------------- | ------------------- |
| created_at   | When the enquiry was submitted     | System (automatic)  |
| travel_dates | When the customer wants to travel  | Customer (types it) |
| delivered_at | When the enquiry reached the owner | System (automatic)  |

### Interactions (resolved)

- **Enquiry button:** on each package detail page (FR-3.3), tied to that package.
- **Cards (list page):** each card has a **Share** button and an **Enquire** button.
  The card's Enquire button routes to the detail page with the enquiry form ready
  (Option C) — low-friction feel, but the customer still sees full details first.
- **Package auto-fill:** the enquiry form pre-fills the package the user is viewing.
  The field is editable (they can change it); no formal undo system — just retype.
- **message placeholder wording:** to be finalized with the owner (he knows which
  preferences matter most), but the field itself is locked. (OQ-8)

### Design principles applied here

- **Store raw, format on display** — prices as numbers, dates as UTC timestamps.
- **Type tells the truth** — phone = TEXT (identifier), num_people = INTEGER (count),
  price = number (computed with).
- **Structure enables UX** — `inclusions` as an object, not a blob.
- **Placeholder as guidance** — the empty state of the message box teaches the user.

### Part 3 — Owner (authentication, added in 3c)

A minimal table for the single owner login. (In v2 this can extend to multiple
admin users.)

Table: owners
Column Type Notes
──────────────────────────────────────────────────────────────
id SERIAL primary key
email TEXT owner's login email (unique)
password_hash TEXT bcrypt hash — never plaintext
created_at TIMESTAMPTZ when the account was created (UTC)

Note: in v1 there is one owner. The enquiry dashboard reads from the existing
`enquiries` table; this `owners` table exists only for login.

## 3c. API Design

### Endpoints

| Method | Path           | Purpose                   | Auth        |
| ------ | -------------- | ------------------------- | ----------- |
| POST   | /api/enquiries | Submit an enquiry         | Public      |
| GET    | /api/enquiries | Owner views all enquiries | Owner (JWT) |
| POST   | /api/login     | Owner login, returns JWT  | Public      |
| GET    | /api/health    | Server health check       | Public      |

(No GET /api/packages — packages are served from the frontend config file in v1.)

### POST /api/enquiries (public)

Request body:

```json
{
  "name": "Ravi Kumar",
  "phone": "+91 9876543210",
  "packageId": "kerala-backwaters-5d",
  "travelDates": "mid-July, flexible",
  "numPeople": 2,
  "message": "Vegetarian food, need 2 rooms"
}
```

Responses:

- 201 Created → { success: true, message: "Enquiry received..." }
- 400 Bad Request → invalid/missing fields (frontend keeps form data for retry)
- 429 Too Many Requests → rate limit hit
- 500 Internal Server Error → unexpected failure (frontend keeps form data)

Internal logic flow:

Internal logic flow:

1. Rate-limit check (by IP) → if exceeded, respond 429, stop
2. Validate & sanitize input → if invalid, respond 400, stop
3. STORE enquiry (delivery_status='pending', created_at=now UTC)
   → if DB write fails, respond 500, stop (atomic, nothing half-saved)
4. Respond 201 immediately (customer doesn't wait for the email to send)
5. DELIVER via email (Resend) WITH RETRY:
   → success → delivery_status='sent', delivered_at=now
   → fails after retries → delivery_status='failed' (enquiry safe in DB)

Customer confirmation copy:
"Thanks! We'll call you shortly. Prefer to talk now? Call [number]."

### POST /api/login (public)

Request body:

```json
{ "email": "owner@payanam.com", "password": "..." }
```

Responses:

- 200 OK → { success: true, token: "<JWT>" } (frontend stores token)
- 401 Unauthorized → wrong email/password
- 429 Too Many Requests → too many login attempts (brute-force protection)

### GET /api/enquiries (owner only)

- Requires a valid JWT (sent in the request).
- Backend verifies the token before returning anything.
- Returns the list of all enquiries with their fields and delivery_status.
- Responses:
  - 200 OK → { enquiries: [...] }
  - 401 Unauthorized → missing/invalid token

### GET /api/health (public)

- 200 OK → { status: "ok" } (for uptime monitoring)

### Design notes

- Store-then-send with retry: storage is the source of truth; delivery is a
  follow-up action that retries before giving up. No enquiry is ever lost.
- Order of checks (rate-limit → validate → store → deliver) fails fast and cheap,
  doing expensive work only when input is clean.
- The owner enquiry dashboard is read-only: GET only, no package mutations in v1.

---

## 3d. UX / UI Design — Wireframes

Wireframes are designed mobile-first (most visitors are on phones). Each screen is
documented as a written spec. Visual mockups were reviewed separately; this section
is the source of truth for layout, hierarchy, and tokens.

### Design Tokens (locked)

- **Theme:** emerald green as accent on a clean white/near-white base ("accent, not flood").
- **Greens:**
  - Primary action / buttons: `#1D9E75`
  - Brand text / price / links: `#0F6E56`
  - Deepest (headings, footer bg): `#04342C`
  - Hero tint background: `#E1F5EE`
  - Main section background: `#F2FAF7` (soft green-tinted off-white)
  - Card borders: `#DCEEE6`
- **Exact brand green pending owner confirmation** — swap hex values, layout unchanged.
- **Hierarchy principle:** price (green, ~19px) and package title (deep green, ~16px,
  weight 500) lead the eye; duration and "per couple" stay quiet grey (secondary);
  borders are soft green (quiet separators).
- **Typography:** two weights only (400 regular, 500 for emphasis). Sentence case.

### Screen 1 — Homepage (LOCKED)

Top-to-bottom structure:

1. **Header (light, white bg):** logo mark (simple plane in green circle — full Payanam
   logo deferred) + "Payanam Holidays" (deep green) on the left; filled green "Call us"
   pill on the right (visible site-wide, FR-9.1).
2. **Hero (soft mint band):** headline "Go pack your things. We'll handle the rest." +
   subline "Real trips, honest prices, zero hassle." (warm copy + transparency promise).
3. **Category filter pills:** "All" (solid green, selected) + others (green outline,
   tappable). Categories come from package config (grow automatically, OQ-10).
4. **Section label:** "Popular near you" (signals geo-aware ordering, FR-2.3, IP-based).
5. **Package cards (white, on soft-green section):** each card has —
   - Photo area (real photos later, OQ-12) with a Share button (top-right circle)
   - Title (deep green, bold) → duration · region (quiet grey)
   - Price (green, prominent) + "per couple" note (grey) → "Enquire" button (filled green)
   - Card's Enquire button routes to the detail page with the form ready (Option C).
6. **Footer (deep emerald):** "Plan less, travel more." heading + about line + a second
   "Contact us" button (credibility close, FR-9.2).

Deliberately NOT on the homepage (scope): no search bar, no customer login, no
testimonials carousel, no chat widget, no booking/payment.

### Key UX decisions (homepage)

- **Accent not flood:** white base, green only on actions/identity/key moments.
- **Trust before action:** transparency message (hero) + contact options surround the
  packages; trust is the #1 conversion driver (NFR-4).
- **Price is the hero of each card:** travel customers scan for price first.
- **Visible options over hidden:** filter pills and phone number are visible, not buried.
- **Cohesive palette:** even backgrounds/borders belong to the green family (no stray grey).

### Pending (does not block layout)

- Exact brand green shade (owner)
- Real category list (owner, OQ-10)
- Real package photos and content (owner, OQ-12)
- Full Payanam logo treatment (deferred — use simple mark for now)

### Screen 2 — Package Detail Page (the conversion screen)

Top-to-bottom:

1. **Back link** (← to list) + Share button (top-right).
2. **Hero photo** (large, the package's heroPhoto).
3. **Title** (deep green, bold) + duration · region (quiet grey).
4. **Price block:** large green price + "per couple" note. Prominent — the trust anchor.
5. **Description:** the full `description` text (1–2 short paragraphs).
6. **Inclusions (the heart):** each item from the `inclusions` object shown as its own
   row with an icon — Transport, Accommodation, Food, Sightseeing, Other. Clean list,
   not a text blob. This is where hidden-cost anxiety dies (FR-3.4).
7. **Photo gallery:** the remaining `photos` (thumbnails).
8. **Primary CTA:** large "Enquire about this trip" button (filled green), sticky/easy
   to reach. Tapping opens the enquiry form with this package pre-filled.
9. **Phone fallback:** "Prefer to talk? Call us" link below the CTA.

Key decisions: price + inclusions are the two trust-builders, placed high and clear.
The CTA is impossible to miss. Everything serves "understand fully → trust → enquire."

### Screen 3 — Enquiry Form

A focused form (own page or section), opened from a package:

1. **Heading:** "Enquire about [Package Name]".
2. **Fields (in order):**
   - Name (text, required)
   - Phone (text, required, validated)
   - Package (text, pre-filled with current package, editable)
   - Travel dates (text, free-form, e.g. "mid-July, flexible")
   - Number of people (number)
   - Message (textarea, optional) — placeholder prompts preferences: "Anything we should
     know? e.g. food preferences, budget, rooms, special requirements"
3. **Submit button:** filled green "Send enquiry".
4. **On success:** confirmation — "Thanks! We'll call you shortly. Prefer to talk now?
   Call [number]." (form data preserved on failure, per FR-5.6).

Key decisions: shortest viable form (low friction), package auto-filled (don't make them
remember), message placeholder does the preference-prompting.

### Screen 4 — About / Contact

Simple, credibility-focused:

1. **About text:** who Payanam is, short and warm (builds trust for first-timers).
2. **Contact block:** phone number (prominent, tappable), business email, maybe location.
3. **Full Payanam logo** featured here (where the busy logo has room to breathe).
   Key decision: this is a trust page — make the business feel real and reachable (FR-9.2).

### Screen 5 — Owner Login (v1, trimmed)

Minimal, single-owner login:

1. Header: logo mark + "Payanam Holidays".
2. Heading: "Owner login".
3. Fields: email, password.
4. Button: "Log in" (filled green).
5. Error state: wrong credentials → "Incorrect email or password".
6. Optional: rate-limit message after too many attempts (brute-force protection).

Auth logic: the entered email/password is checked against the `owners` table;
on success, issue a JWT and enter the dashboard. Not linked from public nav —
owner navigates directly (e.g. /login).

DELIBERATELY EXCLUDED from v1 (single owner — developer can reset credentials):

- Self-service password reset / "forgot password" email flow
- "Continue with Google" (OAuth)
- Passkey login
  These are recorded in the v2 roadmap below.

### Screen 6 — About / Contact (implemented as the site footer)

DECISION: About/Contact is NOT a separate page — it lives in the footer, visible
on every screen. This puts credibility signals everywhere instead of behind a click.

Footer contents:

1. Full Payanam logo (this is where the detailed logo has room to breathe).
2. Brand name + tagline ("Plan less, travel more" / "Real trips, honest prices,
   zero hassle").
3. Contact: phone number (prominent, tappable) + social links (Instagram, Facebook,
   WhatsApp).
4. Copyright line.

Key decision: the footer is the trust/credibility surface (NFR-4) — make the
business feel real and reachable, site-wide.

Note: a "Powered by Kizo" credit line is under consideration — confirm with the
owner before adding, since it's his business-facing site.

### 3d Summary — all screens locked

1. Homepage ✅
2. Package detail page ✅
3. Enquiry form ✅
4. Owner dashboard (cards; phone-first, message shown per card; logout confirm) ✅
5. Owner login (email + password only) ✅
6. About / Contact (as site-wide footer) ✅

### v2 / later — owner auth enhancements (deferred from v1)

- Self-service password reset (email verification + reset link)
- "Continue with Google" (OAuth) sign-in
- Passkey login
  Reason for deferral: v1 has a single known owner; the developer can reset
  credentials directly. These earn their place only with multiple admin users or
  real demand.

### Other v2 items captured during design

- Daily digest email of enquiries (the dashboard covers the safety-net need in v1)
- Responsive table view for the dashboard on wide screens (owner is mobile in v1)
- Full type-ahead autosuggest on the package field (v1 uses a simple dropdown)
