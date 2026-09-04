'use client';

import Link from 'next/link';
import { ArrowLeft, Mail, MessageSquare, Send } from 'lucide-react';

export default function ContactPage() {
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
        <span className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 inline-block"></span>
        <span className="font-mono text-[11px] tracking-widest uppercase text-ink-muted dark:text-dark-ink-muted font-semibold">
          DISPATCH DESK // DIRECT INQUIRY
        </span>
      </div>
      <h1 className="font-mono text-3xl font-bold uppercase tracking-tight text-ink-primary dark:text-dark-ink-primary mb-3">
        Contact Lab
      </h1>
      <p className="text-sm text-ink-muted dark:text-dark-ink-muted mb-8">
        Have questions regarding high-volume dynamic QR campaigns, API access, or physical print press specifications? Transmit your message below.
      </p>

      <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-6 sm:p-8">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted mb-1 font-medium">
                Operator Name
              </label>
              <input
                type="text"
                required
                placeholder="Alex Mercer"
                className="w-full px-3.5 py-2.5 bg-canvas-paper dark:bg-dark-panel border border-border-hairpin dark:border-dark-border text-ink-primary dark:text-dark-ink-primary text-sm rounded-none focus:outline-none focus:border-ink-primary dark:focus:border-dark-ink-primary transition-colors font-mono"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted mb-1 font-medium">
                Contact Email
              </label>
              <input
                type="email"
                required
                placeholder="operator@domain.com"
                className="w-full px-3.5 py-2.5 bg-canvas-paper dark:bg-dark-panel border border-border-hairpin dark:border-dark-border text-ink-primary dark:text-dark-ink-primary text-sm rounded-none focus:outline-none focus:border-ink-primary dark:focus:border-dark-ink-primary transition-colors font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted mb-1 font-medium">
              Inquiry Payload
            </label>
            <textarea
              rows={4}
              required
              placeholder="Describe your matrix requirements, API questions, or feedback..."
              className="w-full px-3.5 py-2.5 bg-canvas-paper dark:bg-dark-panel border border-border-hairpin dark:border-dark-border text-ink-primary dark:text-dark-ink-primary text-sm rounded-none focus:outline-none focus:border-ink-primary dark:focus:border-dark-ink-primary transition-colors font-mono"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 font-mono text-xs uppercase tracking-widest font-semibold text-white bg-ink-primary hover:bg-black dark:bg-dark-ink-primary dark:text-dark-canvas dark:hover:bg-white transition-colors"
          >
            Transmit Message
          </button>
        </form>
      </div>
    </div>
  );
}
