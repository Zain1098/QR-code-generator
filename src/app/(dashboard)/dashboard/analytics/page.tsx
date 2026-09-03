'use client';

import React, { useState } from 'react';
import { Calendar, BarChart3, Smartphone, Globe, MapPin } from 'lucide-react';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7d');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track the performance of all your QR codes.</p>
        </div>
        
        <select 
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
          <option value="all">All Time</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Total Scans Overview */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Total Scans</h2>
          </div>
          <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">0</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="text-green-500 font-medium">0%</span> vs previous period
          </p>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Scans Over Time</h2>
          </div>
          <div className="flex-1 min-h-[200px] flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900/50">
            <div className="text-center">
              <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Not enough data to display chart</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Devices */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <Smartphone className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Devices</h2>
          </div>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-32 h-32 rounded-full border-8 border-gray-100 dark:border-gray-800 mb-4"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">No device data available</p>
          </div>
        </div>

        {/* Browsers */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Browsers</h2>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-center text-gray-500 dark:text-gray-400 py-8">No browser data available</p>
          </div>
        </div>

        {/* Locations */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 lg:col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Top Locations</h2>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-center text-gray-500 dark:text-gray-400 py-8">No location data available</p>
          </div>
        </div>
      </div>
    </div>
  );
}
