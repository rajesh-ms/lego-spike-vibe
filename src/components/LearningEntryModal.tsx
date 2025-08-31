'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

// Inlined types (pragmatic build fix to avoid path alias resolution issues during CI/build)
interface CreateLearningEntryRequest {
  meeting_id: number;
  entry_type: 'reflection' | 'goal' | 'achievement' | 'challenge' | 'note';
  title?: string;
  content: string;
}

interface User {
  id: number;
  username?: string;
  display_name: string;
  role: 'kid' | 'coach' | string;
  email?: string;
}

interface LearningEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  meetingId: number;
  users: User[];
  selectedUserId?: number;
}

export default function LearningEntryModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  meetingId, 
  users, 
  selectedUserId = 3 
}: LearningEntryModalProps) {
  const [formData, setFormData] = useState<CreateLearningEntryRequest & { user_id: number }>({
    meeting_id: meetingId,
    user_id: selectedUserId,
    entry_type: 'reflection',
    title: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/learning-entries/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
        onClose();
        // Reset form
        setFormData({
          meeting_id: meetingId,
          user_id: selectedUserId,
          entry_type: 'reflection',
          title: '',
          content: ''
        });
      } else {
        console.error('Failed to create learning entry');
      }
    } catch (error) {
      console.error('Error creating learning entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const entryTypeOptions = [
    { value: 'reflection', label: 'Reflection', description: 'What I learned or thought about' },
    { value: 'goal', label: 'Goal', description: 'Something I want to achieve' },
    { value: 'achievement', label: 'Achievement', description: 'Something I accomplished' },
    { value: 'challenge', label: 'Challenge', description: 'A problem I faced or need to solve' },
    { value: 'note', label: 'General Note', description: 'Any other thoughts or observations' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Add Learning Entry</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Who is writing this entry?
            </label>
            <select
              value={formData.user_id}
              onChange={(e) => setFormData({ ...formData, user_id: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.display_name} ({user.role})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Entry Type
            </label>
            <select
              value={formData.entry_type}
              onChange={(e) => setFormData({ ...formData, entry_type: e.target.value as 'reflection' | 'goal' | 'achievement' | 'challenge' | 'note' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {entryTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} - {option.description}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title (optional)
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Give your entry a title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content *
            </label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={6}
              placeholder="Share your thoughts, learnings, goals, or challenges..."
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">💡 Writing Tips:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Be specific about what you learned or experienced</li>
              <li>• Include details about programming, robot design, or teamwork</li>
              <li>• Share challenges so others can help or learn from them</li>
              <li>• Celebrate achievements, no matter how small!</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
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
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}