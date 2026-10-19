import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE, sessionToken } from "@/lib/auth";

// Public: the homepage, the join pages and the login page.
// Everything else (the dashboard, and the /q partner pages until real partners
// are signed up) needs the session cookie.
function isPublic(pathname: string) {
  return (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/join" ||
    pathname.startsWith("/join/") ||
    pathname === "/icon.svg" ||
    pathname.startsWith("/brand/")
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublic(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE)?.value;
  if (token && token === (await sessionToken())) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.search = "";
  if (pathname !== "/") {
    loginUrl.searchParams.set("next", pathname);
  }
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
