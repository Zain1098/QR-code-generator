'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { QRCustomization } from '@/features/generator/types';

interface QRPreviewProps {
  data: string;
  customization: QRCustomization;
  className?: string;
}

export function QRPreview({ data, customization, className = '' }: QRPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateQR = useCallback(async () => {
    if (!data || !containerRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const QRCodeStyling = (await import('qr-code-styling')).default;

      const errorCorrectionMap: Record<string, number> = {
        L: 0, M: 1, Q: 2, H: 3,
      };

      const options: any = {
        width: 280,
        height: 280,
        data: data,
        margin: customization.margin ?? 10,
        qrOptions: {
          errorCorrectionLevel: customization.errorCorrection || 'M',
        },
        dotsOptions: {
          color: customization.fgColor || '#000000',
          type: customization.dotStyle || 'square',
        },
        backgroundOptions: {
          color: customization.bgColor || '#ffffff',
        },
        cornersSquareOptions: {
          color: customization.cornerSquareColor || customization.fgColor || '#000000',
          type: customization.cornerSquareStyle || undefined,
        },
        cornersDotOptions: {
          color: customization.cornerDotColor || customization.fgColor || '#000000',
          type: customization.cornerDotStyle || undefined,
        },
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: customization.logoPadding ?? 5,
          imageSize: customization.logoSize ?? 0.3,
        },
      };

      if (customization.logoDataUrl) {
        options.image = customization.logoDataUrl;
      }

      if (qrInstanceRef.current) {
        qrInstanceRef.current.update(options);
      } else {
        qrInstanceRef.current = new QRCodeStyling(options);
        containerRef.current.innerHTML = '';
        qrInstanceRef.current.append(containerRef.current);
      }
    } catch (err) {
      console.error('QR generation error:', err);
      setError('Failed to generate QR code');
    } finally {
      setIsLoading(false);
    }
  }, [data, customization]);

  useEffect(() => {
    generateQR();
  }, [generateQR]);

  // Expose the QR instance for export
  useEffect(() => {
    if (containerRef.current) {
      (containerRef.current as any).__qrInstance = qrInstanceRef.current;
    }
  });

  if (!data) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 text-center text-ink-muted dark:text-dark-ink-muted ${className}`}>
        <div className="w-16 h-16 mb-3 border border-dashed border-border-hairpin dark:border-dark-border rounded flex items-center justify-center bg-print-bed/50 dark:bg-dark-panel/50">
          <svg className="w-8 h-8 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </div>
        <div className="font-mono text-xs uppercase tracking-wider font-semibold text-ink-primary dark:text-dark-ink-primary mb-1">
          PAYLOAD_REQUIRED
        </div>
        <p className="font-sans text-xs text-ink-muted dark:text-dark-ink-muted max-w-[220px]">
          Enter schema data on the craft station to compile live matrix.
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {isLoading && (
        <div className="flex flex-col items-center justify-center w-[280px] h-[280px] gap-2">
          <div className="w-7 h-7 border-2 border-ink-primary dark:border-dark-ink-primary border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted dark:text-dark-ink-muted">
            Compiling Matrix...
          </span>
        </div>
      )}
      <div
        ref={containerRef}
        className={`qr-preview-container flex items-center justify-center ${isLoading ? 'hidden' : ''}`}
        style={{ maxWidth: '280px', width: '100%' }}
      />
      {error && (
        <p className="mt-2 text-xs font-mono text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

export function getQRInstance(containerRef: React.RefObject<HTMLDivElement | null>): any | null {
  if (containerRef.current) {
    return (containerRef.current as any).__qrInstance || null;
  }
  return null;
}
