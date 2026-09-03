'use client';

import { useState } from 'react';
import { whatsappSchema } from '@/features/generator/lib/qr-validators';

export function WhatsappForm({ data, onChange }: { data: Record<string, any>; onChange: (data: Record<string, any>) => void }) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const result = whatsappSchema.safeParse(data);
  const errors = !result.success ? result.error.flatten().fieldErrors : {};

  const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-colors text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
  const errorClass = "text-xs text-red-500 mt-1";

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="number" className={labelClass}>WhatsApp Number</label>
        <input type="tel" id="number" name="number" value={data.number || ''} onChange={handleChange} onBlur={handleBlur} placeholder="1234567890" className={inputClass} />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Include country code without + sign</p>
        {touched.number && errors.number && <p className={errorClass}>{errors.number[0]}</p>}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Message (Optional)</label>
        <textarea id="message" name="message" value={data.message || ''} onChange={handleChange} onBlur={handleBlur} rows={3} placeholder="Pre-filled WhatsApp message..." className={`${inputClass} resize-y`} />
        {touched.message && errors.message && <p className={errorClass}>{errors.message[0]}</p>}
      </div>
    </div>
  );
}
