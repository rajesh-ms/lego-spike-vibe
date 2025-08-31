-- Populate 12-Week FIRST LEGO League "UNEARTHED" Challenge Curriculum
-- Enhanced to align with Official FLL Team Meeting Guide structure
-- 
-- KEY ALIGNMENTS WITH OFFICIAL FLL GUIDE:
-- Sessions 1-4: Foundation phase with "Training Camp" methodology
-- Sessions 5-8: Development phase with systematic mission and project work  
-- Sessions 9-12: Refinement phase with mock judging and competition prep
--
-- OFFICIAL GUIDE ELEMENTS INTEGRATED:
-- • Training Camp 1-3: Structured programming progression (driving, lines, objects)
-- • Project Sparks: Official inspiration prompts for Innovation Project
-- • My Blocks: Custom programming functions for repeated tasks
-- • Expert Consultation: Subject matter expert integration throughout
-- • Engineering Notebook: Documentation emphasis from Session 1
-- • Mock Judging: Project, Robot Design, and Core Values practice
-- • Coopertition®: Sharing knowledge and gracious professionalism
-- • 2.5-minute Robot Game: Official timing and scoring practice
--
-- Based on MeetingPlanning.md document - Two meetings per week: Innovation Project & Robot Mission Challenge

USE LegoVibeDB;
GO

-- Week 1: Kickoff & Team Orientation
INSERT INTO Meetings (title, description, meeting_date, duration_minutes, location, agenda, created_by, status) VALUES
(
  'Week 1 Session 1: UNEARTHED Theme & Innovation Project Exploration',
  'Introduce the UNEARTHED challenge storyline and objectives. Build the field kit, review Robot Game rules and Core Values, and get the team comfortable working together. Based on Official FLL Team Meeting Guide Session 1.',
  DATEADD(day, 0, GETDATE()), -- Start today
  60,
  'Team Meeting Room',
  'Innovation Project Focus (Official FLL Guide Alignment):
• Challenge Exploration: Understanding archaeology theme and "Project Sparks" (inspiration prompts)
• Team Building: Core values icebreaker activities - "What hidden treasures or stories might FLL be focusing on?"
• Project Brainstorm Prep: Identify real-world archaeology problems and challenges
• Engineering Notebook Setup: Begin documentation process

Robot Mission Challenge Focus:
• Watch Season Reveal video and discuss archaeology theme
• Review Robot Game Rulebook (2.5-minute match rules, start/launch area, penalties)
• Build Mission Models: Divide kits among team members (2-3 kids per model)
• Mission Identification: Learn mission names (Angler Artifacts, Statue Rebuild, Silo, etc.)
• Field Setup: Build and attach mission models to mat in proper locations
• Core Values Icebreaker: "one-word story" circle about archaeological dig
• Mission Rules Preview: Understand what robot is expected to do for each mission',
  1, -- Coach Gopi
  'scheduled'
),
(
  'Week 1 Session 2: Tutorial Activities & Training Camp 1',
  'Recap key Robot Game rules and facilitate initial strategy discussion. Build basic SPIKE Prime chassis and start mission brainstorming. Based on Official FLL Team Meeting Guide Session 2.',
  DATEADD(day, 3, GETDATE()), -- 3 days later
  60,
  'Team Meeting Room',
  'Innovation Project Focus (Official FLL Guide Alignment):
• Explore Project Sparks: Review official inspiration prompts from challenge documents
• Create team identity: team name and personal goals poster
• Initial project problem identification with archaeology focus
• Core Values Focus: Inclusion and Teamwork during collaborative activities

Robot Mission Challenge Focus:
• Training Camp 1 - "Driving Around": Basic robot movement programming
• Robot Game Rule Review: point values, penalties, precision tokens, updates
• Mission Strategy Blitz: identify "low-hanging fruit" vs complex missions
• Build Basic Chassis: Use proven design like "Coop Bot" or similar modular base
• Scenario quizzes for rule understanding ("What happens if robot touches model outside Base?")
• Initial mission gameplan: mark high-priority missions for early focus',
  1, -- Coach Gopi
  'scheduled'
);

-- Week 2: Basic Training & Concept Development
INSERT INTO Meetings (title, description, meeting_date, duration_minutes, location, agenda, created_by, status) VALUES
(
  'Week 2 Session 3: Training Camp 2 & Identify Project Problem',
  'Robot programming workshop and Innovation Project brainstorming. Learn essential SPIKE Prime coding skills and generate project ideas. Based on Official FLL Team Meeting Guide Session 3.',
  DATEADD(day, 7, GETDATE()),
  60,
  'Team Meeting Room',
  'Innovation Project Focus (Official FLL Guide Alignment):
• Innovation Project Problem Identification: Focus on specific archaeology challenges
• Problem Research: What techniques/tools do archaeologists use today? What are limitations?
• Narrow down to 2-3 favorite project ideas using democratic voting
• Research methodology introduction: How to systematically learn about chosen problem

Robot Mission Challenge Focus:
• Training Camp 2 - "Reacting to Lines": Color sensor programming and line following
• Finish Robot Build: mount sensors (color sensors in front), secure cables  
• Basic Programming Drills: drive forward/back specific distances, precise turning
• Sensor Integration: "move until black line" detection using color sensor and loops
• Practice gyro sensor for accurate 90-degree turns
• Basic attachment movement: use medium motor for simple up/down actions',
  2, -- Coach Rajesh
  'scheduled'
),
(
  'Week 2 Session 4: Training Camp 3 & Research Project Solutions',
  'Advanced sensor programming and strategic decisions. Choose one Innovation Project problem to pursue. Based on Official FLL Team Meeting Guide Session 4.',
  DATEADD(day, 10, GETDATE()),
  60,
  'Team Meeting Room',
  'Innovation Project Focus (Official FLL Guide Alignment):
• Final Project Problem Selection: Use democratic method or consensus to pick ONE problem
• Define Problem Explicitly: "Archaeologists often damage artifacts when excavating - we will find a solution"
• Research Project Solutions: What has been tried before? Who could be good expert to consult?
• Expert Identification: Local archaeologist, museum curator, or professor for future consultation
• Core Values reflection: "What was one thing another teammate did that helped you this week?"

Robot Mission Challenge Focus:
• Training Camp 3 - "Object Manipulation": Advanced sensor use with attachments
• Advanced sensor programming: color sensor line following, gyro for self-correction
• Simple attachment movement: program arm motor 45° downward to push lever
• Combined tasks: "drive forward, follow line, stop in front of Mission X"
• Sensor calibration: ensure color sensor reliably distinguishes mat colors
• Mission prototype: practice basic attachment motion for one simple mission',
  2, -- Coach Rajesh
  'scheduled'
);

-- Week 3-4: Attacking Missions & Research Deep Dive
INSERT INTO Meetings (title, description, meeting_date, duration_minutes, location, agenda, created_by, status) VALUES
(
  'Week 3 Session 5: First Mission Mode & Research Planning',
  'Solve the first robot mission completely and establish Innovation Project research methodology. Based on Official FLL Team Meeting Guide Session 5.',
  DATEADD(day, 14, GETDATE()),
  60,
  'Team Meeting Room',
  'Innovation Project Focus (Official FLL Guide Alignment):
• Project Research Plan: Systematic research of current state of chosen problem
• Gather Research Facts: What causes the problem, who is affected, existing solutions/technologies
• Research Documentation: Capture notes in Engineering Notebook or Google Doc
• Assign Research Tasks: Each member/pair takes specific question to investigate
• Expert Contact Planning: Schedule visit or call with identified expert by mid-season

Robot Mission Challenge Focus:
• Solve First Mission Completely: Choose simple mission near base (e.g., "Angler Artifacts")
• Attachment Design & Build: Create specific tool for chosen mission (claw, scoop, etc.)
• Programming & Testing: Write complete program - drive to target, use attachment, return
• Iterative Improvement: Debug systematically (aiming issues vs attachment issues)
• Mission Documentation: Record solution in Engineering Notebook with point values
• Additional Attachment Brainstorm: Plan modular design approach for multiple missions',
  1, -- Coach Gopi
  'scheduled'
),
(
  'Week 3 Session 6: Multiple Missions & Ideation of Solution',
  'Extend robot capabilities to multiple missions while developing Innovation Project solution concepts. Based on Official FLL Team Meeting Guide Session 6.',
  DATEADD(day, 17, GETDATE()),
  60,
  'Team Meeting Room',
  'Innovation Project Focus (Official FLL Guide Alignment):
• Innovation Project Solution Ideation: Pure creative brainstorming - encourage wild ideas
• Build on Ideas: Use "yes-and" thinking to develop concepts collaboratively
• Define Solution Concept: Converge on ONE innovative solution (e.g., "Smart Trowel with sensors")
• Innovation Check: Ensure solution is truly innovative, not just existing technology
• Plan Development: Create to-do list for prototype, demo, or presentation preparation

Robot Mission Challenge Focus:
• Concurrent Mission Work: Split team for parallel mission development (2+ missions)
• Mission Strategy Refinement: Group missions by field location for efficient robot trips
• Pseudocode Introduction: Plan complex sequences before coding
• Mission Combinations: Practice combining Mission A + Mission B in single trip
• Structured Programming: Introduce flowcharting before coding complex sequences
• Strategic Planning: "Which missions can be grouped in one trip?"',
  1, -- Coach Gopi
  'scheduled'
);

-- Week 4: Continue Development
INSERT INTO Meetings (title, description, meeting_date, duration_minutes, location, agenda, created_by, status) VALUES
(
  'Week 4 Session 7: Advanced Attachments & Remaining Missions',
  'Tackle complex robot missions requiring advanced mechanisms and precise programming. Based on Official FLL Team Meeting Guide Session 7.',
  DATEADD(day, 21, GETDATE()),
  60,
  'Team Meeting Room',
  'Innovation Project Focus (Official FLL Guide Alignment):
• Project Prototype Development: Start creating tangible solution prototype
• Material Gathering: LEGO, cardboard, craft materials for physical mock-up
• Solution Documentation: Prepare explanation of how solution works and why innovative
• Expert Meeting Preparation: Draft questions for expert consultation
• Presentation Planning: Begin storyboarding skit or demo format

Robot Mission Challenge Focus:
• Complete Mission Portfolio: Attempt ALL remaining missions (aim for all 13)
• Advanced Mechanisms: Gear lifts, precision claws, complex stacking tools
• My Blocks Introduction: Create custom functions for repeated actions (line align, grab sequence)
• Mission-Attachment Mapping: Chart which attachment serves which missions
• Code Organization: Comment programs, use consistent naming, create backups
• Robot Design Documentation: Prepare to explain engineering choices to judges',
  2, -- Coach Rajesh
  'scheduled'
);

-- Week 5-6: Mid-Season Development & "Feedback"

-- Week 5-6: Mid-Season Development & Feedback
(
  'Week 5 Session 10: Finalizing Robot & Drafting Presentation',
  'Finalize robot design and create comprehensive Innovation Project presentation. Based on Official FLL Team Meeting Guide Session 10.',
  DATEADD(day, 31, GETDATE()),
  60,
  'Team Meeting Room',
  'Innovation Project Focus (Official FLL Guide Alignment):
• Complete Project Presentation Script: Draft 5-minute presentation with speaking parts
• Content Coverage: Problem description, research findings, innovative solution, sharing plan
• Presentation Format: Choose skit vs formal briefing vs role-play demonstration
• Props and Materials: Ensure prototype and visual aids are presentation-ready
• Core Values Integration: Include how team demonstrated discovery, innovation, impact

Robot Mission Challenge Focus:
• Robot Polishing: Individual mission testing checklist (Mission 1 OK, Mission 2 OK, etc.)
• Strategic Decisions: Drop problematic low-point missions to focus on high-value ones
• Robot Design Summary: Document key features for judging (chassis, sensors, attachments)
• Executive Summary: Prepare bullet list of robot capabilities and innovations
• Hardware Maintenance: Tighten loose parts, check wheel friction, test battery life',
  1, -- Coach Gopi
  'scheduled'
);

-- Week 6: Refinement Focus
INSERT INTO Meetings (title, description, meeting_date, duration_minutes, location, agenda, created_by, status) VALUES
(
  'Week 6 Session 11: Full Runs and Presentation Practice',
  'Complete dress rehearsal with mock judging sessions. Based on Official FLL Team Meeting Guide Session 11.',
  DATEADD(day, 35, GETDATE()),
  60,
  'Team Meeting Room',
  'Innovation Project Focus (Official FLL Guide Alignment):
• Mock Project Judging: Full 5-minute presentation with Q&A to mock judges
• Presentation Skills: Clear speaking, eye contact, enthusiasm, team personality
• Judge Questions Practice: "How did you come up with this?", "How do you know this is a real problem?"
• Team Coordination: Ensure everyone can answer questions, no looking around cluelessly
• Timing Refinement: Cut content if over time, maintain essential elements

Robot Mission Challenge Focus:
• Mock Robot Design Judging: Explain robot features, sensors, attachment design choices
• Competition Simulation: Full 2.5-minute robot runs with official timing
• Team Choreography: Who handles robot, who swaps attachments, who tracks time
• Score Goals: Challenge team to achieve specific point target (e.g., "break 300 points")
• Consistency Practice: Multiple runs to build muscle memory and confidence',
  2, -- Coach Rajesh
  'scheduled'
),
(
  'Week 6 Session 12: Final Rehearsal and Pep Talk',
  'Final session before competition with complete run-throughs and team celebration. Based on Official FLL Team Meeting Guide Session 12.',
  DATEADD(day, 38, GETDATE()),
  60,
  'Team Meeting Room',
  'Innovation Project Focus (Official FLL Guide Alignment):
• Polish Presentation: Final timed run-through with delivery focus (loud voices, eye contact, smiles)
• Q&A Lightning Round: Quick practice of typical judge questions
• Materials Check: Ensure all physical props, prototypes, handouts are ready
• Self-Critique: Video record presentation if possible for team review
• Confidence Building: Emphasize pride in project and eagerness to share

Robot Mission Challenge Focus:
• Final Robot Practice: 2-3 no-stop, competition-realistic runs
• Tournament Logistics: Packing checklist, team coordination, schedule review
• Team Organization: Assign roles (who brings robot, who handles attachments)
• Equipment Check: Spare parts organized, batteries charged, code backed up
• Celebration & Recognition: Certificates, team achievements, progress celebration
• Pep Talk: Confidence building, Core Values reminder, Coopertition® mission',
  2, -- Coach Rajesh
  'scheduled'
);

-- Week 7-8: Iteration and Refinement
INSERT INTO Meetings (title, description, meeting_date, duration_minutes, location, agenda, created_by, status) VALUES
(
  'Week 7 Session 13: Robot Performance Optimization',
  'Achieve maximum robot performance through systematic optimization and reliability improvements.',
  DATEADD(day, 42, GETDATE()),
  60,
  'Team Meeting Room',
  'Innovation Project Focus:
• Solution Implementation Plan: detailed steps for real-world application
• Impact Measurement: define success metrics for the innovation
• Professional documentation completion

Robot Mission Challenge Focus:
• Mission Reliability Analysis: identify and fix inconsistent missions
• Advanced Programming Techniques: sensor calibration and error handling
• Attachment Quick-Change System: optimize for fast competition swapping
• Battery and Hardware Maintenance: ensure peak performance conditions',
  1, -- Coach Gopi
  'scheduled'
),
(
  'Week 7 Session 14: Innovation Project Implementation & Sharing',
  'Finalize Innovation Project solution and demonstrate community impact.',
  DATEADD(day, 45, GETDATE()),
  60,
  'Team Meeting Room',
  'Innovation Project Focus:
• Community Sharing Activity: present to external audience
• Professional Presentation: practice formal communication skills
• Core Values Demonstration: show discovery, innovation, and impact
• Research Documentation: compile evidence of thorough investigation

Robot Mission Challenge Focus:
• Strategic Mission Selection: optimize scoring potential vs. time investment
• Competition strategy documentation
• Team member role specialization for robot operations',
  1, -- Coach Gopi
  'scheduled'
);

-- Week 8: Advanced Integration
INSERT INTO Meetings (title, description, meeting_date, duration_minutes, location, agenda, created_by, status) VALUES
(
  'Week 8 Session 15: Competition Strategy & Robot Mastery',
  'Develop comprehensive competition strategy and achieve robot operation mastery.',
  DATEADD(day, 49, GETDATE()),
  60,
  'Team Meeting Room',
  'Innovation Project Focus:
• Project integration with robot design story
• Innovation narrative development
• Team reflection documentation

Robot Mission Challenge Focus:
• Match Strategy Development: optimal mission sequences and timing
• Multi-Run Planning: coordinate different robot configurations
• Contingency Planning: backup strategies for mission failures
• Team Member Specialization: assign specific competition roles',
  2, -- Coach Rajesh
  'scheduled'
),
(
  'Week 8 Session 16: Project Integration & Innovation Showcase',
  'Integrate all project elements and prepare for comprehensive innovation demonstration.',
  DATEADD(day, 52, GETDATE()),
  60,
  'Team Meeting Room',
  'Innovation Project Focus:
• Complete Project Integration: combine research, solution, and presentation
• Innovation Showcase Preparation: demonstrate creativity and impact
• Expert Collaboration Documentation: show professional engagement
• Solution Scalability Discussion: address real-world implementation

Robot Mission Challenge Focus:
• Precision Training: achieve consistent robot performance
• Final robot testing and validation
• Equipment preparation and organization',
  2, -- Coach Rajesh
  'scheduled'
);

-- Week 9-10: Competition Preparation
INSERT INTO Meetings (title, description, meeting_date, duration_minutes, location, agenda, created_by, status) VALUES
(
  'Week 9 Session 17: Robot Game Tournament Simulation',
  'Conduct full tournament simulation with multiple robot game rounds and judging sessions.',
  DATEADD(day, 56, GETDATE()),
  60,
  'Team Meeting Room',
  'Innovation Project Focus:
• Project judging simulation with external evaluators
• Research defense practice
• Core Values integration in project narrative

Robot Mission Challenge Focus:
• Multiple Tournament Rounds: simulate 3-4 competitive matches
• Score Tracking and Analysis: identify optimal mission combinations
• Robot Maintenance Under Pressure: practice quick repairs and adjustments
• Team Communication: effective coordination during high-stress situations',
  1, -- Coach Gopi
  'scheduled'
),
(
  'Week 9 Session 18: Innovation Project Judging Simulation',
  'Complete Innovation Project judging simulation with external evaluators.',
  DATEADD(day, 59, GETDATE()),
  60,
  'Team Meeting Room',
  'Innovation Project Focus:
• Full Judging Session Simulation: complete project presentation and Q&A
• Expert Panel Questions: practice handling challenging inquiries
• Solution Presentation: showcase innovation and real-world applicability
• Team story integration with project impact

Robot Mission Challenge Focus:
• Sportsmanship Practice: demonstrate gracious professionalism
• Final robot game strategy refinement
• Equipment reliability final checks',
  1, -- Coach Gopi
  'scheduled'
);

-- Week 10: Final Preparation
INSERT INTO Meetings (title, description, meeting_date, duration_minutes, location, agenda, created_by, status) VALUES
(
  'Week 10 Session 19: Robot Design & Technical Interview Prep',
  'Prepare for Robot Design judging and technical interviews with comprehensive documentation.',
  DATEADD(day, 63, GETDATE()),
  60,
  'Team Meeting Room',
  'Innovation Project Focus:
• Innovation documentation and portfolio completion
• Project impact stories and evidence compilation
• Professional communication practice

Robot Mission Challenge Focus:
• Robot Design Portfolio: document engineering process and decisions
• Technical Interview Practice: explain programming and mechanical choices
• Innovation Documentation: highlight unique solutions and creativity
• Design Evolution: show iterative improvement and learning process',
  2, -- Coach Rajesh
  'scheduled'
),
(
  'Week 10 Session 20: Core Values Demonstration & Team Presentation',
  'Perfect Core Values demonstration and prepare comprehensive team presentation.',
  DATEADD(day, 66, GETDATE()),
  60,
  'Team Meeting Room',
  'Innovation Project Focus:
• Community Impact Documentation: show how project benefits others
• Project and team story integration
• Values-based presentation narrative

Robot Mission Challenge Focus:
• Core Values Presentation: demonstrate discovery, innovation, impact, inclusion, teamwork, fun
• Team Story Development: craft compelling narrative of season journey
• Gracious Professionalism Examples: prepare specific teamwork stories
• Team Chemistry: perfect natural collaboration and communication',
  2, -- Coach Rajesh
  'scheduled'
);

-- Week 11-12: Final Polish & Competition
INSERT INTO Meetings (title, description, meeting_date, duration_minutes, location, agenda, created_by, status) VALUES
(
  'Week 11 Session 21: Final Robot Optimization & Competition Logistics',
  'Complete final robot optimization and prepare all competition logistics and materials.',
  DATEADD(day, 70, GETDATE()),
  60,
  'Team Meeting Room',
  'Innovation Project Focus:
• Project materials finalization and transportation prep
• Final presentation materials organization
• Backup presentation plans

Robot Mission Challenge Focus:
• Robot Final Tuning: last-minute optimizations and consistency checks
• Competition Logistics: transportation, scheduling, and material preparation
• Emergency Procedures: spare parts, backup programs, and contingency plans
• Equipment Organization: systematic packing and competition setup',
  1, -- Coach Gopi
  'scheduled'
),
(
  'Week 11 Session 22: Complete Project Finalization & Presentation Mastery',
  'Finalize all Innovation Project elements and achieve presentation mastery.',
  DATEADD(day, 73, GETDATE()),
  60,
  'Team Meeting Room',
  'Innovation Project Focus:
• Project Presentation Mastery: achieve confident, natural delivery
• Question Preparation: anticipate and prepare for judge inquiries
• Story Integration: weave together robot, project, and team journey
• Final confidence building and team motivation

Robot Mission Challenge Focus:
• Team Coordination: final role assignments and communication protocols
• Final strategy review and confirmation
• Competition day preparation checklist',
  1, -- Coach Gopi
  'scheduled'
);

-- Week 12: Competition Week
INSERT INTO Meetings (title, description, meeting_date, duration_minutes, location, agenda, created_by, status) VALUES
(
  'Week 12 Session 23: Pre-Competition Final Preparation',
  'Final preparation session before competition day with complete run-through and team motivation.',
  DATEADD(day, 77, GETDATE()),
  60,
  'Team Meeting Room',
  'Innovation Project Focus:
• Final project run-through and confidence building
• Materials check and backup preparation
• Team motivation and celebration of journey

Robot Mission Challenge Focus:
• Complete Competition Simulation: full tournament day schedule
• Final Equipment Check: ensure all components are competition-ready
• Last-Minute Strategy Review: confirm plans and backup strategies
• Relaxation and Team Bonding: fun activities to reduce pre-competition stress',
  2, -- Coach Rajesh
  'scheduled'
),
(
  'Week 12 Session 24: Competition Day & Season Reflection',
  'Competition day execution and post-competition season reflection and celebration.',
  DATEADD(day, 80, GETDATE()),
  180, -- 3 hours for competition day
  'Competition Venue',
  'Innovation Project Focus:
• Project presentation execution and judging
• Team support during innovation judging
• Professional interaction with judges and experts

Robot Mission Challenge Focus:
• Competition Day Execution: robot games, project presentation, judging sessions
• Gracious Professionalism: demonstrate core values with other teams
• Team Support and Encouragement: maintain positive attitude throughout day

Season Wrap-up:
• Learning Documentation: capture insights and experiences from competition
• Season Celebration: reflect on growth, achievements, and team journey
• Future Planning: discuss continued learning and next season preparation',
  2, -- Coach Rajesh
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