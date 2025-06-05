'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Code, TestTube } from 'lucide-react';
import { useToast } from '@/components/Toast';
import { useAchievements } from '@/hooks/useAchievements';
import PythonEditor from '@/components/PythonEditor';
import IconButton from '@/components/IconButton';
import ProgressBar from '@/components/ProgressBar';
import Badge from '@/components/Badge';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function DemoClient() {
  const [code, setCode] = useState(`# Welcome to the LEGO SPIKE Prime Demo! 🧱
from spike import PrimeHub, Motor

# Initialize the hub
hub = PrimeHub()

# Say hello!
print("Hello from LEGO SPIKE Prime!")
hub.light_matrix.show_image('HAPPY')

# Control a motor
motor = Motor('A')
motor.run_for_seconds(2, 50)

print("Demo complete! 🎉")`);

  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const { unlockAchievement, getStats } = useAchievements();

  const testToasts = () => {
    showToast('Success message! 🎉', 'success');
    setTimeout(() => showToast('Info message! ℹ️', 'info'), 500);
    setTimeout(() => showToast('Warning message! ⚠️', 'warning'), 1000);
    setTimeout(() => showToast('Error message! ❌', 'error'), 1500);
  };

  const testAchievements = () => {
    const achievements = ['first-lesson', 'python-explorer', 'motor-master'];
    achievements.forEach((id, index) => {
      setTimeout(() => unlockAchievement(id), index * 1000);
    });
  };

  const testLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  const stats = getStats();

  return (
    <>
      {/* Demo Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Python Editor Demo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Code className="w-6 h-6 text-blue-500" />
            Python Editor
          </h2>
          <p className="text-gray-600 mb-4">Interactive code editor with syntax highlighting and execution.</p>
          
          <PythonEditor
            value={code}
            onChange={setCode}
            height="300px"
            hints={[
              "Try adding hub.speaker.beep(60, 1) to make a sound!",
              "Use motor.run_for_degrees(360, 50) to rotate exactly one full turn",
              "Change the image to 'HEART', 'SURPRISED', or 'SILLY'"
            ]}
          />
        </motion.div>

        {/* Interactive Components Demo */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          
          {/* Toast Demo */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Toast Notifications</h3>
            <p className="text-gray-600 mb-4">Test different types of toast messages.</p>
            <IconButton
              icon={Sparkles}
              label="Test All Toasts"
              onClick={testToasts}
              variant="primary"
            />
          </div>

          {/* Achievement Demo */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Achievement System</h3>
            <p className="text-gray-600 mb-4">Unlock achievements and track progress.</p>
            <div className="mb-4">
              <ProgressBar 
                current={stats.unlocked} 
                total={stats.total}
                label="Achievement Progress"
              />
            </div>
            
            <div className="flex gap-2 mb-4">
              <Badge variant="success">{stats.unlocked} Unlocked</Badge>
              <Badge variant="secondary">{stats.total - stats.unlocked} Remaining</Badge>
            </div>
            
            <IconButton
              icon={Trophy}
              label="Unlock Test Achievements"
              onClick={testAchievements}
              variant="warning"
            />
          </div>

          {/* Loading Demo */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Loading States</h3>
            <p className="text-gray-600 mb-4">Test loading spinners and states.</p>
            
            {isLoading ? (
              <LoadingSpinner size="lg" message="Testing loading state..." />
            ) : (
              <IconButton
                icon={TestTube}
                label="Test Loading (3s)"
                onClick={testLoading}
                variant="secondary"
              />
            )}
          </div>

          {/* Progress Demo */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Progress Bars</h3>
            <p className="text-gray-600 mb-4">Different progress bar styles and colors.</p>
            <div className="space-y-3">
              <ProgressBar current={1} total={4} label="Unit 1: Overview" />
              <ProgressBar current={3} total={5} label="Unit 2: Python Basics" />
              <ProgressBar current={4} total={4} label="Unit 3: Movement" />
              <ProgressBar current={6} total={6} label="Unit 4: Sensors" />
            </div>
          </div>

          {/* Badge Demo */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Status Badges</h3>
            <p className="text-gray-600 mb-4">Different badge variants for status indication.</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="success">Completed</Badge>
              <Badge variant="warning">In Progress</Badge>
              <Badge variant="secondary">Not Started</Badge>
              <Badge variant="primary">Available</Badge>
              <Badge variant="primary">Bonus</Badge>
              <Badge variant="danger">Locked</Badge>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-12 text-center"
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-6">All components are working perfectly! Time to explore the LEGO programming world.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/units" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-200">
              📚 Start Learning
            </Link>
            <Link href="/playground" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-200">
              🎮 Try Playground
            </Link>
            <Link href="/progress" className="bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-200">
              📊 View Progress
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}
