'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Globe, 
  Type, 
  Wifi, 
  Contact, 
  Mail, 
  Phone, 
  MessageSquare, 
  MessageCircle, 
  MapPin, 
  Calendar, 
  Share2, 
  CreditCard, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  X,
  Layers,
  Sparkles,
  ShieldCheck,
  Crop,
  Focus,
  Download,
  ArrowRight,
  Sliders,
  Palette,
  BarChart3,
  QrCode
} from 'lucide-react';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const qrTypes = [
    { id: 'url', name: 'URL', code: 'SCHEMA: HTTP/S', icon: Globe, desc: 'Websites, links & landing pages' },
    { id: 'text', name: 'Plain Text', code: 'SCHEMA: UTF-8', icon: Type, desc: 'Raw unformatted text strings' },
    { id: 'wifi', name: 'Wi-Fi Network', code: 'SCHEMA: WPA/2/3', icon: Wifi, desc: 'Auto-join wireless credentials' },
    { id: 'vcard', name: 'vCard Contact', code: 'SCHEMA: VCARD 3.0', icon: Contact, desc: 'Direct contact card import' },
    { id: 'email', name: 'Email Dispatch', code: 'SCHEMA: MAILTO', icon: Mail, desc: 'Pre-filled subject & body' },
    { id: 'phone', name: 'Phone Dial', code: 'SCHEMA: TEL', icon: Phone, desc: 'Direct telephonic dialer' },
    { id: 'sms', name: 'SMS Prompt', code: 'SCHEMA: SMSTO', icon: MessageSquare, desc: 'Mobile SMS transmission' },
    { id: 'whatsapp', name: 'WhatsApp Link', code: 'SCHEMA: WA.ME', icon: MessageCircle, desc: 'Instant messaging chat jump' },
    { id: 'location', name: 'Geographic Pin', code: 'SCHEMA: GEO', icon: MapPin, desc: 'GPS latitude & longitude coordinates' },
    { id: 'event', name: 'Calendar Event', code: 'SCHEMA: VEVENT', icon: Calendar, desc: 'iCal & Google Calendar invite' },
    { id: 'social', name: 'Social Profile', code: 'SCHEMA: BIO.LINK', icon: Share2, desc: 'Multi-channel social landing' },
    { id: 'payment', name: 'Payment Trigger', code: 'SCHEMA: UPI/PAY', icon: CreditCard, desc: 'Direct payment request routing' },
  ];

  const features = [
    {
      title: '12 Payload Schema Types',
      desc: 'Complete support for web URLs, Wi-Fi keys, vCard 3.0, WhatsApp, SMS, GPS coordinates, and payment requests.',
      icon: <QrCode className="w-5 h-5" />,
      badge: 'ISO 18004 STANDARD'
    },
    {
      title: 'Certified Photometric Contrast',
      desc: 'Real-time WCAG AAA contrast ratio calculation ensures optical CMOS readers recognize matrix codes under dim ambient light.',
      icon: <Sliders className="w-5 h-5" />,
      badge: 'WCAG AAA PASS'
    },
    {
      title: 'Dynamic Routing & Telemetry',
      desc: 'Update the destination URL anytime without reprinting physical press collateral, with real-time scan analytics.',
      icon: <BarChart3 className="w-5 h-5" />,
      badge: 'ZERO REPRINTING'
    },
    {
      title: 'Archival Vector SVG Output',
      desc: 'Export mathematical vector paths for billboard printing, laser engraving, and lithography with zero degradation.',
      icon: <Download className="w-5 h-5" />,
      badge: 'INFINITE RESOLUTION'
    },
    {
      title: 'Physical Substrate Calibration',
      desc: 'Engineered presets for uncoated cotton paper, thermal corrugate, and synthetic backlit signage.',
      icon: <Layers className="w-5 h-5" />,
      badge: '±0.04MM TOLERANCE'
    },
    {
      title: 'Insignia & Emblem Embedding',
      desc: 'Safely integrate company logos into the center matrix with automatic elevation to Reed-Solomon Level H (30% recovery).',
      icon: <Palette className="w-5 h-5" />,
      badge: 'REED-SOLOMON 30%'
    },
  ];

  const faqs = [
    {
      q: 'What is the minimum recommended print size for a scannable QR code?',
      a: 'For standard optical smartphone cameras, the minimum scannable dimension is 20 × 20 mm (approx. 0.8 × 0.8 inches) for low-density payloads like short URLs. For complex, high-density payloads such as vCard contacts, we recommend a minimum print size of 35 × 35 mm combined with Reed-Solomon Error Correction Level H to ensure optical camera capture.'
    },
    {
      q: 'What is the difference between static and dynamic QR codes?',
      a: 'Static QR codes encode the data directly into the black and white pixel matrix. They work indefinitely without servers and never expire, but their destination cannot be changed once printed. Dynamic QR codes route through a short redirect URL, allowing you to update the target content at any time without reprinting and enabling live scan analytics.'
    },
    {
      q: 'Why should I export in SVG format instead of PNG for physical printing?',
      a: 'Vector SVG (Scalable Vector Graphics) encodes matrix paths mathematically rather than as fixed pixel rasters. When sent to commercial litho presses, foil stampers, or large-format billboard printers, SVG scales infinitely without blur, pixelation, or scanning failure.'
    },
    {
      q: 'How does WCAG contrast verification guarantee scannability?',
      a: 'Camera sensors require substantial optical contrast between the matrix dots (foreground ink) and the substrate (background paper). Our tool calculates the exact photometric contrast ratio in real time. A ratio of 7:1+ (WCAG AAA) guarantees immediate scannability even in challenging shadows or harsh glares.'
    },
    {
      q: 'Can I safely upload my company logo into the center of the QR code?',
      a: 'Yes. When an emblem or logo is uploaded, FORM // QR automatically upgrades error recovery to Reed-Solomon Level H. This reserves up to 30% redundant matrix data so that optical scanners easily reconstruct any information occluded by the logo.'
    },
    {
      q: 'Are generated QR codes free for commercial and packaging use?',
      a: 'Yes. All static QR codes generated on FORM // QR are completely free, unencumbered by royalties, and ready for commercial print packaging, retail products, and digital collateral.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-canvas-paper dark:bg-dark-canvas text-ink-primary dark:text-dark-ink-primary pt-14 transition-colors duration-200">
      
      {/* 1. HERO SECTION: Specimen Atelier Stage */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-10 pb-16 md:py-20 border-b border-border-hairpin dark:border-dark-border">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-5">
          
          {/* Top Specimen Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-print-bed dark:bg-dark-panel rounded border border-border-hairpin dark:border-dark-border font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
            <span>SPECIMEN UTILITY // REV. 04</span>
            <span>•</span>
            <span className="text-dark-accent dark:text-dark-accent-hover font-semibold">CERTIFIED ISO 18004</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl font-sans text-ink-primary dark:text-dark-ink-primary">
            QR Craft &amp; Specimen Generator
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-ink-muted dark:text-dark-ink-muted max-w-2xl font-sans leading-relaxed">
            Configure high-density matrix codes for print packaging, brand identities, and physical collateral with certified optical legibility and vector SVG export.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full sm:w-auto">
            <Link
              href="/create"
              className="w-full sm:w-auto h-12 px-6 bg-ink-primary hover:bg-black text-white dark:bg-dark-ink-primary dark:hover:bg-white dark:text-dark-canvas rounded font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
            >
              <span>Launch QR Atelier</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#press-specs"
              className="w-full sm:w-auto h-12 px-5 bg-surface-workbench dark:bg-dark-panel hover:bg-print-bed dark:hover:bg-dark-surface text-ink-primary dark:text-dark-ink-primary border border-border-hairpin dark:border-dark-border rounded font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>Explore Specifications</span>
            </Link>
          </div>

          {/* Authentic Live Specimen Exhibition Plate */}
          <div className="w-full max-w-2xl mt-8 pt-4">
            <div className="w-full bg-print-bed dark:bg-dark-panel p-6 sm:p-8 rounded-xl relative border border-border-hairpin dark:border-dark-border shadow-md overflow-hidden flex flex-col items-center">
              {/* Drafting crosshairs */}
              <div className="absolute top-3 left-3 font-mono text-[10px] text-ink-muted dark:text-dark-ink-muted pointer-events-none select-none flex items-center gap-1">
                <Crop className="w-3.5 h-3.5" />
                <span>0,0 CROP_LT</span>
              </div>
              <div className="absolute top-3 right-3 font-mono text-[10px] text-ink-muted dark:text-dark-ink-muted pointer-events-none select-none flex items-center gap-1">
                <span>PRINT_RT</span>
                <Focus className="w-3.5 h-3.5" />
              </div>
              <div className="absolute bottom-3 left-3 font-mono text-[10px] text-ink-muted dark:text-dark-ink-muted pointer-events-none select-none">
                <span>DRAFT: 100% SCALE</span>
              </div>
              <div className="absolute bottom-3 right-3 font-mono text-[10px] text-ink-muted dark:text-dark-ink-muted pointer-events-none select-none">
                <span>PASS: OPTICAL-99.8</span>
              </div>

              {/* Substrate Card */}
              <div className="bg-white p-6 sm:p-8 rounded shadow-md relative my-4 flex flex-col items-center justify-center max-w-[280px] aspect-square w-full">
                {/* Corner registration brackets */}
                <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-black/30"></div>
                <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-black/30"></div>
                <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-black/30"></div>
                <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-black/30"></div>

                {/* Crisp Vector QR Specimen */}
                <svg className="w-full h-full text-zinc-900" viewBox="0 0 29 29" shapeRendering="crispEdges">
                  <rect width="29" height="29" fill="#FFFFFF" />
                  <rect x="2" y="2" width="7" height="7" fill="currentColor" />
                  <rect x="3" y="3" width="5" height="5" fill="#FFFFFF" />
                  <rect x="4" y="4" width="3" height="3" fill="currentColor" />

                  <rect x="20" y="2" width="7" height="7" fill="currentColor" />
                  <rect x="21" y="3" width="5" height="5" fill="#FFFFFF" />
                  <rect x="22" y="4" width="3" height="3" fill="currentColor" />

                  <rect x="2" y="20" width="7" height="7" fill="currentColor" />
                  <rect x="3" y="21" width="5" height="5" fill="#FFFFFF" />
                  <rect x="4" y="22" width="3" height="3" fill="currentColor" />

                  <rect x="18" y="18" width="5" height="5" fill="currentColor" />
                  <rect x="19" y="19" width="3" height="3" fill="#FFFFFF" />
                  <rect x="20" y="20" width="1" height="1" fill="currentColor" />

                  <rect x="10" y="4" width="1" height="1" fill="currentColor" />
                  <rect x="12" y="4" width="1" height="1" fill="currentColor" />
                  <rect x="14" y="4" width="1" height="1" fill="currentColor" />
                  <rect x="16" y="4" width="1" height="1" fill="currentColor" />
                  <rect x="18" y="4" width="1" height="1" fill="currentColor" />

                  <rect x="4" y="10" width="1" height="1" fill="currentColor" />
                  <rect x="4" y="12" width="1" height="1" fill="currentColor" />
                  <rect x="4" y="14" width="1" height="1" fill="currentColor" />
                  <rect x="4" y="16" width="1" height="1" fill="currentColor" />
                  <rect x="4" y="18" width="1" height="1" fill="currentColor" />

                  <rect x="10" y="2" width="1" height="2" fill="currentColor" />
                  <rect x="12" y="2" width="2" height="1" fill="currentColor" />
                  <rect x="16" y="2" width="1" height="1" fill="currentColor" />
                  <rect x="18" y="2" width="1" height="2" fill="currentColor" />
                  <rect x="10" y="7" width="3" height="1" fill="currentColor" />
                  <rect x="14" y="6" width="1" height="3" fill="currentColor" />
                  <rect x="17" y="7" width="2" height="1" fill="currentColor" />
                  <rect x="2" y="11" width="2" height="1" fill="currentColor" />
                  <rect x="6" y="10" width="2" height="2" fill="currentColor" />
                  <rect x="9" y="11" width="1" height="3" fill="currentColor" />
                  <rect x="11" y="10" width="2" height="1" fill="currentColor" />
                  <rect x="14" y="11" width="3" height="2" fill="currentColor" />
                  <rect x="18" y="10" width="2" height="1" fill="currentColor" />
                  <rect x="22" y="10" width="1" height="3" fill="currentColor" />
                  <rect x="25" y="11" width="2" height="2" fill="currentColor" />
                  <rect x="7" y="14" width="2" height="1" fill="currentColor" />
                  <rect x="10" y="13" width="2" height="2" fill="currentColor" />
                  <rect x="13" y="14" width="2" height="1" fill="currentColor" />
                  <rect x="17" y="13" width="1" height="3" fill="currentColor" />
                  <rect x="20" y="14" width="2" height="2" fill="currentColor" />
                  <rect x="24" y="14" width="3" height="1" fill="currentColor" />
                  <rect x="2" y="15" width="2" height="2" fill="currentColor" />
                  <rect x="6" y="17" width="1" height="2" fill="currentColor" />
                  <rect x="8" y="16" width="3" height="1" fill="currentColor" />
                  <rect x="12" y="17" width="2" height="1" fill="currentColor" />
                  <rect x="15" y="16" width="1" height="3" fill="currentColor" />
                  <rect x="23" y="16" width="2" height="1" fill="currentColor" />
                  <rect x="26" y="17" width="1" height="2" fill="currentColor" />
                </svg>

                <div className="absolute bottom-1.5 text-center w-full">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-400">
                    ATELIER SWISS PROOF // ZERO DEGRADATION
                  </span>
                </div>
              </div>

              {/* Specimen Ledger Pill */}
              <div className="w-full max-w-sm bg-surface-workbench dark:bg-dark-surface px-3 py-1.5 rounded border border-border-hairpin dark:border-dark-border shadow-sm flex items-center justify-between font-mono text-[10px] text-ink-muted dark:text-dark-ink-muted">
                <span className="text-ink-primary dark:text-dark-ink-primary font-semibold">SPECIMEN № 042</span>
                <span>512 × 512 PT</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
                  ISO 18004 PASS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 12 PAYLOAD SCHEMAS GRID */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted dark:text-dark-ink-muted font-semibold">
              Schema Library
            </span>
            <h2 className="text-2xl font-bold text-ink-primary dark:text-dark-ink-primary font-sans">
              12 High-Density Payload Protocols
            </h2>
          </div>
          <Link
            href="/create"
            className="text-xs font-mono uppercase tracking-wider text-dark-accent dark:text-dark-accent-hover hover:underline flex items-center gap-1"
          >
            <span>Open All in Atelier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {qrTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Link
                key={type.id}
                href="/create"
                className="group p-3.5 bg-surface-workbench dark:bg-dark-panel rounded-lg border border-border-hairpin dark:border-dark-border hover:border-ink-primary dark:hover:border-dark-ink-primary transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-4 h-4 text-ink-muted dark:text-dark-ink-muted group-hover:text-ink-primary dark:group-hover:text-dark-ink-primary transition-colors" />
                    <span className="font-mono text-[9px] text-ink-muted dark:text-dark-ink-muted uppercase">{type.id}</span>
                  </div>
                  <div className="text-xs font-semibold text-ink-primary dark:text-dark-ink-primary leading-tight">
                    {type.name}
                  </div>
                  <p className="text-[11px] text-ink-muted dark:text-dark-ink-muted mt-1 leading-snug">
                    {type.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-border-hairpin/60 dark:border-dark-border/60 font-mono text-[9px] text-ink-muted dark:text-dark-ink-muted truncate">
                  {type.code}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. OPTICAL SUBSTRATE BENCHMARKS (Press Readiness) */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-print-bed/60 dark:bg-dark-surface/50 border-y border-border-hairpin dark:border-dark-border" id="press-specs">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted dark:text-dark-ink-muted font-semibold">
              Press Readiness Ledger
            </span>
            <h2 className="text-2xl font-bold text-ink-primary dark:text-dark-ink-primary font-sans">
              Optical Substrate Benchmarks &amp; Press Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-surface-workbench dark:bg-dark-panel rounded-xl border border-border-hairpin dark:border-dark-border shadow-sm space-y-2.5">
              <div className="flex items-center justify-between font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted">
                <span>BENCH 01 // MATTE</span>
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-ink-primary dark:text-dark-ink-primary">
                Uncoated Cotton Stock 340gsm
              </h3>
              <p className="text-xs text-ink-muted dark:text-dark-ink-muted leading-relaxed">
                High ink absorption rates require Reed-Solomon Error Correction Level H to counteract edge feathering under 300 DPI litho presses.
              </p>
              <div className="pt-2 font-mono text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                TOLERANCE: ±0.04mm
              </div>
            </div>

            <div className="p-6 bg-surface-workbench dark:bg-dark-panel rounded-xl border border-border-hairpin dark:border-dark-border shadow-sm space-y-2.5">
              <div className="flex items-center justify-between font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted">
                <span>BENCH 02 // THERMAL</span>
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-ink-primary dark:text-dark-ink-primary">
                Packaging Foil &amp; Corrugate
              </h3>
              <p className="text-xs text-ink-muted dark:text-dark-ink-muted leading-relaxed">
                Curved cylindrical surfaces require module size expansion to a minimum of 0.35mm per matrix element for handheld CMOS readers.
              </p>
              <div className="pt-2 font-mono text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                MIN SCALE: 25 × 25mm
              </div>
            </div>

            <div className="p-6 bg-surface-workbench dark:bg-dark-panel rounded-xl border border-border-hairpin dark:border-dark-border shadow-sm space-y-2.5">
              <div className="flex items-center justify-between font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted">
                <span>BENCH 03 // VECTOR</span>
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-ink-primary dark:text-dark-ink-primary">
                Architectural Signage &amp; Outdoor
              </h3>
              <p className="text-xs text-ink-muted dark:text-dark-ink-muted leading-relaxed">
                Exporting infinite resolution SVG vectors guarantees zero blur or jagged pixels when scaled onto metal plaques or giant display banners.
              </p>
              <div className="pt-2 font-mono text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                SCALING: INFINITE VECTOR
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STATIC VS DYNAMIC MATRIX ARCHITECTURE */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto w-full">
        <div className="text-center mb-10 space-y-1">
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted dark:text-dark-ink-muted font-semibold">
            Architectural Choice
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-primary dark:text-dark-ink-primary font-sans">
            Static Embedded vs. Dynamic Routing
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Static Card */}
          <div className="p-6 rounded-xl border border-border-hairpin dark:border-dark-border bg-surface-workbench dark:bg-dark-panel space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink-primary dark:text-dark-ink-primary font-sans">
                Static Embedded Matrix
              </h3>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-print-bed dark:bg-dark-surface text-ink-muted dark:text-dark-ink-muted uppercase">
                Zero Server Dependency
              </span>
            </div>
            <ul className="space-y-2.5 text-xs text-ink-muted dark:text-dark-ink-muted">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Raw data embedded directly into the physical matrix modules.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Works forever offline, never expires, completely free.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-ink-muted/50 flex-shrink-0 mt-0.5" />
                <span>Destination URL cannot be changed once printed on paper.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-ink-muted/50 flex-shrink-0 mt-0.5" />
                <span>No scan count analytics or geographical telemetry.</span>
              </li>
            </ul>
          </div>

          {/* Dynamic Card */}
          <div className="p-6 rounded-xl border-2 border-ink-primary dark:border-dark-ink-primary bg-surface-workbench dark:bg-dark-panel space-y-4 shadow-sm relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink-primary dark:text-dark-ink-primary font-sans">
                Dynamic Routing Matrix
              </h3>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-ink-primary text-white dark:bg-dark-ink-primary dark:text-dark-canvas font-semibold uppercase">
                Recommended For Press
              </span>
            </div>
            <ul className="space-y-2.5 text-xs text-ink-muted dark:text-dark-ink-muted">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Change destination URL anytime without reprinting packaging or collateral.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Real-time telemetry: scan counts, devices, operating systems, and countries.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Lower visual matrix density allows ultra-small physical print sizes (20mm).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Password protection and scheduled expiry dates supported.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. ENGINE CAPABILITIES */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-print-bed/60 dark:bg-dark-surface/50 border-t border-border-hairpin dark:border-dark-border" id="features">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted dark:text-dark-ink-muted font-semibold">
              Engine Specifications
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink-primary dark:text-dark-ink-primary font-sans">
              Calibrated For Press &amp; Digital Collateral
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-5 bg-surface-workbench dark:bg-dark-panel rounded-xl border border-border-hairpin dark:border-dark-border shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded bg-print-bed dark:bg-dark-surface flex items-center justify-center text-ink-primary dark:text-dark-ink-primary">
                      {feature.icon}
                    </div>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-print-bed dark:bg-dark-surface text-ink-muted dark:text-dark-ink-muted font-semibold">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-ink-primary dark:text-dark-ink-primary">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-ink-muted dark:text-dark-ink-muted leading-relaxed mt-1">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TRANSPARENT PRICING TIERS */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto w-full" id="pricing">
        <div className="text-center mb-10 space-y-1">
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted dark:text-dark-ink-muted font-semibold">
            Commercial Tiers
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-primary dark:text-dark-ink-primary font-sans">
            Transparent Atelier Licensing
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="p-6 rounded-xl border border-border-hairpin dark:border-dark-border bg-surface-workbench dark:bg-dark-panel flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <div className="font-mono text-[10px] uppercase text-ink-muted dark:text-dark-ink-muted font-semibold">TIER 01</div>
                <h3 className="text-xl font-bold text-ink-primary dark:text-dark-ink-primary font-sans">Free Atelier</h3>
              </div>
              <div className="font-mono text-3xl font-bold text-ink-primary dark:text-dark-ink-primary">$0</div>
              <ul className="space-y-2 text-xs text-ink-muted dark:text-dark-ink-muted">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Unlimited Static QR Codes</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> High-Resolution PNG Download</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Standard Error Correction Levels</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Direct Channel Color Calibration</li>
              </ul>
            </div>
            <Link
              href="/create"
              className="mt-6 w-full py-2.5 text-center text-xs font-mono font-semibold uppercase rounded border border-border-hairpin dark:border-dark-border bg-print-bed dark:bg-dark-surface hover:bg-canvas-paper dark:hover:bg-dark-panel text-ink-primary dark:text-dark-ink-primary transition-colors"
            >
              Start Generating
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="p-6 rounded-xl border-2 border-ink-primary dark:border-dark-ink-primary bg-surface-workbench dark:bg-dark-panel flex flex-col justify-between shadow-md relative">
            <span className="absolute -top-2.5 right-6 px-2 py-0.5 rounded bg-ink-primary text-white dark:bg-dark-ink-primary dark:text-dark-canvas font-mono text-[9px] uppercase font-bold">
              MOST POPULAR
            </span>
            <div className="space-y-4">
              <div>
                <div className="font-mono text-[10px] uppercase text-ink-muted dark:text-dark-ink-muted font-semibold">TIER 02</div>
                <h3 className="text-xl font-bold text-ink-primary dark:text-dark-ink-primary font-sans">Studio Pro</h3>
              </div>
              <div className="font-mono text-3xl font-bold text-ink-primary dark:text-dark-ink-primary">$12 <span className="text-xs text-ink-muted dark:text-dark-ink-muted font-normal">/ mo</span></div>
              <ul className="space-y-2 text-xs text-ink-muted dark:text-dark-ink-muted">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Everything in Free</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Infinite Resolution Vector SVG Export</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> 50 Dynamic QR Codes with Analytics</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Insignia / Center Logo Embedding</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Custom Corner Squares &amp; Dot Styles</li>
              </ul>
            </div>
            <Link
              href="/signup?plan=pro"
              className="mt-6 w-full py-2.5 text-center text-xs font-mono font-semibold uppercase rounded bg-ink-primary hover:bg-black text-white dark:bg-dark-ink-primary dark:hover:bg-white dark:text-dark-canvas transition-colors shadow-sm"
            >
              Upgrade to Pro
            </Link>
          </div>

          {/* Business Tier */}
          <div className="p-6 rounded-xl border border-border-hairpin dark:border-dark-border bg-surface-workbench dark:bg-dark-panel flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <div className="font-mono text-[10px] uppercase text-ink-muted dark:text-dark-ink-muted font-semibold">TIER 03</div>
                <h3 className="text-xl font-bold text-ink-primary dark:text-dark-ink-primary font-sans">Commercial Press</h3>
              </div>
              <div className="font-mono text-3xl font-bold text-ink-primary dark:text-dark-ink-primary">$39 <span className="text-xs text-ink-muted dark:text-dark-ink-muted font-normal">/ mo</span></div>
              <ul className="space-y-2 text-xs text-ink-muted dark:text-dark-ink-muted">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Everything in Studio Pro</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> 500 Dynamic QR Codes</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Automated REST API Access</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Bulk Matrix Compilation</li>
              </ul>
            </div>
            <Link
              href="/signup?plan=business"
              className="mt-6 w-full py-2.5 text-center text-xs font-mono font-semibold uppercase rounded border border-border-hairpin dark:border-dark-border bg-print-bed dark:bg-dark-surface hover:bg-canvas-paper dark:hover:bg-dark-panel text-ink-primary dark:text-dark-ink-primary transition-colors"
            >
              Contact Press Sales
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION: Answer Engine Optimized (AEO) */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-print-bed/60 dark:bg-dark-surface/50 border-t border-border-hairpin dark:border-dark-border">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted dark:text-dark-ink-muted font-semibold">
              Technical Inquiries
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink-primary dark:text-dark-ink-primary font-sans">
              Frequently Asked Technical Questions
            </h2>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-surface-workbench dark:bg-dark-panel rounded-lg border border-border-hairpin dark:border-dark-border overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full px-4 py-3.5 flex justify-between items-center text-left text-xs font-semibold text-ink-primary dark:text-dark-ink-primary select-none focus:outline-none"
                >
                  <span className="pr-4">{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-4 h-4 text-ink-muted dark:text-dark-ink-muted flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-ink-muted dark:text-dark-ink-muted flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4 text-xs text-ink-muted dark:text-dark-ink-muted leading-relaxed border-t border-border-hairpin/60 dark:border-dark-border/60 pt-2.5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. MASTER ACTION CALLOUT */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 max-w-5xl mx-auto w-full text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-ink-primary dark:text-dark-ink-primary font-sans">
          Deploy Certified Optical Matrices Today
        </h2>
        <p className="text-xs sm:text-sm text-ink-muted dark:text-dark-ink-muted max-w-xl mx-auto leading-relaxed">
          Zero sign-up friction. Launch the craft station, calibrate your ink substrate, and export print-ready vector SVGs in seconds.
        </p>
        <div className="pt-2">
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ink-primary hover:bg-black text-white dark:bg-dark-ink-primary dark:hover:bg-white dark:text-dark-canvas rounded font-mono text-xs uppercase font-semibold tracking-wider shadow-sm transition-all"
          >
            <span>Open Generator Atelier</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
