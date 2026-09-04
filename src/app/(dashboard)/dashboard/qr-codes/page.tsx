'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  LayoutGrid, 
  List, 
  PlusCircle, 
  Download, 
  Copy, 
  Trash2, 
  Check, 
  QrCode, 
  ExternalLink, 
  Eye,
  RefreshCw
} from 'lucide-react';
import { getLocalMatrices, deleteLocalMatrix, MatrixRecord } from '@/lib/matrix-storage';
import { toast } from 'sonner';

export default function QrCodesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [matrices, setMatrices] = useState<MatrixRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    // 1. Read local storage
    const local = getLocalMatrices();
    setMatrices(local);

    // 2. Fetch server if available
    try {
      const res = await fetch('/api/qr?limit=100');
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          setMatrices(json.data);
        }
      }
    } catch {
      // Fallback works seamlessly
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered matrices
  const filteredMatrices = useMemo(() => {
    return matrices.filter((m) => {
      // Search
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query || 
        m.name.toLowerCase().includes(query) || 
        m.content.toLowerCase().includes(query) ||
        (m.destination_url && m.destination_url.toLowerCase().includes(query));

      // Type
      const matchesType = selectedType === 'all' || m.qr_type.toLowerCase() === selectedType.toLowerCase();

      // Status
      const matchesStatus = selectedStatus === 'all' || m.status === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [matrices, searchQuery, selectedType, selectedStatus]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Matrix payload copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete matrix specimen "${name}" from registry?`)) return;

    deleteLocalMatrix(id);
    setMatrices((prev) => prev.filter((m) => m.id !== id));

    try {
      await fetch(`/api/qr/${id}?hard=true`, { method: 'DELETE' });
    } catch {}

    toast.success(`Specimen "${name}" deleted from registry.`);
  };

  const handleDownloadQuick = async (matrix: MatrixRecord) => {
    try {
      const QRCodeStyling = (await import('qr-code-styling')).default;
      const qr = new QRCodeStyling({
        width: 1024,
        height: 1024,
        data: matrix.destination_url || matrix.content,
        dotsOptions: {
          color: matrix.customization?.fgColor || '#101216',
          type: matrix.customization?.dotStyle || 'square',
        },
        backgroundOptions: {
          color: matrix.customization?.bgColor || '#FFFFFF',
        },
      });

      await qr.download({
        name: `specimen-${matrix.id}`,
        extension: 'png',
      });
      toast.success('Matrix PNG exported at 1024px');
    } catch (err: any) {
      toast.error(`Export failed: ${err.message || 'Error'}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Workbench Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-border-hairpin dark:border-dark-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 inline-block"></span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted dark:text-dark-ink-muted font-semibold">
              INDEX // MATRIX REPOSITORY
            </span>
          </div>
          <h1 className="font-mono text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink-primary dark:text-dark-ink-primary">
            QR Matrices
          </h1>
          <p className="text-xs text-ink-muted dark:text-dark-ink-muted mt-1 font-sans">
            Calibrated matrix records, vector proofs, optical telemetry, and high-resolution exports.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link 
            href="/create" 
            className="inline-flex items-center gap-2 bg-ink-primary hover:bg-black text-white dark:bg-dark-ink-primary dark:hover:bg-white dark:text-dark-canvas px-4 py-2.5 rounded-none font-mono text-xs uppercase tracking-wider font-semibold shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Craft Matrix</span>
          </Link>
        </div>
      </div>

      {/* Filters and Actions Bar */}
      <div className="flex flex-col md:flex-row gap-3 justify-between items-center bg-surface-workbench dark:bg-dark-surface p-3.5 border border-border-hairpin dark:border-dark-border shadow-sm transition-colors rounded-none">
        <div className="flex-1 w-full md:w-auto relative">
          <Search className="w-4 h-4 text-ink-muted dark:text-dark-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by specimen name, destination URL, or payload..." 
            className="w-full pl-9 pr-4 py-2 border border-border-hairpin dark:border-dark-border bg-canvas-paper dark:bg-dark-panel text-ink-primary dark:text-dark-ink-primary text-xs font-mono rounded-none outline-none focus:border-ink-primary dark:focus:border-dark-ink-primary"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-border-hairpin dark:border-dark-border bg-canvas-paper dark:bg-dark-panel text-ink-primary dark:text-dark-ink-primary text-xs font-mono rounded-none outline-none cursor-pointer"
          >
            <option value="all">ALL PROTOCOLS</option>
            <option value="url">URL LINK</option>
            <option value="vcard">VCARD CONTACT</option>
            <option value="wifi">WI-FI NETWORK</option>
            <option value="text">PLAIN TEXT</option>
            <option value="payment">PAYMENT</option>
            <option value="social">SOCIAL</option>
          </select>
          
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-border-hairpin dark:border-dark-border bg-canvas-paper dark:bg-dark-panel text-ink-primary dark:text-dark-ink-primary text-xs font-mono rounded-none outline-none cursor-pointer"
          >
            <option value="all">STATUS: ALL</option>
            <option value="active">ACTIVE</option>
            <option value="inactive">INACTIVE</option>
            <option value="archived">ARCHIVED</option>
          </select>

          <div className="flex items-center bg-print-bed dark:bg-dark-panel p-0.5 border border-border-hairpin dark:border-dark-border">
            <button 
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`p-1.5 rounded-none font-mono text-[10px] transition-colors ${viewMode === 'grid' ? 'bg-surface-workbench dark:bg-dark-surface text-ink-primary dark:text-dark-ink-primary shadow-sm' : 'text-ink-muted dark:text-dark-ink-muted'}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              title="Ledger List View"
              className={`p-1.5 rounded-none font-mono text-[10px] transition-colors ${viewMode === 'list' ? 'bg-surface-workbench dark:bg-dark-surface text-ink-primary dark:text-dark-ink-primary shadow-sm' : 'text-ink-muted dark:text-dark-ink-muted'}`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div>
        {isLoading ? (
          <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-12 min-h-[360px] flex flex-col items-center justify-center animate-pulse">
            <RefreshCw className="w-8 h-8 text-ink-muted dark:text-dark-ink-muted animate-spin mb-3" />
            <p className="font-mono text-xs uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted">
              Querying Ledger Registry...
            </p>
          </div>
        ) : filteredMatrices.length === 0 ? (
          <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border shadow-sm p-12 text-center min-h-[340px] flex flex-col items-center justify-center rounded-none">
            <div className="w-12 h-12 bg-print-bed dark:bg-dark-panel border border-border-hairpin dark:border-dark-border flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-ink-muted dark:text-dark-ink-muted" />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted dark:text-dark-ink-muted font-semibold mb-1">
              RECORD COUNT: 0 MATCHES
            </div>
            <h3 className="font-mono text-base font-bold uppercase text-ink-primary dark:text-dark-ink-primary mb-2">
              No QR Matrices Found
            </h3>
            <p className="text-xs text-ink-muted dark:text-dark-ink-muted mb-6 font-sans max-w-sm">
              {searchQuery || selectedType !== 'all' || selectedStatus !== 'all'
                ? 'No matrix specimens match your search or filter criteria. Try resetting filters.'
                : 'No active matrix specimens registered in your atelier ledger. Create your first calibrated QR code.'}
            </p>
            {searchQuery || selectedType !== 'all' || selectedStatus !== 'all' ? (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('all');
                  setSelectedStatus('all');
                }}
                className="px-4 py-2 border border-border-hairpin dark:border-dark-border font-mono text-xs uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary hover:bg-print-bed dark:hover:bg-dark-panel transition-colors"
              >
                Reset Ledger Filters
              </button>
            ) : (
              <Link 
                href="/create" 
                className="inline-flex items-center gap-2 bg-ink-primary hover:bg-black text-white dark:bg-dark-ink-primary dark:hover:bg-white dark:text-dark-canvas px-5 py-2.5 rounded-none font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Craft First Matrix</span>
              </Link>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMatrices.map((matrix) => (
              <div 
                key={matrix.id} 
                className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border rounded-none flex flex-col justify-between hover:border-ink-primary dark:hover:border-dark-ink-primary transition-all group"
              >
                {/* Header Specimen Strip */}
                <div className="p-3.5 border-b border-border-hairpin dark:border-dark-border flex justify-between items-center bg-print-bed/40 dark:bg-dark-panel/40">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 ${matrix.status === 'active' ? 'bg-emerald-600 dark:bg-emerald-400' : 'bg-zinc-400'} rounded-full`}></span>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted dark:text-dark-ink-muted font-semibold truncate max-w-[150px]">
                      {matrix.id.slice(0, 14)}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] uppercase border border-border-hairpin dark:border-dark-border px-1.5 py-0.5 text-ink-muted dark:text-dark-ink-muted font-semibold">
                    {matrix.qr_type}
                  </span>
                </div>

                {/* Body Details */}
                <div className="p-4 space-y-3 flex-1">
                  <div>
                    <Link 
                      href={`/dashboard/qr-codes/${matrix.id}`}
                      className="font-mono text-sm font-bold uppercase text-ink-primary dark:text-dark-ink-primary hover:underline block truncate"
                    >
                      {matrix.name}
                    </Link>
                    <p className="font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted truncate mt-1">
                      {matrix.destination_url || matrix.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border-hairpin dark:border-dark-border font-mono text-[11px]">
                    <span className="text-ink-muted dark:text-dark-ink-muted">
                      {new Date(matrix.created_at).toLocaleDateString()}
                    </span>
                    <span className="font-bold text-ink-primary dark:text-dark-ink-primary">
                      {matrix.total_scans || 0} DECODES
                    </span>
                  </div>
                </div>

                {/* Actions Toolbar */}
                <div className="p-2.5 border-t border-border-hairpin dark:border-dark-border bg-print-bed/20 dark:bg-dark-panel/20 flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopy(matrix.destination_url || matrix.content, matrix.id)}
                      className="p-1.5 border border-border-hairpin dark:border-dark-border text-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary bg-surface-workbench dark:bg-dark-surface transition-colors"
                      title="Copy Payload"
                    >
                      {copiedId === matrix.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDownloadQuick(matrix)}
                      className="p-1.5 border border-border-hairpin dark:border-dark-border text-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary bg-surface-workbench dark:bg-dark-surface transition-colors"
                      title="Download 1024px PNG"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(matrix.id, matrix.name)}
                      className="p-1.5 border border-border-hairpin dark:border-dark-border text-red-500 hover:text-red-700 dark:hover:text-red-400 bg-surface-workbench dark:bg-dark-surface transition-colors"
                      title="Delete Matrix"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <Link
                    href={`/dashboard/qr-codes/${matrix.id}`}
                    className="px-3 py-1 border border-border-hairpin dark:border-dark-border font-mono text-[11px] uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary bg-surface-workbench dark:bg-dark-surface hover:bg-ink-primary hover:text-white dark:hover:bg-dark-ink-primary dark:hover:text-dark-canvas transition-colors"
                  >
                    Inspect &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-print-bed dark:bg-dark-panel uppercase font-semibold text-[10px] tracking-wider text-ink-muted dark:text-dark-ink-muted border-b border-border-hairpin dark:border-dark-border">
                <tr>
                  <th className="p-3.5">Specimen Name</th>
                  <th className="p-3.5">Protocol</th>
                  <th className="p-3.5">Target / Payload</th>
                  <th className="p-3.5">Telemetry</th>
                  <th className="p-3.5">Created</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-hairpin dark:divide-dark-border">
                {filteredMatrices.map((matrix) => (
                  <tr key={matrix.id} className="hover:bg-print-bed/40 dark:hover:bg-dark-panel/40 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 ${matrix.status === 'active' ? 'bg-emerald-600 dark:bg-emerald-400' : 'bg-zinc-400'} rounded-full`}></span>
                        <Link 
                          href={`/dashboard/qr-codes/${matrix.id}`}
                          className="font-bold text-ink-primary dark:text-dark-ink-primary uppercase hover:underline"
                        >
                          {matrix.name}
                        </Link>
                      </div>
                    </td>
                    <td className="p-3.5 uppercase text-ink-muted dark:text-dark-ink-muted">{matrix.qr_type}</td>
                    <td className="p-3.5 truncate max-w-xs text-ink-muted dark:text-dark-ink-muted">{matrix.destination_url || matrix.content}</td>
                    <td className="p-3.5 font-bold text-ink-primary dark:text-dark-ink-primary">{matrix.total_scans || 0} SCANS</td>
                    <td className="p-3.5 text-ink-muted dark:text-dark-ink-muted">{new Date(matrix.created_at).toLocaleDateString()}</td>
                    <td className="p-3.5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(matrix.destination_url || matrix.content, matrix.id)}
                          className="p-1 border border-border-hairpin dark:border-dark-border hover:bg-canvas-paper dark:hover:bg-dark-panel"
                          title="Copy Payload"
                        >
                          {copiedId === matrix.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-ink-muted" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDownloadQuick(matrix)}
                          className="p-1 border border-border-hairpin dark:border-dark-border hover:bg-canvas-paper dark:hover:bg-dark-panel text-ink-muted hover:text-ink-primary"
                          title="Download PNG"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(matrix.id, matrix.name)}
                          className="p-1 border border-border-hairpin dark:border-dark-border hover:bg-canvas-paper dark:hover:bg-dark-panel text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <Link
                          href={`/dashboard/qr-codes/${matrix.id}`}
                          className="px-2.5 py-1 border border-border-hairpin dark:border-dark-border text-[10px] uppercase font-semibold text-ink-primary dark:text-dark-ink-primary hover:bg-ink-primary hover:text-white dark:hover:bg-dark-ink-primary dark:hover:text-dark-canvas transition-colors"
                        >
                          Inspect
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
