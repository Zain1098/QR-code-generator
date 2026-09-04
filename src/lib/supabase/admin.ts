import { createClient } from '@supabase/supabase-js'
import { getValidSupabaseUrl, getValidSupabaseKey } from './client'

export function createAdminClient() {
  const url = getValidSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)
  const key = getValidSupabaseKey(process.env.SUPABASE_SERVICE_ROLE_KEY, 'placeholder-service-key')

  return createClient(
    url,
    key,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
