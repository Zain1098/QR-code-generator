import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getValidSupabaseUrl, getValidSupabaseKey } from './client'

export async function createClient() {
  const cookieStore = await cookies()
  const url = getValidSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)
  const key = getValidSupabaseKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  return createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch { /* server component, can't set */ }
        },
      },
    }
  )
}
