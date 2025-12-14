import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Handle locale from URL search params for next-intl
    const { searchParams } = req.nextUrl;
    const lang = searchParams.get("lang") || "en";

    const response = NextResponse.next();
    response.headers.set("x-locale", lang);

    // === Redirect authenticated users away from auth pages ===
    if (path === "/signin" || path === "/signup") {
      if (token) {
        const redirectUrl = new URL("/", req.url);
        if (lang !== "en") redirectUrl.searchParams.set("lang", lang);
        return NextResponse.redirect(redirectUrl);
      }
    }

    // === Admin routes - only accessible by admin ===
    if (path.startsWith("/admin")) {
      if (token?.role !== "admin") {
        const redirectUrl = new URL("/", req.url);
        if (lang !== "en") redirectUrl.searchParams.set("lang", lang);
        return NextResponse.redirect(redirectUrl);
      }
    }

    // === Seller routes - accessible by admin and seller ===
    if (path.startsWith("/seller")) {
      if (token?.role !== "seller" && token?.role !== "admin") {
        const redirectUrl = new URL("/", req.url);
        if (lang !== "en") redirectUrl.searchParams.set("lang", lang);
        return NextResponse.redirect(redirectUrl);
      }
    }

    // === Profile/account routes - require authentication ===
    if (
      path.startsWith("/profile") ||
      path.startsWith("/orders") ||
      path.startsWith("/history")
    ) {
      if (!token) {
        const redirectUrl = new URL("/signin", req.url);
        if (lang !== "en") redirectUrl.searchParams.set("lang", lang);
        return NextResponse.redirect(redirectUrl);
      }
    }

    return response;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // === Public routes that don't require authentication ===
        const publicRoutes = [
          "/",
          "/products",
          "/about",
          "/contact",
          "/terms",
          "/privacy",
        ];

        // === Allow public routes ===
        if (publicRoutes.some((route) => path.startsWith(route))) {
          return true;
        }

        // === Auth pages - allow access (middleware will handle redirect) ===
        if (path === "/signin" || path === "/signup") {
          return true;
        }

        // === All other routes require token ===
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/seller/:path*",
    "/profile/:path*",
    "/orders/:path*",
    "/checkout/:path*",
    "/history/:path*",
    "/signin",
    "/signup",
  ],
};
