import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { errorResponse, successResponse, getAuthUser, parseBody } from '@/lib/api-utils';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser();
  if (!user) return errorResponse('Unauthorized', 401);

  const { id } = await params;
  const body = await parseBody(request);
  if (!body) return errorResponse('Invalid JSON body', 400);

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('folders')
    .update({ name: body.name, color: body.color })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) return errorResponse('Failed to update folder', 500);

  return successResponse(data);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser();
  if (!user) return errorResponse('Unauthorized', 401);

  const { id } = await params;
  const supabase = await createClient();

  const { error } = await supabase
    .from('folders')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) return errorResponse('Failed to delete folder', 500);

  return successResponse({ success: true });
}
