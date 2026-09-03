export type QRType = 
  | 'url' 
  | 'text' 
  | 'wifi' 
  | 'vcard' 
  | 'email' 
  | 'phone' 
  | 'sms' 
  | 'whatsapp' 
  | 'location' 
  | 'event' 
  | 'social' 
  | 'payment';

export interface QRTypeInfo {
  type: QRType;
  label: string;
  icon: string;
  description: string;
}

export interface QRCustomization {
  dotStyle?: 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';
  cornerSquareStyle?: 'dot' | 'square' | 'extra-rounded' | '';
  cornerDotStyle?: 'dot' | 'square' | '';
  fgColor?: string;
  bgColor?: string;
  cornerSquareColor?: string;
  cornerDotColor?: string;
  size?: number;
  margin?: number;
  errorCorrection?: 'L' | 'M' | 'Q' | 'H';
  logoFile?: string | null;
  logoDataUrl?: string;
  logoSize?: number;
  logoPadding?: number;
  logoBackgroundShape?: 'square' | 'circle' | 'none';
}

export type QRFormData = Record<string, any>;

export type ExportFormat = 'png' | 'svg' | 'webp';

export type ContrastLevel = 'good' | 'warning' | 'poor';
