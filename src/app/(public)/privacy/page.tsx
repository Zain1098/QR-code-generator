import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, EyeOff } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy - FORM // QR Atelier',
  description: 'Archival privacy and data handling protocols for FORM // QR matrix studio.',
};

export default function PrivacyPage() {
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
          <span className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 inline-block"></span>
          <span className="font-mono text-[11px] tracking-widest uppercase text-ink-muted dark:text-dark-ink-muted font-semibold">
            LEGAL PROTOCOL // REV. 2026.09
          </span>
        </div>
        <h1 className="font-mono text-3xl sm:text-4xl font-bold uppercase tracking-tight text-ink-primary dark:text-dark-ink-primary">
          Privacy Policy
        </h1>
        <p className="font-sans text-sm text-ink-muted dark:text-dark-ink-muted mt-2">
          Last updated: September 4, 2026. Designed with zero-degradation client-first privacy architecture.
        </p>
      </div>

      <div className="space-y-8 bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-6 sm:p-10">
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-ink-primary dark:text-dark-ink-primary font-mono text-sm font-semibold uppercase tracking-wider">
            <Lock className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>01. Client-Side Payload Execution</span>
          </div>
          <p className="text-xs sm:text-sm text-ink-muted dark:text-dark-ink-muted leading-relaxed font-sans">
            FORM // QR utilizes client-side vector synthesis for matrix rendering. Standard static QR generation payloads (such as URLs, Wi-Fi credentials, vCard contact information, SMS, and geolocation coordinates) are rendered directly within your local browser canvas. Your sensitive Wi-Fi passcodes and private contact cards are never logged or sold to third-party advertising networks.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-border-hairpin dark:border-dark-border">
          <div className="flex items-center gap-2 text-ink-primary dark:text-dark-ink-primary font-mono text-sm font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>02. Account & Authentication Telemetry</span>
          </div>
          <p className="text-xs sm:text-sm text-ink-muted dark:text-dark-ink-muted leading-relaxed font-sans">
            When you register an operator account, we store your contact email address, encrypted authentication hashes, and saved matrix configurations. This data is utilized solely to provide persistent folder storage, custom templates, and team collaboration capabilities.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-border-hairpin dark:border-dark-border">
          <div className="flex items-center gap-2 text-ink-primary dark:text-dark-ink-primary font-mono text-sm font-semibold uppercase tracking-wider">
            <EyeOff className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>03. Tracking & Cookies</span>
          </div>
          <p className="text-xs sm:text-sm text-ink-muted dark:text-dark-ink-muted leading-relaxed font-sans">
            We do not employ cross-site behavioral tracking cookies. Cookies utilized by FORM // QR are strictly restricted to essential session persistence (keeping you securely signed in to your workbench) and interface preferences (remembering your Light/Dark mode choice).
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-border-hairpin dark:border-dark-border">
          <h2 className="text-ink-primary dark:text-dark-ink-primary font-mono text-sm font-semibold uppercase tracking-wider">
            04. Contact Our Data Governance Lab
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted dark:text-dark-ink-muted leading-relaxed font-sans">
            If you have questions regarding data privacy, account deletion requests, or archival retention policies, please reach out to our privacy desk at{' '}
            <span className="font-mono text-ink-primary dark:text-dark-ink-primary font-semibold">privacy@formqr.studio</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
