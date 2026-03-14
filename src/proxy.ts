// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Allow login page
  if (pathname.startsWith("/schools/secondarySchool/student/login")) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(
      new URL("/schools/secondarySchool/student/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/schools/secondarySchool/student/:path*"],
};