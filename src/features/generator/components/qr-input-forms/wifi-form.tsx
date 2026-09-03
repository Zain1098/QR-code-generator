'use client';

import { useState } from 'react';
import { wifiSchema } from '@/features/generator/lib/qr-validators';
import { Eye, EyeOff } from 'lucide-react';

export function WifiForm({ data, onChange }: { data: Record<string, any>; onChange: (data: Record<string, any>) => void }) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      onChange({ ...data, [name]: (e.target as HTMLInputElement).checked });
    } else {
      onChange({ ...data, [name]: value });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const result = wifiSchema.safeParse(data);
  const errors = !result.success ? result.error.flatten().fieldErrors : {};

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="ssid" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Network Name (SSID)
        </label>
        <input
          type="text"
          id="ssid"
          name="ssid"
          value={data.ssid || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g. MyHomeNetwork"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-colors text-sm"
        />
        {touched.ssid && errors.ssid && (
          <p className="text-xs text-red-500 mt-1">{errors.ssid[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="encryption" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Encryption Type
        </label>
        <select
          id="encryption"
          name="encryption"
          value={data.encryption || 'WPA'}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-colors text-sm"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">None</option>
        </select>
      </div>

      {data.encryption !== 'nopass' && (
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={data.password || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Network password"
              className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-colors text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {touched.password && errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password[0]}</p>
          )}
        </div>
      )}

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="hidden"
          name="hidden"
          checked={data.hidden || false}
          onChange={handleChange}
          className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
        />
        <label htmlFor="hidden" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Hidden Network
        </label>
      </div>
    </div>
  );
}
