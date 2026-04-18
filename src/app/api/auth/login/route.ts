import { NextResponse } from 'next/server';

import { BASE_URL } from "../../../utils/config";

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(`${BASE_URL}/auth/login/student/secondary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) return NextResponse.json({ message: data.message }, { status: res.status });

  const response = NextResponse.json({ 
    success: true,
    mustChangePassword: data.mustChangePassword,
    user: data.user
  });
  
  response.cookies.set('token', data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });

  return response;
}