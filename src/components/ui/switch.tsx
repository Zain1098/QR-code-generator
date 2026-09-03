'use client';

import * as React from "react"
import { cn } from "@/lib/utils"

interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked, onCheckedChange, label, disabled, ...props }, ref) => {
    return (
      <label className={cn("flex items-center gap-2", disabled && "opacity-50 cursor-not-allowed", className)}>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          ref={ref}
          disabled={disabled}
          onClick={() => onCheckedChange(!checked)}
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
            checked ? "bg-brand-600" : "bg-gray-200 dark:bg-gray-700"
          )}
          {...props}
        >
          <span
            className={cn(
              "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
              checked ? "translate-x-5" : "translate-x-0"
            )}
          />
        </button>
        {label && <span className="text-sm font-medium text-gray-900 dark:text-gray-100 cursor-pointer">{label}</span>}
      </label>
    )
  }
)
Switch.displayName = "Switch"
