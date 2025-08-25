'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, BookOpen, Target, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { Meeting, User, LearningEntry } from '@/types/meetings';
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
  const [selectedUser] = useState<number>(1);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [meetingsRes, usersRes] = await Promise.all([
        fetch('/api/meetings/'),
        fetch('/api/users/')
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
      const res = await fetch(`/api/learning-entries/?meeting_id=${meetingId}`);
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
                            <p className="text-sm">No sessions scheduled for this week yet.</p>
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
                                by {entry.user_name} • {new Date(entry.created_at).toLocaleDateString()}
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

        {/* Modals */}
        <CreateMeetingModal 
          isOpen={showCreateForm}
          onClose={() => setShowCreateForm(false)}
          onSuccess={loadData}
        />

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