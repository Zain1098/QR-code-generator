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
    <div className="space-y-2">
      {/* 12 Types Architectural Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1.5 p-1 bg-print-bed dark:bg-dark-surface rounded-lg border border-border-hairpin dark:border-dark-border">
        {QR_TYPES.map((type) => {
          const Icon = type.icon;
          const isSelected = selected === type.id;

          return (
            <button
              key={type.id}
              type="button"
              onClick={() => onSelect(type.id)}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded text-xs transition-all duration-150 select-none ${
                isSelected
                  ? 'bg-surface-workbench dark:bg-dark-panel text-ink-primary dark:text-dark-ink-primary font-semibold shadow-sm border border-border-hairpin dark:border-dark-border-strong'
                  : 'text-ink-muted dark:text-dark-ink-muted hover:text-ink-primary dark:hover:text-dark-ink-primary hover:bg-canvas-paper/60 dark:hover:bg-dark-panel/50 border border-transparent'
              }`}
              title={type.label}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{type.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
