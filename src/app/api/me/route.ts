import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BASE_URL } from "../../utils/config";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    console.log("Token:", token);

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const res = await fetch(`${BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await res.text();

    console.log("Backend status:", res.status);
    console.log("Backend response:", body);

    if (!res.ok) {
      return NextResponse.json(
        {
          status: res.status,
          backendResponse: body,
        },
        { status: res.status }
      );
    }

    return NextResponse.json({
      user: JSON.parse(body),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: String(error),
      },
      { status: 500 }
    );
  }
}