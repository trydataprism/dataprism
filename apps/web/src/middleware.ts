import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user is on auth pages
  const isAuthPage =
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/enter-code");

  // Check if user is on dashboard or protected pages
  const isProtectedPage = pathname.startsWith("/dashboard");

  // Get session from better-auth cookie
  const sessionToken = request.cookies.get("better-auth.session-token");
  const isLoggedIn = !!sessionToken;

  // If user is logged in and tries to access auth pages, redirect to dashboard
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is not logged in and tries to access protected pages, redirect to sign-in
  if (!isLoggedIn && isProtectedPage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next|_static|[\\w-]+\\.\\w+).*)",
  ],
};
