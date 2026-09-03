import { ContrastLevel } from '../types';

/**
 * Converts a hex color string to RGB values
 * @param hex The hex color string
 * @returns Object containing r, g, b components
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

/**
 * Calculates the relative luminance of a color
 * @param r Red component (0-255)
 * @param g Green component (0-255)
 * @param b Blue component (0-255)
 * @returns The relative luminance value
 */
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculates the contrast ratio between two hex colors
 * @param hex1 First color in hex
 * @param hex2 Second color in hex
 * @returns The contrast ratio
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  try {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    
    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  } catch (error) {
    // If invalid hex provided, assume it's OK to return a default good ratio to avoid breaking
    return 21; 
  }
}

/**
 * Determines the contrast level based on the ratio
 * @param ratio The contrast ratio
 * @returns The contrast level ('good', 'warning', or 'poor')
 */
export function getContrastLevel(ratio: number): ContrastLevel {
  if (ratio >= 3) return 'good';
  if (ratio >= 2) return 'warning';
  return 'poor';
}

/**
 * Gets a human-readable message for the contrast level
 * @param level The contrast level
 * @returns A descriptive message
 */
export function getContrastMessage(level: ContrastLevel): string {
  switch (level) {
    case 'good':
      return 'Good contrast. The QR code will be easily scannable.';
    case 'warning':
      return 'Low contrast. The QR code might be hard to scan for some devices.';
    case 'poor':
      return 'Poor contrast. The QR code is likely to be unscannable.';
  }
}
