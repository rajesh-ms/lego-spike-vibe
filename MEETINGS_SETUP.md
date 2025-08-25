# 12-Week FLL UNEARTHED Season Management System

## Overview
The comprehensive meetings management system for FIRST LEGO League teams includes:
- **12-Week Structured Curriculum**: Complete UNEARTHED season plan with 24 sessions
- **Phase-Based Learning**: Foundation, Intensive Development, Refinement, and Competition Prep
- **Team Learning Tracking**: Individual and team progress documentation
- **Session Management**: Detailed agendas, outcomes, and structured note-taking
- **Azure SQL Database**: Secure cloud storage for all team data

## Database Setup

### 1. Create Azure SQL Database
1. Go to Azure Portal
2. Create a new SQL Database resource
3. Choose Basic or Standard tier for small teams
4. Note the server name, database name, username, and password

### 2. Run Database Schema
Execute the SQL scripts in the `/database/` folder:
1. **schema.sql**: Creates the core database structure
   - **Users table**: 7 kids + 2 coaches with roles
   - **Meetings table**: Meeting details and scheduling
   - **LearningEntries table**: Individual learning records
   - **MeetingAttendance table**: Attendance tracking

2. **populate-meetings.sql**: Loads the complete 12-week curriculum
   - All 24 sessions with detailed agendas
   - Session templates and learning frameworks
   - Week-by-week progression tracking

### 3. Environment Configuration
1. Copy `.env.example` to `.env.local`
2. Update with your Azure SQL connection details:
```
AZURE_SQL_SERVER=your-server.database.windows.net
AZURE_SQL_DATABASE=lego-vibe-db
AZURE_SQL_USERNAME=your-username
AZURE_SQL_PASSWORD=your-password
```

## Features

### 12-Week Curriculum Structure
**Phase 1: Foundation & Exploration (Weeks 1-2)**
- Season introduction and field setup
- Basic robot programming and concept development
- Team building and core values integration

**Phase 2: Intensive Development (Weeks 3-6)**
- Mission strategy and robot solutions
- Innovation project research and ideation
- Mid-season feedback and assessment

**Phase 3: Refinement (Weeks 7-8)**
- Robot optimization and reliability testing
- Project solution development and presentation prep
- Competitive practice sessions

**Phase 4: Competition Prep (Weeks 9-12)**
- Mock judging sessions and full rehearsals
- Team logistics and confidence building
- Tournament participation and reflection

### Enhanced Session Management
- **Structured Agendas**: Detailed session plans with specific outcomes
- **Progress Tracking**: Week-by-week advancement monitoring
- **Phase Indicators**: Visual progress through curriculum phases
- **Session Notes**: Comprehensive documentation system with:
  - Attendance tracking for all team members
  - Objectives met and achievements recorded
  - Challenges faced and solutions implemented
  - Next steps planning and homework assignments
  - Coach observations and team reflections

### Advanced Learning Documentation
**5 Types of Learning Entries:**
1. **Reflection**: Personal insights and thought processes
2. **Goal**: Individual and team objectives
3. **Achievement**: Accomplishments and milestones
4. **Challenge**: Problems faced and problem-solving approaches
5. **Note**: General observations, ideas, and session summaries

**Structured Session Notes Include:**
- Real-time attendance tracking
- Objectives completion checklist
- Achievement highlights
- Challenge documentation
- Action items and follow-up tasks
- Materials and resources used
- Coach observations and insights
- Team reflection and feedback

### Team Members (Pre-configured)
**Coaches:**
- Coach Alex (alex@legoteam.com)
- Coach Sam (sam@legoteam.com)

**Kids:**
- Emma Thompson (emma@student.com)
- Liam Johnson (liam@student.com)
- Sophia Davis (sophia@student.com)
- Noah Wilson (noah@student.com)
- Ava Brown (ava@student.com)
- Mason Miller (mason@student.com)
- Zoe Garcia (zoe@student.com)

## API Endpoints

### Meetings
- `GET /api/meetings` - List all meetings
- `POST /api/meetings` - Create new meeting
- `GET /api/meetings/[id]` - Get specific meeting
- `PUT /api/meetings/[id]` - Update meeting

### Users
- `GET /api/users` - List all users

### Learning Entries
- `GET /api/learning-entries?meeting_id=X` - Get entries for meeting
- `GET /api/learning-entries?user_id=X` - Get entries by user
- `POST /api/learning-entries` - Create new entry

## Usage

### Accessing the Meetings Section
1. Navigate to `/meetings` in the application
2. Use the "Meetings" link in the navigation bar

### Creating a Meeting
1. Click "New Meeting" button
2. Fill in meeting details:
   - Title (required)
   - Description
   - Date & Time (required)
   - Duration in minutes
   - Location
   - Agenda

### Adding Learning Entries
1. Select a meeting from the list
2. Click "Add Learning Entry"
3. Choose the user writing the entry
4. Select entry type (reflection, goal, achievement, challenge, note)
5. Add title (optional) and content (required)
6. Save the entry

### Learning Entry Tips
- Be specific about programming, robot design, or teamwork experiences
- Include details about challenges to help others learn
- Share achievements to celebrate progress
- Set clear, achievable goals

## Technical Implementation

### Database Connection
- Uses `mssql` package for Azure SQL connectivity
- Connection pooling for performance
- Encrypted connections for security

### Frontend Components
- **MeetingsPage**: Main meetings management interface
- **CreateMeetingModal**: Form for creating new meetings
- **LearningEntryModal**: Form for adding learning entries

### Data Types
- Full TypeScript interfaces for type safety
- Proper date handling for meetings
- User role validation (kid/coach)

## Security Considerations
- Database connections use encryption
- Input validation on all forms
- Parameterized queries prevent SQL injection
- User role-based access control ready for implementation

## Future Enhancements
- User authentication system
- Meeting attendance marking
- Export learning entries to PDF/Word
- Email notifications for meetings
- Photo/video attachments to entries
- Progress tracking and analytics