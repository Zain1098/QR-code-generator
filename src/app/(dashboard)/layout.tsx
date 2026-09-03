'use client';

import React from 'react';
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <DashboardSidebar />
      <div className="md:pl-[250px] pt-16 md:pt-0 min-h-screen flex flex-col">
        <main className="flex-1 p-4 lg:p-6 w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
