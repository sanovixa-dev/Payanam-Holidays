# Payanam Holidays — Design Document

**Status:** Draft v0.1
**Last updated:** 2026-06-01
**Owner:** Kizhore

---

## 3a. System Architecture (HLD)

### Overview

Payanam is "mostly static with one dynamic action." Browsing the site (about 95% of
what users do — viewing packages, filtering, reading details) happens entirely in the
frontend and needs no backend. Only submitting an enquiry touches the backend. This
keeps the site fast, cheap, and simple.

### Component Diagram

User (phone browser)
│ HTTPS
▼
Frontend (Vercel) — React + TypeScript, built with Vite
• Homepage, package list, category filters
• Package detail pages
• Enquiry form
• About / Contact section
• Packages read from a bundled CONFIG FILE (not the database, in v1)
• Loads Google Analytics for visitor tracking
• Uses a Geo-IP service to detect region for "show local first" ordering
│
│ HTTPS — POST /api/enquiries (this is the ONLY call to the backend)
▼
Backend (Railway) — Node + Express
• Receives the enquiry submission
• Validates and sanitizes the input
• Rate-limits by IP (spam protection)
• Performs STORE-THEN-SEND:
│
├─► Database (Railway PostgreSQL)
│ • enquiries table (includes a delivery_status column)
│ • The enquiry is saved FIRST, before any delivery is attempted
│
└─► Delivery (Resend email, with a tap-to-WhatsApp link inside the email)
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
