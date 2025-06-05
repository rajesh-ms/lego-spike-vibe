import AchievementSystem from '@/components/AchievementSystem';
import ProgressBar from '@/components/ProgressBar';
import { BookOpen, Trophy, Code, Target } from 'lucide-react';

export default function ProgressPage() {
  // Mock progress data - in a real app this would come from user state/database
  const stats = {
    lessonsCompleted: 12,
    totalLessons: 24,
    unitsCompleted: 2,
    totalUnits: 6,
    codeExercises: 18,
    totalExercises: 30,
    achievementsUnlocked: 4,
    totalAchievements: 6
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Learning Progress</h1>
          <p className="text-xl text-gray-600">
            Track your journey through LEGO programming!
          </p>
        </div>

        {/* Progress Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stats.lessonsCompleted}</h3>
            <p className="text-gray-600">Lessons Completed</p>
            <div className="mt-2">
              <ProgressBar 
                current={stats.lessonsCompleted} 
                total={stats.totalLessons}
                className="mt-2"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stats.unitsCompleted}</h3>
            <p className="text-gray-600">Units Completed</p>
            <div className="mt-2">
              <ProgressBar 
                current={stats.unitsCompleted} 
                total={stats.totalUnits}
                className="mt-2"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stats.codeExercises}</h3>
            <p className="text-gray-600">Code Exercises</p>
            <div className="mt-2">
              <ProgressBar 
                current={stats.codeExercises} 
                total={stats.totalExercises}
                className="mt-2"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stats.achievementsUnlocked}</h3>
            <p className="text-gray-600">Achievements</p>
            <div className="mt-2">
              <ProgressBar 
                current={stats.achievementsUnlocked} 
                total={stats.totalAchievements}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="bg-white rounded-xl p-8 shadow-md mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Overall Progress</h2>
          <div className="space-y-6">
            <ProgressBar 
              current={stats.lessonsCompleted} 
              total={stats.totalLessons}
              label="Lessons Progress"
            />
            <ProgressBar 
              current={stats.unitsCompleted} 
              total={stats.totalUnits}
              label="Units Progress"
            />
            <ProgressBar 
              current={stats.codeExercises} 
              total={stats.totalExercises}
              label="Coding Exercises"
            />
          </div>
        </div>

        {/* Achievement System */}
        <AchievementSystem />
      </div>
    </div>
  );
}
