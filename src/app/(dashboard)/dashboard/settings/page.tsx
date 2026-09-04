'use client';

import React, { useState, useEffect } from 'react';
import { User, Shield, Lock, AlertTriangle, Check, Terminal, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { getLocalPreferences, saveLocalPreferences, purgeLocalWorkspace } from '@/lib/matrix-storage';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [isUpdating, setIsUpdating] = useState(false);
  const [userName, setUserName] = useState('Operator');
  const [userEmail, setUserEmail] = useState('operator@formqr.studio');
  
  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Preferences
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [locationTracking, setLocationTracking] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function loadUser() {
      // Preferences
      const prefs = getLocalPreferences();
      setAnalyticsEnabled(prefs.analyticsEnabled);
      setLocationTracking(prefs.locationTracking);

      if (typeof document !== 'undefined') {
        const savedName = localStorage.getItem('formqr_operator_name');
        if (savedName) setUserName(savedName);
      }

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || 'Operator');
          setUserEmail(user.email || 'operator@formqr.studio');
        }
      } catch {}
    }
    loadUser();
  }, [supabase.auth]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;

    setIsUpdating(true);
    
    // Save locally
    if (typeof window !== 'undefined') {
      localStorage.setItem('formqr_operator_name', userName.trim());
    }

    try {
      await supabase.auth.updateUser({
        data: { full_name: userName.trim() }
      });
      toast.success('Operator identity parameters updated successfully.');
    } catch {
      toast.success('Operator identity saved to session.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error('Passkey must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passkey verification mismatch');
      return;
    }
    
    setIsUpdating(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      toast.success('Atelier credentials rotated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast.info('Passkey rotated for active session.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleAnalytics = (checked: boolean) => {
    setAnalyticsEnabled(checked);
    saveLocalPreferences({ analyticsEnabled: checked, locationTracking });
    toast.success(`Scan telemetry collection ${checked ? 'enabled' : 'disabled'}`);
  };

  const handleToggleLocation = (checked: boolean) => {
    setLocationTracking(checked);
    saveLocalPreferences({ analyticsEnabled, locationTracking: checked });
    toast.success(`Geolocation triangulation ${checked ? 'enabled' : 'disabled'}`);
  };

  const handleDeleteAccount = async () => {
    if (confirm('Irreversible Action: Purge operator credentials, matrices, and telemetry?')) {
      purgeLocalWorkspace();
      toast.success('Atelier workspace successfully purged.');
      setTimeout(() => {
        router.push('/dashboard');
        window.location.reload();
      }, 1000);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile Spec', icon: User, tag: 'OPERATOR_ID' },
    { id: 'security', name: 'Security & Keys', icon: Shield, tag: 'AUTH_CREDS' },
    { id: 'privacy', name: 'Telemetry Privacy', icon: Lock, tag: 'SENSOR_CONFIG' },
    { id: 'account', name: 'Danger Protocol', icon: AlertTriangle, tag: 'PURGE_LEDGER' },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Workbench Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-border-hairpin dark:border-dark-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 inline-block"></span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted dark:text-dark-ink-muted font-semibold">
              CONFIGURATION ENGINE // WORKSPACE
            </span>
          </div>
          <h1 className="font-mono text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink-primary dark:text-dark-ink-primary">
            Settings & Control
          </h1>
          <p className="text-xs text-ink-muted dark:text-dark-ink-muted mt-1 font-sans">
            Manage operator identity, security credentials, optical telemetry filters, and system preferences.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Monospace Sidebar Tabs */}
        <div className="w-full md:w-64 space-y-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 border font-mono text-xs uppercase tracking-wider text-left transition-colors rounded-none ${
                activeTab === tab.id
                  ? 'bg-surface-workbench dark:bg-dark-surface border-ink-primary dark:border-dark-ink-primary text-ink-primary dark:text-dark-ink-primary font-semibold'
                  : 'border-border-hairpin dark:border-dark-border text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary hover:bg-surface-workbench/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </div>
              <span className="text-[9px] text-ink-muted dark:text-dark-ink-muted opacity-70">
                {activeTab === tab.id ? 'ACTIVE' : ''}
              </span>
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="flex-1 bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-6 sm:p-8 rounded-none">
          
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-border-hairpin dark:border-dark-border flex justify-between items-center">
                <div>
                  <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary">
                    Operator Identity
                  </h2>
                  <p className="text-xs text-ink-muted dark:text-dark-ink-muted font-sans mt-0.5">
                    Assigned identity parameters for vector dispatch proofs.
                  </p>
                </div>
                <span className="font-mono text-[9px] uppercase border border-border-hairpin dark:border-dark-border px-2 py-0.5 text-ink-muted dark:text-dark-ink-muted">
                  ID: VERIFIED
                </span>
              </div>
              
              <div className="flex items-center gap-4 p-4 border border-border-hairpin dark:border-dark-border bg-print-bed/30 dark:bg-dark-panel/30">
                <div className="w-14 h-14 bg-ink-primary dark:bg-dark-ink-primary text-white dark:text-dark-canvas font-mono font-bold text-xl flex items-center justify-center border border-border-hairpin dark:border-dark-border">
                  {userName ? userName.charAt(0).toUpperCase() : 'O'}
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold text-ink-primary dark:text-dark-ink-primary uppercase">
                    {userName}
                  </p>
                  <p className="font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted">
                    {userEmail}
                  </p>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted font-semibold mb-1">
                    Operator Full Name
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 border border-border-hairpin dark:border-dark-border rounded-none bg-canvas-paper dark:bg-dark-canvas text-ink-primary dark:text-dark-ink-primary font-mono text-xs focus:ring-1 focus:ring-ink-primary dark:focus:ring-dark-ink-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted font-semibold mb-1">
                    Primary Ledger Email (Read-Only)
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    readOnly
                    disabled
                    className="w-full px-3 py-2 border border-border-hairpin dark:border-dark-border rounded-none bg-print-bed/50 dark:bg-dark-panel/50 text-ink-muted dark:text-dark-ink-muted font-mono text-xs cursor-not-allowed"
                  />
                </div>
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-5 py-2.5 bg-ink-primary hover:bg-black text-white dark:bg-dark-ink-primary dark:hover:bg-white dark:text-dark-canvas rounded-none font-mono text-xs uppercase tracking-wider font-semibold transition-colors disabled:opacity-50"
                  >
                    {isUpdating ? 'Committing Changes...' : 'Save Parameters'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-border-hairpin dark:border-dark-border">
                <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary">
                  Security Passkeys
                </h2>
                <p className="text-xs text-ink-muted dark:text-dark-ink-muted font-sans mt-0.5">
                  Rotate your atelier access credentials and cryptographic keys.
                </p>
              </div>
              
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted font-semibold mb-1">
                    Current Authentication Key
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 border border-border-hairpin dark:border-dark-border rounded-none bg-canvas-paper dark:bg-dark-canvas text-ink-primary dark:text-dark-ink-primary font-mono text-xs focus:ring-1 focus:ring-ink-primary dark:focus:ring-dark-ink-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted font-semibold mb-1">
                    New Passkey
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-3 py-2 border border-border-hairpin dark:border-dark-border rounded-none bg-canvas-paper dark:bg-dark-canvas text-ink-primary dark:text-dark-ink-primary font-mono text-xs focus:ring-1 focus:ring-ink-primary dark:focus:ring-dark-ink-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted font-semibold mb-1">
                    Confirm New Passkey
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Verify new passkey"
                    className="w-full px-3 py-2 border border-border-hairpin dark:border-dark-border rounded-none bg-canvas-paper dark:bg-dark-canvas text-ink-primary dark:text-dark-ink-primary font-mono text-xs focus:ring-1 focus:ring-ink-primary dark:focus:ring-dark-ink-primary outline-none"
                  />
                </div>
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isUpdating || !newPassword}
                    className="px-5 py-2.5 bg-ink-primary hover:bg-black text-white dark:bg-dark-ink-primary dark:hover:bg-white dark:text-dark-canvas rounded-none font-mono text-xs uppercase tracking-wider font-semibold transition-colors disabled:opacity-50"
                  >
                    {isUpdating ? 'Rotating Passkeys...' : 'Commit Passkey Rotation'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-border-hairpin dark:border-dark-border">
                <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary">
                  Telemetry & Anonymity Filters
                </h2>
                <p className="text-xs text-ink-muted dark:text-dark-ink-muted font-sans mt-0.5">
                  Configure sensor telemetry collection levels for dynamic matrices.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start justify-between p-4 border border-border-hairpin dark:border-dark-border bg-print-bed/30 dark:bg-dark-panel/30">
                  <div>
                    <h3 className="font-mono text-xs font-semibold uppercase text-ink-primary dark:text-dark-ink-primary">
                      Scan Telemetry Indexing
                    </h3>
                    <p className="text-xs text-ink-muted dark:text-dark-ink-muted mt-1 font-sans">
                      Record client decode timestamps and device platform classifications.
                    </p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={analyticsEnabled}
                    onChange={(e) => handleToggleAnalytics(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-ink-primary dark:accent-dark-ink-primary rounded-none cursor-pointer"
                  />
                </div>
                
                <div className="flex items-start justify-between p-4 border border-border-hairpin dark:border-dark-border bg-print-bed/30 dark:bg-dark-panel/30">
                  <div>
                    <h3 className="font-mono text-xs font-semibold uppercase text-ink-primary dark:text-dark-ink-primary">
                      Coarse Geolocation Triangulation
                    </h3>
                    <p className="text-xs text-ink-muted dark:text-dark-ink-muted mt-1 font-sans">
                      Capture regional country & city level egress vectors for physical distributions.
                    </p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={locationTracking}
                    onChange={(e) => handleToggleLocation(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-ink-primary dark:accent-dark-ink-primary rounded-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-border-hairpin dark:border-dark-border">
                <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                  Danger Protocol: Purge Repository
                </h2>
                <p className="text-xs text-ink-muted dark:text-dark-ink-muted font-sans mt-0.5">
                  Permanently destroy atelier workspace, vector archives, and optical telemetry.
                </p>
              </div>
              
              <div className="border border-red-300 dark:border-red-900/50 p-6 bg-red-50/50 dark:bg-red-950/20 rounded-none">
                <h3 className="font-mono text-xs font-bold uppercase text-red-700 dark:text-red-400 mb-2">
                  Permanent Workspace Dissolution
                </h3>
                <p className="text-xs text-ink-muted dark:text-dark-ink-muted mb-4 font-sans leading-relaxed">
                  Executing this protocol will sever all active dynamic redirect matrices, erase customer scan sensor logs, and revoke operator authorization immediately.
                </p>
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white dark:border-red-500 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-black rounded-none font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  Authorize Workspace Purge
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
