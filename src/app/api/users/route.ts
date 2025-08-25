import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';

export async function GET() {
  try {
    const result = await executeQuery(`
      SELECT id, username, display_name, role, email, created_at, is_active
      FROM Users 
      WHERE is_active = 1
      ORDER BY role DESC, display_name
    `);
    
    return NextResponse.json({ users: result.recordset });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}