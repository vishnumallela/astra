import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  // Create a Supabase client instance with server-side rendering support
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, // Supabase URL from environment variables
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Supabase anonymous key from environment variables
    {
      cookies: {
        // Function to get all cookies from the request
        getAll: () => request.cookies.getAll(),
        // Function to set all cookies, both in the request and the response
        setAll: (cookiesToSet: any) => {
          cookiesToSet.forEach(({ name, value, options }: any) => {
            request.cookies.set(name, value) // Set cookie in the request
            supabaseResponse.cookies.set(name, value, options) // Set cookie in the response
          })
        },
      },
    }
  )

  // Avoid writing logic between createServerClient and supabase.auth.getUser()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user && !isPublicPath(request.nextUrl.pathname)) {
    return redirectToLogin(request)
  }

  if (user && request.nextUrl.pathname === '/') {
    return redirectToDashboard(request)
  }

  return supabaseResponse
}

function isPublicPath(pathname: string): boolean {
  return pathname === '/' || pathname.startsWith('/login') || pathname.startsWith('/auth') || pathname.startsWith('/signup')
}

function redirectToLogin(request: NextRequest): NextResponse {
  const url = request.nextUrl.clone()
  url.pathname = '/login'
  return NextResponse.redirect(url)
}

function redirectToDashboard(request: NextRequest): NextResponse {
  const url = request.nextUrl.clone()
  url.pathname = '/dashboard'
  return NextResponse.redirect(url)
}