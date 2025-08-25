import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const meetingId = parseInt(params.id);
    
    const result = await executeQuery(`
      SELECT 
        m.*,
        u.display_name as created_by_name
      FROM Meetings m
      LEFT JOIN Users u ON m.created_by = u.id
      WHERE m.id = @id
    `, { id: meetingId });
    
    if (result.recordset.length === 0) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }
    
    return NextResponse.json({ meeting: result.recordset[0] });
  } catch (error) {
    console.error('Error fetching meeting:', error);
    return NextResponse.json({ error: 'Failed to fetch meeting' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const meetingId = parseInt(params.id);
    const body = await request.json();
    
    const result = await executeQuery(`
      UPDATE Meetings 
      SET 
        title = @title,
        description = @description,
        meeting_date = @meeting_date,
        duration_minutes = @duration_minutes,
        location = @location,
        agenda = @agenda,
        status = @status
      OUTPUT INSERTED.*
      WHERE id = @id
    `, {
      id: meetingId,
      title: body.title,
      description: body.description || null,
      meeting_date: new Date(body.meeting_date),
      duration_minutes: body.duration_minutes || 60,
      location: body.location || null,
      agenda: body.agenda || null,
      status: body.status || 'scheduled'
    });
    
    if (result.recordset.length === 0) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }
    
    return NextResponse.json({ meeting: result.recordset[0] });
  } catch (error) {
    console.error('Error updating meeting:', error);
    return NextResponse.json({ error: 'Failed to update meeting' }, { status: 500 });
  }
}