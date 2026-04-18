// src/app/api/attendance/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/app/utils/config";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const token = request.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { path: pathSegments } = await params;
  const path = pathSegments.join("/");

  const { searchParams } = new URL(request.url);

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}/attendance/${path}?${searchParams}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Upstream service unavailable" },
      { status: 502 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}