# QRForge — Modern QR Code SaaS Platform

A production-grade, full-stack QR code creation, customization, management, and dynamic analytics platform built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase (PostgreSQL & Auth)**.

---

## ✨ Key Features

### 🚀 Core QR Generator
* **12 Supported QR Code Types:**
  * **URL:** Links with automatic protocol normalization.
  * **Plain Text:** UTF-8 text messages up to 2,000 characters.
  * **Wi-Fi:** Network SSID, WPA/WPA2/WEP passwords, and hidden network toggles.
  * **vCard 3.0:** Comprehensive digital contact cards.
  * **Email:** Standard `mailto:` with prefilled subject and body.
  * **Phone:** One-tap calling via `tel:` URI.
  * **SMS:** Text message triggers with optional pre-filled content.
  * **WhatsApp:** Direct chat triggers with sanitized international dialing formats.
  * **Location:** Map pin coordinates via `geo:` protocol.
  * **Event:** iCalendar `VEVENT` format for calendar additions.
  * **Social Media:** Direct profile links for X/Twitter, Instagram, GitHub, LinkedIn, YouTube, TikTok, Facebook.
  * **Payment:** Payment recipient links.

### 🎨 Advanced Customization & Scannability Safety
* **Styling Options:** 6 distinct dot styles, 4 corner eye styles, corner dot styles, custom foreground/background colors, and color presets.
* **Branded Logos:** Upload custom logos (PNG, JPEG, SVG, WebP) with configurable scaling and margin.
* **Scannability Guardian:** Real-time WCAG contrast ratio calculation preventing unreadable color combinations before exporting.
* **High-Resolution Export:** Download as PNG (up to 4096px print quality), scalable SVG, WebP, or copy directly to clipboard.

### 🔗 Dynamic QR System & Edge Redirection
* **Static QR Codes:** Client-side generation without mandatory account registration.
* **Dynamic QR Codes:** Point to lightweight `/q/[code]` redirects. Change target destinations anytime without reprinting physical QR materials.
* **State Management:** Enable, disable, or set automatic expiration dates on dynamic codes.

### 📊 Privacy-Preserving Scan Analytics
* Real-time scan metrics: Total scans, scans over time, device breakdown, browser share, and geographic locations.
* **Zero raw IP address retention** — scans use one-way cryptographic SHA-256 fingerprinting for deduplication.

### 📁 Folders, Templates & Bulk Studio
* **Project Organization:** Group QR codes into colored folders.
* **Templates:** 8 pre-designed industry templates (Restaurant menus, Wi-Fi stickers, Event cards, etc.) plus custom user templates.
* **Bulk QR Studio:** Upload CSV files to generate hundreds of high-res QR codes simultaneously and download as a structured ZIP archive.

---

## 🛠️ Technology Stack

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Components & Route Handlers)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [next-themes](https://github.com/pacocoursey/next-themes) (Dark Mode)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security)
* **QR Engine:** [qr-code-styling](https://github.com/kozakdenys/qr-code-styling)
* **Validation:** [Zod](https://zod.dev/)
* **Testing:** [Vitest](https://vitest.dev/)
* **Data Processing:** [PapaParse](https://www.papaparse.com/) & [JSZip](https://stuk.github.io/jszip/)

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Zain1098/QR-code-generator.git
cd QR-code-generator
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your Supabase credentials:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=QRForge
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Setup Database Schema
Execute the SQL migration located at `supabase/migrations/001_initial_schema.sql` inside your Supabase SQL Editor.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification

```bash
# Run unit tests
npm test

# Type checking
npm run type-check

# Production build
npm run build
```

---

## 📖 Documentation

* [Architecture Overview](docs/architecture.md)
* [Database Schema & RLS](docs/database.md)
* [REST API Reference](docs/api.md)
* [Security & Privacy Standards](docs/security.md)
* [Production Deployment Guide](docs/deployment.md)

---

## 📄 License

MIT License.
