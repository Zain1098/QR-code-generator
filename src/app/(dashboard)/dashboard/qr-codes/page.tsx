'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, LayoutGrid, List, PlusCircle, MoreVertical, Edit, Download, Copy, Archive, Trash2 } from 'lucide-react';

export default function QrCodesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">QR Codes</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage, organize, and track your QR codes.</p>
        </div>
        <Link 
          href="/dashboard/create" 
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          Create QR
        </Link>
      </div>

      {/* Filters and Actions Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex-1 w-full md:w-auto relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search QR codes..." 
            className="w-full md:max-w-md pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none">
            <option value="">All Types</option>
            <option value="url">URL</option>
            <option value="vcard">vCard</option>
            <option value="text">Text</option>
          </select>
          
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none">
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
            <option value="archived">Archived</option>
          </select>
          
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="scans">Most Scanned</option>
          </select>

          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 min-h-[400px] flex items-center justify-center">
        {isLoading ? (
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-48 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-32"></div>
          </div>
        ) : (
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No QR codes found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              You haven't created any QR codes yet, or none match your current filters.
            </p>
            <Link 
              href="/dashboard/create" 
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Create QR Code
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
