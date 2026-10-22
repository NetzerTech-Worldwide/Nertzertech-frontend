// src/app/api/examination/[[...path]]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/app/utils/config";

type Context = { params: Promise<{ path?: string[] }> };

async function proxy(request: NextRequest, { params }: Context) {
  const token = request.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { path: pathSegments = [] } = await params;
  const path = pathSegments.length ? `/${pathSegments.join("/")}` : "";

  const { searchParams } = new URL(request.url);
  const body = request.method === "GET" ? undefined : await request.text();

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}/examination${path}?${searchParams}`, {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
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

export { proxy as GET, proxy as POST };
