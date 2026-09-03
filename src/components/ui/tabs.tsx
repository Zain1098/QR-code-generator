'use client';

import * as React from "react"
import { cn } from "@/lib/utils"

const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
}>({ value: '', onValueChange: () => {} });

export function Tabs({ defaultValue, value, onValueChange, children, className }: { defaultValue?: string; value?: string; onValueChange?: (value: string) => void; children: React.ReactNode; className?: string }) {
  const [active, setActive] = React.useState(value || defaultValue || '');

  const handleValueChange = (newValue: string) => {
    setActive(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  React.useEffect(() => {
    if (value !== undefined) {
      setActive(value);
    }
  }, [value]);

  return (
    <TabsContext.Provider value={{ value: active, onValueChange: handleValueChange }}>
      <div className={cn("", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 dark:bg-gray-800 dark:text-gray-400", className)}
      {...props}
    />
  );
}

export function TabsTrigger({ value, className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) {
  const context = React.useContext(TabsContext);
  const isActive = context.value === value;

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-900",
        isActive ? "bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-gray-100" : "hover:text-gray-900 dark:hover:text-gray-100",
        className
      )}
      onClick={() => context.onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  const context = React.useContext(TabsContext);
  if (context.value !== value) return null;

  return (
    <div
      className={cn("mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:ring-offset-gray-900", className)}
      {...props}
    >
      {children}
    </div>
  );
}
