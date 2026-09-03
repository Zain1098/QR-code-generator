import { QRType } from '../types';

function escapeVCard(text: string): string {
  if (!text) return '';
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

/**
 * Formats data into a QR-encodable string based on QR type
 * @param type The QR code type
 * @param data The validated form data
 * @returns The formatted string ready to be encoded in a QR code
 */
export function formatQRData(type: QRType, data: Record<string, any>): string {
  switch (type) {
    case 'url':
      return data.url || '';

    case 'text':
      return data.text || '';

    case 'wifi':
      const encryption = data.encryption || 'nopass';
      const ssid = String(data.ssid || '').replace(/(;|\\|:|,)/g, '\\$1');
      const pass = data.password ? String(data.password).replace(/(;|\\|:|,)/g, '\\$1') : '';
      const hidden = data.hidden ? 'true' : 'false';
      return `WIFI:T:${encryption};S:${ssid};P:${pass};H:${hidden};;`;

    case 'vcard':
      const lines = ['BEGIN:VCARD', 'VERSION:3.0'];
      
      const fn = escapeVCard([data.firstName, data.lastName].filter(Boolean).join(' '));
      if (fn) {
        lines.push(`N:${escapeVCard(data.lastName || '')};${escapeVCard(data.firstName || '')};;;`);
        lines.push(`FN:${fn}`);
      }
      
      if (data.phone) lines.push(`TEL:${escapeVCard(data.phone)}`);
      if (data.email) lines.push(`EMAIL:${escapeVCard(data.email)}`);
      if (data.company) lines.push(`ORG:${escapeVCard(data.company)}`);
      if (data.jobTitle) lines.push(`TITLE:${escapeVCard(data.jobTitle)}`);
      if (data.website) lines.push(`URL:${escapeVCard(data.website)}`);
      
      if (data.address) {
        const { street = '', city = '', state = '', zip = '', country = '' } = data.address;
        if (street || city || state || zip || country) {
          lines.push(`ADR:;;${escapeVCard(street)};${escapeVCard(city)};${escapeVCard(state)};${escapeVCard(zip)};${escapeVCard(country)}`);
        }
      }
      
      lines.push('END:VCARD');
      return lines.join('\n');

    case 'email':
      let mailto = `mailto:${data.to || ''}`;
      const params = new URLSearchParams();
      if (data.subject) params.append('subject', data.subject);
      if (data.body) params.append('body', data.body);
      
      const qs = params.toString();
      if (qs) mailto += `?${qs}`;
      return mailto;

    case 'phone':
      return `tel:${data.number || ''}`;

    case 'sms':
      return data.message ? `smsto:${data.number}:${data.message}` : `smsto:${data.number}`;

    case 'whatsapp':
      let waUrl = `https://wa.me/${String(data.number || '').replace(/\D/g, '')}`;
      if (data.message) {
        waUrl += `?text=${encodeURIComponent(data.message)}`;
      }
      return waUrl;

    case 'location':
      const lat = data.latitude;
      const lng = data.longitude;
      const label = data.label ? `(${data.label})` : '';
      return `geo:${lat},${lng}?q=${lat},${lng}${label}`;

    case 'event':
      const dtstart = data.startDate ? data.startDate.replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z') : '';
      const vcal = ['BEGIN:VCALENDAR', 'BEGIN:VEVENT'];
      vcal.push(`SUMMARY:${data.title || ''}`);
      if (dtstart) vcal.push(`DTSTART:${dtstart}`);
      
      if (data.endDate) {
        const dtend = data.endDate.replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
        vcal.push(`DTEND:${dtend}`);
      }
      if (data.location) vcal.push(`LOCATION:${data.location}`);
      if (data.description) vcal.push(`DESCRIPTION:${data.description}`);
      
      vcal.push('END:VEVENT');
      vcal.push('END:VCALENDAR');
      return vcal.join('\n');

    case 'social':
      let handleUrl = data.handle || data.handleOrUrl || '';
      if (!handleUrl.startsWith('http')) {
        switch (data.platform) {
          case 'twitter': return `https://twitter.com/${handleUrl}`;
          case 'instagram': return `https://instagram.com/${handleUrl}`;
          case 'facebook': return `https://facebook.com/${handleUrl}`;
          case 'linkedin': return `https://linkedin.com/in/${handleUrl}`;
          case 'youtube': return `https://youtube.com/@${handleUrl}`;
          case 'tiktok': return `https://tiktok.com/@${handleUrl}`;
          case 'github': return `https://github.com/${handleUrl}`;
          case 'website': return `https://${handleUrl.replace(/^www\./, '')}`;
          default: return handleUrl;
        }
      }
      return handleUrl;

    case 'payment':
      return ''; // Placeholder

    default:
      return '';
  }
}
