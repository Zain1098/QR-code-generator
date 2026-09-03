'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { QrCode, Zap, Scan, Activity, PlusCircle, ArrowRight } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    scansTotal: 0,
    scansToday: 0
  });
  const [recentQrs, setRecentQrs] = useState<any[]>([]);

  useEffect(() => {
    // Mock fetch for now as instructed, show 0s and empty
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const statCards = [
    { name: 'Total QR Codes', value: stats.total, icon: QrCode, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { name: 'Active Dynamic', value: stats.active, icon: Zap, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30' },
    { name: 'Total Scans', value: stats.scansTotal, icon: Scan, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
    { name: 'Scans Today', value: stats.scansToday, icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Overview of your QR codes and analytics.</p>
        </div>
        <Link 
          href="/dashboard/create" 
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          Create QR Code
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                {isLoading ? (
                  <div className="h-7 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mt-1"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent QR Codes */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent QR Codes</h2>
          <Link href="/dashboard/qr-codes" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="p-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-4 animate-pulse">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentQrs.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {/* List would go here */}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Your QR library is empty</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                Create your first QR code to start tracking scans and engaging with your audience.
              </p>
              <Link 
                href="/dashboard/create" 
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
                Create First QR Code
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
