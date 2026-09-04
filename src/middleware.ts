import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { getValidSupabaseUrl, getValidSupabaseKey, isSupabaseConfigured } from '@/lib/supabase/client'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })
  const isGuest = request.cookies.get('demo_guest')?.value === 'true'
  const isConfigured = isSupabaseConfigured()

  let user = null

  if (isConfigured) {
    try {
      const url = getValidSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)
      const key = getValidSupabaseKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

      const supabase = createServerClient(
        url,
        key,
        {
          cookies: {
            getAll() { return request.cookies.getAll() },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
              supabaseResponse = NextResponse.next({ request })
              cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
            },
          },
        }
      )

      const { data } = await supabase.auth.getUser()
      user = data.user
    } catch {
      // Ignore network errors in middleware
    }
  }

  // Protected routes - redirect to login if not authenticated and not in guest demo mode
  if (!user && !isGuest && request.nextUrl.pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Auth routes - redirect to dashboard if already authenticated or in guest mode
  if ((user || isGuest) && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup')) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
