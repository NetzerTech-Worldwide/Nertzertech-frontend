import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { BASE_URL } from '../../utils/config';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Call the backend profile endpoint with the token
    const res = await fetch(`${BASE_URL}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: 'Failed to fetch profile' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ user: data });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
