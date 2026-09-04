'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Loader2, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      toast.error(error.message || 'Failed to dispatch reset token.');
      return;
    }

    setSuccess(true);
    toast.success('Reset link dispatched to operator address.');
  };

  if (success) {
    return (
      <div className="w-full">
        <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-6 sm:p-8 text-center transition-colors">
          <div className="w-12 h-12 bg-print-bed dark:bg-dark-panel border border-border-hairpin dark:border-dark-border flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
          </div>
          <span className="font-mono text-[10px] tracking-widest text-emerald-700 dark:text-emerald-400 uppercase font-semibold">
            RECOVERY DISPATCH CONFIRMED
          </span>
          <h1 className="font-mono text-xl font-bold uppercase tracking-wide text-ink-primary dark:text-dark-ink-primary mt-2 mb-3">
            Instructions Dispatched
          </h1>
          <p className="text-xs text-ink-muted dark:text-dark-ink-muted mb-6 leading-relaxed">
            Password recovery protocol instructions have been transmitted to{' '}
            <span className="font-mono font-medium text-ink-primary dark:text-dark-ink-primary">{email}</span>.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-none font-mono text-xs uppercase tracking-widest font-semibold text-white bg-ink-primary hover:bg-black dark:bg-dark-ink-primary dark:text-dark-canvas dark:hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Login</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-6 sm:p-8 shadow-sm transition-colors">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] tracking-widest text-ink-muted dark:text-dark-ink-muted uppercase font-semibold">
              AUTH // PASSCODE RECOVERY
            </span>
            <Link
              href="/login"
              className="inline-flex items-center gap-1 font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary transition-colors"
            >
              <ArrowLeft className="w-3 h-3" /> Back
            </Link>
          </div>
          <h1 className="font-mono text-xl font-bold uppercase tracking-wide text-ink-primary dark:text-dark-ink-primary">
            Passcode Recovery
          </h1>
          <p className="text-xs text-ink-muted dark:text-dark-ink-muted mt-1 font-sans">
            Specify your registered email address to receive an archival reset link.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-none bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-xs border border-red-200 dark:border-red-900/60 font-mono">
            ERR: {error}
          </div>
        )}

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label
              className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted mb-1.5 font-medium"
              htmlFor="email"
            >
              Operator Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-canvas-paper dark:bg-dark-panel border border-border-hairpin dark:border-dark-border text-ink-primary dark:text-dark-ink-primary text-sm rounded-none focus:outline-none focus:border-ink-primary dark:focus:border-dark-ink-primary transition-colors font-mono"
              placeholder="operator@domain.com"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-none font-mono text-xs uppercase tracking-widest font-semibold text-white bg-ink-primary hover:bg-black dark:bg-dark-ink-primary dark:text-dark-canvas dark:hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm mt-4"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <span>Transmit Reset Link</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
