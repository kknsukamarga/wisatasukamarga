import { NextResponse } from "next/server";
import { auth } from "./auth";
import { apiAuthPrefix, authRoutes, publicRoutes } from "./routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  // Check if the route is public using wildcard logic
  const isPublicRoute =
    publicRoutes.some((route) =>
      route.includes("*")
        ? new RegExp(`^${route.replace("*", ".*")}$`).test(nextUrl.pathname)
        : nextUrl.pathname === route
    ) ||
    nextUrl.pathname === "/blog/semua" ||
    nextUrl.pathname === "/umkm/semua";

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
