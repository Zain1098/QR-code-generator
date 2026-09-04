'use client';

import React, { useState } from 'react';
import { Calendar, BarChart3, Smartphone, Globe, MapPin, Activity, Radio, Cpu, ArrowUpRight } from 'lucide-react';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7d');

  return (
    <div className="space-y-6">
      {/* Workbench Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-border-hairpin dark:border-dark-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 inline-block"></span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted dark:text-dark-ink-muted font-semibold">
              TELEMETRY LOG // SENSOR SUITE
            </span>
          </div>
          <h1 className="font-mono text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink-primary dark:text-dark-ink-primary">
            Scan Analytics
          </h1>
          <p className="text-xs text-ink-muted dark:text-dark-ink-muted mt-1 font-sans">
            Real-time optical decodes, geographical distributions, and client user-agent telemetry.
          </p>
        </div>
        
        {/* Date Range Selector */}
        <div className="flex items-center gap-2 border border-border-hairpin dark:border-dark-border bg-surface-workbench dark:bg-dark-surface p-1">
          <Calendar className="w-3.5 h-3.5 text-ink-muted dark:text-dark-ink-muted ml-2" />
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-2 py-1.5 bg-transparent text-ink-primary dark:text-dark-ink-primary font-mono text-xs uppercase tracking-wider outline-none cursor-pointer"
          >
            <option value="7d" className="bg-surface-workbench dark:bg-dark-surface">Last 7 Days</option>
            <option value="30d" className="bg-surface-workbench dark:bg-dark-surface">Last 30 Days</option>
            <option value="90d" className="bg-surface-workbench dark:bg-dark-surface">Last 90 Days</option>
            <option value="all" className="bg-surface-workbench dark:bg-dark-surface">All Historical Telemetry</option>
          </select>
        </div>
      </div>

      {/* Top Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Total Scans Card */}
        <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-5 lg:col-span-1 rounded-none">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[9px] tracking-widest uppercase text-ink-muted dark:text-dark-ink-muted font-semibold">
              TOTAL DECODES
            </span>
            <Radio className="w-4 h-4 text-ink-muted dark:text-dark-ink-muted animate-pulse" />
          </div>
          <div className="mt-2">
            <p className="font-mono text-3xl sm:text-4xl font-bold text-ink-primary dark:text-dark-ink-primary">0</p>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border-hairpin dark:border-dark-border font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">0.0%</span>
              <span>DELTA VS PRIOR EPOCH</span>
            </div>
          </div>
        </div>

        {/* Chart Specimen Frame */}
        <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-5 lg:col-span-2 flex flex-col rounded-none">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-border-hairpin dark:border-dark-border">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary">
              Temporal Distribution (24H Timeline)
            </span>
            <span className="font-mono text-[10px] text-ink-muted dark:text-dark-ink-muted">
              ISO_18004_DECODE
            </span>
          </div>
          <div className="flex-1 min-h-[160px] flex items-center justify-center border border-dashed border-border-hairpin dark:border-dark-border bg-print-bed/40 dark:bg-dark-panel/40 p-6">
            <div className="text-center">
              <Activity className="w-6 h-6 text-ink-muted dark:text-dark-ink-muted mx-auto mb-2 opacity-50" />
              <p className="font-mono text-xs uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted">
                Insufficient Decodes to Render Histogram
              </p>
              <p className="font-sans text-[11px] text-ink-muted/80 dark:text-dark-ink-muted/80 mt-1">
                Awaiting client scans from physical matrix deployments.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdowns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Device Architectures */}
        <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-5 rounded-none">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-border-hairpin dark:border-dark-border">
            <div className="flex items-center gap-2">
              <Smartphone className="w-3.5 h-3.5 text-ink-muted dark:text-dark-ink-muted" />
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary">
                Device Platforms
              </h2>
            </div>
            <span className="font-mono text-[9px] text-ink-muted dark:text-dark-ink-muted">HARDWARE</span>
          </div>
          <div className="flex flex-col items-center justify-center py-8 text-center bg-print-bed/30 dark:bg-dark-panel/30 border border-border-hairpin/60 dark:border-dark-border/60">
            <Cpu className="w-8 h-8 text-ink-muted dark:text-dark-ink-muted mb-2 opacity-40" />
            <p className="font-mono text-xs text-ink-muted dark:text-dark-ink-muted uppercase">Zero Client Handshakes</p>
          </div>
        </div>

        {/* Browser Engines */}
        <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-5 rounded-none">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-border-hairpin dark:border-dark-border">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-ink-muted dark:text-dark-ink-muted" />
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary">
                User Agents
              </h2>
            </div>
            <span className="font-mono text-[9px] text-ink-muted dark:text-dark-ink-muted">CLIENT_SPEC</span>
          </div>
          <div className="flex flex-col items-center justify-center py-8 text-center bg-print-bed/30 dark:bg-dark-panel/30 border border-border-hairpin/60 dark:border-dark-border/60">
            <Globe className="w-8 h-8 text-ink-muted dark:text-dark-ink-muted mb-2 opacity-40" />
            <p className="font-mono text-xs text-ink-muted dark:text-dark-ink-muted uppercase">No Navigation Recorded</p>
          </div>
        </div>

        {/* Geographical Telemetry */}
        <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-5 rounded-none">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-border-hairpin dark:border-dark-border">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-ink-muted dark:text-dark-ink-muted" />
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary">
                Coordinates
              </h2>
            </div>
            <span className="font-mono text-[9px] text-ink-muted dark:text-dark-ink-muted">GEO_IP</span>
          </div>
          <div className="flex flex-col items-center justify-center py-8 text-center bg-print-bed/30 dark:bg-dark-panel/30 border border-border-hairpin/60 dark:border-dark-border/60">
            <MapPin className="w-8 h-8 text-ink-muted dark:text-dark-ink-muted mb-2 opacity-40" />
            <p className="font-mono text-xs text-ink-muted dark:text-dark-ink-muted uppercase">No Ingress Vectors</p>
          </div>
        </div>
      </div>
    </div>
  );
}
