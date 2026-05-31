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
