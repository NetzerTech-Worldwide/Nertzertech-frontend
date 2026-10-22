// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOGIN_PATH = "/schools/secondarySchool/student/login";
const DASHBOARD_PATH = "/schools/secondarySchool/student/dashboard";

// Reachable without a token (forgot/reset password are used while logged out)
const PUBLIC_PATHS = [
  LOGIN_PATH,
  "/schools/secondarySchool/student/forgetPassword",
  "/schools/secondarySchool/student/resetPassword",
];

function matches(pathname: string, path: string) {
  return pathname === path || pathname.startsWith(path + "/");
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (matches(pathname, LOGIN_PATH) && token) {
    return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url));
  }

  if (PUBLIC_PATHS.some((path) => matches(pathname, path))) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/schools/secondarySchool/student/:path*"],
};
