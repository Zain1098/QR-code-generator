'use client';

import { QRType } from '@/features/generator/types';
import {
  Globe,
  Type,
  Wifi,
  Contact,
  Mail,
  Phone,
  MessageSquare,
  MessageCircle,
  MapPin,
  Calendar,
  Share2,
  CreditCard,
} from 'lucide-react';

interface QRTypeSelectorProps {
  selected: QRType;
  onSelect: (type: QRType) => void;
}

const QR_TYPES: { id: QRType; label: string; icon: React.ElementType }[] = [
  { id: 'url', label: 'URL', icon: Globe },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
  { id: 'vcard', label: 'vCard', icon: Contact },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'phone', label: 'Phone', icon: Phone },
  { id: 'sms', label: 'SMS', icon: MessageSquare },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'location', label: 'Location', icon: MapPin },
  { id: 'event', label: 'Event', icon: Calendar },
  { id: 'social', label: 'Social', icon: Share2 },
  { id: 'payment', label: 'Payment', icon: CreditCard },
];

export function QRTypeSelector({ selected, onSelect }: QRTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {QR_TYPES.map((type) => {
        const Icon = type.icon;
        const isSelected = selected === type.id;

        return (
          <button
            key={type.id}
            type="button"
            onClick={() => onSelect(type.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 ${
              isSelected
                ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:border-brand-400 dark:text-brand-300 shadow-sm'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 hover:bg-gray-50 dark:hover:border-gray-600 dark:hover:bg-gray-750'
            }`}
          >
            <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-brand-500 dark:text-brand-400' : ''}`} />
            <span className="text-sm font-medium">{type.label}</span>
          </button>
        );
      })}
    </div>
  );
}
