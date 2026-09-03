import { describe, it, expect } from 'vitest';
import {
  urlSchema,
  textSchema,
  wifiSchema,
  vCardSchema,
  emailSchema,
  phoneSchema,
  socialSchema,
  getSchemaForType,
} from '@/features/generator/lib/qr-validators';

describe('QR Validators', () => {
  describe('urlSchema', () => {
    it('accepts valid URLs', () => {
      expect(urlSchema.safeParse({ url: 'https://example.com' }).success).toBe(true);
      expect(urlSchema.safeParse({ url: 'http://localhost:3000' }).success).toBe(true);
    });

    it('rejects invalid or empty URLs', () => {
      expect(urlSchema.safeParse({ url: '' }).success).toBe(false);
      expect(urlSchema.safeParse({ url: 'not a url' }).success).toBe(false);
    });
  });

  describe('textSchema', () => {
    it('accepts valid plain text', () => {
      expect(textSchema.safeParse({ text: 'Hello' }).success).toBe(true);
    });

    it('rejects empty text', () => {
      expect(textSchema.safeParse({ text: '' }).success).toBe(false);
    });

    it('rejects text over 2000 characters', () => {
      const longText = 'a'.repeat(2001);
      expect(textSchema.safeParse({ text: longText }).success).toBe(false);
    });
  });

  describe('wifiSchema', () => {
    it('accepts valid wifi config', () => {
      const valid = wifiSchema.safeParse({
        ssid: 'HomeNet',
        password: 'pass',
        encryption: 'WPA',
        hidden: false,
      });
      expect(valid.success).toBe(true);
    });

    it('rejects missing SSID', () => {
      const invalid = wifiSchema.safeParse({
        ssid: '',
        encryption: 'WPA',
      });
      expect(invalid.success).toBe(false);
    });
  });

  describe('vCardSchema', () => {
    it('accepts valid contact card', () => {
      const valid = vCardSchema.safeParse({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        phone: '+1234567890',
      });
      expect(valid.success).toBe(true);
    });

    it('rejects missing first name', () => {
      const invalid = vCardSchema.safeParse({
        firstName: '',
      });
      expect(invalid.success).toBe(false);
    });
  });

  describe('emailSchema', () => {
    it('accepts valid email', () => {
      expect(emailSchema.safeParse({ to: 'test@example.com' }).success).toBe(true);
    });

    it('rejects invalid email', () => {
      expect(emailSchema.safeParse({ to: 'invalid-email' }).success).toBe(false);
    });
  });

  describe('phoneSchema', () => {
    it('accepts valid phone numbers', () => {
      expect(phoneSchema.safeParse({ number: '+1234567890' }).success).toBe(true);
      expect(phoneSchema.safeParse({ number: '(555) 123-4567' }).success).toBe(true);
    });

    it('rejects empty phone numbers', () => {
      expect(phoneSchema.safeParse({ number: '' }).success).toBe(false);
    });
  });

  describe('socialSchema', () => {
    it('accepts handle or handleOrUrl', () => {
      expect(socialSchema.safeParse({ platform: 'twitter', handle: 'username' }).success).toBe(true);
      expect(socialSchema.safeParse({ platform: 'github', handleOrUrl: 'username' }).success).toBe(true);
    });

    it('rejects when handle is missing', () => {
      expect(socialSchema.safeParse({ platform: 'twitter' }).success).toBe(false);
    });
  });

  describe('getSchemaForType', () => {
    it('returns appropriate schema for all 12 types', () => {
      const types = ['url', 'text', 'wifi', 'vcard', 'email', 'phone', 'sms', 'whatsapp', 'location', 'event', 'social', 'payment'] as const;
      for (const t of types) {
        const schema = getSchemaForType(t);
        expect(schema).toBeDefined();
      }
    });
  });
});
