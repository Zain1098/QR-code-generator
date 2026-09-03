import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export function errorResponse(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function successResponse(data: any, status: number = 200) {
  return NextResponse.json({ data }, { status });
}

export async function getAuthUser() {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return user;
  } catch (error) {
    return null;
  }
}

export async function parseBody(request: Request) {
  try {
    return await request.json();
  } catch (error) {
    return null;
  }
}
