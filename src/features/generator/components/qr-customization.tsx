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
  { name: 'Classic', fg: '#000000', bg: '#FFFFFF' },
  { name: 'Indigo', fg: '#4F46E5', bg: '#EEF2FF' },
  { name: 'Emerald', fg: '#059669', bg: '#D1FAE5' },
  { name: 'Rose', fg: '#E11D48', bg: '#FFE4E6' },
  { name: 'Amber', fg: '#D97706', bg: '#FEF3C7' },
  { name: 'Slate', fg: '#334155', bg: '#F1F5F9' },
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
    { id: 'basic' as const, label: 'Colors' },
    { id: 'style' as const, label: 'Style' },
    { id: 'logo' as const, label: 'Logo' },
  ];

  return (
    <div className="space-y-4">
      {/* Contrast Warning */}
      {contrastLevel !== 'good' && (
        <div className={`flex items-start gap-2 p-3 rounded-lg text-sm ${
          contrastLevel === 'poor'
            ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
            : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
        }`}>
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">{contrastLevel === 'poor' ? 'Poor Contrast' : 'Low Contrast'}</p>
            <p className="text-xs mt-0.5 opacity-80">{contrastMessage} (Ratio: {contrastRatio.toFixed(1)}:1)</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Basic / Colors Tab */}
      {activeTab === 'basic' && (
        <div className="space-y-4">
          {/* Color Presets */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Color Presets
            </label>
            <div className="flex flex-wrap gap-2">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => update({ fgColor: preset.fg, bgColor: preset.bg })}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-brand-500 transition-colors text-xs font-medium text-gray-700 dark:text-gray-300"
                >
                  <span
                    className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600"
                    style={{ backgroundColor: preset.fg }}
                  />
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* FG / BG Colors */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Foreground
              </label>
              <div className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <input
                  type="color"
                  value={customization.fgColor || '#000000'}
                  onChange={(e) => update({ fgColor: e.target.value })}
                  className="w-8 h-8 rounded cursor-pointer border-0"
                />
                <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
                  {customization.fgColor || '#000000'}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Background
              </label>
              <div className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <input
                  type="color"
                  value={customization.bgColor || '#FFFFFF'}
                  onChange={(e) => update({ bgColor: e.target.value })}
                  className="w-8 h-8 rounded cursor-pointer border-0"
                />
                <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
                  {customization.bgColor || '#FFFFFF'}
                </span>
              </div>
            </div>
          </div>

          {/* Error Correction */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Error Correction
            </label>
            <select
              value={customization.errorCorrection || 'M'}
              onChange={(e) => update({ errorCorrection: e.target.value as any })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none"
            >
              {ERROR_CORRECTION_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
            {customization.logoDataUrl && customization.errorCorrection !== 'H' && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                ⚠ High error correction recommended when using a logo
              </p>
            )}
          </div>

          {/* Margin */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Margin: {customization.margin ?? 10}px
            </label>
            <input
              type="range"
              min={0}
              max={50}
              value={customization.margin ?? 10}
              onChange={(e) => update({ margin: parseInt(e.target.value) })}
              className="w-full accent-brand-600"
            />
          </div>
        </div>
      )}

      {/* Style Tab */}
      {activeTab === 'style' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Dot Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {DOT_STYLES.map((style) => (
                <button
                  key={style.value}
                  onClick={() => update({ dotStyle: style.value as any })}
                  className={`px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                    (customization.dotStyle || 'square') === style.value
                      ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Corner Square Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CORNER_SQUARE_STYLES.map((style) => (
                <button
                  key={style.value}
                  onClick={() => update({ cornerSquareStyle: style.value as any })}
                  className={`px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                    (customization.cornerSquareStyle || '') === style.value
                      ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Corner Dot Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {CORNER_DOT_STYLES.map((style) => (
                <button
                  key={style.value}
                  onClick={() => update({ cornerDotStyle: style.value as any })}
                  className={`px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                    (customization.cornerDotStyle || '') === style.value
                      ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Corner Colors */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Corner Square Color
              </label>
              <div className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <input
                  type="color"
                  value={customization.cornerSquareColor || customization.fgColor || '#000000'}
                  onChange={(e) => update({ cornerSquareColor: e.target.value })}
                  className="w-8 h-8 rounded cursor-pointer border-0"
                />
                <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
                  {customization.cornerSquareColor || customization.fgColor || '#000000'}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Corner Dot Color
              </label>
              <div className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <input
                  type="color"
                  value={customization.cornerDotColor || customization.fgColor || '#000000'}
                  onChange={(e) => update({ cornerDotColor: e.target.value })}
                  className="w-8 h-8 rounded cursor-pointer border-0"
                />
                <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
                  {customization.cornerDotColor || customization.fgColor || '#000000'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logo Tab */}
      {activeTab === 'logo' && (
        <div className="space-y-4">
          {customization.logoDataUrl ? (
            <div className="space-y-3">
              <div className="relative inline-block">
                <img
                  src={customization.logoDataUrl}
                  alt="Logo preview"
                  className="w-20 h-20 object-contain rounded-lg border border-gray-200 dark:border-gray-700 bg-white"
                />
                <button
                  onClick={removeLogo}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Logo Size: {Math.round((customization.logoSize ?? 0.3) * 100)}%
                </label>
                <input
                  type="range"
                  min={0.1}
                  max={0.4}
                  step={0.05}
                  value={customization.logoSize ?? 0.3}
                  onChange={(e) => update({ logoSize: parseFloat(e.target.value) })}
                  className="w-full accent-brand-600"
                />
                {(customization.logoSize ?? 0.3) > 0.3 && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                    ⚠ Large logos may affect scannability
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Logo Padding: {customization.logoPadding ?? 5}px
                </label>
                <input
                  type="range"
                  min={0}
                  max={20}
                  value={customization.logoPadding ?? 5}
                  onChange={(e) => update({ logoPadding: parseInt(e.target.value) })}
                  className="w-full accent-brand-600"
                />
              </div>
            </div>
          ) : (
            <div>
              <label
                htmlFor="logo-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-brand-500 transition-colors bg-gray-50 dark:bg-gray-800/50"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Click to upload logo
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  PNG, JPEG, SVG, WebP • Max {MAX_LOGO_SIZE_KB}KB
                </p>
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
            <p className="text-xs text-red-500">{logoError}</p>
          )}

          <p className="text-xs text-gray-400 dark:text-gray-500">
            Adding a logo automatically sets error correction to High (H) for best scannability.
          </p>
        </div>
      )}
    </div>
  );
}
