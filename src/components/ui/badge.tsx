import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline';
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-brand-600 text-white hover:bg-brand-700",
    secondary: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
    success: "border-transparent bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-400",
    warning: "border-transparent bg-yellow-100 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-400",
    destructive: "border-transparent bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-400",
    outline: "text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700"
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
