'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/Toast';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  category: 'lessons' | 'coding' | 'progress' | 'special';
}

const defaultAchievements: Achievement[] = [
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: null,
    unlocked: false,
    category: 'lessons'
  },
  {
    id: 'python-explorer',
    title: 'Python Explorer',
    description: 'Write your first Python program',
    icon: null,
    unlocked: false,
    category: 'coding'
  },
  {
    id: 'motor-master',
    title: 'Motor Master',
    description: 'Control a LEGO motor',
    icon: null,
    unlocked: false,
    category: 'coding'
  },
  {
    id: 'sensor-specialist',
    title: 'Sensor Specialist',
    description: 'Use distance or color sensors',
    icon: null,
    unlocked: false,
    category: 'coding'
  },
  {
    id: 'progress-tracker',
    title: 'Progress Tracker',
    description: 'Complete 50% of lessons',
    icon: null,
    unlocked: false,
    category: 'progress'
  },
  {
    id: 'lego-champion',
    title: 'LEGO Champion',
    description: 'Complete all units',
    icon: null,
    unlocked: false,
    category: 'special'
  }
];

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
  const { showToast } = useToast();

  // Load achievements from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lego-achievements');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setAchievements(parsed);
        } catch (error) {
          console.error('Failed to load achievements:', error);
        }
      }
    }
  }, []);

  // Save achievements to localStorage
  const saveAchievements = (newAchievements: Achievement[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lego-achievements', JSON.stringify(newAchievements));
    }
    setAchievements(newAchievements);
  };

  // Unlock an achievement
  const unlockAchievement = (achievementId: string) => {
    const updated = achievements.map(achievement => 
      achievement.id === achievementId 
        ? { ...achievement, unlocked: true }
        : achievement
    );
    
    const achievement = updated.find(a => a.id === achievementId);
    const wasAlreadyUnlocked = achievements.find(a => a.id === achievementId)?.unlocked;
    
    if (achievement && !wasAlreadyUnlocked) {
      showToast(`🏆 Achievement Unlocked: ${achievement.title}!`, 'success', 5000);
    }
    
    saveAchievements(updated);
  };

  // Check if achievement is unlocked
  const isUnlocked = (achievementId: string) => {
    return achievements.find(a => a.id === achievementId)?.unlocked || false;
  };

  // Get achievement statistics
  const getStats = () => {
    const total = achievements.length;
    const unlocked = achievements.filter(a => a.unlocked).length;
    const percentage = total > 0 ? Math.round((unlocked / total) * 100) : 0;
    
    return { total, unlocked, percentage };
  };

  return {
    achievements,
    unlockAchievement,
    isUnlocked,
    getStats
  };
}
