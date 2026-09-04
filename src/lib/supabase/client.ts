import { createBrowserClient } from '@supabase/ssr'

export function getValidSupabaseUrl(rawUrl?: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') return 'https://placeholder.supabase.co'
  let trimmed = rawUrl.trim()
  if (!trimmed || trimmed === 'undefined' || trimmed === 'null') return 'https://placeholder.supabase.co'
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    trimmed = `https://${trimmed}`
  }
  try {
    const parsed = new URL(trimmed)
    if ((parsed.protocol === 'http:' || parsed.protocol === 'https:') && parsed.hostname && parsed.hostname.includes('.')) {
      return trimmed
    }
  } catch {}
  return 'https://placeholder.supabase.co'
}

export function getValidSupabaseKey(rawKey?: string, defaultFallback = 'placeholder-anon-key'): string {
  if (!rawKey || typeof rawKey !== 'string' || !rawKey.trim() || rawKey === 'undefined' || rawKey === 'null') {
    return defaultFallback
  }
  return rawKey.trim()
}

export function createClient() {
  const url = getValidSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)
  const key = getValidSupabaseKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  return createBrowserClient(url, key)
}
