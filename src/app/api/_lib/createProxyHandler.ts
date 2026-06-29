import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/app/utils/config";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

export function createProxyHandler(upstreamSegment: string) {
  return async function proxyRequest(request: NextRequest, { params }: RouteContext) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { path } = await params;
    const subPath = path.map((segment) => encodeURIComponent(segment)).join("/");
    const { search } = new URL(request.url);

    let body: BodyInit | undefined;
    if (!["GET", "HEAD"].includes(request.method)) {
      body = await request.text();
    }

    let res: Response;
    try {
      res = await fetch(`${BASE_URL}/${upstreamSegment}/${subPath}${search}`, {
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

    return handleResponse(res);
  };
}

async function handleResponse(res: Response) {
  const text = await res.text();

  if (!text) {
    return new NextResponse(null, { status: res.status });
  }

  try {
    const data = JSON.parse(text);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return new NextResponse(text, { status: res.status });
  }
}