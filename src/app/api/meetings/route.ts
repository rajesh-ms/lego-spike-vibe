import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';

interface CreateMeetingRequest {
  title: string;
  description?: string;
  meeting_date: Date;
  duration_minutes: number;
  location?: string;
  agenda?: string;
  created_by: number;
}

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

    // Basic validation
    if (!body?.title || !body?.meeting_date) {
      return NextResponse.json(
        { error: 'Missing required fields: title and meeting_date' },
        { status: 400 }
      );
    }

    const meetingDate = new Date(body.meeting_date);
    if (isNaN(meetingDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid meeting_date' },
        { status: 400 }
      );
    }

  // Optionally associate creator in the future via auth; keep nullable to avoid FK issues
  const createdBy: number | null = null;

  const result = await executeQuery(
      `
      INSERT INTO Meetings (title, description, meeting_date, duration_minutes, location, agenda, created_by, status)
      OUTPUT INSERTED.*
      VALUES (@title, @description, @meeting_date, @duration_minutes, @location, @agenda, @created_by, @status)
    `,
      {
        title: body.title,
        description: body.description ?? null,
        meeting_date: meetingDate,
        duration_minutes: body.duration_minutes ?? 60,
        location: body.location ?? null,
        agenda: body.agenda ?? null,
  created_by: createdBy,
        status: 'scheduled',
      }
    );

  const recs = (result as { recordset: unknown[] }).recordset;
  return NextResponse.json({ meeting: recs[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating meeting:', error);
    return NextResponse.json({ error: 'Failed to create meeting' }, { status: 500 });
  }
}