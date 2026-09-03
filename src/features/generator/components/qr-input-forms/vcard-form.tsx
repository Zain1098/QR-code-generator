'use client';

import { useState } from 'react';
import { vcardSchema } from '@/features/generator/lib/qr-validators';

export function VCardForm({ data, onChange }: { data: Record<string, any>; onChange: (data: Record<string, any>) => void }) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showAddress, setShowAddress] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      onChange({
        ...data,
        address: { ...(data.address || {}), [field]: value },
      });
    } else {
      onChange({ ...data, [name]: value });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const result = vcardSchema.safeParse(data);
  const errors = !result.success ? result.error.flatten().fieldErrors : {};

  // For nested address errors, we'll extract them if we were using a more detailed error map,
  // but Zod's flatten flattens top-level. Address might not have detailed flattened errors in simple flatten().
  // Assuming simple validation for address fields if needed.

  const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-colors text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
  const errorClass = "text-xs text-red-500 mt-1";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className={labelClass}>First Name</label>
          <input type="text" id="firstName" name="firstName" value={data.firstName || ''} onChange={handleChange} onBlur={handleBlur} className={inputClass} />
          {touched.firstName && errors.firstName && <p className={errorClass}>{errors.firstName[0]}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>Last Name</label>
          <input type="text" id="lastName" name="lastName" value={data.lastName || ''} onChange={handleChange} onBlur={handleBlur} className={inputClass} />
          {touched.lastName && errors.lastName && <p className={errorClass}>{errors.lastName[0]}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className={labelClass}>Phone</label>
          <input type="tel" id="phone" name="phone" value={data.phone || ''} onChange={handleChange} onBlur={handleBlur} className={inputClass} />
          {touched.phone && errors.phone && <p className={errorClass}>{errors.phone[0]}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input type="email" id="email" name="email" value={data.email || ''} onChange={handleChange} onBlur={handleBlur} className={inputClass} />
          {touched.email && errors.email && <p className={errorClass}>{errors.email[0]}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company" className={labelClass}>Company</label>
          <input type="text" id="company" name="company" value={data.company || ''} onChange={handleChange} onBlur={handleBlur} className={inputClass} />
        </div>
        <div>
          <label htmlFor="jobTitle" className={labelClass}>Job Title</label>
          <input type="text" id="jobTitle" name="jobTitle" value={data.jobTitle || ''} onChange={handleChange} onBlur={handleBlur} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="website" className={labelClass}>Website</label>
        <input type="url" id="website" name="website" value={data.website || ''} onChange={handleChange} onBlur={handleBlur} className={inputClass} />
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowAddress(!showAddress)}
          className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline focus:outline-none"
        >
          {showAddress ? 'Hide Address Details' : 'Add Address Details'}
        </button>
      </div>

      {showAddress && (
        <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div>
            <label htmlFor="address.street" className={labelClass}>Street Address</label>
            <input type="text" id="address.street" name="address.street" value={data.address?.street || ''} onChange={handleChange} className={inputClass} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="address.city" className={labelClass}>City</label>
              <input type="text" id="address.city" name="address.city" value={data.address?.city || ''} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label htmlFor="address.state" className={labelClass}>State / Province</label>
              <input type="text" id="address.state" name="address.state" value={data.address?.state || ''} onChange={handleChange} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="address.zip" className={labelClass}>ZIP / Postal Code</label>
              <input type="text" id="address.zip" name="address.zip" value={data.address?.zip || ''} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label htmlFor="address.country" className={labelClass}>Country</label>
              <input type="text" id="address.country" name="address.country" value={data.address?.country || ''} onChange={handleChange} className={inputClass} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
