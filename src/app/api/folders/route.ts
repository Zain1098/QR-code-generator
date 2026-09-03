import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { errorResponse, successResponse, getAuthUser, parseBody } from '@/lib/api-utils';
import { z } from 'zod';

const folderSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  color: z.string().optional()
});

export async function GET(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return errorResponse('Unauthorized', 401);

  const supabase = await createClient();

  const { data: folders, error } = await supabase
    .from('folders')
    .select('*, qr_codes(count)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) return errorResponse('Failed to fetch folders', 500);

  const formatted = folders.map((f: any) => ({
    ...f,
    qr_count: f.qr_codes[0]?.count || 0
  }));
  
  formatted.forEach((f: any) => delete f.qr_codes);

  return successResponse(formatted);
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return errorResponse('Unauthorized', 401);

  const body = await parseBody(request);
  if (!body) return errorResponse('Invalid JSON body', 400);

  const parsed = folderSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message || 'Validation error', 400);
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('folders')
    .insert({
      user_id: user.id,
      name: parsed.data.name,
      color: parsed.data.color
    })
    .select()
    .single();

  if (error) return errorResponse('Failed to create folder', 500);

  return successResponse(data, 201);
}
