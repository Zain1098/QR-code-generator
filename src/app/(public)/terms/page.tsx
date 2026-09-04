import Link from 'next/link';
import { ArrowLeft, FileText, Check, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service - FORM // QR Atelier',
  description: 'Usage protocols, license terms, and vector matrix rights for FORM // QR.',
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO ATELIER</span>
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 bg-ink-primary dark:bg-dark-ink-primary inline-block"></span>
          <span className="font-mono text-[11px] tracking-widest uppercase text-ink-muted dark:text-dark-ink-muted font-semibold">
            TERMS & CONDITIONS // REV. 2026.09
          </span>
        </div>
        <h1 className="font-mono text-3xl sm:text-4xl font-bold uppercase tracking-tight text-ink-primary dark:text-dark-ink-primary">
          Terms of Service
        </h1>
        <p className="font-sans text-sm text-ink-muted dark:text-dark-ink-muted mt-2">
          Last updated: September 4, 2026. Governing protocol for using the FORM // QR craft studio.
        </p>
      </div>

      <div className="space-y-8 bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-6 sm:p-10">
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-ink-primary dark:text-dark-ink-primary font-mono text-sm font-semibold uppercase tracking-wider">
            <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>01. Vector Intellectual Property Ownership</span>
          </div>
          <p className="text-xs sm:text-sm text-ink-muted dark:text-dark-ink-muted leading-relaxed font-sans">
            You retain 100% full commercial ownership and licensing rights over all matrix assets, SVG vector blueprints, PNG raster proofs, and WebP renders generated using FORM // QR. You may reproduce, print on physical collateral, package, and distribute your generated codes worldwide without royalty obligations.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-border-hairpin dark:border-dark-border">
          <div className="flex items-center gap-2 text-ink-primary dark:text-dark-ink-primary font-mono text-sm font-semibold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>02. Acceptable Operator Conduct</span>
          </div>
          <p className="text-xs sm:text-sm text-ink-muted dark:text-dark-ink-muted leading-relaxed font-sans">
            Operators may not utilize FORM // QR to generate malicious redirection vectors, phishing campaigns, deceptive spoofing mechanisms, or malware distribution URLs. We reserve the right to immediately terminate access to accounts engaging in predatory or illegal matrix dissemination.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-border-hairpin dark:border-dark-border">
          <div className="flex items-center gap-2 text-ink-primary dark:text-dark-ink-primary font-mono text-sm font-semibold uppercase tracking-wider">
            <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>03. Physical Printing & Substrate Scannability</span>
          </div>
          <p className="text-xs sm:text-sm text-ink-muted dark:text-dark-ink-muted leading-relaxed font-sans">
            While FORM // QR provides automated WCAG AAA optical contrast ratios and ISO/IEC 18004 error correction calibration, physical substrate results may vary based on print resolution, ink saturation, and surface reflectivity. Operators are advised to conduct physical proof scans prior to full volume press runs.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-border-hairpin dark:border-dark-border">
          <h2 className="text-ink-primary dark:text-dark-ink-primary font-mono text-sm font-semibold uppercase tracking-wider">
            04. Service Warranty & Limits
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted dark:text-dark-ink-muted leading-relaxed font-sans">
            The studio platform is provided on an &quot;as is&quot; and &quot;as available&quot; basis. In no event shall FORM // QR or its engineers be held liable for indirect or consequential damages resulting from third-party URL downtime or print house calibration variance.
          </p>
        </section>
      </div>
    </div>
  );
}
