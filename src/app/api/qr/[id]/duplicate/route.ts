import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { errorResponse, successResponse, getAuthUser } from '@/lib/api-utils';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser();
  if (!user) return errorResponse('Unauthorized', 401);

  const { id } = await params;
  const supabase = await createClient();

  const { data: original, error: fetchError } = await supabase
    .from('qr_codes')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (fetchError || !original) return errorResponse('QR code not found', 404);

  const newQrCode = { ...original };
  delete newQrCode.id;
  delete newQrCode.created_at;
  delete newQrCode.updated_at;
  delete newQrCode.total_scans;

  newQrCode.name = `${original.name} (Copy)`;
  if (newQrCode.is_dynamic) {
    newQrCode.short_code = nanoid(8);
  }

  const { data, error } = await supabase
    .from('qr_codes')
    .insert(newQrCode)
    .select()
    .single();

  if (error) return errorResponse('Failed to duplicate QR code', 500);

  return successResponse(data, 201);
}
