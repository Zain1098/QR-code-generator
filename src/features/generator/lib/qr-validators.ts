import { z } from 'zod';
import { QRType, QRTypeInfo } from '../types';

export const urlSchema = z.object({
  url: z.string().url().or(
    z.string().transform((val) => {
      if (!/^https?:\/\//i.test(val)) {
        return `https://${val}`;
      }
      return val;
    }).refine((val) => {
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    }, { message: "Invalid URL" })
  )
});

export const textSchema = z.object({
  text: z.string().min(1, "Text is required").max(2000, "Maximum 2000 characters allowed")
});

export const wifiSchema = z.object({
  ssid: z.string().min(1, "SSID is required"),
  password: z.string().optional(),
  encryption: z.enum(['WPA', 'WEP', 'nopass']),
  hidden: z.boolean().default(false)
});

export const vCardSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
  }).optional()
});

export const emailSchema = z.object({
  to: z.string().email("Valid email required"),
  subject: z.string().optional(),
  body: z.string().optional()
});

export const phoneSchema = z.object({
  number: z.string().regex(/^[\+\d\s\-\(\)]+$/, "Invalid phone format").min(1, "Phone number is required")
});

export const smsSchema = z.object({
  number: z.string().min(1, "Phone number is required"),
  message: z.string().optional()
});

export const whatsappSchema = z.object({
  number: z.string().min(1, "WhatsApp number is required"),
  message: z.string().optional()
});

export const locationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  label: z.string().optional()
});

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  startDate: z.string().datetime({ message: "Invalid ISO date" }),
  endDate: z.string().datetime({ message: "Invalid ISO date" }).optional(),
  location: z.string().optional(),
  description: z.string().optional()
});

export const vcardSchema = vCardSchema;

export const socialSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  handle: z.string().optional(),
  handleOrUrl: z.string().optional()
}).refine(data => !!(data.handle || data.handleOrUrl), {
  message: "Handle or URL is required",
  path: ["handleOrUrl"]
});

export const paymentSchema = z.any(); // Placeholder

export const QR_TYPES: QRTypeInfo[] = [
  { type: 'url', label: 'URL', icon: 'link', description: 'Link to any website' },
  { type: 'text', label: 'Text', icon: 'type', description: 'Plain text message' },
  { type: 'wifi', label: 'WiFi', icon: 'wifi', description: 'Connect to a WiFi network' },
  { type: 'vcard', label: 'vCard', icon: 'user', description: 'Digital contact card' },
  { type: 'email', label: 'Email', icon: 'mail', description: 'Send an email' },
  { type: 'phone', label: 'Phone', icon: 'phone', description: 'Make a call' },
  { type: 'sms', label: 'SMS', icon: 'message-square', description: 'Send a text message' },
  { type: 'whatsapp', label: 'WhatsApp', icon: 'message-circle', description: 'WhatsApp message' },
  { type: 'location', label: 'Location', icon: 'map-pin', description: 'Google Maps location' },
  { type: 'event', label: 'Event', icon: 'calendar', description: 'Calendar event' },
  { type: 'social', label: 'Social', icon: 'share-2', description: 'Social media profile' },
  { type: 'payment', label: 'Payment', icon: 'credit-card', description: 'Receive a payment' },
];

export function getSchemaForType(type: QRType): z.ZodTypeAny {
  switch (type) {
    case 'url': return urlSchema;
    case 'text': return textSchema;
    case 'wifi': return wifiSchema;
    case 'vcard': return vCardSchema;
    case 'email': return emailSchema;
    case 'phone': return phoneSchema;
    case 'sms': return smsSchema;
    case 'whatsapp': return whatsappSchema;
    case 'location': return locationSchema;
    case 'event': return eventSchema;
    case 'social': return socialSchema;
    case 'payment': return paymentSchema;
    default: return z.any();
  }
}
