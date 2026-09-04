'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  QrCode, 
  PlusCircle, 
  BarChart3, 
  FolderOpen, 
  Layout, 
  Layers,
  CreditCard,
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'QR Codes', href: '/dashboard/qr-codes', icon: QrCode },
  { name: 'Create QR', href: '/create', icon: PlusCircle },
  { name: 'Bulk QR', href: '/dashboard/bulk', icon: Layers },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Folders', href: '/dashboard/folders', icon: FolderOpen },
  { name: 'Templates', href: '/dashboard/templates', icon: Layout },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string>('User');
  const [userEmail, setUserEmail] = useState<string>('');

  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      if (typeof document !== 'undefined' && document.cookie.includes('demo_guest=true')) {
        setUserName('Guest Operator');
        setUserEmail('guest@formqr.studio');
        return;
      }
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserName(user.user_metadata?.full_name || 'User');
          setUserEmail(user.email || '');
        } else {
          setUserName('Guest Operator');
          setUserEmail('guest@formqr.studio');
        }
      } catch {
        setUserName('Guest Operator');
        setUserEmail('guest@formqr.studio');
      }
    }
    getUser();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    try {
      document.cookie = 'demo_guest=; path=/; max-age=0';
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
      router.push('/login');
    } catch {
      document.cookie = 'demo_guest=; path=/; max-age=0';
      router.push('/login');
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-surface-workbench dark:bg-dark-surface border-r border-border-hairpin dark:border-dark-border transition-colors">
      {/* Brand Header */}
      <div className="p-4 md:p-5 border-b border-border-hairpin dark:border-dark-border flex items-center justify-between">
        <div className="space-y-1">
          <Link href="/" className="flex items-center gap-2 select-none group">
            <span className="w-2.5 h-2.5 bg-ink-primary dark:bg-dark-ink-primary rounded-none inline-block transition-transform group-hover:scale-110"></span>
            <span className="font-mono text-sm font-semibold tracking-wider text-ink-primary dark:text-dark-ink-primary">FORM</span>
            <span className="text-ink-muted dark:text-dark-ink-muted font-mono text-sm">//</span>
            <span className="font-mono text-sm tracking-widest text-ink-muted dark:text-dark-ink-muted">QR</span>
          </Link>
          <div className="font-mono text-[9px] tracking-widest uppercase text-ink-muted dark:text-dark-ink-muted font-semibold">
            DESK TELEMETRY // WORKSPACE
          </div>
        </div>
        {/* Mobile close button */}
        <button 
          className="md:hidden p-1.5 text-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Operator Status Pill */}
      <div className="px-4 py-3 border-b border-border-hairpin dark:border-dark-border bg-canvas-paper/50 dark:bg-dark-panel/40 flex items-center gap-3">
        <div className="w-7 h-7 bg-ink-primary text-white dark:bg-dark-ink-primary dark:text-dark-canvas flex items-center justify-center font-mono font-bold text-xs">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div className="overflow-hidden flex-1">
          <p className="text-xs font-mono font-semibold text-ink-primary dark:text-dark-ink-primary truncate">{userName}</p>
          <p className="text-[10px] font-mono text-ink-muted dark:text-dark-ink-muted truncate">{userEmail}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors rounded-none ${
                isActive
                  ? 'bg-ink-primary text-white dark:bg-dark-ink-primary dark:text-dark-canvas font-semibold shadow-sm'
                  : 'text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary hover:bg-print-bed dark:hover:bg-dark-panel'
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Footer Actions */}
      <div className="p-3 border-t border-border-hairpin dark:border-dark-border space-y-1 bg-surface-workbench dark:bg-dark-surface">
        <Link
          href="/dashboard/settings"
          onClick={() => setIsOpen(false)}
          className={`flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors rounded-none ${
            pathname.startsWith('/dashboard/settings')
              ? 'bg-ink-primary text-white dark:bg-dark-ink-primary dark:text-dark-canvas font-semibold'
              : 'text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary hover:bg-print-bed dark:hover:bg-dark-panel'
          }`}
        >
          <Settings className="w-4 h-4 shrink-0" />
          <span>Settings</span>
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors rounded-none"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-canvas-paper/95 dark:bg-dark-canvas/95 backdrop-blur-md border-b border-border-hairpin dark:border-dark-border z-40 flex items-center justify-between px-4 transition-colors">
        <Link href="/" className="flex items-center gap-2 select-none">
          <span className="w-2.5 h-2.5 bg-ink-primary dark:bg-dark-ink-primary rounded-none inline-block"></span>
          <span className="font-mono text-sm font-semibold tracking-wider text-ink-primary dark:text-dark-ink-primary">FORM</span>
          <span className="text-ink-muted dark:text-dark-ink-muted font-mono text-sm">//</span>
          <span className="font-mono text-sm tracking-widest text-ink-muted dark:text-dark-ink-muted">QR</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/create"
            className="px-2.5 py-1 text-[11px] font-mono uppercase font-semibold bg-ink-primary text-white dark:bg-dark-ink-primary dark:text-dark-canvas"
          >
            Generator
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="p-1.5 text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary"
            aria-label="Toggle Dashboard Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 bottom-0 left-0 w-[240px] z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </div>
    </>
  );
}
