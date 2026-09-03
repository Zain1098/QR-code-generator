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
  fgColor: '#000000',
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
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [customization, setCustomization] = useState<QRCustomization>(DEFAULT_CUSTOMIZATION);
  const [_validationError, setValidationError] = useState<string | null>(null);
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

  const FormComponent = FORM_COMPONENTS[selectedType];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Page Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Create QR Code
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Choose a type, enter your data, customize the style, and download your QR code.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-6 lg:gap-8">
          {/* Left Panel - Input & Customization */}
          <div className="space-y-6">
            {/* QR Type Selection */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 lg:p-6">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                QR Code Type
              </h2>
              <QRTypeSelector
                selected={selectedType}
                onSelect={handleTypeChange}
              />
            </div>

            {/* Data Input Form */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 lg:p-6">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Enter Data
              </h2>
              <FormComponent data={formData} onChange={handleFormDataChange} />
            </div>

            {/* Customization */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 lg:p-6">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Customize
              </h2>
              <QRCustomizationPanel
                customization={customization}
                onChange={setCustomization}
              />
            </div>
          </div>

          {/* Right Panel - Preview & Export (Sticky on desktop) */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 lg:p-6">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Preview
              </h2>

              {/* QR Preview */}
              <div className="flex justify-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg mb-4">
                <div ref={qrContainerRef}>
                  <QRPreview
                    data={qrData}
                    customization={customization}
                  />
                </div>
              </div>

              {/* Export Controls */}
              <QRExport
                qrContainerRef={qrContainerRef}
                hasQR={!!qrData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
