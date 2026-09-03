'use client';

import { useState } from 'react';
import { emailSchema } from '@/features/generator/lib/qr-validators';

export function EmailForm({ data, onChange }: { data: Record<string, any>; onChange: (data: Record<string, any>) => void }) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const result = emailSchema.safeParse(data);
  const errors = !result.success ? result.error.flatten().fieldErrors : {};

  const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-colors text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
  const errorClass = "text-xs text-red-500 mt-1";

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="to" className={labelClass}>Email Address</label>
        <input type="email" id="to" name="to" value={data.to || ''} onChange={handleChange} onBlur={handleBlur} placeholder="recipient@example.com" className={inputClass} />
        {touched.to && errors.to && <p className={errorClass}>{errors.to[0]}</p>}
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>Subject Line</label>
        <input type="text" id="subject" name="subject" value={data.subject || ''} onChange={handleChange} onBlur={handleBlur} placeholder="Email subject" className={inputClass} />
        {touched.subject && errors.subject && <p className={errorClass}>{errors.subject[0]}</p>}
      </div>

      <div>
        <label htmlFor="body" className={labelClass}>Message Body</label>
        <textarea id="body" name="body" value={data.body || ''} onChange={handleChange} onBlur={handleBlur} rows={4} placeholder="Type your message here..." className={`${inputClass} resize-y`} />
        {touched.body && errors.body && <p className={errorClass}>{errors.body[0]}</p>}
      </div>
    </div>
  );
}
