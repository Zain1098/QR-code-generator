'use client';

import * as React from "react"
import { cn } from "@/lib/utils"

export function Tooltip({ children, content, className }: { children: React.ReactNode; content: React.ReactNode; className?: string }) {
  return (
    <div className="group relative inline-block">
      {children}
      <div className={cn("pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1.5 text-xs text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 dark:bg-gray-800", className)}>
        {content}
        <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-800" />
      </div>
    </div>
  )
}
