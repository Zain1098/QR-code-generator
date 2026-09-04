'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Password strength logic
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const strengthScore = [hasMinLength, hasNumber, hasUpper].filter(Boolean).length;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passcodes do not match.');
      return;
    }

    if (!acceptTerms) {
      setError('Please accept the studio protocol and terms.');
      return;
    }

    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      toast.error(signUpError.message || 'Failed to establish account.');
      return;
    }

    setSuccess(true);
    toast.success('Archival account initiated. Verification sent.');
  };

  if (success) {
    return (
      <div className="w-full">
        <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-6 sm:p-8 text-center transition-colors">
          <div className="w-12 h-12 bg-print-bed dark:bg-dark-panel border border-border-hairpin dark:border-dark-border flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
          </div>
          <span className="font-mono text-[10px] tracking-widest text-emerald-700 dark:text-emerald-400 uppercase font-semibold">
            DISPATCH CONFIRMED // VERIFY INBOX
          </span>
          <h1 className="font-mono text-xl font-bold uppercase tracking-wide text-ink-primary dark:text-dark-ink-primary mt-2 mb-3">
            Verification Dispatched
          </h1>
          <p className="text-xs text-ink-muted dark:text-dark-ink-muted mb-6 leading-relaxed">
            We have dispatched an activation token to <span className="font-mono font-medium text-ink-primary dark:text-dark-ink-primary">{email}</span>. Confirm the link to activate your studio bench.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-none font-mono text-xs uppercase tracking-widest font-semibold text-white bg-ink-primary hover:bg-black dark:bg-dark-ink-primary dark:text-dark-canvas dark:hover:bg-white transition-colors"
          >
            <span>Proceed to Login</span>
            <ArrowRight className="w-3.5 h-3.5" />
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
              ENROLL // REGISTRATION
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-ink-muted dark:text-dark-ink-muted">
              REV. 04 LAB
            </span>
          </div>
          <h1 className="font-mono text-xl font-bold uppercase tracking-wide text-ink-primary dark:text-dark-ink-primary">
            New Operator
          </h1>
          <p className="text-xs text-ink-muted dark:text-dark-ink-muted mt-1 font-sans">
            Create an archival workbench for high-density matrix creation
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-none bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-xs border border-red-200 dark:border-red-900/60 font-mono">
            ERR: {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label
              className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted mb-1.5 font-medium"
              htmlFor="fullName"
            >
              Operator Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-canvas-paper dark:bg-dark-panel border border-border-hairpin dark:border-dark-border text-ink-primary dark:text-dark-ink-primary text-sm rounded-none focus:outline-none focus:border-ink-primary dark:focus:border-dark-ink-primary transition-colors font-mono"
              placeholder="e.g. Alex Mercer"
              required
            />
          </div>

          <div>
            <label
              className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted mb-1.5 font-medium"
              htmlFor="email"
            >
              Contact Email
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
            <label
              className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted mb-1.5 font-medium"
              htmlFor="password"
            >
              Establish Passcode
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-canvas-paper dark:bg-dark-panel border border-border-hairpin dark:border-dark-border text-ink-primary dark:text-dark-ink-primary text-sm rounded-none focus:outline-none focus:border-ink-primary dark:focus:border-dark-ink-primary transition-colors font-mono"
              placeholder="••••••••••••"
              required
            />
            {password.length > 0 && (
              <div className="mt-2 flex space-x-1.5">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 transition-colors ${
                      strengthScore >= i
                        ? strengthScore === 1
                          ? 'bg-amber-600'
                          : strengthScore === 2
                          ? 'bg-blue-600'
                          : 'bg-emerald-600'
                        : 'bg-border-hairpin dark:bg-dark-border'
                    }`}
                  ></div>
                ))}
              </div>
            )}
            <div className="mt-1 flex items-center text-[10px] font-mono text-ink-muted dark:text-dark-ink-muted space-x-3">
              <span className={hasMinLength ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : ''}>
                &ge; 8 CHARS
              </span>
              <span>&bull;</span>
              <span className={hasNumber ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : ''}>
                NUMERIC
              </span>
              <span>&bull;</span>
              <span className={hasUpper ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : ''}>
                UPPERCASE
              </span>
            </div>
          </div>

          <div>
            <label
              className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted mb-1.5 font-medium"
              htmlFor="confirmPassword"
            >
              Verify Passcode
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-canvas-paper dark:bg-dark-panel border border-border-hairpin dark:border-dark-border text-ink-primary dark:text-dark-ink-primary text-sm rounded-none focus:outline-none focus:border-ink-primary dark:focus:border-dark-ink-primary transition-colors font-mono"
              placeholder="••••••••••••"
              required
            />
          </div>

          <div className="flex items-start pt-1">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 rounded-none border-border-hairpin text-ink-primary focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
            </div>
            <div className="ml-2.5 text-xs">
              <label htmlFor="terms" className="text-ink-muted dark:text-dark-ink-muted font-sans cursor-pointer">
                I agree to the{' '}
                <Link href="/terms" className="text-ink-primary dark:text-dark-ink-primary underline underline-offset-2">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-ink-primary dark:text-dark-ink-primary underline underline-offset-2">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || strengthScore < 3}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-none font-mono text-xs uppercase tracking-widest font-semibold text-white bg-ink-primary hover:bg-black dark:bg-dark-ink-primary dark:text-dark-canvas dark:hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm mt-4"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center font-mono text-xs text-ink-muted dark:text-dark-ink-muted">
          Already registered?{' '}
          <Link
            href="/login"
            className="text-ink-primary dark:text-dark-ink-primary font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            Operator Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
