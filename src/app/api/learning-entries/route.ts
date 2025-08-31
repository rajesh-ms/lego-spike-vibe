import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';

interface CreateLearningEntryRequest {
  meeting_id: number;
  entry_type: 'reflection' | 'goal' | 'achievement' | 'challenge' | 'note';
  title?: string;
  content: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const meetingId = searchParams.get('meeting_id');
    const userId = searchParams.get('user_id');
    
    let query = `
      SELECT 
        le.*,
        u.display_name as user_name,
        u.role as user_role
      FROM LearningEntries le
      LEFT JOIN Users u ON le.user_id = u.id
      WHERE 1=1
    `;
    
    const params: Record<string, unknown> = {};
    
    if (meetingId) {
      query += ' AND le.meeting_id = @meeting_id';
      params.meeting_id = parseInt(meetingId);
    }
    
    if (userId) {
      query += ' AND le.user_id = @user_id';
      params.user_id = parseInt(userId);
    }
    
    query += ' ORDER BY le.created_at DESC';
    
    const result = await executeQuery(query, params);
    
    return NextResponse.json({ entries: result.recordset });
  } catch (error) {
    console.error('Error fetching learning entries:', error);
    return NextResponse.json({ error: 'Failed to fetch learning entries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateLearningEntryRequest & { user_id?: number } = await request.json();
    
    // TODO: Get user ID from authentication
    const userId = body.user_id || 3;
    
    const result = await executeQuery(`
      INSERT INTO LearningEntries (meeting_id, user_id, entry_type, title, content)
      OUTPUT INSERTED.*
      VALUES (@meeting_id, @user_id, @entry_type, @title, @content)
    `, {
      meeting_id: body.meeting_id,
      user_id: userId,
      entry_type: body.entry_type,
      title: body.title || undefined,
      content: body.content
    });
    
    return NextResponse.json({ learning_entry: result.recordset[0] });
  } catch (error) {
    console.error('Error creating learning entry:', error);
    return NextResponse.json({ error: 'Failed to create learning entry' }, { status: 500 });
  }
}