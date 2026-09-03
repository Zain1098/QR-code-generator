'use client';

import { useState } from 'react';
import { paymentSchema } from '@/features/generator/lib/qr-validators';

export function PaymentForm({ data, onChange }: { data: Record<string, any>; onChange: (data: Record<string, any>) => void }) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const result = paymentSchema.safeParse(data);
  const errors = !result.success ? result.error.flatten().fieldErrors : {};

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Payment Link (URL)
        </label>
        <input
          type="url"
          id="url"
          name="url"
          value={data.url || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="https://paypal.me/yourname"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-colors text-sm"
        />
        {touched.url && errors.url && (
          <p className="text-xs text-red-500 mt-1">{errors.url[0]}</p>
        )}
      </div>
      <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-lg border border-blue-100 dark:border-blue-800">
        <strong>Note:</strong> Currently supporting basic URL links for payments. Advanced payment QR integration (like UPI or specific crypto formats) is planned for a future update.
      </div>
    </div>
  );
}
