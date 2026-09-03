'use client';

import * as React from "react"
import { cn } from "@/lib/utils"

const DropdownMenuContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({ open: false, setOpen: () => {} });

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => setOpen(false);
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    
    if (open) {
      document.addEventListener('click', handleOutsideClick);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    }
  }, [open]);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block text-left" onClick={(e) => e.stopPropagation()}>{children}</div>
    </DropdownMenuContext.Provider>
  )
}

export function DropdownMenuTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const { open, setOpen } = React.useContext(DropdownMenuContext);
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: () => setOpen(!open),
      "aria-expanded": open,
      "aria-haspopup": true
    });
  }
  return (
    <button onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="true">
      {children}
    </button>
  );
}

export function DropdownMenuContent({ children, className, align = "right" }: { children: React.ReactNode; className?: string; align?: "left" | "right" }) {
  const { open } = React.useContext(DropdownMenuContext);
  if (!open) return null;
  
  return (
    <div className={cn("absolute z-50 mt-2 w-56 rounded-md border border-gray-200 bg-white p-1 shadow-md dark:border-gray-700 dark:bg-gray-800", align === "right" ? "right-0" : "left-0", className)}>
      {children}
    </div>
  )
}

export function DropdownMenuItem({ children, className, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = React.useContext(DropdownMenuContext);
  return (
    <button
      className={cn("relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:focus:text-gray-100", className)}
      onClick={(e) => {
        if (onClick) onClick(e);
        setOpen(false);
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={cn("-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-700", className)} />;
}
