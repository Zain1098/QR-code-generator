# QRForge Security & Privacy Policy

## 1. Authentication & Authorization
* Powered by Supabase Auth (JWTs stored in `httpOnly`, `Secure`, `SameSite=Lax` cookies).
* Strict Server-Side Validation: Client-side IDs (such as `/user?id=...`) are never trusted. All database queries execute either under the authenticated user's JWT context (`auth.uid()`) or via strict ownership verification checks.

## 2. Row Level Security (RLS)
* Every table in PostgreSQL (`profiles`, `qr_codes`, `qr_scans`, `folders`, `qr_templates`) has RLS enabled with explicit SELECT, INSERT, UPDATE, and DELETE policies.
* Cross-tenant access is structurally impossible at the database engine level.

## 3. Dynamic QR Analytics & Privacy
* **No Raw IP Storage:** Scanners' raw IP addresses are never recorded in database tables.
* **Anonymized Fingerprinting:** Unique scans are approximated using a SHA-256 hash combining:
  `hash(Client IP + User-Agent + Current Date)`
  This prevents identifying individual persons while accurately deduplicating daily scans.
* **Data Minimization:** Only high-level geographic region (e.g. Country, City) and client platform (Mobile vs Desktop, OS, Browser) are recorded.

## 4. Input Validation & Injection Prevention
* All user inputs are strictly parsed and sanitized using **Zod** schemas before processing.
* Dangerous inputs in SVG/HTML/vCard formatters are properly escaped against XSS and header injection.

## 5. Rate Limiting & Abuse Prevention
* In-memory sliding window rate limiting protects public and redirect endpoints from DDoS and scraping attacks.
* Limits on uploaded logo file types (`image/png`, `image/jpeg`, `image/svg+xml`, `image/webp`) and maximum file size (500KB) enforced client and server-side.
