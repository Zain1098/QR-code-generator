import Link from 'next/link';
import { ArrowLeft, GitCommit, Check } from 'lucide-react';

export const metadata = {
  title: 'Changelog // FORM QR Craft Systems',
  description: 'Engineering release notes and architectural updates for FORM // QR Studio.',
};

export default function ChangelogPage() {
  const releases = [
    {
      version: 'REV. 04 // 2026.09',
      date: 'September 2026',
      title: 'Stitch Atelier Redesign & Mobile Proofing Workbench',
      changes: [
        'Complete visual overhaul to Stitch Form QR Studio Dark Atelier & Canvas Paper design system.',
        'Zero-breakage mobile top proofing stage with live output and quick action rail.',
        'Integrated real-time WCAG AAA optical contrast calculator with automated warning tags.',
        'Full 12 QR schemas preserved with tactile direct-channel calibration wells.',
        'High-density physical substrate benchmarks (300gsm cotton, matte aluminum, silk screen).',
        'Structured Schema.org WebApplication & FAQPage JSON-LD integration for SEO & AEO.',
      ],
    },
    {
      version: 'REV. 03 // 2026.08',
      date: 'August 2026',
      title: 'Dynamic Routing & Archival Vector Pipeline',
      changes: [
        'Added high-resolution vector SVG export with precision path optimization.',
        'Multi-format rasterization (Archival WebP & 2048px high-density PNG).',
        'Dynamic URL redirect engine with encrypted tracking hashes.',
      ],
    },
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
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
          TECHNICAL LEDGER // RELEASE ARCHIVE
        </span>
      </div>
      <h1 className="font-mono text-3xl font-bold uppercase tracking-tight text-ink-primary dark:text-dark-ink-primary mb-3">
        Changelog
      </h1>
      <p className="text-sm text-ink-muted dark:text-dark-ink-muted mb-8">
        Chronological record of engine improvements, matrix styling updates, and architectural enhancements.
      </p>

      <div className="space-y-6">
        {releases.map((rel) => (
          <div
            key={rel.version}
            className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
              <span className="font-mono text-xs font-bold text-ink-primary dark:text-dark-ink-primary tracking-wider">
                {rel.version}
              </span>
              <span className="font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted">
                {rel.date}
              </span>
            </div>
            <h2 className="font-sans text-base font-semibold text-ink-primary dark:text-dark-ink-primary mb-3">
              {rel.title}
            </h2>
            <ul className="space-y-2">
              {rel.changes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-ink-muted dark:text-dark-ink-muted">
                  <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
