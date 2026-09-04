'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, LayoutGrid, List, PlusCircle, MoreVertical, Edit, Download, Copy, Archive, Trash2 } from 'lucide-react';

export default function QrCodesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-border-hairpin dark:border-dark-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 inline-block"></span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted dark:text-dark-ink-muted font-semibold">
              INDEX // MATRIX REPOSITORY
            </span>
          </div>
          <h1 className="font-mono text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink-primary dark:text-dark-ink-primary">
            QR Matrices
          </h1>
          <p className="text-xs text-ink-muted dark:text-dark-ink-muted mt-1 font-sans">
            Manage, filter, and calibrate generated physical and dynamic matrices.
          </p>
        </div>
        <Link 
          href="/create" 
          className="inline-flex items-center gap-2 bg-ink-primary hover:bg-black text-white dark:bg-dark-ink-primary dark:hover:bg-white dark:text-dark-canvas px-4 py-2.5 rounded-none font-mono text-xs uppercase tracking-wider font-semibold shadow-sm transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Craft Matrix</span>
        </Link>
      </div>

      {/* Filters and Actions Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-surface-workbench dark:bg-dark-surface p-4 border border-border-hairpin dark:border-dark-border shadow-sm transition-colors rounded-none">
        <div className="flex-1 w-full md:w-auto relative">
          <Search className="w-4 h-4 text-ink-muted dark:text-dark-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search matrix registry..." 
            className="w-full md:max-w-md pl-9 pr-4 py-2 border border-border-hairpin dark:border-dark-border bg-canvas-paper dark:bg-dark-panel text-ink-primary dark:text-dark-ink-primary text-xs font-mono rounded-none outline-none focus:border-ink-primary dark:focus:border-dark-ink-primary"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <select className="px-3 py-2 border border-border-hairpin dark:border-dark-border bg-canvas-paper dark:bg-dark-panel text-ink-primary dark:text-dark-ink-primary text-xs font-mono rounded-none outline-none">
            <option value="">ALL SCHEMAS</option>
            <option value="url">URL LINK</option>
            <option value="vcard">VCARD CONTACT</option>
            <option value="wifi">WI-FI NETWORK</option>
            <option value="text">PLAIN TEXT</option>
          </select>
          
          <select className="px-3 py-2 border border-border-hairpin dark:border-dark-border bg-canvas-paper dark:bg-dark-panel text-ink-primary dark:text-dark-ink-primary text-xs font-mono rounded-none outline-none">
            <option value="">STATUS: ALL</option>
            <option value="active">ACTIVE</option>
            <option value="disabled">DISABLED</option>
            <option value="archived">ARCHIVED</option>
          </select>

          <div className="flex items-center bg-print-bed dark:bg-dark-panel p-0.5 border border-border-hairpin dark:border-dark-border">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-none font-mono text-[10px] ${viewMode === 'grid' ? 'bg-surface-workbench dark:bg-dark-surface text-ink-primary dark:text-dark-ink-primary shadow-sm' : 'text-ink-muted dark:text-dark-ink-muted'}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-none font-mono text-[10px] ${viewMode === 'list' ? 'bg-surface-workbench dark:bg-dark-surface text-ink-primary dark:text-dark-ink-primary shadow-sm' : 'text-ink-muted dark:text-dark-ink-muted'}`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border shadow-sm p-8 min-h-[380px] flex items-center justify-center rounded-none transition-colors">
        {isLoading ? (
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 bg-print-bed dark:bg-dark-panel mb-4"></div>
            <div className="h-4 bg-print-bed dark:bg-dark-panel w-48 mb-2"></div>
            <div className="h-3 bg-print-bed dark:bg-dark-panel w-32"></div>
          </div>
        ) : (
          <div className="text-center max-w-md mx-auto">
            <div className="w-12 h-12 bg-print-bed dark:bg-dark-panel border border-border-hairpin dark:border-dark-border flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-ink-muted dark:text-dark-ink-muted" />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted dark:text-dark-ink-muted font-semibold mb-1">
              RECORD COUNT: 0
            </div>
            <h3 className="font-mono text-base font-bold uppercase text-ink-primary dark:text-dark-ink-primary mb-2">
              No QR Matrices Found
            </h3>
            <p className="text-xs text-ink-muted dark:text-dark-ink-muted mb-6 font-sans">
              No active matrix specimens match your registry criteria. Create your first calibrated QR code to populate the ledger.
            </p>
            <Link 
              href="/create" 
              className="inline-flex items-center gap-2 bg-ink-primary hover:bg-black text-white dark:bg-dark-ink-primary dark:hover:bg-white dark:text-dark-canvas px-5 py-2.5 rounded-none font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Craft First Matrix</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
