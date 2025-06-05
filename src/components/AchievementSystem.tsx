'use client';

import { useState, useEffect } from 'react';
import { Trophy, Star, Code, BookOpen, Zap, Target } from 'lucide-react';
import Badge from './Badge';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  category: 'lessons' | 'coding' | 'progress' | 'special';
}

const achievements: Achievement[] = [
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: <BookOpen className="w-5 h-5" />,
    unlocked: false,
    category: 'lessons'
  },
  {
    id: 'python-explorer',
    title: 'Python Explorer',
    description: 'Write your first Python program',
    icon: <Code className="w-5 h-5" />,
    unlocked: false,
    category: 'coding'
  },
  {
    id: 'unit-master',
    title: 'Unit Master',
    description: 'Complete an entire unit',
    icon: <Trophy className="w-5 h-5" />,
    unlocked: false,
    category: 'progress'
  },
  {
    id: 'speed-coder',
    title: 'Speed Coder',
    description: 'Complete a lesson in under 5 minutes',
    icon: <Zap className="w-5 h-5" />,
    unlocked: false,
    category: 'special'
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Complete all challenges in a lesson',
    icon: <Target className="w-5 h-5" />,
    unlocked: false,
    category: 'special'
  },
  {
    id: 'lego-master',
    title: 'LEGO Master',
    description: 'Complete all units',
    icon: <Star className="w-5 h-5" />,
    unlocked: false,
    category: 'progress'
  }
];

export default function AchievementSystem() {
export default function AchievementSystem() {
  const [userAchievements, setUserAchievements] = useState<Achievement[]>(achievements);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  // Load achievements from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lego-achievements');
    if (saved) {
      try {
        const savedAchievements = JSON.parse(saved);
        setUserAchievements(savedAchievements);
      } catch (error) {
        console.error('Failed to load achievements:', error);
      }
    }
  }, []);

  // Save achievements to localStorage
  const saveAchievements = (newAchievements: Achievement[]) => {
    localStorage.setItem('lego-achievements', JSON.stringify(newAchievements));
    setUserAchievements(newAchievements);
  };  const unlockedCount = userAchievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-4">
      {/* Achievement Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          🏆 Achievement Unlocked: {showNotification}!
        </div>
      )}

      {/* Achievement Summary */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Your Achievements</h3>
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-blue-600">{unlockedCount}/{achievements.length}</div>
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg border-2 transition-all ${
              achievement.unlocked
                ? 'bg-green-50 border-green-200 shadow-md'
                : 'bg-gray-50 border-gray-200 opacity-60'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${
                achievement.unlocked ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'
              }`}>
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                <Badge 
                  variant={achievement.unlocked ? 'success' : 'secondary'}
                  size="sm"
                >
                  {achievement.unlocked ? 'Unlocked' : 'Locked'}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
