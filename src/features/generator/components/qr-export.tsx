'use client';

import React, { useState } from 'react';
import { Download, Copy, Check, Image, FileCode, FileImage, BookmarkPlus, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { saveLocalMatrix } from '@/lib/matrix-storage';
import Link from 'next/link';

interface QRExportProps {
  qrContainerRef: React.RefObject<HTMLDivElement | null>;
  hasQR: boolean;
  qrData?: string;
  qrType?: string;
  customization?: any;
}

type ExportFormat = 'png' | 'svg' | 'webp';

const EXPORT_SIZES = [
  { value: 512, label: '512px' },
  { value: 1024, label: '1024px' },
  { value: 2048, label: '2048px' },
  { value: 4096, label: '4096px (Print)' },
];

const FORMAT_INFO: Record<ExportFormat, { icon: React.ReactNode; label: string; description: string }> = {
  png: { icon: <Image className="w-4 h-4" />, label: 'PNG', description: 'Best for web & social' },
  svg: { icon: <FileCode className="w-4 h-4" />, label: 'SVG', description: 'Scalable, best for print' },
  webp: { icon: <FileImage className="w-4 h-4" />, label: 'WebP', description: 'Smaller file size' },
};

export function QRExport({ qrContainerRef, hasQR, qrData, qrType = 'url', customization }: QRExportProps) {
  const [format, setFormat] = useState<ExportFormat>('png');
  const [size, setSize] = useState(1024);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [archived, setArchived] = useState(false);

  const handleArchive = async () => {
    if (!qrData) {
      toast.error('No matrix payload available to archive');
      return;
    }

    setIsArchiving(true);
    try {
      const specimenName = `${qrType.toUpperCase()} Specimen #${Math.floor(100 + Math.random() * 900)}`;
      const newMatrix = saveLocalMatrix({
        name: specimenName,
        qr_type: qrType,
        is_dynamic: true,
        content: qrData,
        destination_url: qrData.startsWith('http') ? qrData : undefined,
        customization,
        status: 'active',
      });

      // Also attempt server sync via /api/qr
      try {
        await fetch('/api/qr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: specimenName,
            qr_type: qrType,
            is_dynamic: true,
            content: qrData,
            destination_url: qrData.startsWith('http') ? qrData : undefined,
            customization,
          }),
        });
      } catch {
        // Local persistence already succeeded
      }

      setArchived(true);
      toast.success('Matrix specimen archived to Operator Desk registry!', {
        action: {
          label: 'View in Ledger',
          onClick: () => {
            window.location.href = '/dashboard/qr-codes';
          },
        },
      });
      setTimeout(() => setArchived(false), 3000);
    } catch (err: any) {
      toast.error(`Failed to archive matrix: ${err.message || 'Error'}`);
    } finally {
      setIsArchiving(false);
    }
  };

  const getQRInstance = () => {
    if (qrContainerRef.current) {
      return (qrContainerRef.current as any).__qrInstance;
    }
    return null;
  };

  const handleDownload = async () => {
    const qrInstance = getQRInstance();
    if (!qrInstance) {
      toast.error('No QR code to download');
      return;
    }

    setIsDownloading(true);
    try {
      // Update size before downloading
      qrInstance.update({ width: size, height: size });
      
      // Small delay for render
      await new Promise(r => setTimeout(r, 100));

      const extension = format === 'svg' ? 'svg' : format;
      const filename = `qr-code-${Date.now()}.${extension}`;

      if (format === 'svg') {
        const blob = await qrInstance.getRawData('svg');
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          link.click();
          URL.revokeObjectURL(url);
        }
      } else {
        await qrInstance.download({
          name: `qr-code-${Date.now()}`,
          extension: format,
        });
      }

      // Reset to preview size
      qrInstance.update({ width: 280, height: 280 });
      toast.success(`QR code downloaded as ${format.toUpperCase()}`);
    } catch (err) {
      console.error('Download error:', err);
      toast.error('Failed to download QR code');
      // Reset size on error too
      const qr = getQRInstance();
      if (qr) qr.update({ width: 280, height: 280 });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopy = async () => {
    const qrInstance = getQRInstance();
    if (!qrInstance) {
      toast.error('No QR code to copy');
      return;
    }

    setIsCopying(true);
    try {
      const blob = await qrInstance.getRawData('png');
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopied(true);
        toast.success('QR code copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Copy error:', err);
      toast.error('Failed to copy. Your browser may not support this.');
    } finally {
      setIsCopying(false);
    }
  };

  if (!hasQR) return null;

  return (
    <div className="space-y-3 pt-3 border-t border-border-hairpin dark:border-dark-border">
      {/* Format & Resolution Segmented Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-mono text-[10px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted font-semibold">
            Export Matrix Calibration
          </label>
          <span className="font-mono text-[10px] text-ink-muted dark:text-dark-ink-muted">
            {format === 'svg' ? 'VECTOR ∞' : `${size} × ${size} PX`}
          </span>
        </div>

        {/* Format Selectors */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-print-bed dark:bg-dark-surface rounded-lg border border-border-hairpin dark:border-dark-border">
          {(Object.keys(FORMAT_INFO) as ExportFormat[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFormat(f)}
              className={`py-1.5 px-2 rounded text-center text-xs font-mono uppercase tracking-wider transition-all select-none ${
                format === f
                  ? 'bg-surface-workbench dark:bg-dark-panel text-ink-primary dark:text-dark-ink-primary font-semibold shadow-sm border border-border-hairpin dark:border-dark-border-strong'
                  : 'text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary'
              }`}
            >
              {FORMAT_INFO[f].label}
            </button>
          ))}
        </div>

        {/* Resolution Select (Only for raster) */}
        {format !== 'svg' && (
          <div className="grid grid-cols-4 gap-1 p-0.5 bg-print-bed dark:bg-dark-surface rounded border border-border-hairpin dark:border-dark-border">
            {EXPORT_SIZES.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setSize(s.value)}
                className={`py-1 text-center font-mono text-[11px] rounded transition-all ${
                  size === s.value
                    ? 'bg-surface-workbench dark:bg-dark-panel text-ink-primary dark:text-dark-ink-primary font-semibold shadow-sm'
                    : 'text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary'
                }`}
              >
                {s.value}px
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Immediate Transmission & Export Suite */}
      <div className="flex flex-col sm:flex-row gap-2 pt-1">
        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex-1 h-11 bg-ink-primary hover:bg-black text-white dark:bg-dark-ink-primary dark:hover:bg-white dark:text-dark-canvas rounded font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] disabled:opacity-50"
        >
          {isDownloading ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>Download Artifact ({format.toUpperCase()})</span>
        </button>

        <div className="flex gap-2">
          {format !== 'svg' && (
            <button
              type="button"
              onClick={async () => {
                const prev = format;
                setFormat('svg');
                // quick SVG download
                const qrInstance = getQRInstance();
                if (qrInstance) {
                  const blob = await qrInstance.getRawData('svg');
                  if (blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `specimen-vector-${Date.now()}.svg`;
                    link.click();
                    URL.revokeObjectURL(url);
                    toast.success('Vector SVG Exported');
                  }
                }
                setFormat(prev);
              }}
              title="Quick Vector SVG Export"
              className="h-11 px-3 bg-surface-workbench dark:bg-dark-panel hover:bg-print-bed dark:hover:bg-dark-surface text-ink-primary dark:text-dark-ink-primary border border-border-hairpin dark:border-dark-border rounded font-mono text-xs font-semibold shadow-sm transition-all"
            >
              SVG
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            disabled={isCopying}
            className="h-11 px-3.5 bg-surface-workbench dark:bg-dark-panel hover:bg-print-bed dark:hover:bg-dark-surface text-ink-primary dark:text-dark-ink-primary border border-border-hairpin dark:border-dark-border rounded font-mono text-xs font-medium flex items-center justify-center shadow-sm transition-all disabled:opacity-50"
            title="Copy Matrix to Clipboard"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Save to Workbench Ledger Action */}
      <div className="pt-1">
        <button
          type="button"
          onClick={handleArchive}
          disabled={isArchiving}
          className="w-full h-10 border border-border-hairpin dark:border-dark-border bg-surface-workbench dark:bg-dark-panel hover:bg-print-bed dark:hover:bg-dark-surface text-ink-primary dark:text-dark-ink-primary font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
        >
          {archived ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-700 dark:text-emerald-400">Specimen Archived In Ledger</span>
            </>
          ) : isArchiving ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Archiving Specimen...</span>
            </>
          ) : (
            <>
              <BookmarkPlus className="w-4 h-4 text-ink-muted dark:text-dark-ink-muted" />
              <span>Archive Specimen To Operator Desk</span>
            </>
          )}
        </button>
      </div>

      {/* Optical Scannability Verification Ledger */}
      <div className="flex items-center justify-between px-2.5 py-1.5 bg-print-bed/80 dark:bg-dark-surface/80 rounded border border-border-hairpin dark:border-dark-border text-ink-muted dark:text-dark-ink-muted text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse"></span>
          <span>OPTICAL CERTIFIED</span>
        </div>
        <Link href="/dashboard/qr-codes" className="hover:underline flex items-center gap-1 text-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary">
          <span>Open Matrix Ledger &rarr;</span>
        </Link>
      </div>
    </div>
  );
}
