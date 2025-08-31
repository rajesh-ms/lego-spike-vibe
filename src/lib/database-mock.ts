// Mock database for local development without Azure SQL
// This will be used when Azure SQL credentials are not available

import { DbResult, QueryInputs } from './db-types';

// Mock data for testing
const mockUsers = [
  { id: 1, username: 'coach_alex', display_name: 'Coach Alex', role: 'coach', email: 'alex@legoteam.com', created_at: new Date(), is_active: true },
  { id: 2, username: 'coach_sam', display_name: 'Coach Sam', role: 'coach', email: 'sam@legoteam.com', created_at: new Date(), is_active: true },
  { id: 3, username: 'emma_builder', display_name: 'Emma Thompson', role: 'kid', email: 'emma@student.com', created_at: new Date(), is_active: true },
  { id: 4, username: 'liam_coder', display_name: 'Liam Johnson', role: 'kid', email: 'liam@student.com', created_at: new Date(), is_active: true },
  { id: 5, username: 'sophia_designer', display_name: 'Sophia Davis', role: 'kid', email: 'sophia@student.com', created_at: new Date(), is_active: true },
  { id: 6, username: 'noah_engineer', display_name: 'Noah Wilson', role: 'kid', email: 'noah@student.com', created_at: new Date(), is_active: true },
  { id: 7, username: 'ava_programmer', display_name: 'Ava Brown', role: 'kid', email: 'ava@student.com', created_at: new Date(), is_active: true },
  { id: 8, username: 'mason_robotics', display_name: 'Mason Miller', role: 'kid', email: 'mason@student.com', created_at: new Date(), is_active: true },
  { id: 9, username: 'zoe_innovator', display_name: 'Zoe Garcia', role: 'kid', email: 'zoe@student.com', created_at: new Date(), is_active: true }
];

const mockMeetings = [
  {
    id: 1,
    title: 'Session 1: Season Introduction & Field Setup',
    description: 'Introduce the UNEARTHED challenge storyline and objectives. Build the field kit, review Robot Game rules and Core Values, and get the team comfortable working together.',
    meeting_date: new Date(),
    duration_minutes: 60,
    location: 'Team Meeting Room',
    agenda: `• Watch Season Reveal video and discuss archaeology theme
• Review Robot Game Rulebook (2.5-minute match rules, start/launch area)
• Build mission models from Challenge Set
• Core Values Icebreaker: "one-word story" circle
• Each member shares what they're excited to "discover"`,
    created_by: 1,
    created_at: new Date(),
    status: 'scheduled',
    created_by_name: 'Coach Alex'
  },
  {
    id: 2,
    title: 'Session 2: Rules, Strategy Brainstorm & Chassis Build',
    description: 'Recap key Robot Game rules and facilitate initial strategy discussion. Build basic SPIKE Prime chassis and start mission brainstorming.',
    meeting_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    duration_minutes: 60,
    location: 'Team Meeting Room',
    agenda: `• Robot Game Rule Review with scenario quizzes
• Mission Strategy Blitz: identify easy vs hard missions
• Build Basic Chassis (differential drive, castor wheel, mounting points)
• Core Values Focus: Inclusion and Teamwork during building
• Create team name and personal goals poster`,
    created_by: 1,
    created_at: new Date(),
    status: 'scheduled',
    created_by_name: 'Coach Alex'
  },
  {
    id: 3,
    title: 'Session 3: SPIKE Prime Programming 101 & Project Ideas',
    description: 'Robot programming workshop and Innovation Project brainstorming. Learn essential SPIKE Prime coding skills and generate project ideas.',
    meeting_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    duration_minutes: 60,
    location: 'Team Meeting Room',
    agenda: `• Finish Robot Build: mount sensors, secure cables
• Basic Coding Drills: drive forward/back, turning, sensor detection
• Practice "move until black line" with color sensor
• Innovation Project Brainstorm: archaeology-themed problems
• Narrow down to 2-3 favorite project ideas`,
    created_by: 1,
    created_at: new Date(),
    status: 'scheduled',
    created_by_name: 'Coach Alex'
  }
];

const mockLearningEntries = [
  {
    id: 1,
    meeting_id: 1,
    user_id: 3,
    entry_type: 'reflection',
    title: 'First Session Thoughts',
    content: 'I\'m excited about the archaeology theme! Building the mission models was fun and I can already see some strategies for solving them.',
    created_at: new Date(),
    updated_at: new Date(),
    user_name: 'Emma Thompson',
    user_role: 'kid'
  },
  {
    id: 2,
    meeting_id: 1,
    user_id: 1,
    entry_type: 'note',
    title: 'Session Planning Template',
    content: `Session 1 Focus Areas:
- Challenge Exploration: Understanding archaeology theme
- Field Setup: Building mission models collaboratively  
- Team Building: Core values icebreaker activities
- Discovery: What each member wants to explore this season

Expected Outcomes:
- Completed field setup with all mission models
- Team excitement about UNEARTHED theme
- Initial mission identification and goal understanding`,
    created_at: new Date(),
    updated_at: new Date(),
    user_name: 'Coach Alex',
    user_role: 'coach'
  }
];

export async function executeQuery(query: string, inputs?: QueryInputs): Promise<DbResult> {
  // Simple mock query parsing
  if (query.includes('FROM Users') || query.includes('FROM users')) {
    return { recordset: mockUsers };
  }
  
  if (query.includes('FROM Meetings') || query.includes('FROM meetings')) {
    return { recordset: mockMeetings };
  }
  
  if (query.includes('FROM LearningEntries') || query.includes('FROM learning_entries')) {
    let entries = mockLearningEntries;
    
    // Filter by meeting_id if provided
  if (inputs?.meeting_id) {
      entries = entries.filter(entry => entry.meeting_id === inputs.meeting_id);
    }
    
    // Filter by user_id if provided
  if (inputs?.user_id) {
      entries = entries.filter(entry => entry.user_id === inputs.user_id);
    }
    
    return { recordset: entries };
  }
  
  // For INSERT/UPDATE queries, simulate success
  if (query.includes('INSERT') || query.includes('UPDATE')) {
  const newId = Math.floor(Math.random() * 1000) + 100;
    
    if (query.includes('Meetings')) {
      const newMeeting = {
        id: newId,
        title: inputs?.title || 'New Meeting',
        description: inputs?.description || '',
        meeting_date: inputs?.meeting_date || new Date(),
        duration_minutes: inputs?.duration_minutes || 60,
        location: inputs?.location || '',
        agenda: inputs?.agenda || '',
        created_by: inputs?.created_by || 1,
        created_at: new Date(),
        status: inputs?.status || 'scheduled',
        created_by_name: mockUsers.find(u => u.id === (inputs?.created_by || 1))?.display_name || 'Coach Gopi'
      };
      mockMeetings.push(newMeeting);
      return { recordset: [newMeeting] };
    }    if (query.includes('LearningEntries')) {
  const newEntry = {
        id: newId,
        meeting_id: inputs?.meeting_id || 1,
        user_id: inputs?.user_id || 1,
        entry_type: inputs?.entry_type || 'note',
        title: inputs?.title || '',
        content: inputs?.content || '',
        created_at: new Date(),
        updated_at: new Date(),
        user_name: mockUsers.find(u => u.id === inputs?.user_id)?.display_name || 'Unknown User',
        user_role: mockUsers.find(u => u.id === inputs?.user_id)?.role || 'kid'
      };
      mockLearningEntries.push(newEntry);
      return { recordset: [newEntry] };
    }
  }
  
  return { recordset: [] };
}

export async function executeProcedure(procedureName: string, inputs?: QueryInputs): Promise<DbResult> {
  console.log(`Mock procedure call: ${procedureName}`, inputs);
  return { recordset: [] };
}

export async function getDatabase() {
  return {};
}

export async function closeDatabase() {
  return;
}