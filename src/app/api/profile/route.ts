import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/app/utils/config";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
