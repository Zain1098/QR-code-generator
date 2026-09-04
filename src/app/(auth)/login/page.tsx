'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Loader2, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams?.get('redirect') || '/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      toast.error(error.message || 'Failed to authenticate.');
      return;
    }

    toast.success('Workbench access granted.');
    router.push(redirectUrl);
    router.refresh();
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/callback?redirect=${encodeURIComponent(redirectUrl)}`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      toast.error('OAuth initiation failed: ' + error.message);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-6 sm:p-8 shadow-sm transition-colors">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] tracking-widest text-ink-muted dark:text-dark-ink-muted uppercase font-semibold">
              AUTH // LEVEL 01
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-700 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
              SECURE TLS
            </span>
          </div>
          <h1 className="font-mono text-xl font-bold uppercase tracking-wide text-ink-primary dark:text-dark-ink-primary">
            Operator Access
          </h1>
          <p className="text-xs text-ink-muted dark:text-dark-ink-muted mt-1 font-sans">
            Enter authorized credentials to resume studio matrix generation
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-none bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-xs border border-red-200 dark:border-red-900/60 font-mono">
            ERR: {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label
                className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted font-medium"
                htmlFor="password"
              >
                Passcode
              </label>
              <Link
                href="/forgot-password"
                className="font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary underline underline-offset-2 transition-colors"
              >
                Recover passcode?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-canvas-paper dark:bg-dark-panel border border-border-hairpin dark:border-dark-border text-ink-primary dark:text-dark-ink-primary text-sm rounded-none focus:outline-none focus:border-ink-primary dark:focus:border-dark-ink-primary transition-colors font-mono"
              placeholder="••••••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-none font-mono text-xs uppercase tracking-widest font-semibold text-white bg-ink-primary hover:bg-black dark:bg-dark-ink-primary dark:text-dark-canvas dark:hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <span>Enter Atelier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Alternate Provider Option */}
        <div className="mt-5 pt-5 border-t border-border-hairpin dark:border-dark-border">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-none font-mono text-xs uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary bg-print-bed dark:bg-dark-panel hover:bg-surface-workbench dark:hover:bg-dark-surface border border-border-hairpin dark:border-dark-border transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.24 10.285V13.4h6.887C18.2 16.14 15.645 18 12.24 18c-3.315 0-6-2.685-6-6s2.685-6 6-6c1.53 0 2.925.57 3.99 1.515l2.43-2.43C17.07 3.51 14.79 2.5 12.24 2.5 7.02 2.5 2.79 6.73 2.79 12s4.23 9.5 9.45 9.5c5.445 0 9.135-3.825 9.135-9.285 0-.645-.06-1.125-.15-1.715H12.24z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="mt-6 text-center font-mono text-xs text-ink-muted dark:text-dark-ink-muted">
          New operator?{' '}
          <Link
            href="/signup"
            className="text-ink-primary dark:text-dark-ink-primary font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            Establish Account
          </Link>
        </div>
      </div>
    </div>
  );
}
