'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Trophy, BookOpen } from 'lucide-react';
import { curriculum } from '@/data/curriculum';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import PythonEditor from '@/components/PythonEditor';

interface LessonPageProps {
  params: {
    unitId: string;
    lessonId: string;
  };
}

export default function LessonPage({ params }: LessonPageProps) {
  const unit = curriculum.units.find(u => u.id === params.unitId);
  const lesson = unit?.lessons.find(l => l.id === params.lessonId);
  
  if (!unit || !lesson) {
    notFound();
  }

  const unitIndex = curriculum.units.findIndex(u => u.id === params.unitId);
  const lessonIndex = unit.lessons.findIndex(l => l.id === params.lessonId);
  const nextLesson = unit.lessons[lessonIndex + 1];
  const prevLesson = unit.lessons[lessonIndex - 1];
  const nextUnit = curriculum.units[unitIndex + 1];
  const [code, setCode] = useState(lesson.codeExample || '# Write your Python code here\nprint("Hello LEGO SPIKE Prime!")');

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href={`/units/${unit.id}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {unit.title}
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-yellow-400 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {lessonIndex + 1}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {lesson.title}
                </h1>
              </div>
              <p className="text-lg text-gray-600 mb-4">
                {lesson.description}
              </p>
              
              {/* Lesson Stats */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{lesson.estimatedTime || lesson.duration || 30} min</span>
                </div>
                {lesson.difficulty && (
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    <span className="capitalize">{lesson.difficulty}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span className="capitalize">{lesson.type || 'learning'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Lesson Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Lesson Content */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 Lesson Content</h2>
              {lesson.content ? (
                <div className="prose prose-gray max-w-none">
                  {lesson.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="text-gray-600">
                  <p className="mb-4">
                    Welcome to <strong>{lesson.title}</strong>! In this lesson, you&apos;ll learn important concepts about LEGO SPIKE Prime programming.
                  </p>
                  <p className="mb-4">
                    Follow along with the code examples and try running them in the editor to see how they work!
                  </p>
                </div>
              )}
            </div>

            {/* Objectives */}
            {lesson.objectives && lesson.objectives.length > 0 && (
              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-400">
                <h3 className="text-xl font-bold text-gray-800 mb-3">🎯 Learning Objectives</h3>
                <ul className="space-y-2">
                  {lesson.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Challenge */}
            {lesson.challengeDescription && (
              <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-400">
                <h3 className="text-xl font-bold text-gray-800 mb-3">💪 Challenge</h3>
                <p className="text-gray-700 mb-4">{lesson.challengeDescription}</p>
                {lesson.challengeCode && (
                  <button
                    onClick={() => setCode(lesson.challengeCode || '')}
                    className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
                  >
                    Load Challenge Code
                  </button>
                )}
              </div>
            )}
          </motion.div>

          {/* Python Editor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <PythonEditor
                value={code}
                onChange={setCode}
                height="400px"
                hints={[
                  "Use descriptive variable names like 'motor_speed' instead of 'ms'",
                  "Remember to import the necessary SPIKE Prime modules at the top",
                  "Add comments to explain what each part of your code does",
                  "Test your code step by step - start simple and add complexity",
                  "Don't forget to handle errors - robots can be unpredictable!"                ]}
              />
            </div>            {/* Output */}
            <div className="bg-gray-900 text-green-400 rounded-xl p-4 font-mono text-sm min-h-[150px]">
              <div className="flex items-center gap-2 mb-2 text-gray-400">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>Output Console</span>
              </div>
              <pre className="whitespace-pre-wrap">
                # Console output will appear here when you run code from the editor above...
              </pre>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex flex-col md:flex-row justify-between gap-4"
        >
          {/* Previous Lesson */}
          {prevLesson ? (
            <Link 
              href={`/units/${unit.id}/lessons/${prevLesson.id}`}
              className="group flex items-center gap-3 bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-red-200 flex-1"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
              <div>
                <div className="text-sm text-gray-500">Previous Lesson</div>
                <div className="font-semibold text-gray-800 group-hover:text-red-500 transition-colors">
                  {prevLesson.title}
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex-1"></div>
          )}

          {/* Next Lesson or Unit */}
          {nextLesson ? (
            <Link 
              href={`/units/${unit.id}/lessons/${nextLesson.id}`}
              className="group flex items-center gap-3 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex-1 justify-end text-right"
            >
              <div>
                <div className="text-sm text-white/80">Next Lesson</div>
                <div className="font-semibold">
                  {nextLesson.title}
                </div>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : nextUnit ? (
            <Link 
              href={`/units/${nextUnit.id}`}
              className="group flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex-1 justify-end text-right"
            >
              <div>
                <div className="text-sm text-white/80">Next Unit</div>
                <div className="font-semibold">
                  {nextUnit.title}
                </div>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <Link 
              href="/units"
              className="group flex items-center gap-3 bg-green-500 text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex-1 justify-end text-right"
            >
              <div>
                <div className="text-sm text-white/80">Completed!</div>
                <div className="font-semibold">
                  Back to Units
                </div>
              </div>
              <Trophy className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
}
