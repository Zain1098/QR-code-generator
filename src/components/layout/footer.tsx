import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    studio: [
      { name: 'Matrix Atelier', href: '/create' },
      { name: 'Substrate Specs', href: '/#press-specs' },
      { name: 'Engine Features', href: '/#features' },
      { name: 'Pricing Tiers', href: '/#pricing' },
    ],
    technical: [
      { name: 'ISO 18004 Standard', href: '/#press-specs' },
      { name: 'Vector SVG Calibration', href: '/create' },
      { name: 'WCAG AAA Contrast Guide', href: '/create' },
      { name: 'API Reference', href: '/docs' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Security & Integrity', href: '/privacy' },
    ],
    connect: [
      { name: 'GitHub Architecture', href: 'https://github.com' },
      { name: 'Engineering Changelog', href: '/changelog' },
      { name: 'Contact Lab', href: '/contact' },
    ],
  };

  return (
    <footer className="bg-canvas-paper dark:bg-dark-canvas border-t border-border-hairpin dark:border-dark-border pt-14 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info & Technical Seal */}
          <div className="lg:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2 select-none group">
              <span className="w-2.5 h-2.5 bg-ink-primary dark:bg-dark-ink-primary rounded-none inline-block"></span>
              <span className="font-mono text-sm font-semibold tracking-wider text-ink-primary dark:text-dark-ink-primary">FORM</span>
              <span className="text-ink-muted dark:text-dark-ink-muted font-mono text-sm">//</span>
              <span className="font-mono text-sm tracking-widest text-ink-muted dark:text-dark-ink-muted">QR</span>
            </Link>
            <p className="text-xs text-ink-muted dark:text-dark-ink-muted leading-relaxed font-sans">
              Precision matrix generation utility calibrated for physical print collateral, high-density packaging, and optical scannability.
            </p>
            <div className="pt-2 font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted space-y-1">
              <div>REV. 04 // LAB PROOF</div>
              <div className="text-emerald-700 dark:text-emerald-400 font-semibold">ISO/IEC 18004 READY</div>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-ink-muted dark:text-dark-ink-muted mb-4 font-semibold">
                Studio
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.studio.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-xs text-ink-primary dark:text-dark-ink-primary hover:underline transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-ink-muted dark:text-dark-ink-muted mb-4 font-semibold">
                Technical
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.technical.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-xs text-ink-primary dark:text-dark-ink-primary hover:underline transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-ink-muted dark:text-dark-ink-muted mb-4 font-semibold">
                Integrity
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-xs text-ink-primary dark:text-dark-ink-primary hover:underline transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-ink-muted dark:text-dark-ink-muted mb-4 font-semibold">
                Engine
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.connect.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-xs text-ink-primary dark:text-dark-ink-primary hover:underline transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Ledger */}
        <div className="pt-6 border-t border-border-hairpin dark:border-dark-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted">
            &copy; {currentYear} FORM // QR CRAFT SYSTEMS. ZERO DEGRADATION ARCHIVAL SPECIMEN.
          </p>
          <div className="flex items-center gap-3 font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
              ENGINE ONLINE
            </span>
            <span>/</span>
            <span>WCAG AAA OPTICAL PASS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
