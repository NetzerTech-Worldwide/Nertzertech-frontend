// src/app/api/attendance/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/app/utils/config";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const token = request.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  // Reconstruct the path e.g. ["overview"] or ["calendar"]
  const path = params.path.join("/");

  // Forward all query params as-is
  const { searchParams } = new URL(request.url);

  const res = await fetch(
    `${BASE_URL}/attendance/${path}?${searchParams}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  if (!res.ok) return NextResponse.json(data, { status: res.status });
  return NextResponse.json(data);
}