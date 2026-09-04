'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === 'dark';

  return (
    <div className="min-h-screen bg-canvas-paper dark:bg-dark-canvas text-ink-primary dark:text-dark-ink-primary flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      {/* Top Header Rail */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO ATELIER</span>
        </Link>

        {/* LT / DK toggle */}
        <div className="flex items-center bg-print-bed dark:bg-dark-panel p-0.5 rounded border border-border-hairpin dark:border-dark-border">
          <button
            type="button"
            onClick={() => setTheme('light')}
            aria-label="Light theme"
            className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold uppercase transition-all ${
              !isDark
                ? 'bg-surface-workbench dark:bg-dark-surface text-ink-primary dark:text-dark-ink-primary shadow-sm'
                : 'text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary'
            }`}
          >
            LT
          </button>
          <button
            type="button"
            onClick={() => setTheme('dark')}
            aria-label="Dark theme"
            className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold uppercase transition-all ${
              isDark
                ? 'bg-surface-workbench dark:bg-dark-surface text-ink-primary dark:text-dark-ink-primary shadow-sm'
                : 'text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary'
            }`}
          >
            DK
          </button>
        </div>
      </div>

      {/* Main Form Center */}
      <div className="w-full max-w-md mx-auto my-8">
        {/* Brand Stamp */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 select-none group">
            <span className="w-2.5 h-2.5 bg-ink-primary dark:bg-dark-ink-primary rounded-none inline-block transition-transform group-hover:scale-110"></span>
            <span className="font-mono text-base font-semibold tracking-wider text-ink-primary dark:text-dark-ink-primary">FORM</span>
            <span className="text-ink-muted dark:text-dark-ink-muted font-mono text-base">//</span>
            <span className="font-mono text-base tracking-widest text-ink-muted dark:text-dark-ink-muted">QR</span>
          </Link>
          <p className="font-mono text-[10px] tracking-widest text-ink-muted dark:text-dark-ink-muted uppercase mt-1">
            Archival Matrix Authentication Gateway
          </p>
        </div>

        {children}
      </div>

      {/* Archival Ledger Footer */}
      <div className="max-w-4xl w-full mx-auto text-center pt-6 border-t border-border-hairpin dark:border-dark-border">
        <p className="font-mono text-[10px] text-ink-muted dark:text-dark-ink-muted uppercase tracking-wider">
          FORM // QR SECURITY LAYER &bull; ISO/IEC 18004 COMPLIANT SESSION PROTOCOL
        </p>
      </div>
    </div>
  );
}
