import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { errorResponse, successResponse, getAuthUser } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return errorResponse('Unauthorized', 401);

  const supabase = await createClient();

  const { data: qrCodes, error } = await supabase
    .from('qr_codes')
    .select('id, name, total_scans, created_at')
    .eq('user_id', user.id);

  if (error) return errorResponse('Failed to fetch analytics', 500);

  const totalScans = qrCodes.reduce((sum, qr) => sum + (qr.total_scans || 0), 0);
  
  const sortedQRs = [...qrCodes].sort((a, b) => (b.total_scans || 0) - (a.total_scans || 0)).slice(0, 5);

  return successResponse({
    total_scans: totalScans,
    top_qr_codes: sortedQRs
  });
}
