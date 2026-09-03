import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { errorResponse, successResponse, getAuthUser, parseBody } from '@/lib/api-utils';
import { nanoid } from 'nanoid';
import { z } from 'zod';

const createQRSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  qr_type: z.string().min(1, 'QR Type is required'),
  is_dynamic: z.boolean().default(false),
  content: z.string().optional(),
  encoded_data: z.any().optional(),
  destination_url: z.string().url('Invalid URL').optional(),
  customization: z.any().optional(),
  folder_id: z.string().uuid().optional().nullable(),
});

export async function GET(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return errorResponse('Unauthorized', 401);

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '12', 10);
  const offset = parseInt(searchParams.get('offset') || '0', 10);
  const type = searchParams.get('type');
  const status = searchParams.get('status');
  const folder_id = searchParams.get('folder_id');
  const search = searchParams.get('search');
  const sort = searchParams.get('sort') || 'newest';

  const supabase = await createClient();

  let query = supabase
    .from('qr_codes')
    .select('*', { count: 'exact' })
    .eq('user_id', user.id);

  if (type) query = query.eq('qr_type', type);
  if (status) query = query.eq('status', status);
  if (folder_id) query = query.eq('folder_id', folder_id);
  if (search) query = query.ilike('name', `%${search}%`);

  if (sort === 'newest') {
    query = query.order('created_at', { ascending: false });
  } else if (sort === 'oldest') {
    query = query.order('created_at', { ascending: true });
  } else if (sort === 'scans') {
    query = query.order('total_scans', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching QR codes:', error);
    return errorResponse('Failed to fetch QR codes', 500);
  }

  return NextResponse.json({ data, total: count || 0 }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return errorResponse('Unauthorized', 401);

  const body = await parseBody(request);
  if (!body) return errorResponse('Invalid JSON body', 400);

  const parsed = createQRSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message || 'Validation error', 400);
  }

  const { name, qr_type, is_dynamic, content, encoded_data, destination_url, customization, folder_id } = parsed.data;

  let short_code = null;
  if (is_dynamic) {
    short_code = nanoid(8);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from('qr_codes').insert({
    user_id: user.id,
    name,
    qr_type,
    is_dynamic,
    short_code,
    content,
    encoded_data,
    destination_url,
    customization,
    folder_id,
    status: 'active'
  }).select().single();

  if (error) {
    console.error('Error creating QR code:', error);
    return errorResponse('Failed to create QR code', 500);
  }

  return successResponse(data, 201);
}
