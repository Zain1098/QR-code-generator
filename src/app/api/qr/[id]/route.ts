import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { errorResponse, successResponse, getAuthUser, parseBody } from '@/lib/api-utils';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser();
  if (!user) return errorResponse('Unauthorized', 401);

  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('qr_codes')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error || !data) return errorResponse('QR code not found', 404);

  return successResponse(data);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser();
  if (!user) return errorResponse('Unauthorized', 401);

  const { id } = await params;
  const body = await parseBody(request);
  if (!body) return errorResponse('Invalid JSON body', 400);

  const supabase = await createClient();

  const allowedUpdates = ['name', 'destination_url', 'status', 'folder_id', 'customization', 'expires_at'];
  const updates: Record<string, any> = {};

  for (const key of allowedUpdates) {
    if (body[key] !== undefined) {
      updates[key] = body[key];
    }
  }

  const { data, error } = await supabase
    .from('qr_codes')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error || !data) return errorResponse('Failed to update QR code', 400);

  return successResponse(data);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser();
  if (!user) return errorResponse('Unauthorized', 401);

  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const hard = searchParams.get('hard') === 'true';

  const supabase = await createClient();

  if (hard) {
    const { error } = await supabase
      .from('qr_codes')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) return errorResponse('Failed to delete QR code', 500);
  } else {
    const { error } = await supabase
      .from('qr_codes')
      .update({ status: 'archived', archived_at: new Date().toISOString() })
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) return errorResponse('Failed to archive QR code', 500);
  }

  return successResponse({ success: true });
}
