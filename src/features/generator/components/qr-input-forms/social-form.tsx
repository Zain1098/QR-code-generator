'use client';

import { useState } from 'react';
import { socialSchema } from '@/features/generator/lib/qr-validators';

export function SocialForm({ data, onChange }: { data: Record<string, any>; onChange: (data: Record<string, any>) => void }) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const result = socialSchema.safeParse(data);
  const errors = !result.success ? result.error.flatten().fieldErrors : {};

  const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-colors text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
  const errorClass = "text-xs text-red-500 mt-1";

  const getPlaceholder = () => {
    switch (data.platform) {
      case 'Twitter/X': return '@username or https://twitter.com/username';
      case 'Instagram': return '@username or https://instagram.com/username';
      case 'Facebook': return 'https://facebook.com/page';
      case 'LinkedIn': return 'https://linkedin.com/in/username';
      case 'YouTube': return 'https://youtube.com/@channel';
      case 'TikTok': return '@username';
      case 'GitHub': return 'https://github.com/username';
      case 'Website': return 'https://example.com';
      default: return 'Username or URL';
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="platform" className={labelClass}>Platform</label>
        <select id="platform" name="platform" value={data.platform || 'Twitter/X'} onChange={handleChange} onBlur={handleBlur} className={inputClass}>
          <option value="Twitter/X">Twitter/X</option>
          <option value="Instagram">Instagram</option>
          <option value="Facebook">Facebook</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="YouTube">YouTube</option>
          <option value="TikTok">TikTok</option>
          <option value="GitHub">GitHub</option>
          <option value="Website">Website</option>
        </select>
        {touched.platform && errors.platform && <p className={errorClass}>{errors.platform[0]}</p>}
      </div>

      <div>
        <label htmlFor="handleOrUrl" className={labelClass}>Handle or URL</label>
        <input type="text" id="handleOrUrl" name="handleOrUrl" value={data.handleOrUrl || ''} onChange={handleChange} onBlur={handleBlur} placeholder={getPlaceholder()} className={inputClass} />
        {touched.handleOrUrl && errors.handleOrUrl && <p className={errorClass}>{errors.handleOrUrl[0]}</p>}
      </div>
    </div>
  );
}
