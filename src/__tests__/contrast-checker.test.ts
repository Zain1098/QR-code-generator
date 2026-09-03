import { describe, it, expect } from 'vitest';
import {
  hexToRgb,
  getLuminance,
  getContrastRatio,
  getContrastLevel,
  getContrastMessage,
} from '@/features/generator/lib/contrast-checker';

describe('Contrast Checker', () => {
  describe('hexToRgb', () => {
    it('converts 6-digit hex colors correctly', () => {
      expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb('#4F46E5')).toEqual({ r: 79, g: 70, b: 229 });
    });

    it('converts 3-digit shorthand hex colors', () => {
      expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000')).toEqual({ r: 0, g: 0, b: 0 });
    });
  });

  describe('getLuminance', () => {
    it('calculates luminance for black and white', () => {
      expect(getLuminance(0, 0, 0)).toBe(0);
      expect(getLuminance(255, 255, 255)).toBe(1);
    });
  });

  describe('getContrastRatio', () => {
    it('returns 21:1 for pure black and white', () => {
      const ratio = getContrastRatio('#000000', '#ffffff');
      expect(ratio).toBeCloseTo(21, 0);
    });

    it('returns 1:1 for identical colors', () => {
      const ratio = getContrastRatio('#ffffff', '#ffffff');
      expect(ratio).toBeCloseTo(1, 0);
    });
  });

  describe('getContrastLevel and messages', () => {
    it('flags excellent contrast correctly', () => {
      const level = getContrastLevel(21);
      expect(level).toBe('good');
      expect(getContrastMessage('good')).toContain('Good contrast');
    });

    it('flags warning contrast correctly', () => {
      const level = getContrastLevel(2.5);
      expect(level).toBe('warning');
      expect(getContrastMessage('warning')).toContain('Low contrast');
    });

    it('flags poor contrast correctly', () => {
      const level = getContrastLevel(1.5);
      expect(level).toBe('poor');
      expect(getContrastMessage('poor')).toContain('Poor contrast');
    });
  });
});
