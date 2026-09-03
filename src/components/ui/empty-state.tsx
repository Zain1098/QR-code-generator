import * as React from "react"
import { cn } from "@/lib/utils"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ className, icon, title, description, action, ...props }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700", className)} {...props}>
      {icon && <div className="mb-4 text-gray-400 dark:text-gray-600">{icon}</div>}
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      {description && <p className="mb-4 text-sm text-gray-500 dark:text-gray-400 max-w-sm">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  )
}
