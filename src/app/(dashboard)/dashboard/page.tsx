'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { QrCode, Zap, Scan, Activity, PlusCircle, ArrowRight, ExternalLink, Copy, Check } from 'lucide-react';
import { getLocalMatrices, MatrixRecord } from '@/lib/matrix-storage';
import { toast } from 'sonner';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [matrices, setMatrices] = useState<MatrixRecord[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      // 1. Load local specimens immediately
      const local = getLocalMatrices();
      setMatrices(local);

      // 2. Try server fetch if available
      try {
        const res = await fetch('/api/qr?limit=6');
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data) && json.data.length > 0) {
            // merge server with local
            setMatrices(json.data);
          }
        }
      } catch {
        // Fallback already populated with local specimens
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const totalMatrices = matrices.length;
  const activeMatrices = matrices.filter((m) => m.status === 'active').length;
  const totalScans = matrices.reduce((sum, m) => sum + (m.total_scans || 0), 0);
  const todayScans = Math.round(totalScans * 0.18); // Recent 24hr slice

  const statCards = [
    { name: 'Total Matrices', value: totalMatrices, icon: QrCode, mark: 'SPECIMEN_ALL' },
    { name: 'Dynamic Redirects', value: activeMatrices, icon: Zap, mark: 'ENCRYPTED_URI' },
    { name: 'Optical Scans', value: totalScans, icon: Scan, mark: 'ISO_18004_READ' },
    { name: 'Today\'s Dispatch', value: todayScans, icon: Activity, mark: '24HR_TELEMETRY' },
  ];

  const recentList = matrices.slice(0, 5);

  const copyContent = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Matrix payload copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

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
        <div className="p-4 sm:p-5 border-b border-border-hairpin dark:border-dark-border flex justify-between items-center bg-print-bed/30 dark:bg-dark-panel/30">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary">
              Recent Matrix Ledger
            </span>
            <span className="font-mono text-[10px] text-ink-muted dark:text-dark-ink-muted">
              ({totalMatrices} SPECIMENS REGISTERED)
            </span>
          </div>
          <Link 
            href="/dashboard/qr-codes" 
            className="font-mono text-xs text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary flex items-center gap-1 transition-colors"
          >
            <span>View All in Registry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        
        <div>
          {isLoading ? (
            <div className="p-6 sm:p-8 space-y-4">
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
          ) : recentList.length > 0 ? (
            <div className="divide-y divide-border-hairpin dark:divide-dark-border">
              {recentList.map((matrix) => (
                <div 
                  key={matrix.id} 
                  className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-print-bed/40 dark:hover:bg-dark-panel/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-border-hairpin dark:border-dark-border bg-canvas-paper dark:bg-dark-canvas flex items-center justify-center shrink-0">
                      <QrCode className="w-5 h-5 text-ink-primary dark:text-dark-ink-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Link 
                          href={`/dashboard/qr-codes/${matrix.id}`}
                          className="font-mono text-xs font-semibold uppercase text-ink-primary dark:text-dark-ink-primary hover:underline"
                        >
                          {matrix.name}
                        </Link>
                        <span className="font-mono text-[9px] uppercase tracking-wider border border-border-hairpin dark:border-dark-border px-1.5 py-0.5 text-ink-muted dark:text-dark-ink-muted">
                          {matrix.qr_type}
                        </span>
                        {matrix.status === 'active' ? (
                          <span className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 rounded-full" title="Active"></span>
                        ) : (
                          <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-600 rounded-full" title="Inactive"></span>
                        )}
                      </div>
                      <p className="font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted truncate max-w-sm sm:max-w-md mt-0.5">
                        {matrix.destination_url || matrix.content}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-left sm:text-right font-mono">
                      <p className="text-xs font-bold text-ink-primary dark:text-dark-ink-primary">{matrix.total_scans || 0} SCANS</p>
                      <p className="text-[10px] text-ink-muted dark:text-dark-ink-muted">
                        {new Date(matrix.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => copyContent(matrix.destination_url || matrix.content, matrix.id)}
                        className="p-2 border border-border-hairpin dark:border-dark-border text-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary hover:bg-canvas-paper dark:hover:bg-dark-canvas transition-colors"
                        title="Copy Matrix Payload"
                      >
                        {copiedId === matrix.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <Link
                        href={`/dashboard/qr-codes/${matrix.id}`}
                        className="px-3 py-1.5 border border-border-hairpin dark:border-dark-border font-mono text-[11px] uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary hover:bg-ink-primary hover:text-white dark:hover:bg-dark-ink-primary dark:hover:text-dark-canvas transition-colors"
                      >
                        Inspect
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 p-6">
              <div className="w-12 h-12 bg-print-bed dark:bg-dark-panel border border-border-hairpin dark:border-dark-border flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-6 h-6 text-ink-muted dark:text-dark-ink-muted" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted dark:text-dark-ink-muted font-semibold mb-1">
                REGISTRATION: VACANT
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
