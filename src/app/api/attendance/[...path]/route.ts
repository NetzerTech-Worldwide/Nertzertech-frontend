// src/app/api/attendance/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/app/utils/config";

type AttendanceRouteContext = {
  params: Promise<{ path: string[] }>;
};

async function proxyAttendanceRequest(
  request: NextRequest,
  { params }: AttendanceRouteContext
) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { path: pathSegments } = await params;
  const path = pathSegments.map((segment) => encodeURIComponent(segment)).join("/");
  const { search } = new URL(request.url);

  let body: BodyInit | undefined;
  if (!["GET", "HEAD"].includes(request.method)) {
    body = await request.text();
  }

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}/attendance/${path}${search}`, {
      method: request.method,
      headers: {
        "Content-Type": request.headers.get("content-type") ?? "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { message: "Upstream service unavailable" },
      { status: 502 }
    );
  }

  const data = await res.json().catch(() => null);
  return NextResponse.json(data, { status: res.status });
}

export async function GET(request: NextRequest, context: AttendanceRouteContext) {
  return proxyAttendanceRequest(request, context);
}

export async function POST(request: NextRequest, context: AttendanceRouteContext) {
  return proxyAttendanceRequest(request, context);
}

export async function PATCH(request: NextRequest, context: AttendanceRouteContext) {
  return proxyAttendanceRequest(request, context);
}

export async function DELETE(request: NextRequest, context: AttendanceRouteContext) {
  return proxyAttendanceRequest(request, context);
}
