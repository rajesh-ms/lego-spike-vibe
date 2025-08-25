import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';
import { CreateMeetingRequest } from '@/types/meetings';

export async function GET() {
  try {
    const result = await executeQuery(`
      SELECT 
        m.*,
        u.display_name as created_by_name
      FROM Meetings m
      LEFT JOIN Users u ON m.created_by = u.id
      ORDER BY m.meeting_date DESC
    `);
    
    return NextResponse.json({ meetings: result.recordset });
  } catch (error) {
    console.error('Error fetching meetings:', error);
    return NextResponse.json({ error: 'Failed to fetch meetings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateMeetingRequest = await request.json();
    
    // For now, assume coach with id 1 is creating (you can add auth later)
    const createdBy = 1;
    
    const result = await executeQuery(`
      INSERT INTO Meetings (title, description, meeting_date, duration_minutes, location, agenda, created_by)
      OUTPUT INSERTED.*
      VALUES (@title, @description, @meeting_date, @duration_minutes, @location, @agenda, @created_by)
    `, {
      title: body.title,
      description: body.description || null,
      meeting_date: new Date(body.meeting_date),
      duration_minutes: body.duration_minutes || 60,
      location: body.location || null,
      agenda: body.agenda || null,
      created_by: createdBy
    });
    
    return NextResponse.json({ meeting: result.recordset[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating meeting:', error);
    return NextResponse.json({ error: 'Failed to create meeting' }, { status: 500 });
  }
}