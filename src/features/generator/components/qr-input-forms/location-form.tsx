'use client';

import { useState } from 'react';
import { locationSchema } from '@/features/generator/lib/qr-validators';

export function LocationForm({ data, onChange }: { data: Record<string, any>; onChange: (data: Record<string, any>) => void }) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    onChange({ ...data, [name]: type === 'number' && value ? Number(value) : value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const result = locationSchema.safeParse(data);
  const errors = !result.success ? result.error.flatten().fieldErrors : {};

  const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-colors text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
  const errorClass = "text-xs text-red-500 mt-1";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="latitude" className={labelClass}>Latitude</label>
          <input type="number" step="any" min="-90" max="90" id="latitude" name="latitude" value={data.latitude ?? ''} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. 40.7128" className={inputClass} />
          {touched.latitude && errors.latitude && <p className={errorClass}>{errors.latitude[0]}</p>}
        </div>
        <div>
          <label htmlFor="longitude" className={labelClass}>Longitude</label>
          <input type="number" step="any" min="-180" max="180" id="longitude" name="longitude" value={data.longitude ?? ''} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. -74.0060" className={inputClass} />
          {touched.longitude && errors.longitude && <p className={errorClass}>{errors.longitude[0]}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="label" className={labelClass}>Location Label (Optional)</label>
        <input type="text" id="label" name="label" value={data.label || ''} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. Central Park" className={inputClass} />
        {touched.label && errors.label && <p className={errorClass}>{errors.label[0]}</p>}
      </div>
    </div>
  );
}
