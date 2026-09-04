'use client';

import React from 'react';
import { Check, Info, ShieldCheck, Zap, Layers } from 'lucide-react';

export default function BillingPage() {
  const plans = [
    {
      name: 'Free Atelier',
      code: 'TIER_01',
      price: '$0',
      period: '/month',
      description: 'Foundational tactile workspace for individual vector experimentation.',
      features: [
        'Up to 3 Static High-Res Matrices',
        'Physical Substrate Canvas',
        'ISO 18004 Compliant Vector Export',
        'Community Support Registry'
      ],
      current: true,
      buttonText: 'Active Tier',
      highlighted: false,
    },
    {
      name: 'Studio Pro',
      code: 'TIER_02',
      price: '$12',
      period: '/month',
      description: 'Engineered for design agencies, editorial brands, and luxury print production.',
      features: [
        'Unlimited Static Matrices',
        '10 Dynamic Encrypted Redirects',
        'Custom Logo Marks & Micro-Dots',
        '7-Day Scan Sensor Telemetry',
        'Direct Vector SVG & EPS Archive'
      ],
      current: false,
      buttonText: 'Upgrade To Studio Pro',
      highlighted: true,
    },
    {
      name: 'Enterprise Matrix',
      code: 'TIER_03',
      price: '$29',
      period: '/month',
      description: 'Industrial-grade throughput, infinite batching, and dedicated domain routing.',
      features: [
        'Unlimited Dynamic Matrix Routes',
        'Dedicated Custom Subdomain Routing',
        'Full Sensor Telemetry Archive',
        'Bulk Batch Importer & Zip Engine',
        'Multi-Seat Operator Collaboration'
      ],
      current: false,
      buttonText: 'Contact Atelier Team',
      highlighted: false,
    }
  ];

  return (
    <div className="space-y-8">
      {/* Workbench Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-border-hairpin dark:border-dark-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 inline-block"></span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted dark:text-dark-ink-muted font-semibold">
              CAPACITY QUOTA // SUBSCRIPTION LEDGER
            </span>
          </div>
          <h1 className="font-mono text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink-primary dark:text-dark-ink-primary">
            Billing & Entitlements
          </h1>
          <p className="text-xs text-ink-muted dark:text-dark-ink-muted mt-1 font-sans">
            Calibrate your atelier capacity. Scale dynamic QR redirects, vector proofing, and client seats seamlessly.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 border border-border-hairpin dark:border-dark-border bg-surface-workbench dark:bg-dark-surface px-3 py-1.5 font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted">
          <Info className="w-3.5 h-3.5" />
          <span>STRIPE GATEWAY DISPATCH PENDING</span>
        </div>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`relative bg-surface-workbench dark:bg-dark-surface border flex flex-col rounded-none transition-colors ${
              plan.highlighted 
                ? 'border-ink-primary dark:border-dark-ink-primary ring-1 ring-ink-primary dark:ring-dark-ink-primary' 
                : 'border-border-hairpin dark:border-dark-border'
            } p-6 sm:p-8`}
          >
            {plan.highlighted && (
              <div className="absolute top-0 right-0 bg-ink-primary text-white dark:bg-dark-ink-primary dark:text-dark-canvas px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest">
                RECOMMENDED SPEC
              </div>
            )}
            
            <div className="mb-6">
              <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted dark:text-dark-ink-muted font-semibold">
                {plan.code}
              </span>
              <h3 className="font-mono text-xl font-bold uppercase text-ink-primary dark:text-dark-ink-primary mt-1 mb-2">
                {plan.name}
              </h3>
              <p className="text-xs text-ink-muted dark:text-dark-ink-muted font-sans min-h-[36px] leading-relaxed">
                {plan.description}
              </p>
            </div>
            
            <div className="mb-6 pb-6 border-b border-border-hairpin dark:border-dark-border flex items-baseline gap-1">
              <span className="font-mono text-4xl font-bold text-ink-primary dark:text-dark-ink-primary">{plan.price}</span>
              <span className="font-mono text-xs text-ink-muted dark:text-dark-ink-muted uppercase">{plan.period}</span>
            </div>
            
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 mt-1.5 shrink-0 inline-block"></span>
                  <span className="text-xs text-ink-primary dark:text-dark-ink-primary font-mono">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              disabled={plan.current || true}
              className={`w-full py-3 px-4 rounded-none font-mono text-xs uppercase tracking-wider font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                plan.highlighted
                  ? 'bg-ink-primary text-white hover:bg-black dark:bg-dark-ink-primary dark:text-dark-canvas dark:hover:bg-white'
                  : 'border border-border-hairpin dark:border-dark-border text-ink-primary dark:text-dark-ink-primary hover:bg-print-bed dark:hover:bg-dark-panel'
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
