'use client';

import { useState } from 'react';
import { phoneSchema } from '@/features/generator/lib/qr-validators';

export function PhoneForm({ data, onChange }: { data: Record<string, any>; onChange: (data: Record<string, any>) => void }) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const result = phoneSchema.safeParse(data);
  const errors = !result.success ? result.error.flatten().fieldErrors : {};

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="number"
          name="number"
          value={data.number || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="+1 234 567 8900"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-colors text-sm"
        />
        {touched.number && errors.number && (
          <p className="text-xs text-red-500 mt-1">{errors.number[0]}</p>
        )}
      </div>
    </div>
  );
}
