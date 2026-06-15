# Payanam Holidays — Build Plan

How to read this: the build is ordered into **milestones**. Each milestone is a
meaningful checkpoint ("Payanam can now do X"), broken into **tiny tasks** (~30–60 min
each) you can finish in a sitting. Build top to bottom — the order respects dependencies
(you can't build the dashboard before enquiries exist to show in it).

Why this order: Payanam is "mostly static, one dynamic action" (ADR-002). So we build
the entire browsing experience first (pure frontend, real config data — fast, visible),
then the one dynamic slice (enquiries), then the owner side. Visible progress early,
logical dependencies respected.

Legend: [ ] todo · [x] done. 🤝 = good task to hand to the helper when they join.
🔆 = barely needs Claude (you have the specs — protects your usage).

---

## Milestone 0 — Project setup & skeleton

_Goal: an empty app that runs locally, with routing and design tokens in place._

- [ ] Initialise the frontend: Vite + React + TypeScript 🔆
- [ ] Confirm it runs locally (default page renders in the browser) 🔆
- [ ] Add `.gitignore` (node_modules, build output, env files) 🔆
- [ ] Create the global stylesheet with the locked design tokens (CSS variables from ADR-013) 🔆
- [ ] Set up routing (React Router): routes for `/`, `/packages/:id`, `/login`, `/dashboard` 🔆
- [ ] Create the folder structure (components, pages, data, lib) 🔆
- [ ] Commit: "Project skeleton + routing + design tokens"

**Done when:** the app runs, you can navigate between empty routed pages, tokens are defined.

---

## Milestone 1 — Browsing experience (frontend only, config data)

_Goal: the whole public browsing site works on real config data. No backend yet._
_This is your big visible payoff — Payanam looks real._

- [ ] Create the package config file with 2–3 sample packages (real structure from 3b) 🔆
- [ ] Build the Header component (logo mark + name + "Call us") 🔆
- [ ] Build the Footer component (logo, tagline, phone, socials, copyright) 🔆
- [ ] Build the reusable Button styles 🔆
- [ ] Build the PackageCard component (photo, share, title, duration, price, Enquire) 🔆
- [ ] Build the Homepage: header + hero + filter pills + card list + footer 🔆
- [ ] Wire category filtering (pills actually filter the list) 🤝🔆
- [ ] Build the Package Detail page: hero photo, price block, description, inclusions rows, gallery, sticky CTA 🔆
- [ ] Wire card tap + card "Enquire" → route to the detail page (Option C) 🔆
- [ ] Wire Share buttons (Web Share API on mobile / copy-link fallback) 🤝🔆
- [ ] Responsive pass on browsing screens (test at phone width) 🤝🔆
- [ ] Commit at each working piece

**Done when:** you can browse packages, filter by category, open detail pages, and share —
all looking like the wireframes, on real config data.

---

## Milestone 2 — The enquiry slice (first backend)

_Goal: a stranger submits an enquiry; it's stored and emailed to the owner._

- [ ] Set up the backend: Node + Express project, runs locally 🔆
- [ ] Add `GET /api/health` → returns `{status:"ok"}` (proves the server works) 🔆
- [ ] Set up PostgreSQL (local or Railway); create the `enquiries` table (schema from 3b) 🔆
- [ ] Build `POST /api/enquiries`: validate → store (status 'pending') → respond 201 _(no email yet)_ — come to Claude if stuck on validation/DB
- [ ] Build the Enquiry Form UI (all fields, message placeholder) 🔆
- [ ] Auto-fill package from the detail page; editable; dropdown of all packages when cleared 🤝🔆
- [ ] Wire the form to POST to the backend; show the confirmation message ("we'll call you shortly...") 🔆
- [ ] Handle errors: 400 (invalid, keep form data), 500 (keep form data), + the "call us" fallback 🤝
- [ ] Add Resend email delivery with retry; on success → status 'sent', on fail → 'failed' — come to Claude for the retry logic
- [ ] Add IP-based rate limiting → 429 🤝
- [ ] Test the full flow end-to-end (submit → row in DB → email arrives)

**Done when:** the enquiry flow works start to finish, store-then-send behaves, no enquiry is lost.

---

## Milestone 3 — Owner side (login + dashboard)

_Goal: the owner logs in and sees every enquiry with delivery status._
_This is your first auth build — lean on Claude here; it's new and security-sensitive._

- [ ] Create the `owners` table; seed one owner with a bcrypt-hashed password — come to Claude
- [ ] Build `POST /api/login`: check credentials, return a JWT — come to Claude
- [ ] Build the Login screen UI (email + password + "Log in" + error state) 🔆
- [ ] Store the JWT on the frontend; protect the `/dashboard` route — come to Claude
- [ ] Build `GET /api/enquiries` (protected — verify JWT before returning) — come to Claude
- [ ] Build the Dashboard UI: cards (phone-first), status badges (sent/pending/failed), message shown, failed flagged 🔆
- [ ] Wire logout (+ confirmation modal) 🤝🔆
- [ ] Test: login → see enquiries → failed ones flagged → logout

**Done when:** the owner can log in, view all enquiries + delivery status, and log out. The whole app works locally.

---

## Milestone 4 — Polish & pre-launch

_Goal: the rough edges that make it feel finished and trustworthy._

- [ ] Geo-IP "show local first" ordering on the homepage 🤝
- [ ] Share / OG meta tags (social preview uses heroPhoto) 🤝🔆
- [ ] Add Google Analytics 🤝🔆
- [ ] Empty states + loading states (no packages, loading dashboard, etc.) 🤝🔆
- [ ] Full responsive pass across all screens 🤝🔆
- [ ] Security pass: HTTPS everywhere, sanitise inputs, review OWASP basics — come to Claude
- [ ] Edge-case testing: bad inputs, network failures, email failure, wrong login

**Done when:** the app handles failure gracefully and feels polished on every device.

---

## Milestone 5 — Ship

_Goal: live on its own domain, with real content, run by your friend._

- [ ] Get real content from the owner: categories (OQ-10), packages + photos (OQ-12), exact green, branding (OQ-11), form fields (OQ-8), delivery channel (OQ-9)
- [ ] Swap placeholder content + placeholder green for the real ones 🔆
- [ ] Deploy the frontend to Vercel 🔆
- [ ] Deploy the backend + database to Railway 🔆
- [ ] Connect the custom domain — come to Claude if stuck
- [ ] Set up uptime monitoring (ping `/api/health`)
- [ ] Final end-to-end test on production
- [ ] Hand over to your friend → **go live** 🎉

**Done when:** Payanam is live on its own domain, your friend is operating it. (This is the
trigger to return to Kizo-Corpus.)

---

## Git collaboration workflow (activate when the helper joins)

_Until then, you work solo on `main` with regular commits. When your helper joins, switch
this on so you don't step on each other's code._

- **One branch per task.** Never commit features directly to `main`. `git checkout -b feature/enquiry-form`
- **`main` always works.** It should always be in a runnable state — only merge working code.
- **Pull requests.** The helper pushes their branch and opens a PR. They don't merge their own.
- **You review every PR** before merging — read the code, run it, give feedback. (This is also where you teach.)
- **Pair on new concepts.** First time the helper hits something new (auth, a tricky component), pair-program it rather than assigning blind.
- **Guardrails hold:** the enquiry dashboard stays read-only for packages (ADR-005); enquiries stay immutable.
- **Small PRs.** Easier to review, less to break. Same "tiny tasks" principle.

🤝-tagged tasks above are good first handoffs — self-contained, lower-risk, clear "done."

---

## Usage-aware notes (protecting your Claude limits during the build)

- Most 🔆 tasks you can do straight from the specs in `design.md` and the ADRs — no Claude needed.
- Come to Claude mainly for: the **backend logic** (enquiry endpoint, retry), **all of auth**
  (login, JWT, protected routes — it's new and security-sensitive), the **security pass**, and
  when genuinely **stuck**.
- Batch your questions; your docs are your offline brain. Re-read them before asking.
