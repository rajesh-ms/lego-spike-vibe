export interface User {
  id: number;
  username: string;
  display_name: string;
  role: 'kid' | 'coach';
  email?: string;
  created_at: Date;
  is_active: boolean;
}

export interface Meeting {
  id: number;
  title: string;
  description?: string;
  meeting_date: Date;
  duration_minutes: number;
  location?: string;
  agenda?: string;
  created_by: number;
  created_at: Date;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

export interface LearningEntry {
  id: number;
  meeting_id: number;
  user_id: number;
  entry_type: 'reflection' | 'goal' | 'achievement' | 'challenge' | 'note';
  title?: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export interface MeetingAttendance {
  id: number;
  meeting_id: number;
  user_id: number;
  attended: boolean;
  marked_at: Date;
}

export interface CreateMeetingRequest {
  title: string;
  description?: string;
  meeting_date: string;
  duration_minutes?: number;
  location?: string;
  agenda?: string;
}

export interface CreateLearningEntryRequest {
  meeting_id: number;
  entry_type: 'reflection' | 'goal' | 'achievement' | 'challenge' | 'note';
  title?: string;
  content: string;
}