'use client';

import React, { useState, useEffect } from 'react';
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function DashboardLayout({
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
    <div className="min-h-screen bg-canvas-paper dark:bg-dark-canvas text-ink-primary dark:text-dark-ink-primary transition-colors duration-200">
      <DashboardSidebar />
      <div className="md:pl-[240px] pt-14 md:pt-0 min-h-screen flex flex-col">
        {/* Top Desktop Workbench Utility Header */}
        <header className="hidden md:flex h-14 items-center justify-between px-6 border-b border-border-hairpin dark:border-dark-border bg-canvas-paper/90 dark:bg-dark-canvas/90 backdrop-blur-sm sticky top-0 z-30 transition-colors">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400"></span>
            <span className="font-mono text-xs font-semibold tracking-wider text-ink-primary dark:text-dark-ink-primary uppercase">
              OPERATOR WORKBENCH
            </span>
            <span className="text-ink-muted dark:text-dark-ink-muted font-mono text-xs">//</span>
            <span className="font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted uppercase">
              ISO/IEC 18004 ACTIVE
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* LT / DK segmented theme switcher */}
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

            <div className="h-4 w-hairpin bg-border-hairpin dark:bg-dark-border"></div>

            <Link
              href="/create"
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-mono uppercase tracking-wider font-semibold rounded-none bg-ink-primary hover:bg-black text-white dark:bg-dark-ink-primary dark:hover:bg-white dark:text-dark-canvas transition-colors shadow-sm"
            >
              + Craft Matrix
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1 font-mono text-xs text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary transition-colors"
            >
              <span>Site &rarr;</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
