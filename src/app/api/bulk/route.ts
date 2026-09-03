import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { errorResponse, successResponse, getAuthUser, parseBody } from '@/lib/api-utils';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return errorResponse('Unauthorized', 401);

  const body = await parseBody(request);
  if (!body || !Array.isArray(body.rows)) return errorResponse('Invalid JSON body, expected rows array', 400);

  const supabase = await createClient();
  const created = [];
  const failed = [];

  for (const row of body.rows) {
    try {
      const is_dynamic = row.is_dynamic ?? false;
      const short_code = is_dynamic ? nanoid(8) : null;
      
      const { data, error } = await supabase
        .from('qr_codes')
        .insert({
          user_id: user.id,
          name: row.name,
          qr_type: row.type || row.qr_type,
          is_dynamic,
          short_code,
          content: row.data || row.content,
          destination_url: row.destination_url,
          customization: body.customization || row.customization,
          status: 'active'
        })
        .select()
        .single();
        
      if (error) throw error;
      created.push(data);
    } catch (error: any) {
      failed.push({ row, error: error.message || 'Failed to create' });
    }
  }

  return successResponse({ created: created.length, failed });
}
