'use client';

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  value: number;
  onChange: (value: number) => void;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, value, onChange, min = 0, max = 100, step = 1, ...props }, ref) => {
    return (
      <div className={cn("w-full flex flex-col gap-2", className)}>
        {label && (
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</label>
            <span className="text-sm text-gray-500 dark:text-gray-400">{value}</span>
          </div>
        )}
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full cursor-pointer accent-brand-600"
          {...props}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"
