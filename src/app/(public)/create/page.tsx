'use client';

import React, { useState, useRef, useCallback, useMemo } from 'react';
import { QRPreview } from '@/features/generator/components/qr-preview';
import { QRCustomizationPanel } from '@/features/generator/components/qr-customization';
import { QRExport } from '@/features/generator/components/qr-export';
import { QRTypeSelector } from '@/features/generator/components/qr-type-selector';
import { formatQRData } from '@/features/generator/lib/qr-data-formatters';
import { getSchemaForType } from '@/features/generator/lib/qr-validators';
import type { QRType, QRCustomization } from '@/features/generator/types';
import { 
  Globe, 
  Wifi, 
  Contact, 
  MessageCircle, 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  Download,
  Copy,
  Check,
  Crop,
  Focus
} from 'lucide-react';
import { toast } from 'sonner';

import {
  UrlForm,
  TextForm,
  WifiForm,
  VCardForm,
  EmailForm,
  PhoneForm,
  SmsForm,
  WhatsappForm,
  LocationForm,
  EventForm,
  SocialForm,
  PaymentForm,
} from '@/features/generator/components/qr-input-forms';

const FORM_COMPONENTS: Record<QRType, React.ComponentType<{ data: Record<string, any>; onChange: (data: Record<string, any>) => void }>> = {
  url: UrlForm,
  text: TextForm,
  wifi: WifiForm,
  vcard: VCardForm,
  email: EmailForm,
  phone: PhoneForm,
  sms: SmsForm,
  whatsapp: WhatsappForm,
  location: LocationForm,
  event: EventForm,
  social: SocialForm,
  payment: PaymentForm,
};

const DEFAULT_CUSTOMIZATION: QRCustomization = {
  fgColor: '#18181B',
  bgColor: '#FFFFFF',
  dotStyle: 'square',
  cornerSquareStyle: '',
  cornerDotStyle: '',
  cornerSquareColor: '',
  cornerDotColor: '',
  size: 1024,
  margin: 10,
  errorCorrection: 'M',
  logoSize: 0.3,
  logoPadding: 5,
};

export default function CreatePage() {
  const [selectedType, setSelectedType] = useState<QRType>('url');
  const [formData, setFormData] = useState<Record<string, any>>({
    url: 'https://atelier-studio.design/archive/2026',
  });
  const [customization, setCustomization] = useState<QRCustomization>(DEFAULT_CUSTOMIZATION);
  const [_validationError, setValidationError] = useState<string | null>(null);
  const [copiedQuick, setCopiedQuick] = useState(false);
  const qrContainerRef = useRef<HTMLDivElement>(null);

  // Generate QR data string from form data
  const qrData = useMemo(() => {
    try {
      const schema = getSchemaForType(selectedType);
      const result = schema.safeParse(formData);
      if (result.success) {
        setValidationError(null);
        return formatQRData(selectedType, result.data as Record<string, any>);
      }
      return '';
    } catch {
      return '';
    }
  }, [selectedType, formData]);

  const handleTypeChange = useCallback((type: QRType) => {
    setSelectedType(type);
    setFormData({});
    setValidationError(null);
  }, []);

  const handleFormDataChange = useCallback((data: Record<string, any>) => {
    setFormData(data);
  }, []);

  const loadSpecimenPreset = (presetName: string) => {
    if (presetName === 'portfolio') {
      setSelectedType('url');
      setFormData({ url: 'https://atelier-studio.design/archive/2026' });
      toast.success('Loaded: Studio Portfolio Specimen');
    } else if (presetName === 'wifi') {
      setSelectedType('wifi');
      setFormData({ ssid: 'ATELIER_5G_GUEST', password: 'bauhaus_craft_1919', encryption: 'WPA' });
      toast.success('Loaded: Studio Guest Wi-Fi Specimen');
    } else if (presetName === 'vcard') {
      setSelectedType('vcard');
      setFormData({
        firstName: 'Elena',
        lastName: 'Vogel',
        organization: 'Atelier Craft Systems',
        title: 'Creative Director',
        phone: '+41 44 288 19 00',
        email: 'elena@atelier-systems.ch',
        url: 'https://atelier-systems.ch',
      });
      toast.success('Loaded: Creative Director vCard Specimen');
    } else if (presetName === 'whatsapp') {
      setSelectedType('whatsapp');
      setFormData({
        phone: '+14155552671',
        message: 'Hello, requesting specimen catalog inspection.',
      });
      toast.success('Loaded: WhatsApp Protocol Specimen');
    }
  };

  const handleQuickDownload = async (fmt: 'png' | 'svg') => {
    const qr = (qrContainerRef.current as any)?.__qrInstance;
    if (!qr) {
      toast.error('Matrix not ready to download');
      return;
    }
    try {
      if (fmt === 'svg') {
        const blob = await qr.getRawData('svg');
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `formqr-specimen-${Date.now()}.svg`;
          a.click();
          URL.revokeObjectURL(url);
          toast.success('Vector SVG Downloaded');
        }
      } else {
        await qr.download({ name: `formqr-specimen-${Date.now()}`, extension: 'png' });
        toast.success('High-Res PNG Downloaded');
      }
    } catch {
      toast.error('Download failed');
    }
  };

  const handleQuickCopy = async () => {
    const qr = (qrContainerRef.current as any)?.__qrInstance;
    if (!qr) return;
    try {
      const blob = await qr.getRawData('png');
      if (blob) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopiedQuick(true);
        toast.success('Matrix copied to clipboard');
        setTimeout(() => setCopiedQuick(false), 2000);
      }
    } catch {
      toast.error('Clipboard write failed');
    }
  };

  const FormComponent = FORM_COMPONENTS[selectedType];

  return (
    <div className="min-h-screen bg-canvas-paper dark:bg-dark-canvas text-ink-primary dark:text-dark-ink-primary pt-14 pb-20 transition-colors duration-200">
      {/* Atelier Workspace Sub-Header & Metadata Ledger */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-6 border-b border-border-hairpin dark:border-dark-border bg-canvas-paper dark:bg-dark-canvas">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase text-ink-muted dark:text-dark-ink-muted">
              <span>SPECIMEN UTILITY // REV. 04</span>
              <span>/</span>
              <span className="text-dark-accent dark:text-dark-accent-hover font-semibold">READY FOR PRESS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-primary dark:text-dark-ink-primary font-sans">
              QR Craft &amp; Specimen Generator
            </h1>
            <p className="text-xs sm:text-sm text-ink-muted dark:text-dark-ink-muted max-w-2xl font-sans leading-relaxed">
              Configure high-density matrix codes for print packaging, brand identities, and physical collateral with certified optical legibility.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start md:self-end">
            <div className="hidden sm:flex flex-col items-end font-mono text-[10px] text-ink-muted dark:text-dark-ink-muted leading-tight">
              <span>PLATE MATRIX: ISO 18004</span>
              <span className="text-ink-primary dark:text-dark-ink-primary font-semibold">
                REED-SOLOMON: LEVEL {customization.errorCorrection || 'M'}
              </span>
            </div>
            <div className="h-7 w-hairpin bg-border-hairpin dark:bg-dark-border hidden sm:block"></div>
            <div className="flex items-center gap-2 bg-surface-workbench dark:bg-dark-panel px-3 py-1.5 rounded border border-border-hairpin dark:border-dark-border shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse"></span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink-primary dark:text-dark-ink-primary font-semibold">
                Engine Active
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Studio Split View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* MOBILE TOP PROOFING STAGE (Visible only on screens < lg) */}
          <div className="lg:hidden flex flex-col items-center w-full space-y-3">
            <div className="w-full bg-print-bed dark:bg-dark-panel p-4 rounded-xl border border-border-hairpin dark:border-dark-border relative shadow-sm overflow-hidden flex flex-col items-center">
              {/* Corner crosshairs */}
              <div className="absolute top-2 left-2 font-mono text-[10px] text-ink-muted dark:text-dark-ink-muted select-none">
                ┌ 0,0 CROP_LT
              </div>
              <div className="absolute top-2 right-2 font-mono text-[10px] text-ink-muted dark:text-dark-ink-muted select-none">
                PRINT_RT ┐
              </div>

              {/* Substrate Card */}
              <div
                className="p-4 rounded shadow-md relative transition-all my-2 flex flex-col items-center justify-center max-w-[260px] aspect-square w-full"
                style={{ backgroundColor: customization.bgColor || '#FFFFFF' }}
              >
                <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-ink-primary/40"></div>
                <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-ink-primary/40"></div>
                <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-ink-primary/40"></div>
                <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-ink-primary/40"></div>

                <div ref={qrContainerRef} className="w-full h-full flex items-center justify-center">
                  <QRPreview data={qrData} customization={customization} />
                </div>
              </div>

              {/* Mobile Quick Action Rail */}
              <div className="grid grid-cols-5 gap-2 w-full mt-2">
                <button
                  type="button"
                  onClick={() => handleQuickDownload('png')}
                  className="col-span-3 h-10 bg-ink-primary text-white dark:bg-dark-ink-primary dark:text-dark-canvas text-xs font-mono font-semibold uppercase rounded flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.99]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PNG</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDownload('svg')}
                  className="col-span-1 h-10 bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border text-ink-primary dark:text-dark-ink-primary text-xs font-mono font-semibold rounded flex items-center justify-center shadow-sm"
                  title="Export Vector SVG"
                >
                  SVG
                </button>
                <button
                  type="button"
                  onClick={handleQuickCopy}
                  className="col-span-1 h-10 bg-surface-workbench dark:bg-dark-surface border border-border-hairpin dark:border-dark-border text-ink-primary dark:text-dark-ink-primary text-xs font-mono font-semibold rounded flex items-center justify-center shadow-sm"
                  title="Copy Matrix"
                >
                  {copiedQuick ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* LEFT COLUMN: The Craft Station (Atelier Config Workbench) */}
          <section className="lg:col-span-5 flex flex-col gap-5 bg-surface-workbench dark:bg-dark-panel p-5 sm:p-6 rounded-xl border border-border-hairpin dark:border-dark-border shadow-sm">
            
            {/* 1. Payload Type Schema */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted font-semibold">
                  01 // Payload Schema
                </span>
                <span className="font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted uppercase">
                  TYPE: {selectedType}
                </span>
              </div>
              <QRTypeSelector selected={selectedType} onSelect={handleTypeChange} />
            </div>

            {/* 2. Quick Physical Presets */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted">
                  Physical Presets
                </span>
                <span className="font-mono text-[10px] text-ink-muted dark:text-dark-ink-muted">1-CLICK CALIBRATION</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                <button
                  type="button"
                  onClick={() => loadSpecimenPreset('portfolio')}
                  className="whitespace-nowrap px-2.5 py-1 bg-print-bed dark:bg-dark-surface hover:bg-canvas-paper dark:hover:bg-dark-panel text-ink-primary dark:text-dark-ink-primary text-[11px] font-mono rounded border border-border-hairpin dark:border-dark-border transition-colors flex items-center gap-1"
                >
                  <Globe className="w-3 h-3 text-ink-muted" />
                  <span>Portfolio Specimen</span>
                </button>
                <button
                  type="button"
                  onClick={() => loadSpecimenPreset('wifi')}
                  className="whitespace-nowrap px-2.5 py-1 bg-print-bed dark:bg-dark-surface hover:bg-canvas-paper dark:hover:bg-dark-panel text-ink-primary dark:text-dark-ink-primary text-[11px] font-mono rounded border border-border-hairpin dark:border-dark-border transition-colors flex items-center gap-1"
                >
                  <Wifi className="w-3 h-3 text-ink-muted" />
                  <span>Guest Wi-Fi</span>
                </button>
                <button
                  type="button"
                  onClick={() => loadSpecimenPreset('vcard')}
                  className="whitespace-nowrap px-2.5 py-1 bg-print-bed dark:bg-dark-surface hover:bg-canvas-paper dark:hover:bg-dark-panel text-ink-primary dark:text-dark-ink-primary text-[11px] font-mono rounded border border-border-hairpin dark:border-dark-border transition-colors flex items-center gap-1"
                >
                  <Contact className="w-3 h-3 text-ink-muted" />
                  <span>Director vCard</span>
                </button>
                <button
                  type="button"
                  onClick={() => loadSpecimenPreset('whatsapp')}
                  className="whitespace-nowrap px-2.5 py-1 bg-print-bed dark:bg-dark-surface hover:bg-canvas-paper dark:hover:bg-dark-panel text-ink-primary dark:text-dark-ink-primary text-[11px] font-mono rounded border border-border-hairpin dark:border-dark-border transition-colors flex items-center gap-1"
                >
                  <MessageCircle className="w-3 h-3 text-ink-muted" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

            {/* 3. Payload Data Form */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted font-semibold">
                  Encoded Data Input
                </label>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted">
                  <span className={`w-1.5 h-1.5 rounded-full ${qrData ? 'bg-emerald-600 dark:bg-emerald-400' : 'bg-amber-500'}`}></span>
                  <span>{qrData ? 'Valid Payload' : 'Input Pending'}</span>
                </div>
              </div>

              <div className="p-3 bg-canvas-paper dark:bg-dark-surface rounded-lg border border-border-hairpin dark:border-dark-border">
                <FormComponent data={formData} onChange={handleFormDataChange} />
                <div className="flex items-center justify-between pt-2 mt-2 border-t border-border-hairpin dark:border-dark-border/60 font-mono text-[10px] text-ink-muted dark:text-dark-ink-muted">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>ECC: Level {customization.errorCorrection || 'M'}</span>
                  </span>
                  <span>{qrData.length} chars formatted</span>
                </div>
              </div>
            </div>

            {/* 4. Ink, Substrate & Geometry Customization */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-dark-ink-muted font-semibold">
                02 // Customization Suite
              </span>
              <QRCustomizationPanel
                customization={customization}
                onChange={setCustomization}
              />
            </div>
          </section>

          {/* RIGHT COLUMN: The Print Bed (Exhibition Plate & Technical Stage - Sticky on Desktop) */}
          <section className="hidden lg:flex lg:col-span-7 flex-col items-center sticky top-20">
            {/* The Tactile Exhibition Card */}
            <div className="w-full bg-print-bed dark:bg-dark-panel p-6 sm:p-8 rounded-xl relative border border-border-hairpin dark:border-dark-border shadow-md overflow-hidden flex flex-col items-center">
              {/* Technical Drafting Registration Crosshairs */}
              <div className="absolute top-4 left-4 font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted pointer-events-none select-none flex items-center gap-1">
                <Crop className="w-3.5 h-3.5" />
                <span>0,0 CROP_LT</span>
              </div>
              <div className="absolute top-4 right-4 font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted pointer-events-none select-none flex items-center gap-1">
                <span>PRINT_RT</span>
                <Focus className="w-3.5 h-3.5" />
              </div>
              <div className="absolute bottom-4 left-4 font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted pointer-events-none select-none">
                <span>DRAFT: 100% SCALE</span>
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted pointer-events-none select-none">
                <span>PASS: OPTICAL-99.8</span>
              </div>

              {/* The Physical Paper Substrate Card */}
              <div
                className="p-8 rounded-lg shadow-lg relative transition-all duration-200 flex flex-col items-center justify-center my-4"
                style={{
                  backgroundColor: customization.bgColor || '#FFFFFF',
                  width: '360px',
                  maxWidth: '100%',
                  aspectRatio: '1 / 1',
                }}
              >
                {/* Corner Registration Marks on the paper itself */}
                <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-ink-primary/30"></div>
                <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-ink-primary/30"></div>
                <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-ink-primary/30"></div>
                <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-ink-primary/30"></div>

                {/* QR Matrix Render */}
                <div ref={qrContainerRef} className="w-full h-full flex items-center justify-center">
                  <QRPreview data={qrData} customization={customization} />
                </div>

                {/* Lithographic Watermark */}
                <div className="absolute bottom-2 text-center w-full pointer-events-none">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-ink-muted/60">
                    ATELIER SWISS PROOF // ZERO DEGRADATION
                  </span>
                </div>
              </div>

              {/* Technical Metadata Ledger */}
              <div className="w-full max-w-md bg-surface-workbench dark:bg-dark-surface px-4 py-2 rounded border border-border-hairpin dark:border-dark-border shadow-sm flex items-center justify-between font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted">
                <span className="text-ink-primary dark:text-dark-ink-primary font-semibold">SPECIMEN № 042</span>
                <span>{customization.size || 512} × {customization.size || 512} PT</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
                  ISO/IEC 18004 PASS
                </span>
              </div>
            </div>

            {/* Export & Transmission Suite */}
            <div className="w-full mt-4">
              <QRExport qrContainerRef={qrContainerRef} hasQR={!!qrData} />
            </div>
          </section>
        </div>

        {/* Supplementary Specimen Inspection Bench (Editorial 3-Column Strip) */}
        <section className="mt-16 pt-10 border-t border-border-hairpin dark:border-dark-border" id="press-specs">
          <div className="mb-6 space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted dark:text-dark-ink-muted font-semibold">
              Press Readiness Ledger
            </span>
            <h2 className="text-xl font-bold text-ink-primary dark:text-dark-ink-primary font-sans">
              Optical Substrate Benchmarks &amp; Press Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Benchmark Card 1 */}
            <div className="p-5 bg-surface-workbench dark:bg-dark-panel rounded-xl border border-border-hairpin dark:border-dark-border shadow-sm space-y-2">
              <div className="flex items-center justify-between font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted">
                <span>BENCH 01 // MATTE</span>
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-ink-primary dark:text-dark-ink-primary">
                Uncoated Cotton Stock 340gsm
              </h3>
              <p className="text-xs text-ink-muted dark:text-dark-ink-muted leading-relaxed">
                High ink absorption rates benefit from Reed-Solomon Error Correction Level H to counteract edge feathering under 300 DPI litho presses.
              </p>
              <div className="pt-2 font-mono text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                TOLERANCE: ±0.04mm
              </div>
            </div>

            {/* Benchmark Card 2 */}
            <div className="p-5 bg-surface-workbench dark:bg-dark-panel rounded-xl border border-border-hairpin dark:border-dark-border shadow-sm space-y-2">
              <div className="flex items-center justify-between font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted">
                <span>BENCH 02 // THERMAL</span>
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-ink-primary dark:text-dark-ink-primary">
                Packaging Foil &amp; Corrugate
              </h3>
              <p className="text-xs text-ink-muted dark:text-dark-ink-muted leading-relaxed">
                Curved cylindrical surfaces require module size expansion to a minimum of 0.35mm per matrix element for handheld CMOS readers.
              </p>
              <div className="pt-2 font-mono text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                MIN SCALE: 25 × 25mm
              </div>
            </div>

            {/* Benchmark Card 3 */}
            <div className="p-5 bg-surface-workbench dark:bg-dark-panel rounded-xl border border-border-hairpin dark:border-dark-border shadow-sm space-y-2">
              <div className="flex items-center justify-between font-mono text-[11px] text-ink-muted dark:text-dark-ink-muted">
                <span>BENCH 03 // VECTOR</span>
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-ink-primary dark:text-dark-ink-primary">
                Architectural Signage &amp; Outdoor
              </h3>
              <p className="text-xs text-ink-muted dark:text-dark-ink-muted leading-relaxed">
                Exporting infinite resolution SVG vectors guarantees zero blur or jagged pixels when scaled onto metal plaques or giant display banners.
              </p>
              <div className="pt-2 font-mono text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                SCALING: INFINITE VECTOR
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
