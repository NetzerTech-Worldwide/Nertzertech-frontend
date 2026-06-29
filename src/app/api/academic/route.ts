import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Academic API proxy",
    endpoints: ["/api/academic/subjects", "/api/academic/roadmap"],
  });
}
