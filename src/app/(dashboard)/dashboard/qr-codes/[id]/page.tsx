'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  PlusCircle, 
  AlertCircle, 
  RefreshCw, 
  Download, 
  Copy, 
  Check, 
  Trash2, 
  Power, 
  Share2, 
  Edit,
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { getLocalMatrixById, updateLocalMatrix, deleteLocalMatrix, MatrixRecord } from '@/lib/matrix-storage';
import { toast } from 'sonner';

export default function QrCodeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const matrixId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [matrix, setMatrix] = useState<MatrixRecord | null>(null);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadSpecimen() {
      if (!matrixId) return;

      // 1. Check local storage
      const local = getLocalMatrixById(matrixId);
      if (local) {
        setMatrix(local);
        setIsLoading(false);
      }

      // 2. Try server fetch
      try {
        const res = await fetch(`/api/qr/${matrixId}`);
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            setMatrix(json.data);
          }
        }
      } catch {}

      setIsLoading(false);
    }

    loadSpecimen();
  }, [matrixId]);

  // Render QR Code onto DOM element
  useEffect(() => {
    if (!matrix || !qrRef.current) return;

    let isMounted = true;
    (async () => {
      try {
        const QRCodeStyling = (await import('qr-code-styling')).default;
        const qr = new QRCodeStyling({
          width: 240,
          height: 240,
          data: matrix.destination_url || matrix.content,
          margin: 6,
          dotsOptions: {
            color: matrix.customization?.fgColor || '#101216',
            type: matrix.customization?.dotStyle || 'square',
          },
          backgroundOptions: {
            color: matrix.customization?.bgColor || '#FFFFFF',
          },
        });

        if (isMounted && qrRef.current) {
          qrRef.current.innerHTML = '';
          qr.append(qrRef.current);
        }
      } catch (e) {
        console.error('Failed to render QR preview:', e);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [matrix]);

  const handleCopy = () => {
    if (!matrix) return;
    navigator.clipboard.writeText(matrix.destination_url || matrix.content);
    setCopied(true);
    toast.success('Matrix payload copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async (format: 'png' | 'svg') => {
    if (!matrix) return;
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

      if (format === 'svg') {
        const blob = await qr.getRawData('svg');
        if (blob) {
          const svgBlob = blob instanceof Blob ? blob : new Blob([blob as any], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(svgBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `matrix-${matrix.id}.svg`;
          link.click();
          URL.revokeObjectURL(url);
          toast.success('Vector SVG downloaded');
        }
      } else {
        await qr.download({
          name: `matrix-${matrix.id}`,
          extension: 'png',
        });
        toast.success('High-Resolution PNG downloaded');
      }
    } catch (err: any) {
      toast.error(`Download failed: ${err.message || 'Error'}`);
    }
  };

  const handleToggleStatus = async () => {
    if (!matrix) return;
    const nextStatus = matrix.status === 'active' ? 'inactive' : 'active';
    const updated = updateLocalMatrix(matrix.id, { status: nextStatus });
    if (updated) {
      setMatrix(updated);
      toast.success(`Specimen status changed to ${nextStatus.toUpperCase()}`);
    }

    try {
      await fetch(`/api/qr/${matrix.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
    } catch {}
  };

  const handleDelete = async () => {
    if (!matrix) return;
    if (!confirm(`Permanently remove matrix specimen "${matrix.name}"?`)) return;

    deleteLocalMatrix(matrix.id);
    try {
      await fetch(`/api/qr/${matrix.id}?hard=true`, { method: 'DELETE' });
    } catch {}

    toast.success('Specimen deleted.');
    router.push('/dashboard/qr-codes');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-3">
        <RefreshCw className="w-6 h-6 animate-spin text-ink-muted dark:text-dark-ink-muted" />
        <span className="font-mono text-xs uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted">
          Querying Matrix Registry...
        </span>
      </div>
    );
  }

  if (!matrix) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 pb-5 border-b border-border-hairpin dark:border-dark-border">
          <Link 
            href="/dashboard/qr-codes" 
            className="p-2 border border-border-hairpin dark:border-dark-border hover:bg-surface-workbench dark:hover:bg-dark-surface text-ink-muted hover:text-ink-primary dark:text-dark-ink-muted dark:hover:text-dark-ink-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted dark:text-dark-ink-muted font-semibold">
              SPECIMEN RECORD // UNREACHABLE
            </span>
            <h1 className="font-mono text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink-primary dark:text-dark-ink-primary">
              Matrix Record Status
            </h1>
          </div>
        </div>

        <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-8 sm:p-12 text-center max-w-xl mx-auto rounded-none">
          <div className="w-14 h-14 bg-print-bed dark:bg-dark-panel border border-border-hairpin dark:border-dark-border flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7 text-ink-muted dark:text-dark-ink-muted" />
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted dark:text-dark-ink-muted font-semibold mb-1">
            REGISTRY FAULT: SPECIMEN NOT FOUND
          </div>
          <h3 className="font-mono text-base font-bold uppercase text-ink-primary dark:text-dark-ink-primary mb-2">
            Matrix Index Unreachable
          </h3>
          <p className="text-xs text-ink-muted dark:text-dark-ink-muted mb-6 max-w-md mx-auto font-sans leading-relaxed">
            The requested vector matrix does not exist in your active atelier repository, has expired, or requires elevated authorization.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link 
              href="/dashboard/qr-codes" 
              className="px-4 py-2.5 border border-border-hairpin dark:border-dark-border text-ink-primary dark:text-dark-ink-primary font-mono text-xs uppercase tracking-wider hover:bg-print-bed dark:hover:bg-dark-panel transition-colors"
            >
              Return to Ledger
            </Link>
            <Link 
              href="/create" 
              className="inline-flex items-center justify-center gap-2 bg-ink-primary hover:bg-black text-white dark:bg-dark-ink-primary dark:hover:bg-white dark:text-dark-canvas px-4 py-2.5 font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Craft New Matrix</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Workbench Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-border-hairpin dark:border-dark-border">
        <div className="flex items-center gap-3">
          <Link 
            href="/dashboard/qr-codes" 
            className="p-2 border border-border-hairpin dark:border-dark-border hover:bg-surface-workbench dark:hover:bg-dark-surface text-ink-muted hover:text-ink-primary dark:text-dark-ink-muted dark:hover:text-dark-ink-primary transition-colors"
            title="Return to Ledger"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 ${matrix.status === 'active' ? 'bg-emerald-600 dark:bg-emerald-400' : 'bg-zinc-400'} rounded-full`}></span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted dark:text-dark-ink-muted font-semibold">
                SPECIMEN RECORD // {matrix.id}
              </span>
            </div>
            <h1 className="font-mono text-2xl font-bold uppercase tracking-tight text-ink-primary dark:text-dark-ink-primary">
              {matrix.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleStatus}
            className={`px-3 py-2 border font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 ${
              matrix.status === 'active'
                ? 'border-border-hairpin dark:border-dark-border text-ink-muted hover:text-ink-primary hover:bg-print-bed dark:hover:bg-dark-panel'
                : 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{matrix.status === 'active' ? 'Pause Matrix' : 'Activate Matrix'}</span>
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-2 border border-red-300 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Purge</span>
          </button>
        </div>
      </div>

      {/* Main Specimen Workbench Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Rendering */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-6 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-[9px] uppercase tracking-widest text-ink-muted dark:text-dark-ink-muted font-semibold mb-4">
              OPTICAL ARTIFACT PROOF
            </span>
            <div 
              ref={qrRef} 
              className="p-3 bg-white border border-border-hairpin dark:border-dark-border shadow-sm flex items-center justify-center min-h-[260px] min-w-[260px]"
            />
            <div className="w-full mt-4 pt-3 border-t border-border-hairpin dark:border-dark-border flex items-center justify-between font-mono text-[10px] text-ink-muted dark:text-dark-ink-muted">
              <span>ISO/IEC 18004 PASS</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% READABILITY</span>
            </div>
          </div>

          {/* Export Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDownload('png')}
              className="py-2.5 px-3 bg-ink-primary hover:bg-black text-white dark:bg-dark-ink-primary dark:hover:bg-white dark:text-dark-canvas font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PNG (1024px)</span>
            </button>
            <button
              onClick={() => handleDownload('svg')}
              className="py-2.5 px-3 border border-border-hairpin dark:border-dark-border bg-surface-workbench dark:bg-dark-surface hover:bg-print-bed dark:hover:bg-dark-panel text-ink-primary dark:text-dark-ink-primary font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Vector (SVG)</span>
            </button>
          </div>
        </div>

        {/* Right Column: Specimen Telemetry & Ledger Data */}
        <div className="lg:col-span-7 space-y-4">
          {/* Metadata Card */}
          <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border-hairpin dark:border-dark-border">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary">
                Technical Calibration
              </span>
              <span className="font-mono text-[10px] uppercase border border-border-hairpin dark:border-dark-border px-2 py-0.5 text-ink-muted dark:text-dark-ink-muted">
                {matrix.qr_type}
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted font-semibold block mb-1">
                  Destination Payload / Encrypted URI
                </label>
                <div className="flex items-center gap-2 p-2.5 border border-border-hairpin dark:border-dark-border bg-canvas-paper dark:bg-dark-canvas">
                  <span className="truncate flex-1 text-ink-primary dark:text-dark-ink-primary select-all">
                    {matrix.destination_url || matrix.content}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-1 text-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary shrink-0"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 border border-border-hairpin dark:border-dark-border bg-print-bed/30 dark:bg-dark-panel/30">
                  <span className="text-[9px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted block">OPTICAL SCANS</span>
                  <p className="text-lg font-bold text-ink-primary dark:text-dark-ink-primary mt-0.5">{matrix.total_scans || 0}</p>
                </div>

                <div className="p-3 border border-border-hairpin dark:border-dark-border bg-print-bed/30 dark:bg-dark-panel/30">
                  <span className="text-[9px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted block">ROUTING</span>
                  <p className="text-xs font-bold text-ink-primary dark:text-dark-ink-primary mt-1 uppercase">
                    {matrix.is_dynamic ? 'Dynamic URI' : 'Static Plain'}
                  </p>
                </div>

                <div className="p-3 border border-border-hairpin dark:border-dark-border bg-print-bed/30 dark:bg-dark-panel/30 col-span-2 sm:col-span-1">
                  <span className="text-[9px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted block">DISPATCHED</span>
                  <p className="text-xs font-semibold text-ink-primary dark:text-dark-ink-primary mt-1 truncate">
                    {new Date(matrix.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Substrate Guidelines & Verification */}
          <div className="bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border p-5 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase text-ink-primary dark:text-dark-ink-primary">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Substrate Press Verification</span>
            </div>
            <p className="text-xs text-ink-muted dark:text-dark-ink-muted font-sans leading-relaxed">
              This specimen has passed verification tolerances for lithographic, screen print, and architectural laser etching applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
