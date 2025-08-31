'use client';

import { useState } from 'react';
import { X, Save, Users, Target, CheckCircle, AlertCircle, Lightbulb, FileText } from 'lucide-react';

// Inlined types to avoid build-time path alias resolution issues
interface User {
  id: number;
  username?: string;
  display_name: string;
  role?: string;
  email?: string;
}

interface Meeting {
  id: number;
  title: string;
  description?: string;
  meeting_date: string | Date;
  duration_minutes: number;
  location?: string;
  agenda?: string;
  status?: string;
}

interface SessionNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  meeting: Meeting;
  users: User[];
  onSuccess: () => void;
}

interface SessionNotes {
  attendance: { userId: number; present: boolean }[];
  objectives_met: string[];
  challenges_faced: string[];
  achievements: string[];
  next_steps: string[];
  coach_observations: string;
  team_reflections: string;
  materials_used: string;
  homework_assigned: string;
}

export default function SessionNotesModal({ isOpen, onClose, meeting, users, onSuccess }: SessionNotesModalProps) {
  const [notes, setNotes] = useState<SessionNotes>({
    attendance: users.map(user => ({ userId: user.id, present: true })),
    objectives_met: [''],
    challenges_faced: [''],
    achievements: [''],
    next_steps: [''],
    coach_observations: '',
    team_reflections: '',
    materials_used: '',
    homework_assigned: ''
  });
  const [selectedTab, setSelectedTab] = useState<'structure' | 'reflection' | 'planning'>('structure');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save as a comprehensive learning entry
      const response = await fetch('/api/learning-entries/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          meeting_id: meeting.id,
          user_id: 1, // Coach entry
          entry_type: 'note',
          title: `Session Notes: ${meeting.title}`,
          content: formatNotesContent(notes)
        }),
      });

      if (response.ok) {
        onSuccess();
        onClose();
        // Reset form
        setNotes({
          attendance: users.map(user => ({ userId: user.id, present: true })),
          objectives_met: [''],
          challenges_faced: [''],
          achievements: [''],
          next_steps: [''],
          coach_observations: '',
          team_reflections: '',
          materials_used: '',
          homework_assigned: ''
        });
      }
    } catch (error) {
      console.error('Error saving session notes:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatNotesContent = (notes: SessionNotes): string => {
    const attendingUsers = notes.attendance
      .filter(a => a.present)
      .map(a => users.find(u => u.id === a.userId)?.display_name)
      .join(', ');

    const absentUsers = notes.attendance
      .filter(a => !a.present)
      .map(a => users.find(u => u.id === a.userId)?.display_name)
      .join(', ');

    return `SESSION NOTES - ${new Date().toLocaleDateString()}

ATTENDANCE:
Present: ${attendingUsers || 'None'}
${absentUsers ? `Absent: ${absentUsers}` : ''}

OBJECTIVES MET:
${notes.objectives_met.filter(obj => obj.trim()).map(obj => `✓ ${obj}`).join('\n')}

ACHIEVEMENTS:
${notes.achievements.filter(ach => ach.trim()).map(ach => `🏆 ${ach}`).join('\n')}

CHALLENGES FACED:
${notes.challenges_faced.filter(ch => ch.trim()).map(ch => `⚠️ ${ch}`).join('\n')}

NEXT STEPS:
${notes.next_steps.filter(step => step.trim()).map((step, i) => `${i + 1}. ${step}`).join('\n')}

MATERIALS USED:
${notes.materials_used}

COACH OBSERVATIONS:
${notes.coach_observations}

TEAM REFLECTIONS:
${notes.team_reflections}

HOMEWORK/ASSIGNMENTS:
${notes.homework_assigned}

---
Generated with LEGO Vibe Meeting Management System`;
  };

  const addListItem = (field: keyof Pick<SessionNotes, 'objectives_met' | 'challenges_faced' | 'achievements' | 'next_steps'>) => {
    setNotes(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateListItem = (field: keyof Pick<SessionNotes, 'objectives_met' | 'challenges_faced' | 'achievements' | 'next_steps'>, index: number, value: string) => {
    setNotes(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeListItem = (field: keyof Pick<SessionNotes, 'objectives_met' | 'challenges_faced' | 'achievements' | 'next_steps'>, index: number) => {
    setNotes(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const toggleAttendance = (userId: number) => {
    setNotes(prev => ({
      ...prev,
      attendance: prev.attendance.map(att => 
        att.userId === userId ? { ...att, present: !att.present } : att
      )
    }));
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'structure', label: 'Session Structure', icon: Target },
    { id: 'reflection', label: 'Observations', icon: Lightbulb },
    { id: 'planning', label: 'Next Steps', icon: FileText }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">Session Notes</h2>
            <p className="text-sm text-gray-600">{meeting.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as 'structure' | 'reflection' | 'planning')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Attendance Section - Always visible */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Attendance
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {users.map((user) => {
                const attendance = notes.attendance.find(a => a.userId === user.id);
                return (
                  <label key={user.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={attendance?.present || false}
                      onChange={() => toggleAttendance(user.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{user.display_name}</span>
                    <span className="text-xs text-gray-500 capitalize">({user.role})</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          {selectedTab === 'structure' && (
            <div className="space-y-6">
              {/* Objectives Met */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Objectives Met
                </h3>
                {notes.objectives_met.map((objective, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={objective}
                      onChange={(e) => updateListItem('objectives_met', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Session objective completed..."
                    />
                    {notes.objectives_met.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeListItem('objectives_met', index)}
                        className="px-2 py-2 text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addListItem('objectives_met')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + Add Objective
                </button>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-600" />
                  Team Achievements
                </h3>
                {notes.achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => updateListItem('achievements', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Something the team accomplished or learned..."
                    />
                    {notes.achievements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeListItem('achievements', index)}
                        className="px-2 py-2 text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addListItem('achievements')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + Add Achievement
                </button>
              </div>

              {/* Challenges */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  Challenges Faced
                </h3>
                {notes.challenges_faced.map((challenge, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={challenge}
                      onChange={(e) => updateListItem('challenges_faced', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Issues, obstacles, or difficulties encountered..."
                    />
                    {notes.challenges_faced.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeListItem('challenges_faced', index)}
                        className="px-2 py-2 text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addListItem('challenges_faced')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + Add Challenge
                </button>
              </div>

              {/* Materials Used */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Materials Used</h3>
                <textarea
                  value={notes.materials_used}
                  onChange={(e) => setNotes(prev => ({ ...prev, materials_used: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={2}
                  placeholder="SPIKE Prime kit, field mat, laptops, challenge documents..."
                />
              </div>
            </div>
          )}

          {selectedTab === 'reflection' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Coach Observations</h3>
                <textarea
                  value={notes.coach_observations}
                  onChange={(e) => setNotes(prev => ({ ...prev, coach_observations: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={4}
                  placeholder="Team dynamics, individual progress, technical insights, areas for improvement..."
                />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Team Reflections</h3>
                <textarea
                  value={notes.team_reflections}
                  onChange={(e) => setNotes(prev => ({ ...prev, team_reflections: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={4}
                  placeholder="What the team shared about their learning, feelings about progress, concerns..."
                />
              </div>
            </div>
          )}

          {selectedTab === 'planning' && (
            <div className="space-y-6">
              {/* Next Steps */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  Next Steps
                </h3>
                {notes.next_steps.map((step, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={step}
                      onChange={(e) => updateListItem('next_steps', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Action item for next session..."
                    />
                    {notes.next_steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeListItem('next_steps', index)}
                        className="px-2 py-2 text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addListItem('next_steps')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + Add Next Step
                </button>
              </div>

              {/* Homework/Assignments */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Homework/Assignments</h3>
                <textarea
                  value={notes.homework_assigned}
                  onChange={(e) => setNotes(prev => ({ ...prev, homework_assigned: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={3}
                  placeholder="Research tasks, practice assignments, preparation for next session..."
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Saving...' : 'Save Session Notes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}