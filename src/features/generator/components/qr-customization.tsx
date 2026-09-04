'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, AlertTriangle } from 'lucide-react';
import type { QRCustomization } from '@/features/generator/types';
import { getContrastRatio, getContrastLevel, getContrastMessage } from '@/features/generator/lib/contrast-checker';

interface QRCustomizationPanelProps {
  customization: QRCustomization;
  onChange: (customization: QRCustomization) => void;
}

const DOT_STYLES = [
  { value: 'square', label: 'Square' },
  { value: 'dots', label: 'Dots' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy Rounded' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
] as const;

const CORNER_SQUARE_STYLES = [
  { value: '', label: 'Default' },
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Dot' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
] as const;

const CORNER_DOT_STYLES = [
  { value: '', label: 'Default' },
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Dot' },
] as const;

const ERROR_CORRECTION_LEVELS = [
  { value: 'L', label: 'Low (7%)', description: 'Smallest QR, least error recovery' },
  { value: 'M', label: 'Medium (15%)', description: 'Balanced size and recovery' },
  { value: 'Q', label: 'Quartile (25%)', description: 'Good recovery, larger QR' },
  { value: 'H', label: 'High (30%)', description: 'Best recovery, required for logos' },
] as const;

const COLOR_PRESETS = [
  { name: 'Monochrome Ink', desc: 'Deep Carbon', fg: '#18181B', bg: '#FFFFFF' },
  { name: 'Indigo Reserve', desc: 'Press Navy', fg: '#1E1B4B', bg: '#F8FAFC' },
  { name: 'Crimson Press', desc: 'Litho Ochre', fg: '#7F1D1D', bg: '#FFFAFA' },
  { name: 'Olive Forest', desc: 'Swiss Forest', fg: '#14532D', bg: '#F7FEE7' },
  { name: 'Emerald Matte', desc: 'Precision Emerald', fg: '#059669', bg: '#ECFDF5' },
  { name: 'Classic Slate', desc: 'Neutral Archive', fg: '#334155', bg: '#F8FAFC' },
];

const MAX_LOGO_SIZE_KB = 500;
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml', 'image/webp'];

export function QRCustomizationPanel({ customization, onChange }: QRCustomizationPanelProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'style' | 'logo'>('basic');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoError, setLogoError] = useState<string | null>(null);

  const update = (partial: Partial<QRCustomization>) => {
    onChange({ ...customization, ...partial });
  };

  const contrastRatio = getContrastRatio(
    customization.fgColor || '#000000',
    customization.bgColor || '#FFFFFF'
  );
  const contrastLevel = getContrastLevel(contrastRatio);
  const contrastMessage = getContrastMessage(contrastLevel);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoError(null);

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setLogoError('Please upload a PNG, JPEG, GIF, SVG, or WebP image.');
      return;
    }

    if (file.size > MAX_LOGO_SIZE_KB * 1024) {
      setLogoError(`File is too large. Maximum size is ${MAX_LOGO_SIZE_KB}KB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      update({
        logoDataUrl: dataUrl,
        errorCorrection: 'H', // Auto-upgrade for logo
      });
    };
    reader.onerror = () => {
      setLogoError('Failed to read file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    update({ logoDataUrl: undefined });
    if (fileInputRef.current) fileInputRef.current.value = '';
    setLogoError(null);
  };

  const tabs = [
    { id: 'basic' as const, label: '01 Ink & Substrate' },
    { id: 'style' as const, label: '02 Matrix Geometry' },
    { id: 'logo' as const, label: '03 Insignia Logo' },
  ];

  return (
    <div className="space-y-4">
      {/* Contrast & Optical Verification Bar */}
      <div className="flex items-center justify-between p-2.5 rounded bg-print-bed dark:bg-dark-panel border border-border-hairpin dark:border-dark-border">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            <span
              className="w-4 h-4 rounded-full border border-black/10 shadow-sm"
              style={{ backgroundColor: customization.fgColor || '#000000' }}
            />
            <span
              className="w-4 h-4 rounded-full border border-black/10 shadow-sm"
              style={{ backgroundColor: customization.bgColor || '#FFFFFF' }}
            />
          </div>
          <span className="font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted">
            {contrastRatio.toFixed(1)}:1 Ratio
          </span>
        </div>

        <span
          className={`font-mono text-[10px] uppercase font-semibold px-2 py-0.5 rounded ${
            contrastRatio >= 7
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
              : contrastRatio >= 4.5
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
              : 'bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300'
          }`}
        >
          {contrastRatio >= 7 ? 'WCAG AAA PASS' : contrastRatio >= 4.5 ? 'WCAG AA PASS' : 'FAIL // POOR CONTRAST'}
        </span>
      </div>

      {contrastLevel === 'poor' && (
        <div className="flex items-center gap-2 p-2 rounded bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs font-mono">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{contrastMessage}</span>
        </div>
      )}

      {/* Segmented Tabs Rail */}
      <div className="grid grid-cols-3 p-1 bg-print-bed dark:bg-dark-surface rounded-lg border border-border-hairpin dark:border-dark-border gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`py-1.5 px-2 rounded text-center text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === tab.id
                ? 'bg-surface-workbench dark:bg-dark-panel text-ink-primary dark:text-dark-ink-primary font-semibold shadow-sm border border-border-hairpin dark:border-dark-border-strong'
                : 'text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Basic / Colors Tab */}
      {activeTab === 'basic' && (
        <div className="space-y-3.5">
          {/* Tactile Swatch Tiles */}
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted mb-2">
              Physical Ink &amp; Substrate Presets
            </label>
            <div className="grid grid-cols-2 gap-2">
              {COLOR_PRESETS.map((preset) => {
                const isActive = customization.fgColor === preset.fg && customization.bgColor === preset.bg;
                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => update({ fgColor: preset.fg, bgColor: preset.bg })}
                    className={`p-2.5 rounded-lg text-left flex items-center justify-between transition-all select-none border ${
                      isActive
                        ? 'bg-surface-workbench dark:bg-dark-panel border-ink-primary dark:border-dark-ink-primary shadow-sm'
                        : 'bg-print-bed/70 dark:bg-dark-surface border-border-hairpin dark:border-dark-border hover:bg-print-bed dark:hover:bg-dark-panel/80'
                    }`}
                  >
                    <div className="min-w-0 pr-1">
                      <div className="text-xs font-semibold text-ink-primary dark:text-dark-ink-primary truncate">{preset.name}</div>
                      <div className="font-mono text-[10px] text-ink-muted dark:text-dark-ink-muted truncate">{preset.desc}</div>
                    </div>
                    <div className="w-6 h-6 rounded-full border border-black/10 flex items-center justify-center flex-shrink-0 shadow-inner" style={{ backgroundColor: preset.fg }}>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: preset.bg }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Color Wells */}
          <div className="space-y-1.5">
            <span className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted">
              Direct Channel Calibration
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 bg-surface-workbench dark:bg-dark-surface p-2 rounded border border-border-hairpin dark:border-dark-border">
                <input
                  type="color"
                  value={customization.fgColor || '#000000'}
                  onChange={(e) => update({ fgColor: e.target.value })}
                  className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent p-0 m-0"
                />
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase text-ink-muted dark:text-dark-ink-muted">Foreground</div>
                  <div className="font-mono text-xs font-semibold text-ink-primary dark:text-dark-ink-primary truncate">
                    {customization.fgColor || '#000000'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-surface-workbench dark:bg-dark-surface p-2 rounded border border-border-hairpin dark:border-dark-border">
                <input
                  type="color"
                  value={customization.bgColor || '#FFFFFF'}
                  onChange={(e) => update({ bgColor: e.target.value })}
                  className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent p-0 m-0"
                />
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase text-ink-muted dark:text-dark-ink-muted">Substrate</div>
                  <div className="font-mono text-xs font-semibold text-ink-primary dark:text-dark-ink-primary truncate">
                    {customization.bgColor || '#FFFFFF'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Correction & Margin Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted mb-1">
                Error Correction (Reed-Solomon)
              </label>
              <select
                value={customization.errorCorrection || 'M'}
                onChange={(e) => update({ errorCorrection: e.target.value as any })}
                className="w-full px-2.5 py-1.5 rounded border border-border-hairpin dark:border-dark-border bg-surface-workbench dark:bg-dark-surface text-xs font-mono text-ink-primary dark:text-dark-ink-primary focus:outline-none"
              >
                {ERROR_CORRECTION_LEVELS.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted">
                  Quiet Zone Margin
                </label>
                <span className="font-mono text-[11px] text-ink-primary dark:text-dark-ink-primary font-semibold">
                  {customization.margin ?? 10}px
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                value={customization.margin ?? 10}
                onChange={(e) => update({ margin: parseInt(e.target.value) })}
                className="w-full accent-ink-primary dark:accent-dark-ink-primary"
              />
            </div>
          </div>
        </div>
      )}

      {/* Style Tab */}
      {activeTab === 'style' && (
        <div className="space-y-3.5">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted mb-1.5">
              Matrix Cell Pattern (Dot Style)
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {DOT_STYLES.map((style) => (
                <button
                  key={style.value}
                  type="button"
                  onClick={() => update({ dotStyle: style.value as any })}
                  className={`px-2.5 py-1.5 rounded text-xs transition-all border ${
                    (customization.dotStyle || 'square') === style.value
                      ? 'bg-surface-workbench dark:bg-dark-panel border-ink-primary dark:border-dark-ink-primary text-ink-primary dark:text-dark-ink-primary font-semibold shadow-sm'
                      : 'bg-print-bed/70 dark:bg-dark-surface border-border-hairpin dark:border-dark-border text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted mb-1.5">
              Corner Square Style
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {CORNER_SQUARE_STYLES.map((style) => (
                <button
                  key={style.value}
                  type="button"
                  onClick={() => update({ cornerSquareStyle: style.value as any })}
                  className={`px-2.5 py-1.5 rounded text-xs transition-all border ${
                    (customization.cornerSquareStyle || '') === style.value
                      ? 'bg-surface-workbench dark:bg-dark-panel border-ink-primary dark:border-dark-ink-primary text-ink-primary dark:text-dark-ink-primary font-semibold shadow-sm'
                      : 'bg-print-bed/70 dark:bg-dark-surface border-border-hairpin dark:border-dark-border text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted mb-1.5">
              Corner Dot Style
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {CORNER_DOT_STYLES.map((style) => (
                <button
                  key={style.value}
                  type="button"
                  onClick={() => update({ cornerDotStyle: style.value as any })}
                  className={`px-2.5 py-1.5 rounded text-xs transition-all border ${
                    (customization.cornerDotStyle || '') === style.value
                      ? 'bg-surface-workbench dark:bg-dark-panel border-ink-primary dark:border-dark-ink-primary text-ink-primary dark:text-dark-ink-primary font-semibold shadow-sm'
                      : 'bg-print-bed/70 dark:bg-dark-surface border-border-hairpin dark:border-dark-border text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Corner Specific Colors */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="flex items-center gap-2 bg-surface-workbench dark:bg-dark-surface p-2 rounded border border-border-hairpin dark:border-dark-border">
              <input
                type="color"
                value={customization.cornerSquareColor || customization.fgColor || '#000000'}
                onChange={(e) => update({ cornerSquareColor: e.target.value })}
                className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent p-0 m-0"
              />
              <div className="min-w-0">
                <div className="font-mono text-[10px] uppercase text-ink-muted dark:text-dark-ink-muted">Corner Outer</div>
                <div className="font-mono text-xs font-semibold text-ink-primary dark:text-dark-ink-primary truncate">
                  {customization.cornerSquareColor || customization.fgColor || '#000000'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-surface-workbench dark:bg-dark-surface p-2 rounded border border-border-hairpin dark:border-dark-border">
              <input
                type="color"
                value={customization.cornerDotColor || customization.fgColor || '#000000'}
                onChange={(e) => update({ cornerDotColor: e.target.value })}
                className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent p-0 m-0"
              />
              <div className="min-w-0">
                <div className="font-mono text-[10px] uppercase text-ink-muted dark:text-dark-ink-muted">Corner Inner</div>
                <div className="font-mono text-xs font-semibold text-ink-primary dark:text-dark-ink-primary truncate">
                  {customization.cornerDotColor || customization.fgColor || '#000000'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logo Tab */}
      {activeTab === 'logo' && (
        <div className="space-y-3.5">
          {customization.logoDataUrl ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-surface-workbench dark:bg-dark-surface rounded border border-border-hairpin dark:border-dark-border">
                <div className="relative w-16 h-16 rounded border border-border-hairpin dark:border-dark-border bg-white flex items-center justify-center p-1">
                  <img
                    src={customization.logoDataUrl}
                    alt="Logo preview"
                    className="max-w-full max-h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 shadow-sm"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-xs font-semibold text-ink-primary dark:text-dark-ink-primary">Insignia Mounted</div>
                  <div className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400">ECC Auto-Level: High (30%)</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted">
                  <span>Logo Scale</span>
                  <span className="text-ink-primary dark:text-dark-ink-primary font-semibold">{Math.round((customization.logoSize ?? 0.3) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={0.1}
                  max={0.4}
                  step={0.05}
                  value={customization.logoSize ?? 0.3}
                  onChange={(e) => update({ logoSize: parseFloat(e.target.value) })}
                  className="w-full accent-ink-primary dark:accent-dark-ink-primary"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1 font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted">
                  <span>Insignia Border Padding</span>
                  <span className="text-ink-primary dark:text-dark-ink-primary font-semibold">{customization.logoPadding ?? 5}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={20}
                  value={customization.logoPadding ?? 5}
                  onChange={(e) => update({ logoPadding: parseInt(e.target.value) })}
                  className="w-full accent-ink-primary dark:accent-dark-ink-primary"
                />
              </div>
            </div>
          ) : (
            <div>
              <label
                htmlFor="logo-upload"
                className="flex flex-col items-center justify-center w-full h-28 border border-dashed border-border-hairpin dark:border-dark-border rounded cursor-pointer hover:border-ink-primary dark:hover:border-dark-ink-primary transition-colors bg-print-bed/50 dark:bg-dark-surface/50"
              >
                <Upload className="w-6 h-6 text-ink-muted dark:text-dark-ink-muted mb-1.5" />
                <span className="text-xs font-medium text-ink-primary dark:text-dark-ink-primary">
                  Upload Center Emblem / Insignia
                </span>
                <span className="font-mono text-[10px] text-ink-muted dark:text-dark-ink-muted mt-0.5">
                  PNG, JPEG, SVG, WebP • Max {MAX_LOGO_SIZE_KB}KB
                </span>
              </label>
              <input
                ref={fileInputRef}
                id="logo-upload"
                type="file"
                accept="image/png,image/jpeg,image/gif,image/svg+xml,image/webp"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>
          )}

          {logoError && (
            <p className="text-xs font-mono text-red-600 dark:text-red-400">{logoError}</p>
          )}
        </div>
      )}
    </div>
  );
}
