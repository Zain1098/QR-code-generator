'use client';

import React, { useState } from 'react';
import { Download, Copy, Check, Image, FileCode, FileImage } from 'lucide-react';
import { toast } from 'sonner';

interface QRExportProps {
  qrContainerRef: React.RefObject<HTMLDivElement | null>;
  hasQR: boolean;
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

export function QRExport({ qrContainerRef, hasQR }: QRExportProps) {
  const [format, setFormat] = useState<ExportFormat>('png');
  const [size, setSize] = useState(1024);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [copied, setCopied] = useState(false);

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
    <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      {/* Format Selection */}
      <div>
        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          Export Format
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(FORMAT_INFO) as ExportFormat[]).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-xs font-medium transition-colors ${
                format === f
                  ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
              }`}
            >
              {FORMAT_INFO[f].icon}
              {FORMAT_INFO[f].label}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      {format !== 'svg' && (
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            Resolution
          </label>
          <select
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none"
          >
            {EXPORT_SIZES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition-colors disabled:opacity-50"
        >
          {isDownloading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          Download {format.toUpperCase()}
        </button>
        <button
          onClick={handleCopy}
          disabled={isCopying}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
