import { NextRequest, NextResponse } from "next/server";

// Protected routes that require authentication
const protectedRoutes = ["/dashboard"];

// Public routes that don't require authentication  
const publicRoutes = ["/", "/sign-in", "/sign-up"];

// Better Auth cookie names to check
const AUTH_COOKIES = [
  "better-auth.session_token",
  "better-auth.session",
  "better-auth.session_data",
  "better-auth.csrf_token", // CSRF token da kontrol et
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
    // Check if any auth cookie exists
    const hasAuthCookie = AUTH_COOKIES.some(cookieName => {
      const cookie = request.cookies.get(cookieName);
      return cookie && cookie.value && cookie.value.length > 10; // Basic validation
    });

    if (!hasAuthCookie) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Let the client-side auth provider handle detailed session validation
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