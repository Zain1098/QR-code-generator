'use client';

import { useState } from 'react';
import { eventSchema } from '@/features/generator/lib/qr-validators';

export function EventForm({ data, onChange }: { data: Record<string, any>; onChange: (data: Record<string, any>) => void }) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const result = eventSchema.safeParse(data);
  const errors = !result.success ? result.error.flatten().fieldErrors : {};

  const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-colors text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
  const errorClass = "text-xs text-red-500 mt-1";

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="title" className={labelClass}>Event Title</label>
        <input type="text" id="title" name="title" value={data.title || ''} onChange={handleChange} onBlur={handleBlur} placeholder="My Awesome Event" className={inputClass} />
        {touched.title && errors.title && <p className={errorClass}>{errors.title[0]}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className={labelClass}>Start Date & Time</label>
          <input type="datetime-local" id="startDate" name="startDate" value={data.startDate || ''} onChange={handleChange} onBlur={handleBlur} className={inputClass} />
          {touched.startDate && errors.startDate && <p className={errorClass}>{errors.startDate[0]}</p>}
        </div>
        <div>
          <label htmlFor="endDate" className={labelClass}>End Date & Time (Optional)</label>
          <input type="datetime-local" id="endDate" name="endDate" value={data.endDate || ''} onChange={handleChange} onBlur={handleBlur} className={inputClass} />
          {touched.endDate && errors.endDate && <p className={errorClass}>{errors.endDate[0]}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="location" className={labelClass}>Location (Optional)</label>
        <input type="text" id="location" name="location" value={data.location || ''} onChange={handleChange} onBlur={handleBlur} placeholder="123 Main St..." className={inputClass} />
        {touched.location && errors.location && <p className={errorClass}>{errors.location[0]}</p>}
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>Description (Optional)</label>
        <textarea id="description" name="description" value={data.description || ''} onChange={handleChange} onBlur={handleBlur} rows={3} placeholder="Event details..." className={`${inputClass} resize-y`} />
        {touched.description && errors.description && <p className={errorClass}>{errors.description[0]}</p>}
      </div>
    </div>
  );
}
