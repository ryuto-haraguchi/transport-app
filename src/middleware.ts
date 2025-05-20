import { auth } from "@/auth";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|signup|images).*)"],
};

export default auth((req) => {
  const isLoginPage = req.nextUrl.pathname === "/auth/login";
  const isSignupPage = req.nextUrl.pathname === "/auth/signup";
  const isAuthenticated = !!req.auth;

  if (!isAuthenticated && !isLoginPage && !isSignupPage) {
    return Response.redirect(new URL("/auth/login", req.nextUrl.origin));
  }

  if (isAuthenticated && isLoginPage) {
    return Response.redirect(new URL("/", req.nextUrl.origin));
  }

  return;
});
