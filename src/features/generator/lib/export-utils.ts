import { ExportFormat } from '../types';

/**
 * Downloads a QR code in the specified format
 * @param qrRef Reference to the QR code instance (e.g. qr-code-styling)
 * @param format The format to download ('png', 'svg', 'webp')
 * @param filename The name of the downloaded file (without extension)
 */
export async function downloadQRCode(qrRef: any, format: ExportFormat, filename: string = 'qrcode'): Promise<void> {
  if (!qrRef) throw new Error("QR reference is not available");

  try {
    if (typeof qrRef.download === 'function') {
      // Direct download if supported by the library
      await qrRef.download({ name: filename, extension: format });
      return;
    }

    if (typeof qrRef.getRawData === 'function') {
      const blob = await qrRef.getRawData(format);
      if (!blob) throw new Error("Could not generate QR code data");
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error(`Error downloading QR code as ${format}:`, error);
    throw error;
  }
}

/**
 * Copies the QR code image to the clipboard as a PNG
 * @param qrRef Reference to the QR code instance
 */
export async function copyQRToClipboard(qrRef: any): Promise<void> {
  if (!qrRef) throw new Error("QR reference is not available");

  try {
    if (typeof qrRef.getRawData === 'function') {
      const blob = await qrRef.getRawData('png');
      if (!blob) throw new Error("Could not generate PNG for clipboard");
      
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
    } else {
      throw new Error("Copy to clipboard requires getRawData method");
    }
  } catch (error) {
    console.error("Error copying QR code to clipboard:", error);
    throw error;
  }
}
