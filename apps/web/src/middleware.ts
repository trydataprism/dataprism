import { NextRequest, NextResponse } from "next/server";

// Protected routes that require authentication
const protectedRoutes = ["/dashboard"];

// Public routes that don't require authentication
const publicRoutes = ["/", "/sign-in", "/sign-up"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.includes(pathname);

  // Check for authentication cookie
  const authCookie = request.cookies.get("better-auth.session_data");
  const isAuthenticated = !!authCookie?.value;

  // Redirect unauthenticated users from protected routes to sign-in
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Redirect authenticated users from auth pages to dashboard
  if ((pathname === "/sign-in" || pathname === "/sign-up") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
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