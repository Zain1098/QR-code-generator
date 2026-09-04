'use client';

import React from 'react';
import Link from 'next/link';
import { Layout, Utensils, Wifi, Briefcase, Calendar, Share2, ShoppingBag, Contact, CreditCard, ArrowUpRight } from 'lucide-react';

const SYSTEM_TEMPLATES = [
  { id: 'menu', name: 'Culinary Menu', type: 'URL', icon: Utensils, code: 'SPEC_01', desc: 'Minimalist editorial food & wine carte' },
  { id: 'wifi', name: 'Studio WiFi', type: 'WiFi', icon: Wifi, code: 'SPEC_02', desc: 'Secure wireless network passkey' },
  { id: 'vcard', name: 'Architect vCard', type: 'vCard', icon: Briefcase, code: 'SPEC_03', desc: 'High-density physical business specimen' },
  { id: 'event', name: 'Exhibition Pass', type: 'Event', icon: Calendar, code: 'SPEC_04', desc: 'Private vernissage calendar booking' },
  { id: 'social', name: 'Curated Dossier', type: 'Social', icon: Share2, code: 'SPEC_05', desc: 'Editorial index of social identities' },
  { id: 'product', name: 'Artifact Catalog', type: 'URL', icon: ShoppingBag, code: 'SPEC_06', desc: 'Apparel hangtag & serial registry' },
  { id: 'contact', name: 'Direct Dispatch', type: 'vCard', icon: Contact, code: 'SPEC_07', desc: 'Tactile press contact certificate' },
  { id: 'payment', name: 'Direct Remittance', type: 'URL', icon: CreditCard, code: 'SPEC_08', desc: 'Encrypted crypto or digital payment rail' },
];

export default function TemplatesPage() {
  return (
    <div className="space-y-8">
      {/* Workbench Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-border-hairpin dark:border-dark-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 inline-block"></span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted dark:text-dark-ink-muted font-semibold">
              CALIBRATED BLUEPRINTS // TEMPLATES
            </span>
          </div>
          <h1 className="font-mono text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink-primary dark:text-dark-ink-primary">
            Matrix Blueprints
          </h1>
          <p className="text-xs text-ink-muted dark:text-dark-ink-muted mt-1 font-sans">
            Pre-calibrated vector presets configured for physical substrates, editorial cards, and signage.
          </p>
        </div>
      </div>

      {/* System Templates Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-border-hairpin dark:border-dark-border">
          <div className="flex items-center gap-2">
            <Layout className="w-3.5 h-3.5 text-ink-muted dark:text-dark-ink-muted" />
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary">
              Atelier Standard Blueprints (ISO 18004)
            </h2>
          </div>
          <span className="font-mono text-[10px] text-ink-muted dark:text-dark-ink-muted">8 VERIFIED PRESETS</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SYSTEM_TEMPLATES.map((template) => (
            <div 
              key={template.id} 
              className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border rounded-none flex flex-col transition-all hover:border-ink-primary dark:hover:border-dark-ink-primary group"
            >
              {/* Drafting Header */}
              <div className="p-4 border-b border-border-hairpin dark:border-dark-border flex justify-between items-center bg-print-bed/40 dark:bg-dark-panel/40">
                <span className="font-mono text-[9px] uppercase tracking-widest text-ink-muted dark:text-dark-ink-muted font-semibold">
                  {template.code}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider border border-border-hairpin dark:border-dark-border px-1.5 py-0.5 text-ink-muted dark:text-dark-ink-muted">
                  {template.type}
                </span>
              </div>

              {/* Icon / Canvas Preview Area */}
              <div className="h-32 flex items-center justify-center p-4 bg-canvas-paper/50 dark:bg-dark-canvas/50 relative">
                <div className="w-16 h-16 bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border flex items-center justify-center group-hover:scale-105 transition-transform">
                  <template.icon className="w-6 h-6 text-ink-primary dark:text-dark-ink-primary" />
                </div>
              </div>

              {/* Info & Action */}
              <div className="p-4 flex-1 flex flex-col justify-between border-t border-border-hairpin dark:border-dark-border">
                <div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary mb-1">
                    {template.name}
                  </h3>
                  <p className="font-sans text-[11px] text-ink-muted dark:text-dark-ink-muted leading-relaxed">
                    {template.desc}
                  </p>
                </div>

                <div className="pt-4 mt-2">
                  <Link 
                    href="/create"
                    className="flex items-center justify-between w-full py-2 px-3 font-mono text-[11px] uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary border border-border-hairpin dark:border-dark-border hover:bg-ink-primary hover:text-white dark:hover:bg-dark-ink-primary dark:hover:text-dark-canvas transition-colors"
                  >
                    <span>Deploy Blueprint</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Saved Templates */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center gap-2 pb-2 border-b border-border-hairpin dark:border-dark-border">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary">
            Proprietary Studio Presets
          </h2>
        </div>
        
        <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-10 text-center min-h-[180px] flex flex-col items-center justify-center rounded-none">
          <div className="w-12 h-12 bg-print-bed dark:bg-dark-panel border border-border-hairpin dark:border-dark-border flex items-center justify-center mb-3">
            <Layout className="w-5 h-5 text-ink-muted dark:text-dark-ink-muted" />
          </div>
          <p className="font-mono text-xs uppercase font-semibold text-ink-primary dark:text-dark-ink-primary mb-1">
            Zero Custom Presets Stored
          </p>
          <p className="font-sans text-xs text-ink-muted dark:text-dark-ink-muted max-w-sm">
            Save calibrated dot patterns, eye geometries, and physical substrate configs directly from the QR Craft Station.
          </p>
        </div>
      </section>
    </div>
  );
}
