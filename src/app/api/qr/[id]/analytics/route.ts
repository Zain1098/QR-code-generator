import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { errorResponse, successResponse, getAuthUser } from '@/lib/api-utils';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser();
  if (!user) return errorResponse('Unauthorized', 401);

  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || '30d';

  const supabase = await createClient();

  const { data: qrCode, error: qrError } = await supabase
    .from('qr_codes')
    .select('id, total_scans')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (qrError || !qrCode) return errorResponse('QR code not found', 404);

  const { data: scans, error: scansError } = await supabase
    .from('qr_scans')
    .select('*')
    .eq('qr_code_id', id);

  if (scansError) return errorResponse('Failed to fetch analytics', 500);

  const uniqueScans = new Set(scans.map(s => s.scan_fingerprint)).size;
  
  const scansByDate: Record<string, number> = {};
  const deviceBreakdown: Record<string, number> = {};
  const browserBreakdown: Record<string, number> = {};
  const geoBreakdown: Record<string, number> = {};

  scans.forEach(scan => {
    const date = new Date(scan.scanned_at).toISOString().split('T')[0];
    scansByDate[date] = (scansByDate[date] || 0) + 1;
    
    const device = scan.device_type || 'unknown';
    deviceBreakdown[device] = (deviceBreakdown[device] || 0) + 1;
    
    const browser = scan.browser || 'unknown';
    browserBreakdown[browser] = (browserBreakdown[browser] || 0) + 1;
    
    const country = scan.country || 'Unknown';
    geoBreakdown[country] = (geoBreakdown[country] || 0) + 1;
  });

  return successResponse({
    total_scans: qrCode.total_scans,
    unique_scans: uniqueScans,
    scans_by_date: Object.entries(scansByDate).map(([date, count]) => ({ date, count })),
    device_breakdown: Object.entries(deviceBreakdown).map(([device, count]) => ({ device, count })),
    browser_breakdown: Object.entries(browserBreakdown).map(([browser, count]) => ({ browser, count })),
    geo_breakdown: Object.entries(geoBreakdown).map(([country, count]) => ({ country, count }))
  });
}
