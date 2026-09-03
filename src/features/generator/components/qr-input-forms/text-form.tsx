'use client';

import { useState } from 'react';
import { textSchema } from '@/features/generator/lib/qr-validators';

export function TextForm({ data, onChange }: { data: Record<string, any>; onChange: (data: Record<string, any>) => void }) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const result = textSchema.safeParse(data);
  const errors = !result.success ? result.error.flatten().fieldErrors : {};
  const charCount = data.text?.length || 0;

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Text Content
        </label>
        <textarea
          id="text"
          name="text"
          value={data.text || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={2000}
          rows={5}
          placeholder="Enter text here..."
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-colors text-sm resize-y"
        />
        <div className="flex justify-between items-center mt-1">
          <div>
            {touched.text && errors.text && (
              <p className="text-xs text-red-500">{errors.text[0]}</p>
            )}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {charCount} / 2000
          </span>
        </div>
      </div>
    </div>
  );
}
