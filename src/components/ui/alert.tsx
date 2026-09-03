import * as React from "react"
import { cn } from "@/lib/utils"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  icon?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", icon, children, ...props }, ref) => {
    const variants = {
      info: "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-900/50",
      success: "bg-green-50 text-green-900 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-900/50",
      warning: "bg-yellow-50 text-yellow-900 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-900/50",
      error: "bg-red-50 text-red-900 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-900/50"
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn("relative w-full rounded-lg border p-4 flex gap-3 items-start text-sm", variants[variant], className)}
        {...props}
      >
        {icon && <div className="shrink-0 mt-0.5">{icon}</div>}
        <div className="flex-1">{children}</div>
      </div>
    )
  }
)
Alert.displayName = "Alert"

export { Alert }
