'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { QrCode, Zap, Scan, Activity, PlusCircle, ArrowRight } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    scansTotal: 0,
    scansToday: 0
  });
  const [recentQrs, setRecentQrs] = useState<any[]>([]);

  useEffect(() => {
    // Mock fetch for now as instructed, show 0s and empty
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const statCards = [
    { name: 'Total Matrices', value: stats.total, icon: QrCode, mark: 'SPECIMEN_ALL' },
    { name: 'Dynamic Redirects', value: stats.active, icon: Zap, mark: 'ENCRYPTED_URI' },
    { name: 'Optical Scans', value: stats.scansTotal, icon: Scan, mark: 'ISO_18004_READ' },
    { name: 'Today\'s Dispatch', value: stats.scansToday, icon: Activity, mark: '24HR_TELEMETRY' },
  ];

  return (
    <div className="space-y-6">
      {/* Workbench Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-border-hairpin dark:border-dark-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 inline-block"></span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted dark:text-dark-ink-muted font-semibold">
              REPOSITORY LEDGER // DESK 01
            </span>
          </div>
          <h1 className="font-mono text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink-primary dark:text-dark-ink-primary">
            Operator Desk
          </h1>
          <p className="text-xs text-ink-muted dark:text-dark-ink-muted mt-1 font-sans">
            Archival repository of high-density QR assets, vector profiles, and physical substrate proofs.
          </p>
        </div>
        <Link 
          href="/create" 
          className="inline-flex items-center gap-2 bg-ink-primary hover:bg-black text-white dark:bg-dark-ink-primary dark:hover:bg-white dark:text-dark-canvas px-4 py-2.5 rounded-none font-mono text-xs uppercase tracking-wider font-semibold shadow-sm transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Craft New Matrix</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <div 
            key={i} 
            className="bg-surface-workbench dark:bg-dark-surface p-5 border border-border-hairpin dark:border-dark-border shadow-sm transition-colors rounded-none"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="font-mono text-[9px] tracking-widest uppercase text-ink-muted dark:text-dark-ink-muted font-semibold">
                {stat.mark}
              </span>
              <stat.icon className="w-4 h-4 text-ink-muted dark:text-dark-ink-muted" />
            </div>
            <div>
              <p className="font-mono text-xs text-ink-muted dark:text-dark-ink-muted uppercase">{stat.name}</p>
              {isLoading ? (
                <div className="h-7 w-16 bg-print-bed dark:bg-dark-panel rounded-none animate-pulse mt-1"></div>
              ) : (
                <p className="font-mono text-2xl font-bold text-ink-primary dark:text-dark-ink-primary mt-1">{stat.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recent QR Codes */}
      <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border shadow-sm transition-colors rounded-none">
        <div className="p-4 sm:p-5 border-b border-border-hairpin dark:border-dark-border flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary">
              Recent Matrix Ledger
            </span>
            <span className="font-mono text-[10px] text-ink-muted dark:text-dark-ink-muted">
              (ZERO DEGRADATION)
            </span>
          </div>
          <Link 
            href="/dashboard/qr-codes" 
            className="font-mono text-xs text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        
        <div className="p-6 sm:p-10">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-4 animate-pulse">
                  <div className="w-10 h-10 bg-print-bed dark:bg-dark-panel"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-print-bed dark:bg-dark-panel w-1/4"></div>
                    <div className="h-3 bg-print-bed dark:bg-dark-panel w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentQrs.length > 0 ? (
            <div className="divide-y divide-border-hairpin dark:divide-dark-border">
              {/* List would go here */}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-12 h-12 bg-print-bed dark:bg-dark-panel border border-border-hairpin dark:border-dark-border flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-6 h-6 text-ink-muted dark:text-dark-ink-muted" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted dark:text-dark-ink-muted font-semibold mb-1">
                REGISTRATION: EMPTY
              </div>
              <h3 className="font-mono text-base font-bold uppercase text-ink-primary dark:text-dark-ink-primary mb-2">
                No Matrix Specimens In Repository
              </h3>
              <p className="text-xs text-ink-muted dark:text-dark-ink-muted mb-6 max-w-sm mx-auto font-sans leading-relaxed">
                Generate your initial calibrated QR matrix to begin tracking optical telemetry, scan volume, and vector proofs.
              </p>
              <Link 
                href="/create" 
                className="inline-flex items-center gap-2 bg-ink-primary hover:bg-black text-white dark:bg-dark-ink-primary dark:hover:bg-white dark:text-dark-canvas px-5 py-2.5 rounded-none font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Launch QR Craft Station</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
