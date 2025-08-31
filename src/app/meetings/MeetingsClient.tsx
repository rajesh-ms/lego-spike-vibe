'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, BookOpen, Target, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { Meeting, User, LearningEntry } from '../../../types/meetings';
import CreateMeetingModal from '@/components/CreateMeetingModal';
import LearningEntryModal from '@/components/LearningEntryModal';
import SessionNotesModal from '@/components/SessionNotesModal';

interface WeekGroup {
  weekNumber: number;
  title: string;
  description: string;
  meetings: Meeting[];
}

const WEEK_INFO = [
  { 
    week: 1, 
    title: "Kickoff & Team Orientation", 
    description: "Introduce the UNEARTHED challenge, build field, review rules and Core Values",
    phase: "Foundation & Exploration"
  },
  { 
    week: 2, 
    title: "Basic Training & Concept Development", 
    description: "Robot programming fundamentals and Innovation Project brainstorming",
    phase: "Foundation & Exploration"
  },
  { 
    week: 3, 
    title: "Attacking Missions & Research Deep Dive", 
    description: "First mission solutions and serious project research",
    phase: "Intensive Development"
  },
  { 
    week: 4, 
    title: "Multiple Missions & Solution Ideation", 
    description: "Extend robot capabilities and brainstorm project solutions",
    phase: "Intensive Development"
  },
  { 
    week: 5, 
    title: "Mid-Season Development", 
    description: "Advanced attachments and remaining missions",
    phase: "Intensive Development"
  },
  { 
    week: 6, 
    title: "Feedback & Review", 
    description: "Testing, feedback session, and midpoint assessment",
    phase: "Intensive Development"
  },
  { 
    week: 7, 
    title: "Iteration & Refinement I", 
    description: "Robot optimization and solution improvements",
    phase: "Refinement"
  },
  { 
    week: 8, 
    title: "Iteration & Refinement II", 
    description: "Finalizing robot and drafting presentations",
    phase: "Refinement"
  },
  { 
    week: 9, 
    title: "Practice & Integration I", 
    description: "Full runs and presentation practice with mock judging",
    phase: "Competition Prep"
  },
  { 
    week: 10, 
    title: "Practice & Integration II", 
    description: "Final rehearsal, team logistics, and pep talk",
    phase: "Competition Prep"
  },
  { 
    week: 11, 
    title: "Competition Week I", 
    description: "Final preparations and team confidence building",
    phase: "Competition Prep"
  },
  { 
    week: 12, 
    title: "Competition & Reflection", 
    description: "Tournament participation and season reflection",
    phase: "Competition Prep"
  }
];

export default function MeetingsClient() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [learningEntries, setLearningEntries] = useState<LearningEntry[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showLearningForm, setShowLearningForm] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showWeeklyMeetingModal, setShowWeeklyMeetingModal] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [selectedUser] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'meetings' | 'rules'>('dashboard');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [meetingsRes, usersRes] = await Promise.all([
        fetch('/api/meetings'),
        fetch('/api/users')
      ]);

      if (meetingsRes.ok && usersRes.ok) {
        const meetingsData = await meetingsRes.json();
        const usersData = await usersRes.json();
        setMeetings(meetingsData.meetings || []);
        setUsers(usersData.users || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadLearningEntries = async (meetingId: number) => {
    try {
  const res = await fetch(`/api/learning-entries?meeting_id=${meetingId}`);
      if (res.ok) {
        const data = await res.json();
        setLearningEntries(data.entries || []);
      }
    } catch (error) {
      console.error('Error loading learning entries:', error);
    }
  };

  const selectMeeting = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    loadLearningEntries(meeting.id);
  };

  const createWeeklyMeetings = async (weekNumber: number) => {
    const weekInfo = WEEK_INFO.find(w => w.week === weekNumber);
    if (!weekInfo) return;

    const meetingTemplates = getWeeklyMeetingTemplates(weekNumber);
    
    try {
      for (const template of meetingTemplates) {
        const response = await fetch('/api/meetings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(template),
        });
        
        if (!response.ok) {
          throw new Error('Failed to create meeting');
        }
      }
      
      // Reload meetings after creation
      loadData();
      setShowWeeklyMeetingModal(false);
    } catch (error) {
      console.error('Error creating weekly meetings:', error);
    }
  };

  const getWeeklyMeetingTemplates = (weekNumber: number) => {
    const baseDate = new Date();
    const sessionDate1 = new Date(baseDate.getTime() + ((weekNumber - 1) * 7 + 0) * 24 * 60 * 60 * 1000);
    const sessionDate2 = new Date(baseDate.getTime() + ((weekNumber - 1) * 7 + 3) * 24 * 60 * 60 * 1000);

    interface MeetingTemplate {
      title: string;
      description: string;
      meeting_date: string;
      duration_minutes: number;
      location: string;
      agenda: string;
      created_by: number;
      status: string;
    }

    const weekTemplates: { [key: number]: MeetingTemplate[] } = {
      1: [
        {
          title: `Week 1 Session 1: Season Introduction & Field Setup`,
          description: 'Introduce the UNEARTHED challenge storyline and objectives. Build the field kit, review Robot Game rules and Core Values.',
          meeting_date: sessionDate1.toISOString(),
          duration_minutes: 60,
          location: 'Team Meeting Room',
          agenda: `Innovation Project Focus:
• Challenge Exploration: Understanding archaeology theme and real-world problems
• Team Building: Core values icebreaker activities
• Project Brainstorm Prep: What problems do archaeologists face?

Robot Mission Challenge Focus:
• Watch Season Reveal video and discuss archaeology theme
• Review Robot Game Rulebook (2.5-minute match rules, start/launch area)
• Build mission models from Challenge Set
• Field Setup: Building mission models collaboratively
• Core Values Icebreaker: "one-word story" circle`,
          created_by: 1,
          status: 'scheduled'
        },
        {
          title: `Week 1 Session 2: Rules, Strategy Brainstorm & Chassis Build`,
          description: 'Recap key Robot Game rules and facilitate initial strategy discussion. Build basic SPIKE Prime chassis.',
          meeting_date: sessionDate2.toISOString(),
          duration_minutes: 60,
          location: 'Team Meeting Room',
          agenda: `Innovation Project Focus:
• Create team name and personal goals poster
• Initial project problem identification
• Core Values Focus: Inclusion and Teamwork during activities

Robot Mission Challenge Focus:
• Robot Game Rule Review: point values, penalties, updates
• Mission Strategy Blitz: identify high-priority missions
• Build Basic Chassis: sturdy SPIKE Prime base design
• Scenario quizzes for rule understanding`,
          created_by: 1,
          status: 'scheduled'
        }
      ],
      2: [
        {
          title: `Week 2 Session 3: SPIKE Prime Programming 101 & Project Ideas`,
          description: 'Robot programming workshop and Innovation Project brainstorming. Learn essential SPIKE Prime coding skills.',
          meeting_date: sessionDate1.toISOString(),
          duration_minutes: 60,
          location: 'Team Meeting Room',
          agenda: `Innovation Project Focus:
• Innovation Project Brainstorm: archaeology-themed problems
• Narrow down to 2-3 favorite project ideas
• Research methodology introduction

Robot Mission Challenge Focus:
• Finish Robot Build: mount sensors, secure cables
• Basic programming: motor movement blocks and sensor integration
• Practice "move until black line" with color sensor
• Basic Coding Drills: drive forward/back, turning, sensor detection`,
          created_by: 2,
          status: 'scheduled'
        },
        {
          title: `Week 2 Session 4: Sensors & Strategy; Pick Project Problem`,
          description: 'Advanced sensor programming and strategic decisions. Choose one Innovation Project problem to pursue.',
          meeting_date: sessionDate2.toISOString(),
          duration_minutes: 60,
          location: 'Team Meeting Room',
          agenda: `Innovation Project Focus:
• Project Problem Selection: democratic voting process
• Research Planning: expert identification and task assignments
• Core Values reflection: recognize teammates' contributions

Robot Mission Challenge Focus:
• Advanced sensor programming: color and gyro sensor integration
• Simple attachment movement with medium motor
• Line following and sensor conditionals practice`,
          created_by: 2,
          status: 'scheduled'
        }
      ],
      3: [
        {
          title: `Week 3 Session 5: First Mission Mode & Research Planning`,
          description: 'Solve the first robot mission completely and establish Innovation Project research methodology.',
          meeting_date: sessionDate1.toISOString(),
          duration_minutes: 60,
          location: 'Team Meeting Room',
          agenda: `Innovation Project Focus:
• Project Research Plan: current state analysis of chosen problem
• Gather facts: problem causes, affected parties, existing solutions
• Assign follow-up research tasks for team members

Robot Mission Challenge Focus:
• Solve First Mission: design attachment, code solution, test iterations
• Document mission success and point values earned
• Additional Attachment Brainstorm: plan modular design approach`,
          created_by: 1,
          status: 'scheduled'
        },
        {
          title: `Week 3 Session 6: Multiple Missions & Ideation of Solution`,
          description: 'Extend robot capabilities to multiple missions while developing Innovation Project solution concepts.',
          meeting_date: sessionDate2.toISOString(),
          duration_minutes: 60,
          location: 'Team Meeting Room',
          agenda: `Innovation Project Focus:
• Innovation Project Solution Ideation: creative brainstorming session
• Define Solution Idea: converge on one innovative concept
• Plan Next Steps: prototype development and expert consultation

Robot Mission Challenge Focus:
• Concurrent Mission Work: split team for parallel mission development
• Mission Strategy Refinement: group missions for efficient robot trips
• Structured programming: pseudocode and mission strategy`,
          created_by: 1,
          status: 'scheduled'
        }
      ]
      // Additional weeks 4-12 can be added following the same pattern...
    };

    return weekTemplates[weekNumber] || [];
  };

  const groupMeetingsByWeek = (): WeekGroup[] => {
    const groups: WeekGroup[] = [];
    const assignedMeetingIds = new Set<number>();
    
    WEEK_INFO.forEach((weekInfo, index) => {
      const weekMeetings = meetings.filter(meeting => {
        const meetingDate = new Date(meeting.meeting_date);
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + (index * 7));
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);
        
        const isInWeek = meetingDate >= startDate && meetingDate <= endDate;
        if (isInWeek) {
          assignedMeetingIds.add(meeting.id);
        }
        return isInWeek;
      });

      groups.push({
        weekNumber: weekInfo.week,
        title: weekInfo.title,
        description: weekInfo.description,
        meetings: weekMeetings
      });
    });

    // Add unscheduled meetings that don't fit in the weekly structure
    const unscheduledMeetings = meetings.filter(meeting => !assignedMeetingIds.has(meeting.id));
    if (unscheduledMeetings.length > 0) {
      groups.push({
        weekNumber: 0,
        title: "Unscheduled Meetings",
        description: "Meetings that don't fit in the current 12-week schedule",
        meetings: unscheduledMeetings
      });
    }

    return groups;
  };

  const getWeekProgress = (weekGroup: WeekGroup) => {
    const total = weekGroup.meetings.length;
    const completed = weekGroup.meetings.filter(m => m.status === 'completed').length;
    return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 };
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Foundation & Exploration': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Intensive Development': return 'bg-green-100 text-green-800 border-green-200';
      case 'Refinement': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Competition Prep': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const weekGroups = groupMeetingsByWeek();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading 12-week curriculum...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">FIRST LEGO League UNEARTHED Season</h1>
            <p className="text-gray-600 mt-2">12-Week Challenge Curriculum • Team Meetings & Learning Journey</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Meeting
          </button>
        </div>

        {/* Phase Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { phase: 'Foundation & Exploration', weeks: 'Weeks 1-2', description: 'Game rules, field setup, core values' },
            { phase: 'Intensive Development', weeks: 'Weeks 3-6', description: 'Mission solutions, project research' },
            { phase: 'Refinement', weeks: 'Weeks 7-8', description: 'Optimization and presentation prep' },
            { phase: 'Competition Prep', weeks: 'Weeks 9-12', description: 'Practice, integration, tournament' }
          ].map((phase, index) => (
            <div key={index} className={`p-4 rounded-lg border ${getPhaseColor(phase.phase)}`}>
              <h3 className="font-semibold text-sm">{phase.phase}</h3>
              <p className="text-xs font-medium mt-1">{phase.weeks}</p>
              <p className="text-xs mt-2">{phase.description}</p>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'dashboard' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'meetings' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('meetings')}
            >
              Meetings
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'rules' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('rules')}
            >
              Rules
            </button>
          </div>
        </div>

        {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly Schedule */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
            <div className="space-y-6">
              {weekGroups.map((weekGroup) => {
                const progress = getWeekProgress(weekGroup);
                const weekInfo = WEEK_INFO.find(w => w.week === weekGroup.weekNumber);
                const phaseColor = getPhaseColor(weekInfo?.phase || '');
                
                return (
                  <div
                    key={weekGroup.weekNumber}
                    className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${
                      selectedWeek === weekGroup.weekNumber ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <div 
                      className="p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedWeek(selectedWeek === weekGroup.weekNumber ? null : weekGroup.weekNumber)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {weekGroup.weekNumber === 0 ? weekGroup.title : `Week ${weekGroup.weekNumber}: ${weekGroup.title}`}
                        </h3>
                        <div className="flex items-center gap-2">
                          {weekGroup.weekNumber !== 0 && (
                            <span className={`px-2 py-1 rounded-full text-xs border ${phaseColor}`}>
                              {weekInfo?.phase}
                            </span>
                          )}
                          {weekGroup.weekNumber === 0 && (
                            <span className="px-2 py-1 rounded-full text-xs border bg-orange-100 text-orange-800 border-orange-200">
                              Other
                            </span>
                          )}
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4" />
                            {progress.completed}/{progress.total}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{weekGroup.description}</p>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress.percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Expanded Week Sessions */}
                    {selectedWeek === weekGroup.weekNumber && (
                      <div className="border-t border-gray-100">
                        {weekGroup.meetings.length > 0 ? (
                          <div className="p-4 space-y-3">
                            {weekGroup.meetings.map((meeting) => (
                              <div
                                key={meeting.id}
                                className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                                  selectedMeeting?.id === meeting.id 
                                    ? 'border-blue-500 bg-blue-50' 
                                    : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                                }`}
                                onClick={() => selectMeeting(meeting)}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                                  <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                      meeting.status === 'completed' ? 'bg-green-100 text-green-800' :
                                      meeting.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                      'bg-yellow-100 text-yellow-800'
                                    }`}>
                                      {meeting.status}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(meeting.meeting_date).toLocaleDateString()}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {meeting.duration_minutes}min
                                  </div>
                                  {meeting.location && (
                                    <div className="flex items-center gap-1">
                                      <MapPin className="w-4 h-4" />
                                      {meeting.location}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center text-gray-500">
                            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm mb-3">No sessions scheduled for this week yet.</p>
                            {weekGroup.weekNumber > 0 && weekGroup.weekNumber <= 12 && (
                              <button
                                onClick={() => {
                                  setSelectedWeek(weekGroup.weekNumber);
                                  setShowWeeklyMeetingModal(true);
                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto text-sm"
                              >
                                <Plus className="w-4 h-4" />
                                Create Week {weekGroup.weekNumber} Sessions
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Session Details & Team Notes */}
          <div className="lg:col-span-1">
            {selectedMeeting ? (
              <>
                {/* Meeting Details */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">{selectedMeeting.title}</h2>
                  {selectedMeeting.description && (
                    <p className="text-gray-700 mb-4 text-sm">{selectedMeeting.description}</p>
                  )}
                  
                  {/* Agenda */}
                  {selectedMeeting.agenda && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Session Agenda
                      </h3>
                      <div className="text-sm text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded-lg">
                        {selectedMeeting.agenda}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      {users.length} team members
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowLearningForm(true)}
                      className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <BookOpen className="w-4 h-4" />
                      Add Learning
                    </button>
                    <button
                      onClick={() => setShowNotesModal(true)}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <FileText className="w-4 h-4" />
                      Session Notes
                    </button>
                  </div>
                </div>

                {/* Learning Entries */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Team Learning & Notes</h3>
                  {learningEntries.length > 0 ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {learningEntries.map((entry) => (
                        <div key={entry.id} className="border-l-3 border-blue-400 pl-4 py-2">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">
                                {entry.title || `${entry.entry_type.charAt(0).toUpperCase() + entry.entry_type.slice(1)}`}
                              </h4>
                              <p className="text-xs text-gray-600">
                                by {users.find(u => u.id === entry.user_id)?.display_name || 'Unknown'} • {new Date(entry.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              entry.entry_type === 'achievement' ? 'bg-green-100 text-green-800' :
                              entry.entry_type === 'challenge' ? 'bg-red-100 text-red-800' :
                              entry.entry_type === 'goal' ? 'bg-blue-100 text-blue-800' :
                              entry.entry_type === 'reflection' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {entry.entry_type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 whitespace-pre-line">{entry.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8 text-sm">No learning entries yet. Start documenting your team&apos;s journey!</p>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a Session</h3>
                <p className="text-gray-500 text-sm">Choose a week and session from the schedule to view details and add team learning notes.</p>
              </div>
            )}

            {/* Team Members */}
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Team Roster</h3>
              <div className="space-y-3">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                      user.role === 'coach' ? 'bg-purple-500' : 'bg-blue-500'
                    }`}>
                      {user.display_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{user.display_name}</p>
                      <p className="text-xs text-gray-600 capitalize">{user.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        )}

        {activeTab === 'meetings' && (
        <div className="space-y-6">
          {/* Meeting Notes Header */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Team Meeting Notes</h2>
            <p className="text-gray-600 mb-4">
              Document your team&apos;s progress, discoveries, and decisions during each meeting session.
            </p>
            
            {/* Meeting Selection */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Week</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedWeek || ''}
                  onChange={(e) => setSelectedWeek(e.target.value ? parseInt(e.target.value) : null)}
                >
                  <option value="">Choose a week...</option>
                  {weekGroups.map((week) => (
                    <option key={week.weekNumber} value={week.weekNumber}>
                      {week.weekNumber === 0 ? week.title : `Week ${week.weekNumber}: ${week.title}`}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Meeting</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedMeeting?.id || ''}
                  onChange={(e) => {
                    const meeting = meetings.find(m => m.id === parseInt(e.target.value));
                    setSelectedMeeting(meeting || null);
                  }}
                  disabled={!selectedWeek}
                >
                  <option value="">Choose a meeting...</option>
                  {selectedWeek && weekGroups
                    .find(w => w.weekNumber === selectedWeek)?.meetings
                    .map((meeting) => (
                      <option key={meeting.id} value={meeting.id}>
                        {meeting.title}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {/* Individual Team Member Notes */}
          {selectedMeeting && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Individual Team Member Notes</h3>
            <div className="grid gap-6">
              {users.filter(user => user.role === 'kid').map((user) => (
                <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                      {user.display_name.charAt(0)}
                    </div>
                    <h4 className="font-medium text-gray-900">{user.display_name}</h4>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Robot Programming Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        🤖 Robot Programming Notes
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        placeholder="What did you work on with the robot today? Any programming challenges or breakthroughs?"
                      />
                    </div>

                    {/* Mission Strategy */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        🎯 Mission Strategy & Progress
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        placeholder="Which missions did you focus on? What strategies are working or need improvement?"
                      />
                    </div>

                    {/* Project Research */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        📚 Innovation Project Research
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        placeholder="What did you discover about your innovation project? Any new ideas or research findings?"
                      />
                    </div>

                    {/* Team Collaboration */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        🤝 Team Collaboration & Core Values
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={2}
                        placeholder="How did you work with teammates? Examples of Discovery, Innovation, Impact, Inclusion, Teamwork, or Fun?"
                      />
                    </div>

                    {/* Learning & Challenges */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        💡 What I Learned & Challenges
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={2}
                        placeholder="What new skills did you learn? What was challenging and how did you overcome it?"
                      />
                    </div>

                    {/* Next Session Goals */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        🎯 Goals for Next Session
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={2}
                        placeholder="What do you want to accomplish in the next meeting?"
                      />
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Save My Notes
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Team Summary Notes */}
          {selectedMeeting && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Team Summary & Coach Notes</h3>
            
            <div className="space-y-4">
              {/* Overall Team Progress */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📊 Overall Team Progress Today
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Summarize the team's collective achievements and progress during this session..."
                />
              </div>

              {/* Mission Accomplishments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🏆 Mission Accomplishments & Scores
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Record which missions were completed, attempted, or improved. Note any point scores achieved..."
                />
              </div>

              {/* Technical Challenges */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ⚙️ Technical Challenges & Solutions
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Document any technical problems encountered and how the team solved them..."
                />
              </div>

              {/* Team Dynamics */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  👥 Team Dynamics & Core Values in Action
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="How did the team demonstrate FLL Core Values? Any notable collaboration or problem-solving moments..."
                />
              </div>

              {/* Action Items */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ✅ Action Items & Next Steps
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="List specific tasks and goals for the next meeting. Who will work on what?"
                />
              </div>

              {/* Coach Observations */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  👨‍🏫 Coach Observations & Feedback
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Coach notes: team strengths, areas for improvement, individual recognition..."
                />
              </div>

              {/* Save Team Notes */}
              <div className="flex justify-end">
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Save Team Summary
                </button>
              </div>
            </div>
          </div>
          )}

          {/* Meeting Guidelines */}
          {!selectedMeeting && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">📝 Meeting Notes Guidelines</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-blue-800">
              <div>
                <h4 className="font-medium mb-2">For Team Members:</h4>
                <ul className="space-y-1">
                  <li>• Document your individual contributions and learning</li>
                  <li>• Record programming challenges and solutions</li>
                  <li>• Note mission strategy developments</li>
                  <li>• Reflect on team collaboration and core values</li>
                  <li>• Set personal goals for the next session</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">For Coaches:</h4>
                <ul className="space-y-1">
                  <li>• Summarize overall team progress and achievements</li>
                  <li>• Document technical challenges and solutions</li>
                  <li>• Record mission scores and accomplishments</li>
                  <li>• Note team dynamics and core values demonstrations</li>
                  <li>• Plan action items and next steps</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Tip:</strong> Regular note-taking helps track progress, identify patterns, 
                and prepare for competitions. It also supports the engineering notebook requirements for FLL.
              </p>
            </div>
          </div>
          )}
        </div>
        )}

        {activeTab === 'rules' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">FLL UNEARTHED Mission Rules</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Mission Overview</h3>
              <p className="text-blue-800 text-sm">
                Complete archaeological missions by programming your robot to navigate the field, 
                collect artifacts, and contribute to scientific discoveries. Each mission has specific 
                goals, scoring criteria, and constraints.
              </p>
            </div>

            {/* Mission 1: Surface Brushing */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mission 1: Surface Brushing</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">🎯 Goal</h4>
                  <p className="text-sm text-green-800">
                    Clear soil deposits from archaeological sites by brushing them away to reveal hidden artifacts beneath.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">🏆 Scoring</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 10 points per soil deposit removed</li>
                    <li>• Maximum 6 deposits available</li>
                    <li>• Total possible: 60 points</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-2">⚠️ Constraints</h4>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>• Robot must stay in bounds</li>
                    <li>• Gentle brushing motion required</li>
                    <li>• No damage to underlying artifacts</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mission 2: Careful Recovery */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mission 2: Careful Recovery</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">🎯 Goal</h4>
                  <p className="text-sm text-green-800">
                    Carefully extract and transport precious artifacts to the research station without damage.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">🏆 Scoring</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 30 points per precious artifact recovered</li>
                    <li>• Bonus: 20 points if all artifacts intact</li>
                    <li>• Total possible: 110 points</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-2">⚠️ Constraints</h4>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>• No dropping or rough handling</li>
                    <li>• Must use designated transport path</li>
                    <li>• Time limit: 2.5 minutes</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mission 3: Expedition Vehicle */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mission 3: Expedition Vehicle</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">🎯 Goal</h4>
                  <p className="text-sm text-green-800">
                    Navigate the expedition vehicle to remote dig sites and return with collected samples.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">🏆 Scoring</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 25 points for reaching remote site</li>
                    <li>• 15 points per sample collected</li>
                    <li>• 30 points for safe return</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-2">⚠️ Constraints</h4>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>• Vehicle must remain upright</li>
                    <li>• Follow designated paths only</li>
                    <li>• No manual intervention once started</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mission 4: Transportation */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mission 4: Transportation</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">🎯 Goal</h4>
                  <p className="text-sm text-green-800">
                    Transport archaeological equipment and supplies between base camp and excavation sites.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">🏆 Scoring</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 20 points per equipment piece delivered</li>
                    <li>• 10 points for organized placement</li>
                    <li>• Efficiency bonus: 25 points</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-2">⚠️ Constraints</h4>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>• Maximum 3 items per trip</li>
                    <li>• Stable transport required</li>
                    <li>• No backtracking allowed</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mission 5: Artifact Display */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mission 5: Artifact Display</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">🎯 Goal</h4>
                  <p className="text-sm text-green-800">
                    Arrange discovered artifacts in the museum display case for public education and preservation.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">🏆 Scoring</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 15 points per artifact displayed</li>
                    <li>• 20 points for chronological order</li>
                    <li>• 35 points for complete collection</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-2">⚠️ Constraints</h4>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>• Fragile items - handle with care</li>
                    <li>• Specific placement requirements</li>
                    <li>• Museum safety protocols</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mission 6: Archaeological Techniques */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mission 6: Archaeological Techniques</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">🎯 Goal</h4>
                  <p className="text-sm text-green-800">
                    Demonstrate proper archaeological excavation techniques including grid mapping and layer documentation.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">🏆 Scoring</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 25 points for grid setup</li>
                    <li>• 20 points per documented layer</li>
                    <li>• 30 points for precision techniques</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-2">⚠️ Constraints</h4>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>• Follow scientific methodology</li>
                    <li>• Maintain excavation integrity</li>
                    <li>• Document all findings</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Additional Missions Summary */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Additional Missions (7-14)</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Missions 7-10:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Mission 7: Sample Analysis (Lab Work)</li>
                    <li>• Mission 8: Fossil Documentation</li>
                    <li>• Mission 9: Site Preservation</li>
                    <li>• Mission 10: Research Publication</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Missions 11-14:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Mission 11: Community Outreach</li>
                    <li>• Mission 12: Digital Archive</li>
                    <li>• Mission 13: Time Capsule</li>
                    <li>• Mission 14: Future Discoveries</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4">
                Each mission includes detailed Goal, Scoring, and Constraints. 
                Reference the full rule book for complete mission specifications.
              </p>
            </div>

            {/* Game Rules Summary */}
            <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 p-4 rounded-r-lg">
              <h3 className="font-semibold text-yellow-900 mb-2">General Game Rules</h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• <strong>Match Duration:</strong> 2 minutes 30 seconds</li>
                <li>• <strong>Robot Zone:</strong> Must start in designated launch area</li>
                <li>• <strong>Precision Tokens:</strong> Earn tokens for careful, precise completion</li>
                <li>• <strong>Equipment Rules:</strong> Only LEGO® elements allowed</li>
                <li>• <strong>Autonomous Period:</strong> Robot operates independently</li>
                <li>• <strong>Core Values:</strong> Discovery, Innovation, Impact, Inclusion, Teamwork, Fun</li>
              </ul>
            </div>
          </div>
        </div>
        )}
        <CreateMeetingModal 
          isOpen={showCreateForm}
          onClose={() => setShowCreateForm(false)}
          onSuccess={loadData}
        />

        {/* Weekly Meeting Creation Modal */}
        {showWeeklyMeetingModal && selectedWeek && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Create Week {selectedWeek} Sessions</h2>
                <button
                  onClick={() => setShowWeeklyMeetingModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Week {selectedWeek} Overview</h3>
                  <p className="text-blue-800 text-sm">
                    {WEEK_INFO.find(w => w.week === selectedWeek)?.description}
                  </p>
                  <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs border ${
                    getPhaseColor(WEEK_INFO.find(w => w.week === selectedWeek)?.phase || '')
                  }`}>
                    {WEEK_INFO.find(w => w.week === selectedWeek)?.phase}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Innovation Project Session */}
                  <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Innovation Project Session
                    </h4>
                    <p className="text-sm text-purple-800 mb-3">Focus on research, solution development, and presentation skills</p>
                    
                    <div className="space-y-2 text-sm">
                      <div><strong>Duration:</strong> 60 minutes</div>
                      <div><strong>Format:</strong> Interactive workshop</div>
                      <div><strong>Skills:</strong> Research, Innovation, Presentation</div>
                    </div>

                    <div className="mt-4 p-3 bg-white rounded border text-xs text-gray-700">
                      <strong>Sample Activities:</strong>
                      <ul className="mt-1 space-y-1">
                        <li>• Project brainstorming and problem identification</li>
                        <li>• Research methodology and expert interviews</li>
                        <li>• Solution design and prototype development</li>
                        <li>• Presentation practice and peer feedback</li>
                      </ul>
                    </div>
                  </div>

                  {/* Robot Mission Challenge Session */}
                  <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                    <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Robot Mission Challenge Session
                    </h4>
                    <p className="text-sm text-green-800 mb-3">Focus on robot design, programming, and mission strategy</p>
                    
                    <div className="space-y-2 text-sm">
                      <div><strong>Duration:</strong> 60 minutes</div>
                      <div><strong>Format:</strong> Hands-on building and coding</div>
                      <div><strong>Skills:</strong> Engineering, Programming, Strategy</div>
                    </div>

                    <div className="mt-4 p-3 bg-white rounded border text-xs text-gray-700">
                      <strong>Sample Activities:</strong>
                      <ul className="mt-1 space-y-1">
                        <li>• Robot chassis design and sensor integration</li>
                        <li>• Mission-specific attachment development</li>
                        <li>• Programming logic and autonomous navigation</li>
                        <li>• Strategy development and scoring optimization</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Session Schedule</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Session 1:</strong> {getWeeklyMeetingTemplates(selectedWeek)[0]?.title}
                      <br />
                      <span className="text-gray-600">Innovation Project Focus</span>
                    </div>
                    <div>
                      <strong>Session 2:</strong> {getWeeklyMeetingTemplates(selectedWeek)[1]?.title}
                      <br />
                      <span className="text-gray-600">Robot Mission Challenge Focus</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    onClick={() => setShowWeeklyMeetingModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => createWeeklyMeetings(selectedWeek)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Create Both Sessions
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedMeeting && (
          <>
            <LearningEntryModal 
              isOpen={showLearningForm}
              onClose={() => setShowLearningForm(false)}
              onSuccess={() => loadLearningEntries(selectedMeeting.id)}
              meetingId={selectedMeeting.id}
              users={users}
              selectedUserId={selectedUser}
            />

            <SessionNotesModal
              isOpen={showNotesModal}
              onClose={() => setShowNotesModal(false)}
              meeting={selectedMeeting}
              users={users}
              onSuccess={() => loadLearningEntries(selectedMeeting.id)}
            />
          </>
        )}
      </div>
    </div>
  );
}