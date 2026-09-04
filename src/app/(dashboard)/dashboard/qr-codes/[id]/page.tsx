'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, PlusCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function QrCodeDetailPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-3">
        <RefreshCw className="w-6 h-6 animate-spin text-ink-muted dark:text-dark-ink-muted" />
        <span className="font-mono text-xs uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted">
          Querying Matrix Registry...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 pb-5 border-b border-border-hairpin dark:border-dark-border">
        <Link 
          href="/dashboard/qr-codes" 
          className="p-2 border border-border-hairpin dark:border-dark-border hover:bg-surface-workbench dark:hover:bg-dark-surface text-ink-muted hover:text-ink-primary dark:text-dark-ink-muted dark:hover:text-dark-ink-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted dark:text-dark-ink-muted font-semibold">
            SPECIMEN RECORD // {String(params.id || 'NULL').slice(0, 12)}
          </span>
          <h1 className="font-mono text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink-primary dark:text-dark-ink-primary">
            Matrix Record Status
          </h1>
        </div>
      </div>

      <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-8 sm:p-12 text-center max-w-xl mx-auto rounded-none">
        <div className="w-14 h-14 bg-print-bed dark:bg-dark-panel border border-border-hairpin dark:border-dark-border flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-7 h-7 text-ink-muted dark:text-dark-ink-muted" />
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted dark:text-dark-ink-muted font-semibold mb-1">
          REGISTRY FAULT: SPECIMEN NOT FOUND
        </div>
        <h3 className="font-mono text-base font-bold uppercase text-ink-primary dark:text-dark-ink-primary mb-2">
          Matrix Index Unreachable
        </h3>
        <p className="text-xs text-ink-muted dark:text-dark-ink-muted mb-6 max-w-md mx-auto font-sans leading-relaxed">
          The requested vector matrix does not exist in your active atelier repository, has expired, or requires elevated authorization.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link 
            href="/dashboard/qr-codes" 
            className="px-4 py-2.5 border border-border-hairpin dark:border-dark-border text-ink-primary dark:text-dark-ink-primary font-mono text-xs uppercase tracking-wider hover:bg-print-bed dark:hover:bg-dark-panel transition-colors"
          >
            Return to Ledger
          </Link>
          <Link 
            href="/create" 
            className="inline-flex items-center justify-center gap-2 bg-ink-primary hover:bg-black text-white dark:bg-dark-ink-primary dark:hover:bg-white dark:text-dark-canvas px-4 py-2.5 font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Craft New Matrix</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
