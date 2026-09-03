import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { errorResponse, successResponse, getAuthUser, parseBody } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return errorResponse('Unauthorized', 401);

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('qr_templates')
    .select('*')
    .or(`is_system.eq.true,user_id.eq.${user.id}`)
    .order('created_at', { ascending: false });

  if (error) return errorResponse('Failed to fetch templates', 500);

  return successResponse(data);
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return errorResponse('Unauthorized', 401);

  const body = await parseBody(request);
  if (!body) return errorResponse('Invalid JSON body', 400);

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('qr_templates')
    .insert({
      user_id: user.id,
      name: body.name,
      description: body.description,
      qr_type: body.qr_type,
      customization: body.customization,
      is_system: false
    })
    .select()
    .single();

  if (error) return errorResponse('Failed to create template', 500);

  return successResponse(data, 201);
}
