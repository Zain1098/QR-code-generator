'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Menu, X, User, LogOut, LayoutDashboard, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const supabase = createClient();

    const isGuest = typeof document !== 'undefined' && document.cookie.includes('demo_guest=true');
    if (isGuest) {
      setUser({ email: 'guest@formqr.studio', user_metadata: { full_name: 'Guest Operator' } });
      setAuthLoading(false);
      return;
    }

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setAuthLoading(false);
    }).catch(() => {
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      document.cookie = 'demo_guest=; path=/; max-age=0';
      const supabase = createClient();
      await supabase.auth.signOut();
      setUser(null);
      toast.success('Signed out successfully.');
      closeMobileMenu();
      router.push('/login');
      router.refresh();
    } catch {
      document.cookie = 'demo_guest=; path=/; max-age=0';
      setUser(null);
      closeMobileMenu();
      router.push('/login');
    }
  };

  const navLinks = [
    { name: 'Atelier (Generator)', href: '/create' },
    { name: 'Press Specs', href: '/#press-specs' },
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
  ];

  const isDark = mounted && theme === 'dark';

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-canvas-paper/95 dark:bg-dark-canvas/95 backdrop-blur-md border-b border-border-hairpin dark:border-dark-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo Mark & Nav */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 select-none group">
              <span className="w-2.5 h-2.5 bg-ink-primary dark:bg-dark-ink-primary rounded-none inline-block transition-transform group-hover:scale-110"></span>
              <span className="font-mono text-sm font-semibold tracking-wider text-ink-primary dark:text-dark-ink-primary">FORM</span>
              <span className="text-ink-muted dark:text-dark-ink-muted font-mono text-sm">//</span>
              <span className="font-mono text-sm tracking-widest text-ink-muted dark:text-dark-ink-muted">QR</span>
            </Link>

            <div className="h-4 w-hairpin bg-border-hairpin dark:bg-dark-border hidden md:block"></div>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-ink-primary dark:text-dark-ink-primary border-b-2 border-ink-primary dark:border-dark-ink-primary pb-1 font-semibold'
                        : 'text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Tactile LT / DK segmented theme toggle */}
            <div className="flex items-center bg-print-bed dark:bg-dark-panel p-0.5 rounded border border-border-hairpin dark:border-dark-border">
              <button
                type="button"
                onClick={() => setTheme('light')}
                aria-label="Light theme"
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold uppercase transition-all ${
                  !isDark
                    ? 'bg-surface-workbench dark:bg-dark-surface text-ink-primary dark:text-dark-ink-primary shadow-sm'
                    : 'text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary'
                }`}
              >
                LT
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                aria-label="Dark theme"
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold uppercase transition-all ${
                  isDark
                    ? 'bg-surface-workbench dark:bg-dark-surface text-ink-primary dark:text-dark-ink-primary shadow-sm'
                    : 'text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary'
                }`}
              >
                DK
              </button>
            </div>

            <div className="h-4 w-hairpin bg-border-hairpin dark:bg-dark-border hidden sm:block"></div>

            {/* Dynamic Auth Section */}
            {!authLoading && (
              <>
                {user ? (
                  <div className="hidden sm:flex items-center gap-2">
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary bg-surface-workbench dark:bg-dark-surface hover:bg-print-bed dark:hover:bg-dark-panel border border-border-hairpin dark:border-dark-border rounded shadow-sm transition-colors"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      <span>Dashboard</span>
                    </Link>

                    <button
                      onClick={handleSignOut}
                      title={`Sign Out (${user.email})`}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted hover:text-red-600 dark:hover:text-red-400 bg-surface-workbench dark:bg-dark-surface hover:bg-red-50 dark:hover:bg-red-950/20 border border-border-hairpin dark:border-dark-border rounded transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span className="hidden lg:inline">Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="hidden sm:flex items-center gap-2">
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary bg-surface-workbench dark:bg-dark-surface hover:bg-print-bed dark:hover:bg-dark-panel border border-border-hairpin dark:border-dark-border rounded shadow-sm transition-colors"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Log In</span>
                    </Link>

                    <Link
                      href="/signup"
                      className="hidden lg:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary border border-border-hairpin dark:border-dark-border rounded transition-colors"
                    >
                      <span>Sign Up</span>
                    </Link>
                  </div>
                )}
              </>
            )}

            <Link
              href="/create"
              className="hidden md:inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold rounded bg-ink-primary hover:bg-black text-white dark:bg-dark-ink-primary dark:hover:bg-white dark:text-dark-canvas shadow-sm transition-colors"
            >
              New Matrix
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary hover:bg-print-bed dark:hover:bg-dark-surface transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border-hairpin dark:border-dark-border bg-canvas-paper dark:bg-dark-canvas px-4 py-4 space-y-3">
          {/* User state if logged in */}
          {user && (
            <div className="px-3 py-2 bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border rounded flex items-center justify-between">
              <div className="truncate">
                <span className="font-mono text-[10px] text-ink-muted dark:text-dark-ink-muted uppercase block">
                  Active Operator
                </span>
                <span className="font-mono text-xs font-semibold text-ink-primary dark:text-dark-ink-primary truncate block">
                  {user.email}
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
            </div>
          )}

          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-ink-primary dark:text-dark-ink-primary hover:bg-print-bed dark:hover:bg-dark-surface rounded transition-colors"
                onClick={closeMobileMenu}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-border-hairpin dark:border-dark-border flex flex-col gap-2">
            <Link
              href="/create"
              className="w-full py-2.5 text-center text-xs font-semibold rounded bg-ink-primary text-white dark:bg-dark-ink-primary dark:text-dark-canvas shadow-sm"
              onClick={closeMobileMenu}
            >
              Open QR Craft Station
            </Link>

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="w-full py-2 text-center text-xs font-mono uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border rounded"
                  onClick={closeMobileMenu}
                >
                  Workbench Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full py-2 text-center text-xs font-mono uppercase tracking-wider text-red-600 dark:text-red-400 bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border rounded"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  className="w-full py-2 text-center text-xs font-mono uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border rounded"
                  onClick={closeMobileMenu}
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="w-full py-2 text-center text-xs font-mono uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted bg-print-bed dark:bg-dark-panel border border-border-hairpin dark:border-dark-border rounded"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
