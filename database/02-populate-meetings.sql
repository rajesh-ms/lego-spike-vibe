-- Populate 12-Week FIRST LEGO League "UNEARTHED" Challenge Curriculum
-- Based on MeetingPlanning.md document

USE LegoVibeDB;
GO

-- Week 1: Kickoff & Team Orientation
INSERT INTO Meetings (title, description, meeting_date, duration_minutes, location, agenda, created_by, status) VALUES
(
  'Session 1: Season Introduction & Field Setup',
  'Introduce the UNEARTHED challenge storyline and objectives. Build the field kit, review Robot Game rules and Core Values, and get the team comfortable working together.',
  DATEADD(day, 0, GETDATE()), -- Start today
  60,
  'Team Meeting Room',
  '• Watch Season Reveal video and discuss archaeology theme
• Review Robot Game Rulebook (2.5-minute match rules, start/launch area)
• Build mission models from Challenge Set
• Core Values Icebreaker: "one-word story" circle
• Each member shares what they''re excited to "discover"',
  1, -- Coach Alex
  'scheduled'
),
(
  'Session 2: Rules, Strategy Brainstorm & Chassis Build',
  'Recap key Robot Game rules and facilitate initial strategy discussion. Build basic SPIKE Prime chassis and start mission brainstorming.',
  DATEADD(day, 3, GETDATE()), -- 3 days later
  60,
  'Team Meeting Room',
  '• Robot Game Rule Review with scenario quizzes
• Mission Strategy Blitz: identify easy vs hard missions
• Build Basic Chassis (differential drive, castor wheel, mounting points)
• Core Values Focus: Inclusion and Teamwork during building
• Create team name and personal goals poster',
  1,
  'scheduled'
);

-- Week 2: Basic Training & Concept Development
INSERT INTO Meetings (title, description, meeting_date, duration_minutes, location, agenda, created_by, status) VALUES
(
  'Session 3: SPIKE Prime Programming 101 & Project Ideas',
  'Robot programming workshop and Innovation Project brainstorming. Learn essential SPIKE Prime coding skills and generate project ideas.',
  DATEADD(day, 7, GETDATE()),
  60,
  'Team Meeting Room',
  '• Finish Robot Build: mount sensors, secure cables
• Basic Coding Drills: drive forward/back, turning, sensor detection
• Practice "move until black line" with color sensor
• Innovation Project Brainstorm: archaeology-themed problems
• Narrow down to 2-3 favorite project ideas',
  1,
  'scheduled'
),
(
  'Session 4: Sensors & Strategy; Pick Project Problem',
  'Advanced sensor programming and strategic decisions. Choose one Innovation Project problem to pursue.',
  DATEADD(day, 10, GETDATE()),
  60,
  'Team Meeting Room',
  '• Advanced Robot Practice: line following, sensor conditionals
• Simple attachment movement with medium motor
• Select ONE project problem via team voting
• Plan Project Research: assign research tasks to members
• Core Values reflection: recognize teammates'' contributions',
  1,
  'scheduled'
);

-- Week 3-4: Attacking Missions & Research Deep Dive
INSERT INTO Meetings (title, description, meeting_date, duration_minutes, location, agenda, created_by, status) VALUES
(
  'Session 5: First Mission Mode & Research Planning',
  'Focus on solving the first robot mission completely and start serious project research.',
  DATEADD(day, 14, GETDATE()),
  60,
  'Team Meeting Room',
  '• Solve First Mission: design attachment, program, test, iterate
• Additional Attachment Brainstorm for other missions
• Project Research Plan: current state of chosen problem
• Research existing solutions and their limitations
• Core Values: Impact through collaborative behavior',
  1,
  'scheduled'
),
(
  'Session 6: Multiple Missions & Ideation of Solution',
  'Extend robot capabilities to more missions and brainstorm innovative project solution.',
  DATEADD(day, 17, GETDATE()),
  60,
  'Team Meeting Room',
  '• Concurrent Mission Work: divide team for parallel mission solving
• Mission Strategy Refinement: group missions by field location
• Innovation Project Solution Definition: creative ideation
• Plan Next Steps: prototype, expert consultation
• Core Values: Innovation and Persistence in problem-solving',
  1,
  'scheduled'
);

-- Week 5-6: Mid-Season Development & Feedback
INSERT INTO Meetings (title, description, meeting_date, duration_minutes, location, agenda, created_by, status) VALUES
(
  'Session 7: Advanced Attachments & Remaining Missions',
  'Tackle complex missions requiring precise mechanisms and advanced programming concepts.',
  DATEADD(day, 21, GETDATE()),
  60,
  'Team Meeting Room',
  '• Complete Mission Portfolio: attempt all remaining missions
• Robot Design Discussion: prepare for judging questions
• Project Prototype Work: build solution mock-up
• Prepare for expert consultation meeting
• Core Values: Inclusion through role rotation',
  1,
  'scheduled'
),
(
  'Session 8: Testing, Feedback & Midpoint Review',
  'Mid-season retrospective with mock Robot Game round and project feedback session.',
  DATEADD(day, 24, GETDATE()),
  60,
  'Team Meeting Room',
  '• Robot Game Mock Round: 2.5-minute timed practice
• Calculate score and identify improvement areas
• Project Feedback session with expert or mentor
• Robot Adjustments: fix critical issues from mock round
• Core Values: Coopertition and graceful feedback acceptance',
  1,
  'scheduled'
);

-- Week 7-8: Iteration and Refinement
INSERT INTO Meetings (title, description, meeting_date, duration_minutes, location, agenda, created_by, status) VALUES
(
  'Session 9: Robot Optimization & Solution Improvements',
  'Focus on optimization and reliability. Implement feedback from mid-season review.',
  DATEADD(day, 28, GETDATE()),
  60,
  'Team Meeting Room',
  '• Refine Mission Solutions: debug weakest missions
• Create My Blocks for repeated code patterns
• Attachment Inventory & Organization with labels
• Project Solution Iteration based on expert feedback
• Outline Presentation structure and roles',
  1,
  'scheduled'
),
(
  'Session 10: Finalizing Robot & Drafting Presentation',
  'Near-final robot state and complete project presentation script drafting.',
  DATEADD(day, 31, GETDATE()),
  60,
  'Team Meeting Room',
  '• Robot Polishing: test all missions individually
• Document Robot Strategy for judging preparation
• Complete Project Presentation Script with speaking parts
• Prototype Final Touches for presentation readiness
• Core Values: preparing for judging evaluation',
  1,
  'scheduled'
);

-- Week 9-10: Practice and Integration
INSERT INTO Meetings (title, description, meeting_date, duration_minutes, location, agenda, created_by, status) VALUES
(
  'Session 11: Full Runs and Presentation Practice',
  'Dress rehearsal for competition with mock judging session.',
  DATEADD(day, 35, GETDATE()),
  60,
  'Team Meeting Room',
  '• Mock Judging - Project Presentation: 5-minute timed run
• Mock Judging - Robot Design & Core Values Q&A
• Feedback and Improvement discussion
• Robot Run Practice: full 2.5-minute mission schedule
• Core Values: Fun and Team Spirit with cheer/handshake',
  1,
  'scheduled'
),
(
  'Session 12: Final Rehearsal and Pep Talk',
  'Last session before competition with final run-throughs and team celebration.',
  DATEADD(day, 38, GETDATE()),
  60,
  'Team Meeting Room',
  '• Polish Presentation: final timed run with delivery focus
• Robot Final Practice: no-stop, competition-realistic runs
• Team Logistics: tournament day planning and packing list
• Core Values: gratitude sharing and teammate appreciation
• Pep Talk: confidence building and Gracious Professionalism',
  1,
  'scheduled'
);

-- Insert predefined learning entry types and session templates
INSERT INTO LearningEntries (meeting_id, user_id, entry_type, title, content) VALUES
(1, 1, 'note', 'Session Planning Template', 'Session 1 Focus Areas:
- Challenge Exploration: Understanding archaeology theme
- Field Setup: Building mission models collaboratively  
- Team Building: Core values icebreaker activities
- Discovery: What each member wants to explore this season

Expected Outcomes:
- Completed field setup with all mission models
- Team excitement about UNEARTHED theme
- Initial mission identification and goal understanding'),

(2, 1, 'note', 'Session Planning Template', 'Session 2 Focus Areas:
- Rules Mastery: Scoring, penalties, game constraints
- Strategy Development: Easy vs hard mission identification
- Robot Foundation: Basic chassis construction
- Team Identity: Name, roles, and collaboration

Expected Outcomes:
- Functional base robot chassis
- Initial mission priority list
- Team name and member goal commitments'),

(3, 1, 'note', 'Session Planning Template', 'Session 3 Focus Areas:
- Programming Skills: Basic movement and sensor use
- Project Ideation: Archaeology problem brainstorming
- Technical Foundation: Color sensor line detection
- Research Planning: Problem investigation assignments

Expected Outcomes:
- Robot capable of basic movements and sensor detection
- 2-3 prioritized Innovation Project ideas
- Research task assignments for team members');

-- Add achievement tracking entries for major milestones
INSERT INTO LearningEntries (meeting_id, user_id, entry_type, title, content) VALUES
(5, 3, 'achievement', 'First Mission Completed!', 'Successfully solved our first robot mission today. The attachment works reliably and our code drives accurately to the target. Team collaboration was excellent during the debugging process.'),
(8, 4, 'reflection', 'Mid-Season Learning', 'Our robot scored 120 points in the mock round. I learned that consistent alignment is crucial for mission success. The project feedback helped us refine our solution concept.'),
(12, 5, 'goal', 'Competition Readiness', 'Goal for tournament: Execute our presentation confidently, support teammates during robot runs, and demonstrate Gracious Professionalism with other teams.');