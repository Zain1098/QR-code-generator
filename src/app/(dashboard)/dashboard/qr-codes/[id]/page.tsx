'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Edit2, Download, Trash2, Power, Copy, BarChart2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function QrCodeDetail() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetch
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/qr-codes" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">QR Code Not Found</h1>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Power className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">QR Code Not Found</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          The QR code you are looking for doesn't exist or you don't have permission to view it.
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/dashboard/qr-codes" 
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Back to List
          </Link>
          <Link 
            href="/dashboard/create" 
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
          >
            Create New QR
          </Link>
        </div>
      </div>
    </div>
  );
}
