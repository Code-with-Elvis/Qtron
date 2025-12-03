import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // === Redirect authenticated users away from auth pages ===
    if (path === "/signin" || path === "/signup") {
      if (token) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // === Admin routes - only accessible by admin ===
    if (path.startsWith("/admin")) {
      if (token?.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // === Seller routes - accessible by admin and seller ===
    if (path.startsWith("/seller")) {
      if (token?.role !== "seller" && token?.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // === Profile/account routes - require authentication ===
    if (path.startsWith("/profile") || path.startsWith("/orders")) {
      if (!token) {
        return NextResponse.redirect(new URL("/signin", req.url));
      }
    }

    return NextResponse.next();
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
    "/signin",
    "/signup",
  ],
};
