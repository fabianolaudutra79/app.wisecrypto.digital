import { getDatabaseClient } from '@/lib/db';
import bcrypt from 'bcrypt';
import {NextResponse} from 'next/server';

export async function POST(request: Request) {
  const { username, email, password } = await request.json();

  const client = getDatabaseClient();

  try {
    await client.connect();

    const hashedPassword = await bcrypt.hash(password, 10);

    await client.query(
      `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      ON CONFLICT (email) DO NOTHING;
    `,
      [username, email, hashedPassword]
    );

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Registration failed' }, { status: 500 });
  } finally {
    await client.end();
  }
}

