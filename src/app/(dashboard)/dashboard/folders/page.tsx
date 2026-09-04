'use client';

import React, { useState } from 'react';
import { FolderOpen, Plus, FolderPlus, X, Tag } from 'lucide-react';

export default function FoldersPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [selectedColor, setSelectedColor] = useState('mono');

  const colorPalette = [
    { id: 'mono', label: 'CARBON', bg: 'bg-zinc-800' },
    { id: 'amber', label: 'AMBER', bg: 'bg-amber-600' },
    { id: 'emerald', label: 'EMERALD', bg: 'bg-emerald-600' },
    { id: 'cyan', label: 'CYAN', bg: 'bg-cyan-600' },
    { id: 'indigo', label: 'INDIGO', bg: 'bg-indigo-600' },
    { id: 'rose', label: 'ROSE', bg: 'bg-rose-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Workbench Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-border-hairpin dark:border-dark-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 inline-block"></span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted dark:text-dark-ink-muted font-semibold">
              INDEXING ARCHIVE // FOLDERS
            </span>
          </div>
          <h1 className="font-mono text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink-primary dark:text-dark-ink-primary">
            Project Archives
          </h1>
          <p className="text-xs text-ink-muted dark:text-dark-ink-muted mt-1 font-sans">
            Partition, catalog, and index your physical matrix specimens into distinct client workspaces and distribution batches.
          </p>
        </div>
        <button 
          onClick={() => setIsDialogOpen(true)}
          className="inline-flex items-center gap-2 bg-ink-primary hover:bg-black text-white dark:bg-dark-ink-primary dark:hover:bg-white dark:text-dark-canvas px-4 py-2.5 rounded-none font-mono text-xs uppercase tracking-wider font-semibold shadow-sm transition-colors"
        >
          <FolderPlus className="w-4 h-4" />
          <span>New Archive Drawer</span>
        </button>
      </div>

      {/* Empty State / Workspace Ledger */}
      <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-10 sm:p-16 flex flex-col items-center justify-center text-center min-h-[380px] rounded-none">
        <div className="w-14 h-14 bg-print-bed dark:bg-dark-panel border border-border-hairpin dark:border-dark-border flex items-center justify-center mx-auto mb-4">
          <FolderOpen className="w-7 h-7 text-ink-muted dark:text-dark-ink-muted" />
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted dark:text-dark-ink-muted font-semibold mb-1">
          DIRECTORY: VACANT
        </div>
        <h3 className="font-mono text-base font-bold uppercase text-ink-primary dark:text-dark-ink-primary mb-2">
          No Archival Drawers Created
        </h3>
        <p className="text-xs text-ink-muted dark:text-dark-ink-muted mb-6 max-w-sm mx-auto font-sans leading-relaxed">
          Create structured directories to organize your high-density matrices by campaign, brand asset registry, or print substrate run.
        </p>
        <button 
          onClick={() => setIsDialogOpen(true)}
          className="inline-flex items-center gap-2 border border-ink-primary dark:border-dark-ink-primary text-ink-primary dark:text-dark-ink-primary hover:bg-ink-primary hover:text-white dark:hover:bg-dark-ink-primary dark:hover:text-dark-canvas px-5 py-2.5 rounded-none font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Initialize First Folder</span>
        </button>
      </div>

      {/* Stitch Architectural Modal */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border shadow-2xl w-full max-w-md rounded-none overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-border-hairpin dark:border-dark-border flex justify-between items-center bg-print-bed dark:bg-dark-panel">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 inline-block"></span>
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-ink-primary dark:text-dark-ink-primary">
                  Create Archival Drawer
                </h3>
              </div>
              <button 
                onClick={() => setIsDialogOpen(false)}
                className="text-ink-muted hover:text-ink-primary dark:text-dark-ink-muted dark:hover:text-dark-ink-primary p-1 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted font-semibold mb-2">
                  Drawer Identifier / Folder Name
                </label>
                <input 
                  type="text" 
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  placeholder="e.g. Q4 Packaging - Editorial Run" 
                  className="w-full px-3 py-2.5 border border-border-hairpin dark:border-dark-border rounded-none bg-canvas-paper dark:bg-dark-canvas text-ink-primary dark:text-dark-ink-primary font-mono text-xs focus:ring-1 focus:ring-ink-primary dark:focus:ring-dark-ink-primary outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted font-semibold mb-2">
                  Color Index Mark
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {colorPalette.map(color => (
                    <button 
                      key={color.id} 
                      type="button"
                      onClick={() => setSelectedColor(color.id)}
                      className={`h-8 rounded-none ${color.bg} border transition-all ${
                        selectedColor === color.id 
                          ? 'border-ink-primary dark:border-dark-ink-primary ring-2 ring-ink-primary dark:ring-dark-ink-primary scale-105' 
                          : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border-hairpin dark:border-dark-border bg-print-bed dark:bg-dark-panel flex justify-end gap-3">
              <button 
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary border border-border-hairpin dark:border-dark-border rounded-none transition-colors"
              >
                Dismiss
              </button>
              <button 
                onClick={() => {
                  setIsDialogOpen(false);
                  setFolderName('');
                }}
                className="px-4 py-2 font-mono text-xs uppercase tracking-wider font-semibold text-white bg-ink-primary hover:bg-black dark:bg-dark-ink-primary dark:text-dark-canvas dark:hover:bg-white rounded-none transition-colors"
              >
                Commit Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
