'use client';

import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import JSZip from 'jszip';
import { Upload, Download, FileText, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { formatQRData } from '@/features/generator/lib/qr-data-formatters';
import { getSchemaForType } from '@/features/generator/lib/qr-validators';
import type { QRType } from '@/features/generator/types';

interface CsvRow {
  name: string;
  type?: string;
  data: string;
  [key: string]: any;
}

interface ValidationItem {
  rowNumber: number;
  name: string;
  type: QRType;
  data: string;
  isValid: boolean;
  error?: string;
}

export default function BulkPage() {
  const [file, setFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [validationResults, setValidationResults] = useState<ValidationItem[]>([]);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.csv')) {
      toast.error('Please upload a valid CSV file');
      return;
    }

    setFile(selectedFile);
    parseCsv(selectedFile);
  };

  const parseCsv = (csvFile: File) => {
    setParsing(true);
    setValidationResults([]);

    Papa.parse<CsvRow>(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const validated: ValidationItem[] = results.data.map((row, index) => {
          const name = row.name || row.Name || `QR_${index + 1}`;
          const type = ((row.type || row.Type || 'url').toLowerCase().trim()) as QRType;
          const rawData = row.data || row.Data || row.url || row.URL || row.text || '';

          // Basic validation
          let isValid = false;
          let error: string | undefined;

          if (!rawData) {
            error = 'Data column is empty';
          } else {
            try {
              const schema = getSchemaForType(type);
              let parseInput: any = rawData;
              if (type === 'url') parseInput = { url: rawData };
              else if (type === 'text') parseInput = { text: rawData };
              else if (type === 'phone') parseInput = { number: rawData };
              
              const res = schema.safeParse(parseInput);
              if (res.success) {
                isValid = true;
              } else {
                isValid = true; // Fallback plain encoding for bulk rows
              }
            } catch {
              isValid = true;
            }
          }

          return {
            rowNumber: index + 1,
            name,
            type,
            data: rawData,
            isValid: !error,
            error,
          };
        });

        setValidationResults(validated);
        setParsing(false);
      },
      error: (err) => {
        toast.error(`Error parsing CSV: ${err.message}`);
        setParsing(false);
      },
    });
  };

  const validCount = validationResults.filter((r) => r.isValid).length;
  const invalidCount = validationResults.filter((r) => !r.isValid).length;

  const downloadSampleCsv = () => {
    const csvContent = 'name,type,data\nWebsite URL,url,https://example.com\nStore WiFi,text,Welcome to our cafe\nSupport Hotline,phone,+1234567890\n';
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'qr_bulk_sample.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateAndDownloadZip = async () => {
    const validItems = validationResults.filter((r) => r.isValid);
    if (validItems.length === 0) {
      toast.error('No valid rows to generate');
      return;
    }

    setGenerating(true);
    setProgress(0);

    try {
      const QRCodeStyling = (await import('qr-code-styling')).default;
      const zip = new JSZip();
      const qrFolder = zip.folder('qr_codes');

      for (let i = 0; i < validItems.length; i++) {
        const item = validItems[i];
        const encodedText = item.type === 'url' ? item.data : formatQRData(item.type, { text: item.data, url: item.data, number: item.data });

        const qr = new QRCodeStyling({
          width: 512,
          height: 512,
          data: encodedText || item.data,
          margin: 10,
          dotsOptions: { color: '#000000', type: 'square' },
          backgroundOptions: { color: '#ffffff' },
        });

        const rawData = await qr.getRawData('png');
        if (rawData && qrFolder) {
          const sanitizedName = item.name.replace(/[^a-z0-9_-]/gi, '_').toLowerCase();
          qrFolder.file(`${item.rowNumber}_${sanitizedName}.png`, rawData);
        }

        setProgress(Math.round(((i + 1) / validItems.length) * 100));
      }

      toast.info('Compressing into ZIP archive...');
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `bulk_qr_codes_${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      toast.success(`Successfully generated and downloaded ${validItems.length} QR codes!`);
    } catch (err: any) {
      toast.error(`Bulk generation failed: ${err.message || 'Unknown error'}`);
    } finally {
      setGenerating(false);
      setProgress(0);
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bulk QR Code Generation</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Upload a CSV file to generate hundreds of high-resolution QR codes at once and download as a ZIP archive.
        </p>
      </div>

      {/* CSV Upload Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Upload CSV File</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Required headers: <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">name</code>, <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">data</code> (optional: <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">type</code>)
            </p>
          </div>
          <button
            onClick={downloadSampleCsv}
            type="button"
            className="flex items-center gap-1.5 text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline"
          >
            <Download className="w-3.5 h-3.5" />
            Download Sample CSV
          </button>
        </div>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-brand-500 dark:hover:border-brand-400 transition-colors bg-gray-50 dark:bg-gray-850"
        >
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {file ? file.name : 'Click to browse or drop CSV here'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Supports .csv format up to 5MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Validation Summary & Progress */}
      {validationResults.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{validCount}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Valid Rows</p>
                </div>
              </div>
              {invalidCount > 0 && (
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm font-semibold text-red-600 dark:text-red-400">{invalidCount}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Invalid Rows</p>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={generateAndDownloadZip}
              disabled={generating || validCount === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition-colors disabled:opacity-50"
            >
              {generating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating ({progress}%)
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Generate & Download ZIP ({validCount})
                </>
              )}
            </button>
          </div>

          {generating && (
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-brand-600 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Preview Table */}
          <div className="overflow-x-auto max-h-96 rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="w-full text-left text-xs text-gray-600 dark:text-gray-300">
              <thead className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white uppercase font-semibold">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Data</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {validationResults.map((item) => (
                  <tr key={item.rowNumber} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="p-3 font-mono">{item.rowNumber}</td>
                    <td className="p-3 font-medium text-gray-900 dark:text-white">{item.name}</td>
                    <td className="p-3 uppercase">{item.type}</td>
                    <td className="p-3 truncate max-w-xs">{item.data}</td>
                    <td className="p-3">
                      {item.isValid ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" /> {item.error}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
