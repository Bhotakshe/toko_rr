import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Simulated database - replace with your actual database
let profiles: Record<string, any> = {};

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userProfile = profiles[session.user.email] || {
    name: session.user.name || '',
    email: session.user.email,
    phone: '',
    address: '',
    birthDate: '',
    gender: '',
    photo: session.user.image || null,
  };

  return NextResponse.json(userProfile);
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    
    // Update the profile in our simulated database
    profiles[session.user.email] = {
      ...profiles[session.user.email],
      ...data,
    };

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
} 