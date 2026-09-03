import { describe, it, expect } from 'vitest';
import { formatQRData } from '@/features/generator/lib/qr-data-formatters';

describe('formatQRData', () => {
  it('formats URL data directly', () => {
    const result = formatQRData('url', { url: 'https://example.com' });
    expect(result).toBe('https://example.com');
  });

  it('formats plain text data directly', () => {
    const result = formatQRData('text', { text: 'Hello, World!' });
    expect(result).toBe('Hello, World!');
  });

  it('formats WiFi network string correctly', () => {
    const result = formatQRData('wifi', {
      ssid: 'MyWiFi',
      password: 'SecretPassword',
      encryption: 'WPA',
      hidden: false,
    });
    expect(result).toBe('WIFI:T:WPA;S:MyWiFi;P:SecretPassword;H:false;;');
  });

  it('formats WiFi with hidden network flag', () => {
    const result = formatQRData('wifi', {
      ssid: 'HiddenNet',
      password: 'pass',
      encryption: 'WPA',
      hidden: true,
    });
    expect(result).toBe('WIFI:T:WPA;S:HiddenNet;P:pass;H:true;;');
  });

  it('formats vCard 3.0 string correctly', () => {
    const result = formatQRData('vcard', {
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      email: 'john@example.com',
      company: 'Acme Corp',
      jobTitle: 'Engineer',
      website: 'https://johndoe.com',
    });
    expect(result).toContain('BEGIN:VCARD');
    expect(result).toContain('VERSION:3.0');
    expect(result).toContain('N:Doe;John;;;');
    expect(result).toContain('FN:John Doe');
    expect(result).toContain('TEL:+1234567890');
    expect(result).toContain('EMAIL:john@example.com');
    expect(result).toContain('ORG:Acme Corp');
    expect(result).toContain('TITLE:Engineer');
    expect(result).toContain('URL:https://johndoe.com');
    expect(result).toContain('END:VCARD');
  });

  it('formats mailto string correctly', () => {
    const result = formatQRData('email', {
      to: 'info@example.com',
      subject: 'Inquiry',
      body: 'Hello team',
    });
    expect(result).toContain('mailto:info@example.com?');
    expect(result).toContain('subject=Inquiry');
    expect(result).toContain('body=Hello+team');
  });

  it('formats phone dial string correctly', () => {
    const result = formatQRData('phone', { number: '+1234567890' });
    expect(result).toBe('tel:+1234567890');
  });

  it('formats SMS string correctly', () => {
    const result = formatQRData('sms', { number: '+1234567890', message: 'Hello' });
    expect(result).toBe('smsto:+1234567890:Hello');
  });

  it('formats WhatsApp URL correctly', () => {
    const result = formatQRData('whatsapp', { number: '+1-234-567-890', message: 'Hi there' });
    expect(result).toBe('https://wa.me/1234567890?text=Hi%20there');
  });

  it('formats location geo URI correctly', () => {
    const result = formatQRData('location', {
      latitude: 40.7128,
      longitude: -74.006,
      label: 'New York',
    });
    expect(result).toBe('geo:40.7128,-74.006?q=40.7128,-74.006(New York)');
  });

  it('formats event iCalendar VEVENT string correctly', () => {
    const result = formatQRData('event', {
      title: 'Tech Summit',
      startDate: '2026-10-15T09:00:00Z',
      endDate: '2026-10-15T18:00:00Z',
      location: 'Convention Center',
      description: 'Annual tech conference',
    });
    expect(result).toContain('BEGIN:VCALENDAR');
    expect(result).toContain('BEGIN:VEVENT');
    expect(result).toContain('SUMMARY:Tech Summit');
    expect(result).toContain('DTSTART:20261015T090000Z');
    expect(result).toContain('DTEND:20261015T180000Z');
    expect(result).toContain('LOCATION:Convention Center');
    expect(result).toContain('END:VEVENT');
    expect(result).toContain('END:VCALENDAR');
  });

  it('formats social media handles into valid URLs', () => {
    const xResult = formatQRData('social', { platform: 'twitter', handle: 'antigravity' });
    expect(xResult).toBe('https://twitter.com/antigravity');

    const ghResult = formatQRData('social', { platform: 'github', handle: 'antigravity' });
    expect(ghResult).toBe('https://github.com/antigravity');
  });
});
