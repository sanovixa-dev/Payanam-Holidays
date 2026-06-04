# Payanam Holidays — Product Requirements Document

**Status:** Draft v0.1
**Last updated:** 31-05-2026
**Owner:** Kizhore

---

## Problem Statement

Payanam Holidays is for travelers across India — young couples, families, and groups — who want a well-organized trip without the hassle of piecing together transport, stay, food, and sightseeing themselves. Today they can't discover or evaluate the agency without calling; there's no way to see what packages exist, what they cost, or what's included. For the agency owner, the business is invisible beyond friends-of-friends, with no way to reach a wider audience or build credibility with strangers.
The Payanam Holidays website is the bridge between the customer and the agency: a place where travelers browse all-inclusive trip packages, see exactly what each one includes and costs, and submit an enquiry in a few taps. The owner receives that enquiry as a qualified lead and closes the sale with a single follow-up call — no back-and-forth explaining the basics, because the website has already done that.
What makes it work is low mental energy on both sides. For the customer: clear packages, transparent all-inclusive pricing, and an interface where it's always obvious where to go and what to do. For the owner: qualified leads that arrive ready, so his time goes into closing trips, not answering the same questions over and over. The website carries the explaining so the people don't have to.

---

## Goals (V1)

V1 is complete when all of the following are true:

1. **Browse packages** — A visitor can view all available trip packages without logging in.

2. **Browse by category and region** — A visitor can filter or group packages by category (trip type) and by region/destination.

3. **Geo-aware ordering** — If a visitor's location is detectable, packages relevant to their region surface first (e.g., a Tamil Nadu visitor sees Tamil Nadu trips before others). If location isn't detectable, a sensible default order is shown.

4. **Package detail** — A visitor can open any package to see its full details: what's included (transport, accommodation, sightseeing, food, other arrangements), price, and duration.

5. **Submit an enquiry** — A visitor can submit an enquiry on a package via a form, providing the details the owner needs to follow up. No login required.

6. **Owner receives the enquiry** — Each submitted enquiry reaches the owner (and/or his team) reliably, with enough information to call the customer back.

7. **Mobile-responsive** — The entire experience works cleanly on phones, since most customers will browse on mobile.

8. **Config-driven content** — Packages are defined in a structured config (file-based for v1), so content changes don't require rewriting code. (Admin UI to edit this is deferred to Phase 2.)

---

## Non-Goals (V1)

The following are explicitly out of scope for V1. Listed to prevent assumption, scope creep, and to set clear expectations with the owner.

### Booking & Payments

- **Online payments / UPI / card checkout** — Sale closes by phone call. Payment handled offline. Deferred to a later phase only if real demand appears.
- **Real-time availability / seat booking** — V1 captures enquiries, not confirmed bookings. Availability is handled by the owner during the call.
- **Booking confirmation, tickets, or invoices** — Out of v1. The owner manages these offline.
- **Cancellation or refund flows** — Out of v1.

### Accounts & Admin

- **Customer login / accounts** — Browsing and enquiry both work without login. Deferred to Phase 2.
- **Form pre-fill for logged-in users** — Depends on login; deferred to Phase 2.
- **Admin panel for the owner to add/edit/delete packages** — Deferred to Phase 2. In v1, packages are managed via config file by the developer.

### Content & Features

- **User reviews / ratings / testimonials system** — A static testimonial or two may be hand-placed, but no user-generated review system in v1.
- **Blog / travel articles / content marketing pages** — Out of v1.
- **Search bar with free-text queries** — V1 uses category/region filtering, not search. Deferred.
- **Wishlist / save-for-later / comparison** — Out of v1.
- **Multi-language / Tamil translation** — V1 is English only. Localization deferred.
- **Currency conversion** — Prices shown in INR only.

### Communication & Automation

- **Automated email/SMS/WhatsApp to customers** — V1 sends the enquiry to the owner; customer follow-up is a manual call. No automated customer-facing messaging.
- **Live chat / chatbot** — Out of v1.
- **Newsletter / marketing email capture** — Out of v1.

### Platform

- **Native mobile app** — V1 is a mobile-responsive website only.
- **Offline mode** — Network required.
- **Dark mode** — Out of v1.

### Analytics & Growth

- **Analytics dashboards, conversion tracking, A/B testing** — Out of v1. Basic hosting analytics only, if any.
- **SEO optimization beyond basics** — Reasonable page titles and meta tags only; no deep SEO campaign in v1.

---

## Users / Personas

> **Note:** Persona details marked _[ASSUMPTION]_ are pending confirmation from the
> business owner. To be validated and updated once owner input is received.

### Primary persona: The Customer

**Profile:**
An Indian traveler — _[ASSUMPTION: most commonly young couples and families]_ — planning a trip somewhere in India. Browses primarily on a phone. Average tech comfort: can use websites and apps, not a power user.

**Relationship with travel planning:**
Wants a well-organized trip without assembling transport, stay, food, and sightseeing themselves. _[ASSUMPTION: values convenience and clarity over chasing the absolute cheapest option.]_

**Pain today:**
Can't discover or evaluate Payanam without calling. No way to see what trips exist, what they cost, or what's included. Hidden-cost anxiety: "what's actually covered in this price?"

**What success looks like for them:**

- Finds a relevant package quickly
- Understands exactly what's included and what it costs, with no surprises
- Sends an enquiry in a few taps and gets a callback

### Secondary persona: The Owner (your friend)

**Profile:**
Runs Payanam Holidays. Currently gets business mainly through friends-of-friends referrals. Not a technical person.

**Pain today:**

- Business is invisible beyond word-of-mouth; can't reach strangers
- No credible online presence
- Answers the same basic questions on every call
- No professional image to point new customers to

**What success looks like for them:**

- A credible website to share with prospects
- Qualified enquiries arriving with enough info to follow up
- Less time spent explaining basics; more time closing trips
- _[Phase 2] Ability to manage packages himself without depending on the developer_

### How customers discover Payanam

_[ASSUMPTION: primarily word-of-mouth / referrals — pending owner confirmation.]_

**Decision (based on current understanding):**

- **Shareability — prioritized in v1.** Clean, readable URLs and good link previews (title, image, price) when a package is shared on WhatsApp/social. Directly serves the referral channel.
- **SEO basics — included in v1.** Sensible page titles, meta descriptions, mobile-friendliness, fast load, sitemap. Cheap hygiene, done while building.
- **SEO campaigns (content, ranking, backlinks) — deferred.** Premature for a referral-based business; revisit as the business grows and search becomes a real acquisition channel.

---

## User Stories (V1)

User stories describe specific moments of use. Each maps to one or more Goals and is the unit of work we build and test against.

### Browsing & Discovery

**Story 1 — Land on the homepage**
As a visitor, I want to immediately understand what Payanam Holidays offers and see trip packages, so that I know I'm in the right place without reading instructions.

_Acceptance criteria:_

- Homepage clearly states what the agency does (organized trip packages).
- Packages are visible without scrolling far or clicking anything.
- Works cleanly on mobile.

**Story 2 — Browse all packages**
As a visitor, I want to see the list of available trip packages, so that I can explore my options.

_Acceptance criteria:_

- Each package shows: destination/title, a photo, price, and duration at a glance.
- No login required.

**Story 3 — Filter by category**
As a visitor, I want to filter packages by category (trip type), so that I can quickly find trips relevant to me.

**Story 4 — See regionally relevant packages first**
As a visitor, I want packages relevant to my region to appear first, so that I see the most relevant trips without searching.

_Acceptance criteria:_

- If location is detectable, regionally relevant packages surface first.
- If not detectable, a sensible default order is shown.
- _[Method — IP-based vs manual region pick — decided in Phase 3.]_

### Package Detail

**Story 5 — View full package details**
As a visitor, I want to open a package and see everything it includes, so that I understand exactly what I'm getting and what it costs.

_Acceptance criteria:_

- Shows: full description, what's included (transport, stay, food, sightseeing, other), price, duration, photos.
- Pricing is transparent — no hidden-cost ambiguity.
- A clear, prominent way to enquire.

**Story 6 — Share a package**
As a visitor, I want to share a package link with friends or family, so that we can decide together.

_Acceptance criteria:_

- Each package has a clean, readable URL.
- When shared (WhatsApp/social), a preview shows title, image, and price.

### Enquiry

**Story 7 — Submit an enquiry**
As a visitor interested in a package, I want to submit an enquiry with my details, so that the agency can contact me to plan the trip.

_Acceptance criteria:_

- Form collects the details the owner needs to follow up _[exact fields pending owner confirmation — ASSUMPTION: name, phone, package, travel dates, number of people]._
- No login required.
- On submit, I see a clear confirmation ("Thanks, we'll call you shortly").
- The form is short and low-friction.

**Story 8 — Enquiry reaches the owner**
As the owner, I want every enquiry delivered to me reliably with all the customer's details, so that I can call them back and close the sale.

_Acceptance criteria:_

- Each submitted enquiry reaches the owner _[delivery method — email/WhatsApp/etc. — pending owner confirmation]._
- Includes which package, customer contact, and their provided details.
- No enquiry is silently lost.

### Empty & Error States

**Story 9 — No packages in a filter**
As a visitor who filtered to a category with no packages, I want a helpful message instead of a blank screen, so that I know to try another category.

**Story 10 — Enquiry submission fails**
As a visitor whose enquiry fails to send (network/server issue), I want a clear error and my entered details preserved, so that I can retry without re-typing everything.

_Acceptance criteria:_

- On failure, a clear message is shown.
- Form data is preserved for retry.
- Submission is atomic — either fully sent or clearly failed, never silently dropped.

---

## Functional Requirements (V1)

System behaviors required for V1. Each is numbered and maps to Goals and User Stories.

### FR-1: Package Display

- **FR-1.1** The system must display all available packages on a public page without requiring login.
- **FR-1.2** Each package summary must show: title/destination, primary photo, price, and duration.
- **FR-1.3** Package content must be loaded from a structured config source (file-based in v1), not hardcoded in components.
- **FR-1.4** The system must render correctly on screen widths from 360px (small phones) upward.

### FR-2: Filtering & Ordering

- **FR-2.1** The system must allow filtering packages by category (trip type).
- **FR-2.2** Categories must come from the package config, not be hardcoded in the UI.
- **FR-2.3** The system must order packages so regionally relevant ones appear first when the visitor's region is determinable.
- **FR-2.4** If the visitor's region cannot be determined, the system must fall back to a defined default order.
- **FR-2.5** Region detection method (IP-based vs manual selection) is resolved in Phase 3; the ordering behavior (FR-2.3) holds regardless of method.

### FR-3: Package Detail

- **FR-3.1** Each package must have its own detail view accessible via a unique, readable URL.
- **FR-3.2** The detail view must show: full description, inclusions (transport, accommodation, food, sightseeing, other), price, duration, and photos.
- **FR-3.3** The detail view must present a clear, prominent call-to-action to submit an enquiry.
- **FR-3.4** Pricing must be displayed transparently (what the price covers), avoiding hidden-cost ambiguity.

### FR-4: Shareability

- **FR-4.1** Each package URL must be human-readable (e.g., a slug derived from the package, not an opaque ID).
- **FR-4.2** Each package page must include social/link-preview metadata (Open Graph tags) so shared links show title, image, and price.

### FR-5: Enquiry Submission

- **FR-5.1** Each package detail view must provide an enquiry form, usable without login.
- **FR-5.2** The form must collect the fields the owner needs to follow up. _[ASSUMPTION pending owner confirmation: name, phone, package (auto-filled), travel dates, number of people.]_
- **FR-5.3** The system must validate required fields and a well-formed phone number before submission.
- **FR-5.4** On successful submission, the system must show a clear confirmation message.
- **FR-5.5** Enquiry submission must be atomic: either fully delivered or clearly failed — never partially sent or silently dropped.
- **FR-5.6** On submission failure, the system must show a clear error and preserve the user's entered data for retry.

### FR-6: Enquiry Delivery

- **FR-6.1** Each submitted enquiry must be delivered to the owner. _[ASSUMPTION pending confirmation: delivery via email; channel to be confirmed.]_
- **FR-6.2** The delivered enquiry must include: which package, customer contact details, and all submitted fields.
- **FR-6.3** Enquiries must be recorded/stored such that a delivery failure does not result in permanent loss of the enquiry. _(Implementation approach decided in Phase 3 — e.g., store-then-send.)_
- **FR-6.4** The enquiry endpoint must be rate-limited (IP-based) to prevent spam/abuse.
- **FR-6.5** Every enquiry must be persisted to storage (a database) before delivery is attempted. Delivery failure must not result in loss of the stored enquiry. _(Store-then-send.)_

### FR-7: Empty & Error States

- **FR-7.1** When a filter yields no packages, the system must show a helpful empty-state message, not a blank screen.
- **FR-7.2** Network, server, and validation errors must surface clear, user-readable messages — never raw codes or stack traces.

### FR-8: Architecture Constraints

- **FR-8.1** Package content structure must be defined such that a future admin interface (Phase 2) can create/edit/delete packages without changing the rendering code.
- **FR-8.2** The enquiry-handling logic must be separated from the delivery mechanism, so the delivery channel (email, WhatsApp, etc.) can change without rewriting enquiry handling.

### FR-9: Contact & Credibility

- **FR-9.1** The business phone number must be visible site-wide (e.g., header or persistent element), so visitors who prefer to call can do so without filling a form.
- **FR-9.2** The site must include an "About / Contact Us" section presenting who the agency is and how to reach them, to establish credibility with first-time visitors.

---

---

## Non-Functional Requirements (V1)

Qualities the system must exhibit, beyond what features it provides.

### NFR-1: Performance

- **NFR-1.1** The homepage must reach interactive state in ≤ 2.5 seconds on a typical mobile connection (4G). First impressions decide whether a visitor stays.
- **NFR-1.2** Package images must be optimized (compressed, appropriately sized, lazy-loaded) so they don't block page load.
- **NFR-1.3** Navigating from the package list to a package detail page must feel near-instant (≤ 1 second).
- **NFR-1.4** The enquiry submission must complete in ≤ 2 seconds under normal conditions.

### NFR-2: Reliability

- **NFR-2.1** The site must achieve ≥ 99% uptime over any rolling 30-day window.
- **NFR-2.2** Every submitted enquiry must be persisted before delivery is attempted; a delivery failure must never lose the enquiry (per FR-6.5).
- **NFR-2.3** Enquiry submission must be atomic — fully succeed or clearly fail, never partial or silent. On failure, the user's entered form data must be preserved for retry (per FR-5.6).
- **NFR-2.4** Errors must be logged with enough context to debug, without leaking customer personal data.

### NFR-3: Usability

- **NFR-3.1** The site must be fully responsive and functional on screen widths from 360px upward, since most visitors are on mobile.
- **NFR-3.2** Core actions (browse a package, find the phone number, submit an enquiry) must be reachable in ≤ 2 taps from any page.
- **NFR-3.3** Text must be legible on mobile without zooming; tap targets must be comfortably sized.
- **NFR-3.4** Error and confirmation messages must be in plain language.
- **NFR-3.5** The site must work on the latest two stable versions of Chrome, Safari, Firefox, and Edge.

### NFR-4: Credibility & Trust

- **NFR-4.1** The design must look professional and trustworthy — this is a core product goal, not cosmetic. A sketchy-looking site loses customers regardless of package quality.
- **NFR-4.2** Pricing and inclusions must be presented transparently (no hidden-cost ambiguity), as trust is the primary conversion driver.
- **NFR-4.3** Contact information (phone, about section) must be easy to find, signaling a real, reachable business.

### NFR-5: Shareability & Discoverability

- **NFR-5.1** Package URLs must be human-readable slugs.
- **NFR-5.2** Package pages must include Open Graph metadata so shared links render rich previews (title, image, price).
- **NFR-5.3** SEO basics must be in place: sensible page titles, meta descriptions, a sitemap, and mobile-friendliness. (SEO _campaigns_ are out of scope per Non-Goals.)

### NFR-6: Maintainability

- **NFR-6.1** Code style must be enforced by an automated linter and formatter (ESLint + Prettier).
- **NFR-6.2** Major architectural decisions must be documented as ADRs in `docs/decisions/`.
- **NFR-6.3** Package content must be editable via the config source without touching rendering code (per FR-8.1).
- **NFR-6.4** Since a second (less-experienced) developer may contribute, the codebase must be organized and documented well enough for him to onboard and contribute with guidance.

### NFR-7: Security

- **NFR-7.1** All traffic must use HTTPS.
- **NFR-7.2** The enquiry endpoint must be rate-limited (IP-based) to prevent spam (per FR-6.4).
- **NFR-7.3** Enquiry form input must be validated and sanitized to prevent injection and abuse.
- **NFR-7.4** Customer enquiry data must not be exposed publicly or logged insecurely.
- **NFR-7.5** Secrets (email service keys, DB credentials) must be stored in environment variables, never committed to git.

### NFR-8: Cost

- **NFR-8.1** Monthly infrastructure cost (hosting + database + email) must remain minimal, targeting under ₹800/month at v1 scale, within the overall budget. im on office now so . its for remember purpose
