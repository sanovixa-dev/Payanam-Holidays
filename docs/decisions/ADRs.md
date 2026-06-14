# Architecture Decision Records — Payanam Holidays

Each record captures one significant decision and why it was made, so the reasoning
survives and isn't accidentally undone. Format: Status / Context / Decision / Consequences.

Status legend: Accepted (in effect) · Superseded (replaced) · Deprecated (no longer used).

---

## ADR-001: Build a web app, not a mobile app

**Status:** Accepted

**Context:** The site must be instantly reachable by strangers from a shared link
(WhatsApp, search) with zero install friction. The audience is young couples,
families, and groups across India, mostly on phones.

**Decision:** Build a responsive mobile-first website, not a native mobile app.

**Consequences:** Anyone can open it from a link, no app-store install. We design
mobile-first. A native app is not planned; if ever needed, it's a separate future effort.

---

## ADR-002: Mostly-static architecture — backend only for enquiries and owner auth

**Status:** Accepted

**Context:** ~95% of user activity is browsing packages, which needs no server logic.
Only submitting an enquiry and the owner logging in require a backend.

**Decision:** The frontend handles all browsing on its own. The backend exists only
to (a) receive enquiries and (b) authenticate the owner + serve the enquiry dashboard.

**Consequences:** The site stays fast, cheap, and simple. Hosting splits cleanly:
static frontend (Vercel) + small backend (Railway). Less to break, less to secure.

---

## ADR-003: Packages stored in a config file, not the database (v1)

**Status:** Accepted

**Context:** v1 has few packages, changed rarely, edited by the developer. Browsing
them needs no backend.

**Decision:** Package data lives in a bundled config file with a fixed structure, not
in PostgreSQL.

**Consequences:** Browsing is fast and backend-free. The owner can't self-edit packages
in v1 (developer updates the config). The fixed structure is a deliberate "seam" so
packages migrate to the DB + admin panel in v2 without rework. Trade-off accepted: less
owner autonomy now, in exchange for speed and simplicity.

---

## ADR-004: Store-then-send with delivery tracking and retry

**Status:** Accepted

**Context:** An enquiry must never be lost, even if the email notification to the owner
fails. The business's entire purpose is getting enquiries to the owner.

**Decision:** On submission: validate → store the enquiry in the DB (status 'pending')
→ respond to the customer immediately → then attempt email delivery, retrying a few
times before marking 'failed'. A `delivery_status` column tracks 'pending'/'sent'/'failed'.

**Consequences:** The customer gets a fast response without waiting on email. A stored
enquiry survives any delivery failure. Failed deliveries are visible (see ADR-005) so
the owner can follow up manually. Storage is the source of truth; delivery is a
follow-up action.

---

## ADR-005: Read-only enquiry dashboard in v1 (admin panel deferred)

**Status:** Accepted

**Context:** The owner needs to see every enquiry — including any that failed to email —
as a reliability backstop. Two separate "editing" questions arise: editing the package
catalog, and editing/deleting customer enquiries.

**Decision:**

- v1 includes a read-only enquiry dashboard: the owner can VIEW enquiries and their
  delivery status.
- The owner CANNOT manage packages (create/edit/delete) in v1 — packages live in the
  config file (ADR-003); a full admin panel for packages is deferred to v2.
- Enquiries are treated as immutable records: the owner cannot edit them (an enquiry is
  the truthful record of what the customer submitted) and cannot delete them in v1 (to
  avoid losing leads and to preserve the count for success metric SM-1). If decluttering
  is needed later, the v2 approach is "archive/mark-as-handled" (a hidden state), never
  permanent deletion.

**Consequences:** The owner always has a place to see every enquiry, even if notifications
fail, and no enquiry can be accidentally lost or altered. Scope stays lean. Guardrails:
(1) the dashboard stays view-only for packages in v1 — adding package CRUD turns it into
the deferred admin panel; (2) enquiries remain immutable and undeleteable in v1.

---

## ADR-006: Owner authentication = email + password only

**Status:** Accepted

**Context:** v1 has a single, known owner. Auth is the riskiest area to over-build —
every extra login path is extra attack surface.

**Decision:** v1 uses one email + password login (bcrypt-hashed, over HTTPS, JWT session).
Self-service password reset, "Continue with Google" (OAuth), and passkeys are excluded.

**Consequences:** Minimal, securable login for one user. If the owner forgets the
password, the developer resets it directly. The excluded methods are recorded for v2 and
only earn their place with multiple admin users or real demand.

---

## ADR-007: Dashboard uses cards, not a table (mobile-first)

**Status:** Accepted

**Context:** The owner checks enquiries on his phone. Tables with many columns break or
force horizontal scrolling on narrow screens.

**Decision:** The enquiry dashboard uses stacked cards, not a table.

**Consequences:** Readable on any width, matches the owner's actual device. Less data
density than a table on a wide screen. A responsive table view for desktop is deferred
to v2, if desktop use becomes real.

---

## ADR-008: Enquiry cards lead with the phone number

**Status:** Accepted

**Context:** The owner's job on the dashboard is to call the customer back. The phone
number is the action trigger; the name is for the greeting.

**Decision:** Each enquiry card shows the phone number first and emphasized, with the
customer's name directly beneath it as secondary.

**Consequences:** The owner's eye lands on the thing he acts on. Layout is ordered by
the user's task, not by contact-card convention.

---

## ADR-009: Data representation choices (enquiry fields)

**Status:** Accepted

**Context:** How enquiry data is stored affects correctness and UX. Phone numbers,
travel dates, and timestamps each have a natural representation.

**Decision:**

- `phone` is stored as TEXT — it's an identifier, not a number (preserves +91, leading
  zeros; no math is done on it).
- `travel_dates` and `message` are free text — customers think loosely about dates
  ("mid-July"); the owner nails exact dates on the call. The `message` placeholder
  prompts preferences (food, budget, rooms) the customer might not say aloud.
- All timestamps are stored in UTC (TIMESTAMPTZ) and formatted to local time on display.

**Consequences:** Data is stored in its truthful form and formatted at the edge. Loose
inputs keep the form low-friction; the call handles precision.

---

## ADR-010: Package field offers a dropdown when cleared (recognition over recall)

**Status:** Accepted

**Context:** The enquiry form pre-fills the package the customer is viewing. If they clear
it to ask about a different one, forcing them to type the exact name from memory is friction.

**Decision:** The package field is pre-filled and editable; clearing it reveals a dropdown
list of all packages to pick from. Full type-ahead autosuggest is deferred to v2.

**Consequences:** Nobody has to remember a package name (recognition, not recall). A
dropdown is simpler to build than autosuggest and covers the need until the list grows large.

---

## ADR-011: About/Contact lives in the site footer, not a separate page

**Status:** Accepted

**Context:** Credibility signals (who Payanam is, how to reach them, socials) build trust
and should be easy to find — ideally without an extra click.

**Decision:** About/Contact is not a separate page; it's the footer, visible on every
screen — full logo, tagline, phone, social links (Instagram, Facebook, WhatsApp), copyright.

**Consequences:** Trust signals appear site-wide. The detailed logo has room in the footer.
One fewer page to build. (A "Powered by Kizo" credit is pending the owner's okay.)

---

## ADR-012: Technology stack

**Status:** Accepted

**Context:** Need a modern, well-supported stack that's fast to build with, cheap to host,
and within the developer's learning path.

**Decision:**

- Frontend: Vite + React + TypeScript, hosted on Vercel.
- Backend: Node + Express, hosted on Railway.
- Database: PostgreSQL (on Railway).
- Email: Resend (with a tap-to-WhatsApp link in the email).
- Analytics: Google Analytics. Geo-IP service for "show local first" ordering.

**Consequences:** Common, well-documented tools with generous free tiers. TypeScript
adds type safety. The auth built here (bcrypt + JWT) is reusable in the Kizo-Corpus project.

---

## ADR-013: Emerald accent on a white base ("accent, not flood")

**Status:** Accepted

**Context:** The owner wants a green theme. Green must read premium and trustworthy, not
cheap. Overusing a brand color looks amateur.

**Decision:** A clean white/near-white base with deep emerald used only for actions,
identity, and key moments (buttons, brand, price, links, selected states). Locked tokens:
buttons #1D9E75, brand/price/links #0F6E56, headings/footer #04342C, hero tint #E1F5EE,
section bg #F2FAF7, card borders #DCEEE6. Secondary text uses a readable muted grey.

**Consequences:** Premium, cohesive look; the green guides the eye to what matters. The
exact brand green is pending the owner's confirmation — swapping the hex values won't
change any layout.
