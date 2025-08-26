import { NextRequest, NextResponse } from "next/server";

// Protected routes that require authentication
const protectedRoutes = ["/dashboard"];

// Public routes that don't require authentication  
const publicRoutes = ["/", "/sign-in", "/sign-up"];

// Better Auth actual cookie names
const AUTH_COOKIES = [
  "better-auth.session_token", // Main session token
  "session", // Fallback session cookie
  "auth-session", // Alternative session cookie
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Skip auth check for public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // For protected routes, check auth cookies
  if (isProtectedRoute) {
    // Check for any cookie that starts with 'better-auth' or common session cookies
    const allCookies = Array.from(request.cookies.getAll());
    const hasAnyAuthCookie = allCookies.some(cookie => {
      return (cookie.name.startsWith('better-auth') || 
              cookie.name === 'session' || 
              cookie.name === 'auth-session') && 
             cookie.value && 
             cookie.value.trim().length > 10;
    });

    if (!hasAnyAuthCookie) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api routes
     */
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};