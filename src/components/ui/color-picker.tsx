'use client';

import * as React from "react"
import { cn } from "@/lib/utils"

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
  label?: string;
}

export function ColorPicker({ color, onChange, className, label }: ColorPickerProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <label className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</label>}
      <div className="flex items-center gap-2">
        <div className="relative h-10 w-10 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -inset-2 h-14 w-14 cursor-pointer"
          />
        </div>
        <input
          type="text"
          value={color.toUpperCase()}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          pattern="^#[0-9A-Fa-f]{6}$"
        />
      </div>
    </div>
  )
}
