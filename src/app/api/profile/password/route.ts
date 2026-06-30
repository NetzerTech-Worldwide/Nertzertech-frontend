import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/app/utils/config";

export async function PATCH(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.text();

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}/profile/password`, {
      method: "PATCH",
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

  const text = await res.text();

  if (!text) {
    return new NextResponse(null, { status: res.status });
  }

  try {
    return NextResponse.json(JSON.parse(text), { status: res.status });
  } catch {
    return new NextResponse(text, { status: res.status });
  }
}
