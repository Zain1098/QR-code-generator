'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FolderOpen, Plus, FolderPlus, X, Trash2, ArrowRight, Layers, RefreshCw } from 'lucide-react';
import { getLocalFolders, saveLocalFolder, deleteLocalFolder, FolderRecord } from '@/lib/matrix-storage';
import { toast } from 'sonner';

export default function FoldersPage() {
  const [folders, setFolders] = useState<FolderRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [selectedColor, setSelectedColor] = useState('amber');

  const colorPalette = [
    { id: 'mono', label: 'CARBON', bg: 'bg-zinc-800' },
    { id: 'amber', label: 'AMBER', bg: 'bg-amber-600' },
    { id: 'emerald', label: 'EMERALD', bg: 'bg-emerald-600' },
    { id: 'cyan', label: 'CYAN', bg: 'bg-cyan-600' },
    { id: 'indigo', label: 'INDIGO', bg: 'bg-indigo-600' },
    { id: 'rose', label: 'ROSE', bg: 'bg-rose-600' },
  ];

  const getColorClass = (colorId: string) => {
    switch (colorId) {
      case 'mono': return 'border-zinc-800 text-zinc-800 dark:text-zinc-300';
      case 'amber': return 'border-amber-600 text-amber-600 dark:text-amber-400';
      case 'emerald': return 'border-emerald-600 text-emerald-600 dark:text-emerald-400';
      case 'cyan': return 'border-cyan-600 text-cyan-600 dark:text-cyan-400';
      case 'indigo': return 'border-indigo-600 text-indigo-600 dark:text-indigo-400';
      case 'rose': return 'border-rose-600 text-rose-600 dark:text-rose-400';
      default: return 'border-zinc-800 text-zinc-800';
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    // 1. Read local folders
    const local = getLocalFolders();
    setFolders(local);

    // 2. Fetch server if available
    try {
      const res = await fetch('/api/folders');
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          setFolders(json.data);
        }
      }
    } catch {}

    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) {
      toast.error('Please enter a folder name');
      return;
    }

    const created = saveLocalFolder({
      name: folderName.trim(),
      color: selectedColor,
    });

    setFolders((prev) => [created, ...prev]);
    setIsDialogOpen(false);
    setFolderName('');
    toast.success(`Archival drawer "${created.name}" created.`);

    // Server sync
    try {
      await fetch('/api/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: created.name, color: created.color }),
      });
    } catch {}
  };

  const handleDeleteFolder = async (id: string, name: string) => {
    if (!confirm(`Purge archival drawer "${name}"? Matrices will be moved to unpartitioned root.`)) return;

    deleteLocalFolder(id);
    setFolders((prev) => prev.filter((f) => f.id !== id));
    toast.success(`Drawer "${name}" removed.`);

    try {
      await fetch(`/api/folders/${id}`, { method: 'DELETE' });
    } catch {}
  };

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

      {/* Content Area */}
      <div>
        {isLoading ? (
          <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-12 min-h-[300px] flex flex-col items-center justify-center animate-pulse">
            <RefreshCw className="w-8 h-8 text-ink-muted dark:text-dark-ink-muted animate-spin mb-3" />
            <p className="font-mono text-xs uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted">
              Loading Archive Drawers...
            </p>
          </div>
        ) : folders.length === 0 ? (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {folders.map((folder) => (
              <div 
                key={folder.id} 
                className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border rounded-none p-5 flex flex-col justify-between hover:border-ink-primary dark:hover:border-dark-ink-primary transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-3.5 h-3.5 border-2 ${getColorClass(folder.color)} bg-current opacity-80 shrink-0`}></div>
                    <h3 className="font-mono text-sm font-bold uppercase text-ink-primary dark:text-dark-ink-primary truncate">
                      {folder.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleDeleteFolder(folder.id, folder.name)}
                    className="p-1 text-ink-muted hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    title="Delete Drawer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="pt-3 border-t border-border-hairpin dark:border-dark-border flex items-center justify-between font-mono text-[11px]">
                  <span className="text-ink-muted dark:text-dark-ink-muted">
                    {folder.qr_count !== undefined ? `${folder.qr_count} SPECIMENS` : 'PARTITIONED'}
                  </span>
                  <Link
                    href="/dashboard/qr-codes"
                    className="text-ink-primary dark:text-dark-ink-primary hover:underline flex items-center gap-1 font-semibold uppercase"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
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

            <form onSubmit={handleCreateFolder}>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted font-semibold mb-2">
                    Drawer Identifier / Folder Name
                  </label>
                  <input 
                    type="text" 
                    required
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
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary border border-border-hairpin dark:border-dark-border rounded-none transition-colors"
                >
                  Dismiss
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 font-mono text-xs uppercase tracking-wider font-semibold text-white bg-ink-primary hover:bg-black dark:bg-dark-ink-primary dark:text-dark-canvas dark:hover:bg-white rounded-none transition-colors"
                >
                  Commit Drawer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
