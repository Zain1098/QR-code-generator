# QRForge Architecture & Technical Specification

## Overview

QRForge is a full-featured, scalable, multi-tenant QR code generation and dynamic redirect SaaS platform built with Next.js App Router, TypeScript, Tailwind CSS, and Supabase (PostgreSQL, Auth, Storage).

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer                            │
│  - Landing Page (SSR)                                       │
│  - Public QR Creator (CSR with qr-code-styling)             │
│  - Responsive User Dashboard & Analytics                    │
│  - Bulk Generation Studio with Web Workers / CSV Parser     │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JSON API / Redirects
┌──────────────────────────────▼──────────────────────────────┐
│                    Next.js App Router                        │
│  - Dynamic Edge Redirect: /q/[code]                         │
│  - RESTful API Endpoints: /api/qr, /api/folders, etc.       │
│  - Auth Middleware & Session Refresh                        │
│  - Rate Limiter & Security Header Validation                │
└──────────────────────────────┬──────────────────────────────┘
                               │ Supabase SDK / RLS
┌──────────────────────────────▼──────────────────────────────┐
│                   Supabase Data Layer                       │
│  - PostgreSQL with Row-Level Security (RLS)                 │
│  - Auth Engine (JWT, Email Verification, Passwords)         │
│  - Object Storage (Logo & Asset persistence)                │
└─────────────────────────────────────────────────────────────┘
```

## System Components

### 1. Static vs. Dynamic QR System

* **Static QR Codes:** The encoded string contains the complete, final payload (e.g. WiFi credentials, vCard, mailto URI, direct URL). Generation is executed client-side via `qr-code-styling` without server round-trips or database dependency.
* **Dynamic QR Codes:** The encoded string points exclusively to an immutable short link (`https://domain.com/q/{short_code}`).
  * The short link is resolved in the Route Handler (`src/app/q/[code]/route.ts`).
  * If active: increments `total_scans`, logs device, OS, browser, anonymized geographic region, and issues a `302 Found` redirect.
  * If paused or disabled: routes to `/q/{short_code}/inactive`.
  * If expired: routes to `/q/{short_code}/expired`.

### 2. Supported QR Types (12 Formats)

1. **URL:** Standard web addresses with auto-normalization.
2. **Plain Text:** UTF-8 text up to 2,000 characters.
3. **Wi-Fi:** `WIFI:T:WPA;S:...;P:...;H:...;;` with WPA/WPA2, WEP, and hidden network support.
4. **vCard 3.0:** Comprehensive digital business card encoding first name, last name, phone, email, organization, title, URL, and full address.
5. **Email:** RFC-compliant `mailto:` with subject and pre-filled body.
6. **Phone:** Direct `tel:` protocol.
7. **SMS:** Direct `smsto:` protocol with pre-filled message text.
8. **WhatsApp:** `https://wa.me/{number}?text={encoded}` with sanitized international country code formatting.
9. **Location:** Standard RFC 5870 `geo:` coordinates with map query label.
10. **Event:** RFC 5545 iCalendar `VEVENT` with summary, start date, end date, location, and description.
11. **Social:** Profiles for X/Twitter, Instagram, Facebook, LinkedIn, YouTube, TikTok, GitHub, and websites.
12. **Payment:** Standardized payment link schema.

### 3. Customization & Scannability Engine

* Customization includes:
  * 6 Dot patterns: square, dots, rounded, extra-rounded, classy, classy-rounded.
  * 4 Corner Eye patterns: square, dot, extra-rounded.
  * Independent corner eye colors and corner dot colors.
  * Error correction levels: L (7%), M (15%), Q (25%), H (30%).
  * Logo upload with auto-upgrade to High (H) error correction, sizing, and padding.
  * Contrast ratio validator checking WCAG compliance between foreground and background colors in real-time.
